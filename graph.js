function graph() {
    this.graphContainer = document.getElementById("graph");
}
graph.prototype = {
    graphContainer: null,
    grapher: null,
    data: [],
    tauv: 0.0,
    tau: 0.0,

    draw() {
	var tauline = [ [0, this.tauv], [300, this.tauv] ];
	var tautime = [ [this.tau, 0], [this.tau, 300] ];
/*	this.grapher = Flotr.draw(this.graphContainer, [ this.data ],
				  {
				      title: "Last electroporation waveform",
				      xaxis: { min: 0, max: 300, title: "ms" },
				      yaxis: { max: 300, min: 0, title: "V" },
				      grid: { minorVerticalLines: true },
				      mouse: { track: true },
				  });*/
	this.grapher = Flotr.draw(this.graphContainer,
				  [ this.data,
				    { data: tauline, dashes: { show: true }},
				    { data: tautime, dashes: { show: true }}
				  ],
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

    updateData(newdata, maxv, t) {
	this.data = newdata.slice(0);
	this.tauv = maxv * 0.3678;
	this.tau = t;
	this.draw();
    },
}
