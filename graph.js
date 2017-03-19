function graph() {
    this.graphContainer = document.getElementById("graph");
}
graph.prototype = {
    graphContainer: null,
    grapher: null,
    data: [],

    draw() {
	this.grapher = Flotr.draw(this.graphContainer, [ this.data ],
				  {
				      xaxis: {  },
				      yaxis: { max: 1000, min: 0 },
				      grid: { minorVerticalLines: true }
				  });
	
    },

    animate() {
	setTimeout(function() { this.draw(); }, 30);
	this.draw();
    },

    updateData(newdata) {
	this.data = newdata.slice(0);
	this.draw();
    },
}
