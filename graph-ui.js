var ui = {
    graph: null,
    mode: null,
    wsocket: null,
    
    init: function() {
	this.triggerButton = document.getElementById("trigger");
	this.hvonButton = document.getElementById("hvon");
	this.cap10Button = document.getElementById("cap10");
	this.cap25Button = document.getElementById("cap25");
	this.res1000Button = document.getElementById("res1000");
	this.sethvButton = document.getElementById("setHV");

	// handler hooks
	var self = this;
	this.triggerButton.addEventListener("mousedown",
					    function(e) { self.onModeButton("trigger"); e.preventDefault(); });
//	this.triggerButton.addEventListener("mouseup",
//					    function(e) { self.triggerButton.removeAttribute("selected"); });


	this.hvonButton.addEventListener("click",
					 function(e) { self.onModeButton("hvon"); e.preventDefault(); });
	this.cap10Button.addEventListener("click",
					  function(e) { self.onModeButton("cap10"); e.preventDefault(); });
	this.cap25Button.addEventListener("click",
					  function(e) { self.onModeButton("cap25"); e.preventDefault(); });
	this.res1000Button.addEventListener("click",
					    function(e) { self.onModeButton("res1000"); e.preventDefault(); });
	this.sethvButton.addEventListener("click",
					  function(e) { self.onHvButton("setHV"); });
	
	// initialization of other UI elements and interfaces
	this.graph = new graph();
	this.wsocket = new hvsocket(this.graph);

	this.graph.draw();

	document.getElementById("hvConfirm").innerHTML = "Input a target (30-1000V).";
	document.getElementById("hvCurrent").innerHTML = "Connecting to server for current voltage...";

	setInterval(function(){ self.wsocket.getHV(); }, 1000);
    },

    onHvButton: function(mode) {
	this.mode = mode;
	if( mode == "setHV" ) {
	    voltage = parseInt(document.getElementById("hvSet").value);
	    if( isNaN( voltage ) ) {
		document.getElementById("hvConfirm").innerHTML = "Not a number.";
		return;
	    }
	    if( voltage < 30 ) {
		document.getElementById("hvConfirm").innerHTML = "Target too low.";
		return;
	    }
	    if( voltage > 1000 ) {
		document.getElementById("hvConfirm").innerHTML = "Target too high.";
		return;
	    }
	    this.wsocket.setHV(voltage);
	    document.getElementById("hvConfirm").innerHTML = "Current target is " + voltage + "V";
	}
    },

    onModeButton: function(mode) {
	this.mode = mode;

	// light up the button
	if( mode == "trigger" ) {
	    this.triggerButton.setAttribute("selected", "");
	} else if( mode == "hvon" ) {
	    if( this.hvonButton.getAttribute("selected") == "true" ) {
		this.hvonButton.removeAttribute("selected");
	    } else {
		this.hvonButton.setAttribute("selected", "true");
	    }
	} else if( mode == "cap10" ) {
	    if( this.cap10Button.getAttribute("selected") == "true" ) {
		this.cap10Button.removeAttribute("selected");
	    } else {
		this.cap10Button.setAttribute("selected", "true");
	    }
	} else if( mode == "cap25" ) {
	    if( this.cap25Button.getAttribute("selected") == "true" ) {
		this.cap25Button.removeAttribute("selected");
	    } else {
		this.cap25Button.setAttribute("selected", "true");
	    }
	} else if( mode == "res1000" ) {
	    if( this.res1000Button.getAttribute("selected") == "true" ) {
		this.res1000Button.removeAttribute("selected");
	    } else {
		this.res1000Button.setAttribute("selected", "true");
	    }
	}

	// action code
	if( mode == "trigger" ) {
	    this.wsocket.sendTrigger();
	} else if( mode == "hvon" ) {
	    if( this.hvonButton.getAttribute("selected") == "true" ) {
		this.wsocket.setHv(true);
	    } else {
		this.wsocket.setHv(false);
	    }
        } else if( mode == "cap10" ) {
	    if( this.cap10Button.getAttribute("selected") == "true" ) {
		this.wsocket.setCap10(true);
	    } else {
		this.wsocket.setCap10(false);
	    }
        } else if( mode == "cap25" ) {
	    if( this.cap25Button.getAttribute("selected") == "true" ) {
		this.wsocket.setCap25(true);
	    } else {
		this.wsocket.setCap25(false);
	    }
        } else if( mode == "res1000" ) {
	    if( this.res1000Button.getAttribute("selected") == "true" ) {
		this.wsocket.setRes1000(true);
	    } else {
		this.wsocket.setRes1000(false);
	    }
        } else {
	    throw "unknown onModeButton: " + mode;
	}
    },
}
