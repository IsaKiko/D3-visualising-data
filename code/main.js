// Load the data.
d3.json("nations.json", function(nations) {

	var filtered_nations = nations;
	var year_idx = parseInt(document.getElementById("year_slider").value)-1950;

	// Create the SVG frame inside chart_area.
	var chart_area = d3.select("#chart_area");
	var frame = chart_area.append("svg");

	// Create canvas inside frame.
	var canvas = frame.append("g");

	// Set margins, width, and height.
	var margin = {top: 19.5, right: 19.5, bottom: 19.5, left: 39.5};
	var frame_width = 960;
	var frame_height = 350;
	var canvas_width = frame_width - margin.left - margin.right;
	var canvas_height = frame_height - margin.top - margin.bottom;

	
	// Set svg attributes width and height.
	frame.attr("width", frame_width);
	frame.attr("height", frame_height);


	// Shift the chart and make it slightly smaller than the svg canvas.
	canvas.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	// Various scales. These domains make assumptions of data, naturally.
	var xScale = d3.scale.log(); // income
	xScale.domain([250, 1e5]);
	xScale.range([0, canvas_width]);  
    
    // d3 has a subobject called scale. within scale, there are a number of functions to create scales.
    // e.g. log, linear, sqrt, category10 (e.g. 10 different colours)... 
    // we set the domain based on our data - min and max of the data
    // we set the range - range on the page
    // domain, range, log scale all determing data values are mapped to graph positions.

    var yScale = d3.scale.linear().domain([10, 85]).range([canvas_height, 0]);  // life expectancy
    var colorScale = d3.scale.category20();

    // an alternative notation that d3 offers is to chain everything together using the dot-syntax 
    // (you'll see this a lot). The order is mostly arbitrary. 


	// Creating the x & y axes.
	var xAxis = d3.svg.axis().orient("bottom").scale(xScale);
    var yAxis = d3.svg.axis().scale(yScale).orient("left");

	var rScale = d3.scale.sqrt().domain([0, 5e8]).range([0, 40]); // life expectancy

    // Next step: push the axes into the chart
	// Add the x-axis.
	canvas.append("g")
	.attr("class", "x axis")
    .attr("transform", "translate(0," + canvas_height + ")")
    .call(xAxis);

    // .call is the bit where the properties we just set are pushed to the object
    // attribures are added to make it look pretty (class is used in the css file)


	// Add the y-axis.
	canvas.append("g")
    .attr("class", "y axis")
    .call(yAxis);



	//////////////////////AXES CREATED//////////////////////////



	//////////////////////FILL IN DATA//////////////////////////


	// var filtered_nations = nations.filter(function(nation){ return nation.population[nation.population.length-1][1] > 10000000;});

	// var filtered_nations = nations.filter(function(nation){ return nation.region == "Sub-Saharan Africa";});

	var data_canvas = canvas.append("g")
	.attr("class", "data_canvas")

	update();

	// slider
	d3.select("#year_slider").on("input", function () {
		year_idx = parseInt(this.value) - 1950;
		update();
	});

	// dot is finding a class, hash an ID

	// check boxes
	d3.selectAll(".region_cb").on("change", function() {
		var type = this.value;
		if (this.checked) { // adding data points (not quite right yet)
			var new_nations = nations.filter(function(nation){ return nation.region == type;});
			for (var idx=0; idx<new_nations.length; idx++){
				filtered_nations.push(new_nations[idx]);
			}
		}
		else{ // remove data points from the data that match the filter
			filtered_nations = filtered_nations.filter(function(nation){ return nation.region != type;});
		}
		update();
	});

	// update the plot, includes enter, exit, and transition
	function update() {
		var dot = data_canvas.selectAll(".dot")  // magic! 
		.data(filtered_nations, function(d){return d.name});

		dot.enter().append("circle").attr("class","dot")				      	
									.style("fill", function(d) { return colorScale(d.region); })
									.on("mouseover", function(d){return tooltip.style("visibility", "visible").text(d.name);})
									.on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
									.on("mouseout", function(){return tooltip.style("visibility", "hidden");});

		dot.exit().remove();

		dot.transition().ease("linear").duration(200)
						.attr("cx", function(d) { return xScale(d.income[year_idx]); }) // this is why attr knows to work with the data
						.attr("cy", function(d) { return yScale(d.lifeExpectancy[year_idx]); })
						.attr("r", function(d) { return rScale(d.population[year_idx]); });

	}

	var tooltip = d3.select("body")
		.append("div")
		.style("position", "absolute") 
		.style("visibility", "hidden");

	// 1) find unique regions
	// 2) filter data by those regions and then run calc_mean on the regions
	// 3) store in array of objects similar to original data: [{"region": "Sub-Saharan Africa","years": [1950,1951,...],"mean income":[..,..],"mean life expectancy":[..., ... ]},{...}]


	var m = [];
	for (var nation_idx=0; nation_idx<nations.length; nation_idx++){ //this shouldn't be all nations, but unique regions!
		m[nation_idx] =	calc_mean(nations[nation_idx]);
	}
	console.log(m);

	function calc_mean(dataset) {
		console.log(dataset)
		var mean = [];
		var sum_income = 0;
		var sum_le = 0;

		for( var i = 0; i < dataset.income.length; i++ ){
		    sum_income += parseInt( dataset.income[i], 10 ); //don't forget to add the base
		}

		for( var j = 0; j < dataset.lifeExpectancy.length; j++ ){
		    sum_le += parseInt( dataset.lifeExpectancy[j], 10 ); //don't forget to add the base
		}

		var mean_income = sum_income/dataset.income.length;
		var mean_le = sum_le/dataset.lifeExpectancy.length;

		mean = [mean_income,mean_le];
		return mean
	}

});
