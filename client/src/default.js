
/////////////////////
//
// default.js
//
// This file is responsible for the rendering of nodes on a screen, on initial load
//
/////////////////////
//

graphData = {
    "graph": {
        "name": "A Sample Network (move nodes to make a ring)"
    },
    "nodes": [
        {
            "name": "0",
            "color": "blue",
            "shape": "square",
            "y": 105.0,
            "x": 104.0,
            "id": 0,
            "size": 10
        },
        {
            "name": "1",
            "color": "black",
            "shape": "circle",
            "y": 215.0,
            "x": 360.0,
            "id": 1,
            "size": 10
        },
        {
            "name": "2",
            "color": "red",
            "shape": "square",
            "y": 215.0,
            "x": 260.0,
            "id": 2,
            "size": 10
        },
        {
            "name": "3",
            "color": "green",
            "shape": "circle",
            "y": 315.0,
            "x": 300.0,
            "id": 3,
            "size": 15
        }
    ],
    "links": [
        {
            "source": 0,
            "target": 1
        },
        {
            "source": 0,
            "target": 2
        },
        {
            "source": 3,
            "target": 2
        },
        {
            "source": 3,
            "target": 1
        }
    ],
    "r": 180
}

var network = NetworkXGenerator(graphData);
render(network, {wipeOnNewLoad: true, width: graphData.height, height: graphData.width}, graphData.graph.name);
