function hvsocket(graphRef) {
    this.graph = graphRef;
    ws = new WebSocket("ws://127.0.0.1:8080");

    var self = this;
    ws.onmessage = function(evt) {
	if( evt.data == "u" ) {
	    self.graph.updateData(self.data);
	} else {
            var point = evt.data.split(",");
            self.data.push([point[0], point[1]]);
	    //console.log("got " + point[0] + ", " + point[1]);
            if(self.data.length > self.MAX_POINTS) {
		self.data.shift();
            }
	}
    }
}

hvsocket.prototype = {
    ws: null,
    data: [],
    graph: null,
    MAX_POINTS: 400,

    sendTrigger: function() {
	this.data = [];
	ws.send('t'); // send trigger message
	console.log("got send trigger event");
    },
}
      

