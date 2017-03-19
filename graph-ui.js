var ui = {
    graph: null,
    mode: null,
    wsocket: null,
    
    init: function() {
	this.triggerButton = document.getElementById("trigger");

	// handler hooks
	var self = this;
	this.triggerButton.addEventListener("mousedown",
					    function(e) { self.onModeButton("trigger"); e.preventDefault(); });
	this.triggerButton.addEventListener("mouseup",
					    function(e) { self.triggerButton.removeAttribute("selected"); });

	this.graph = new graph();
	this.wsocket = new hvsocket(this.graph);

	this.graph.draw();

	/* // test updating
	var d = [];
	for( i = 0; i < 200; i++ ) {
	    d.push([i, i]);
	}
	this.graph.updateData(d);*/
    },

    onModeButton: function(mode) {
	this.mode = mode;

	// light up the button
	if( mode == "trigger" ) {
	    this.triggerButton.setAttribute("selected", "");
	}

	// action code
	if( mode == "trigger" ) {
	    this.wsocket.sendTrigger();
	} else {
	    throw "unknown onModeButton: " + mode;
	}
    },
}
