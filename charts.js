function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  console.log("test 1");
  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
    console.log("Init");
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  console.log("function option changed");
  
}

// Demographics Panel 
function buildMetadata(sample) {
  console.log("Build Meta Data");
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

//D1 Use Plotly and JS to create functions to make a bar chart 

//1. Create the buildCharts function.
function buildCharts(sample) {
  console.log("Build Charts Check");
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var result = sampleArray[0];
    console.log(result);
    console.log(data); 

    //6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
    //create a variable that holds the washing frequency 
    var metadata_array = data.metadata.filter(sampleObj => sampleObj.id == sample);
    var md = metadata_array[0];
    var wfreqs = md.wfreq;
    console.log(wfreqs);
    console.log(otu_ids, otu_labels, sample_values, ); 

    //7. Create the yticks for the bar chart.
    //Hint: Get the the top 10 otu_ids and map them in descending order  
    // so the otu_ids with the most bacteria are last. 

    var sorted_sample_values = sampleArray.sort((a,b) => b.sample_values - a.sample_values).reverse();
    console.log(sorted_sample_values); 

    var sorted_sample_slice = sample_values.slice(0, 10);
    var sorted_otu_ids = otu_ids.slice(0,10);
    var sorted_otu_labels = otu_labels.slice(0,10);
    console.log(sorted_sample_slice, sorted_otu_ids, sorted_otu_labels); 

    var xticks = sorted_otu_ids.map(id => "OTU: " + id);
    var yticks = sorted_sample_slice
    //.map(sorted_sample_slice => sorted_sample_slice.sample_values);
    console.log(xticks, yticks, sorted_sample_values); 
    console.log(sorted_sample_slice);

    ///8. Create the trace for the bar chart. 
    var trace = {
      x: yticks,
      y: xticks,
      type: "bar",
      orientation: 'h',
      text: sorted_otu_labels // this creates the hovertext
    };
    var barData = [trace];
   
    //9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      yaxis: {autorange: 'reversed'} // this reverses the yaxis
    };
    //10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);

    // D2- Use plotly to plot the data with the layout 
    //1. create the trace for the bubble chart 
    var trace ={
      x: otu_ids, 
      y: sample_values, 
      text: otu_labels, 
      type: "bubbles", 
      mode: "markers", 
      marker: {
        color: otu_ids, 
        opacity: [1, 0.8, 0.6, 0.4], 
        size: sample_values
      }
    };
    var bubbledata = [trace];

    //2. Create the layout for the bubble charts 
    var bubblelayout = {
      title: "Bacteria Cultures per Sample", 
      xaxis: {title: "OTU ID"}, 
      showlegend: false, 
      hovermode: d3.select(optionChanged)
    };
    
    //3. Use plotly to plt the data with the layout 
    Plotly.newPlot("bubble", bubbledata, bubblelayout); 

    //D3- Use plotly to create a gauge 

    
  // 4. Create the trace for the gauge chart.
    var gaugeData= [{
      domain: {x: [0,1], y: [0,1]},
      value: wfreqs,
      title:  { text: "<b>Belly Button Washing Frequency</b> <br> <i>Scrubs per Week</i>"},
      type: "indicator", 
      mode: "gauge+number",
      gauge: {
        axis: { range: [null, 10]}, 
        bar: { color: "black"},
        steps: [ 
          { range: [0, 2], color: "red"},
          { range: [2, 4], color: "orange"}, 
          { range: [4, 6], color: "yellow"}, 
          { range: [6, 8], color:  "lightgreen"}, 
          { range: [8, 10], color: "green"}
        ]
      } 
      }
    ]; 
     
  // 5. Create the layout for the gauge chart.
    var gaugeLayout = {  
      width: 600, height: 450, 
      margin: {t: 0, b:0 }
    };

  // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout)
  });
};