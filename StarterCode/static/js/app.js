console.log("hello");

function DrawBubblechart(sampleId) {
    console.log("DrawBubblechart()");
}

function DrawBargraph(sampleId) {
    console.log("Drawbargraph()");
}

function ShowMetaData(sampleId) {
    console.log("ShowMetaData()");
}

function DrawGauge(sampleId) {
    console.log("DrawGauge()");
}

function InitDashboard() {
    console.log("InitDashboard()");

    // Get a handle to the dropdown
    let selector = d3.select("#selDataset")

    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

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