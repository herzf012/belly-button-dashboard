console.log("hello");

// Define a global variable to hold the URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function DrawBargraph(sampleId) {
    console.log(`Drawbargraph(${sampleId})`);

    d3.json(url).then(data => {
        console.log(data);

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();
        // Create a trace object
        let barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h"
        };

        // Put the trace object into an array
        let barArray = [barData];

        // Creat a layout
        let barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        };

        // Call the Plotly function
        Plotly.newPlot("bar", barArray, barLayout);

    });
}

function DrawBubblechart(sampleId) {
    console.log(`DrawBubblechart(${sampleId})`);
}

function ShowMetaData(sampleId) {
    console.log(`ShowMetaData(${sampleId})`);
}

function DrawGauge(sampleId) {
    console.log(`DrawGauge(${sampleId})`);
}

function optionChanged(sampleId) {
    console.log(`optionChanged: ${sampleId}`);

    DrawBargraph(sampleId);

    DrawBubblechart(sampleId);

    ShowMetaData(sampleId);

    DrawGauge(sampleId);
}

function InitDashboard() {
    console.log("InitDashboard()");

    // Get a handle to the dropdown
    let selector = d3.select("#selDataset")

    d3.json(url).then(data => {
        console.log("Here's the data:", data);

        let sampleNames = data.names;
        console.log("Here are the sample names:", sampleNames);

        // Populate the dropdown box
        for (let i = 0; i < sampleNames.length; i++) {
            let sampleId = sampleNames[i];
            selector.append("option").text(sampleId).property("value", sampleId);
        };

        // Read the current value from the dropdown
        let initialId = selector.property("value");
        console.log(`initialId = ${initialId}`);
        // Draw the bargraph for the selected sample id
        DrawBargraph(initialId);

        // Draw the bubblechart for the selected sample id
        DrawBubblechart(initialId);

        // show the metadata for the selected sample id
        ShowMetaData(initialId);

        // show gauge
        DrawGauge(initialId);

    });

}

InitDashboard();