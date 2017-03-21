function hvsocket(graphRef) {
    this.graph = graphRef;
    // ws = new WebSocket("ws://127.0.0.1:8080");
    ws = new WebSocket("ws://hv-dev1.local:8080");

    var self = this;
    ws.onmessage = function(evt) {
	if( evt.data == "u" ) {
	    self.graph.updateData(self.data);
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
      

