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
				      title: "Last electroporation waveform",
				      xaxis: { min: 0, max: 300, title: "ms" },
				      yaxis: { max: 300, min: 0, title: "V" },
				      grid: { minorVerticalLines: true },
				      mouse: { track: true },
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
