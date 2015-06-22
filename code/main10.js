// Load the data.
d3.json("nations.json", function(nations) {

	var filtered_nations = nations;
	var year_idx = parseInt(document.getElementById("year_slider").value)-1950;

	// Calculate the averages for each region.
	var region_data = [];
	region_names = ["Sub-Saharan Africa", "South Asia", "Middle East & North Africa", "America", "East Asia & Pacific", "Europe & Central Asia"];
	for( var i = 0; i < 6; i++ ){
		filtered_nations_by_regions = nations.filter(function(nation){
			 return nation.region == region_names[i]; });
		region_data[i] = calc_mean(filtered_nations_by_regions);	
	}
	var filtered_reg_nations = region_data;

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
			var new_reg_nations = region_data.filter(function(nation){return nation.region == type;});
			for (var idx=0; idx<new_nations.length; idx++){
				filtered_nations.push(new_nations[idx]);
			}
			for (var idx=0; idx<new_reg_nations.length; idx++){
				filtered_reg_nations.push(new_reg_nations[idx]);
			}

		}
		else{ // remove data points from the data that match the filter
			filtered_nations = filtered_nations.filter(function(nation){ return nation.region != type;});
			filtered_reg_nations = filtered_reg_nations.filter(function(nation){ return nation.region != type;});
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


		var cross = data_canvas.selectAll(".cross")
		.data(filtered_reg_nations, function(d){return d.region});

		// cross.enter().append("path").attr("class","cross");

		// cross.exit().remove();

		// cross.transition().ease("linear").duration(200)
		// 				.style("stroke", function(d) { return colorScale(d.region); })
		// 				.style("stroke-width", 2)
		// 				.attr("d", function(d){ 
		// 					var posx = xScale(d.mean_income[year_idx]);
		// 					var posy = yScale(d.mean_lifeExpectancy[year_idx]);
		// 					var posx10u = posx+10;
		// 					var posy10u = posy+10;
		// 					var posx10d = posx-10;
		// 					var posy10d = posy-10;
		// 					var pathstring = "M " + posx + " " + posy + " L " + posx + " " + posy10u +
		// 					"M " + posx + " " + posy + " L " + posx + " " + posy10d +
		// 					"M " + posx + " " + posy + " L " + posx10d + " " + posy +
		// 					"M " + posx + " " + posy + " L " + posx10u + " " + posy;
		// 					return pathstring; 
		// 				})				      	

		var g_enter = cross.enter().append("g").attr("class","cross");
		g_enter.append("path").attr("class","cross-backing")
					.style("stroke", "black")
					.style("stroke-width", 3)
					.style("stroke-linecap", "round");
		g_enter.append("path").attr("class","cross-inside")
					.style("stroke", function(d) { return colorScale(d.region); })
					.style("stroke-width", 2)
					.style("stroke-linecap", "round");

		cross.exit().remove();

		function crossPath(d) { 
			var posx = xScale(d.mean_income[year_idx]);
			var posy = yScale(d.mean_lifeExpectancy[year_idx]);
			var posx10u = posx+10;
			var posy10u = posy+10;
			var posx10d = posx-10;
			var posy10d = posy-10;
			var pathstring = "M " + posx + " " + posy + " L " + posx + " " + posy10u +
			"M " + posx + " " + posy + " L " + posx + " " + posy10d +
			"M " + posx + " " + posy + " L " + posx10d + " " + posy +
			"M " + posx + " " + posy + " L " + posx10u + " " + posy;
			return pathstring; 
		}

		var g_transition = cross.transition().ease("linear").duration(200);
		g_transition.select(".cross-backing").attr("d", crossPath);
		g_transition.select(".cross-inside").attr("d", crossPath);

	}

	var tooltip = d3.select("body")
		.append("div")
		.style("position", "absolute") 
		.style("visibility", "hidden");

	// get region specific mean 

	
	
	function calc_mean(region_data) {
		var mean_income = [];
		var mean_lifeExpectancy = [];

		for( var year_idx2 = 0; year_idx2 < region_data[0].years.length; year_idx2++ ){
			var sum_income = 0;
			var sum_lifeExpectancy = 0;
			var sum_population = 0;

			for( var k = 0; k < region_data.length; k++ ){
				var kpop = region_data[k].population[year_idx2];
				var kincome = region_data[k].income[year_idx2];
				var klife = region_data[k].lifeExpectancy[year_idx2];
			    sum_income += kpop*kincome; 
			    sum_lifeExpectancy += kpop*klife;
			    sum_population += kpop;			    
			}

			mean_income[year_idx2] = sum_income/sum_population;
			mean_lifeExpectancy[year_idx2] = sum_lifeExpectancy/sum_population;
		}
		averageData = {
			region: region_data[0].region,
			years: region_data[0].years,
			mean_income: mean_income,
			mean_lifeExpectancy: mean_lifeExpectancy
		};

		return averageData;
	}


});
