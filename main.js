/*
Joyce Wang
CSC444 Assignment 10
12/10/2019

This program draws 4 vector fields, the first being a colormap with rectangles,
the second being a hedgehog plot, the third with uniformly placed arrow glyphs,
and the fourth with randomly placed arrow glyphs.
*/

//////////////////////////////////////////////////////////////////////////////
// Global variables, preliminaries

var svgSize = 500;
var bands = 50;

var xScale = d3.scaleLinear().domain([0, bands]).  range([0, svgSize]);
var yScale = d3.scaleLinear().domain([-1,bands-1]).range([svgSize, 0]);

function createSvg(sel)
{
    return sel
        .append("svg")
        .attr("width", svgSize)
        .attr("height", svgSize);
}

function createGroups(data) {
    return function(sel) {
        return sel
            .append("g")
            .selectAll("*")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", function(d) {
                return "translate(" + xScale(d.Col) + "," + yScale(d.Row) + ")";
            });
    };
}

d3.selection.prototype.callReturn = function(callable)
{
    return callable(this);
};

//////////////////////////////////////////////////////////////////////////////
// PART 1

var colorScale = d3.scaleLinear().domain([0, 2]).range(["white", "red"]);
var magColor = d3.select("#plot1-color")
        .callReturn(createSvg)
        .callReturn(createGroups(data));

magColor.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("x", function(d) { return d.Col; })
        .attr("y", function(d) { return d.Row; })
        .attr("fill", function(d) { return colorScale(Math.sqrt((d.vx*d.vx)+(d.vy*d.vy))); } );

//////////////////////////////////////////////////////////////////////////////
// PART 2

var hedgehog = d3.select("#plot1-hedgehog")
        .callReturn(createSvg)
        .callReturn(createGroups(data));

hedgehog.append("line")
        .attr("x1", function(d) { return d.Col + 5; } )
        .attr("y1", function(d) { return d.Row + 5; } )
        .attr("x2", function(d) { return d.Col + 5+(6*d.vx); })
        .attr("y2", function(d) { return d.Row + 5+(6*d.vy); })
        .attr("stroke-width", 1)
        .attr("stroke", "black");

//////////////////////////////////////////////////////////////////////////////
// PART 3

var unifGlyph = d3.select("#plot1-uniform")
        .callReturn(createSvg)
        .callReturn(createGroups(data));

unifGlyph.append("g")
    .attr("transform", function(d) {
        return "rotate(" + Math.atan2(d.vy, d.vx)*180/Math.PI+")";
    }).append("path")
    .attr("d", function(d) { return  "M 5 5 L "+(5+7*Math.sqrt((d.vx*d.vx)+(d.vy*d.vy)))+
    " 5 L "+(4+7*Math.sqrt((d.vx*d.vx)+(d.vy*d.vy)))+ " 6 L "+(4+7*Math.sqrt((d.vx*d.vx)+
    (d.vy*d.vy)))+" 4 L "+(5+7*Math.sqrt((d.vx*d.vx)+(d.vy*d.vy)))+" 5";})
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("fill", "black");

//////////////////////////////////////////////////////////////////////////////
// PART 4

var randomGlyph = d3.select("#plot1-random")
        .callReturn(createSvg)
        .callReturn(createGroups(data));

randomGlyph.append("g")
    .attr("transform", function(d) {
        return "rotate(" + Math.atan2(d.vy, d.vx)*180/Math.PI+")";
    }).append("path")
    .attr("d", function(d) {
      var x1=Math.random()*10;
      var y1=Math.random()*10;
      return  "M "+ x1 +" "+y1+" L "+(x1+7*Math.sqrt((d.vx*d.vx)+(d.vy*d.vy)))+" "+
      y1+" L "+(x1-1+7*Math.sqrt((d.vx*d.vx)+(d.vy*d.vy)))+ " "+(y1+1)+" L "+
      (4+7*Math.sqrt((d.vx*d.vx)+(d.vy*d.vy)))+" "+(y1-1)+" L "+
      (x1+7*Math.sqrt((d.vx*d.vx)+(d.vy*d.vy)))+" "+y1;
    })
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("fill", "black");
