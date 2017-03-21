function hvsocket(graphRef) {
    this.graph = graphRef;
    // ws = new WebSocket("ws://127.0.0.1:8080");
    ws = new WebSocket("ws://hv-dev1.local:8080");

    var self = this;
    ws.onmessage = function(evt) {
	if( evt.data == "u" ) {
	    var maxval = 0.0;
	    var maxtime = 0.0;
	    var maxidx = 0;
	    for( var i = 0; i < self.data.length; i++ ) {
		if( parseFloat(self.data[i][1]) > maxval ) {
		    maxval = parseFloat(self.data[i][1]);
		    maxtime = self.data[i][0];
		    maxidx = i;
		}
	    }
	    var thresh = maxval * 0.3678;
	    var threshtime = -1.0;
	    for( var i = maxidx; i < self.data.length; i++ ) {
		if( self.data[i][1] < thresh ) {
		    threshtime = self.data[i][0];
		    break;
		}
	    }
	    var tau = threshtime - maxtime;
	    if( tau > 0 ) {
		document.getElementById("timeconst").innerHTML = "Max V: " + maxval.toFixed(2) + "V tau: " + tau.toFixed(2) + "ms";
		self.graph.updateData(self.data, maxval, tau);
	    } else {
		document.getElementById("timeconst").innerHTML = "Max V: " + maxval.toFixed(2) + "V tau: did not converge";
		self.graph.updateData(self.data, maxval, 0.0);
	    }
	} else if (evt.data.substring(0,4) == "hvup" ) {
	    var hval = evt.data.split(",");
	    self.curv = parseFloat(hval[1]).toFixed(2);
	    document.getElementById("hvCurrent").innerHTML = "Actual voltage: " + self.curv + "V";
	} else {
	    var hvarray = evt.data.split("#");
	    hvarray.forEach(function(e) {
		var point = e.split(",");
		self.data.push([point[0], point[1]]);
		//console.log("got " + point[0] + ", " + point[1]);
		if(self.data.length > self.MAX_POINTS) {
		    self.data.shift();
		}
	    });
	    document.getElementById("trigger").removeAttribute("selected");	    
	}
    }
}

hvsocket.prototype = {
    ws: null,
    data: [],
    graph: null,
    MAX_POINTS: 10000,
    curv: 0.0,

    sendTrigger: function() {
	this.data = [];
	ws.send('t'); // send trigger message
	console.log("got send trigger event");
    },
    setHv: function( state ) {
	if( state == true ) {
	    ws.send("HVON");
	} else {
	    ws.send('h');
	}
    },
    setCap10: function( state ) {
	if( state == true ) {
	    ws.send("C10");
	} else {
	    ws.send("c10");
	}
    },
    setCap25: function( state ) {
	if( state == true ) {
	    ws.send("C25");
	} else {
	    ws.send("c25");
	}
    },
    setRes300: function( state ) {
	if( state == true ) {
	    ws.send("R300");
	} else {
	    ws.send("r300");
	}
    },
    setRes620: function( state ) {
	if( state == true ) {
	    ws.send("R620");
	} else {
	    ws.send("r620");
	}
    },
    setRes750: function( state ) {
	if( state == true ) {
	    ws.send("R750");
	} else {
	    ws.send("r750");
	}
    },
    setRes1000: function( state ) {
	if( state == true ) {
	    ws.send("R1000");
	} else {
	    ws.send("r1000");
	}
    },
    setHV: function( voltage ) {
	ws.send("shv" + voltage);
    },
    getHV: function() {
	ws.send("hvup");
    },
    setRC: function(row, col) {
	ws.send("setRC," + row + "," + col);
    },
}
      

