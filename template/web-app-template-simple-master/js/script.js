
// Comments come after each chunk. Sometimes I might not understand what something does, but at least I've found it on Github. Mike Bostock has an awesome glossary I'm sure multiple people have found. Hooray D3!




var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// this variable sets margins for our chart. As you can see, it sets sizes based on a size (960) minus the previously set margin numbers on line 7. 

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

    // This builds a new ordinal scale as a variable, and the .rangeRoundBands sets an interval. The interval is weird and I don't understand it because it doesn't look anything like the example I found. I'm not sure why it doesn't follow the same standard. 

var y = d3.scale.linear()
    .range([height, 0]);

    // This scale maps an input domain to an output range. This is both a scale object and a function, so we're calling it and setting a range for our bars to grow on the y axis... I think. 

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

    // This is calling one of D3's preset axes labels, putting it on the bottom of the page (relatively) and scaling it by X, which gives us a width. The .scales and .orient are attributes, right? 

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");

    // This is doing the same thing, except on the Y axis. As you can see, we're calling the axis, putting it on the left, setting how many "ticks" it has and the label for those ticks. 

var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Breaking this one down. We set a variable for the svg where we call our chart and append the svg on it. After that, we're setting the width of this chart based on the margins we set way up top. We do the same for the height.

    // This is where I don't understand what happens. We .append this name "g" to it, but I don't know why. We then set this attribute of "transform" and "translate" and I don't know why we do that either, I can't find anything about it. 

d3.json("js/ChaseHeadley.json", function(error, data) {

// This is an ajax call where we call the data, naturally. 

console.log(data);

// A console log so we can see the data in our console. 

  x.domain(data.stats.map(function(d) { return d.year; }));

  // So we set the x domain to our data and our stats, then we make a function to call the years as defined in our data as the labels for our x axis. 

  y.domain([0, d3.max(data.stats, function(d) { return d.H; })]);

  // We do the same thing here, where we set the y domain and use a function to call the home runs as the height. I'm not sure why it's so different - I think it's like what you described, where we use 0 and d3.max to identify a height. 

// Domain: 

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

      // Right here we're defining g. We set some attributes for it, like x axis then transforming it based on the relative height of the graph... I think. 

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");

      // Now here I don't understand. We're doing it again, but for the Y axis? I still don't see where we defined g. Clearly here we're working with the bars, as we rotated them -90 degrees to stand up straight, because usually they go sideways. And then we anchored the text to the ends of them as well. 

  svg.selectAll(".bar")
      .data(data.stats)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.year); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.H); })
      .attr("height", function(d) { return height - y(d.H); });


// Now right here we're finally working with putting the data against the bars. We define the bars as rectangles, as classes, and we say with functions to stretch out the bars based on data. X goes by year, Y goes by Home Runs. We also set a function to limit the height of the bars, but I don't totally understand how that works. It looks like we're subtracting some distance from some y... On line 90. 
});





