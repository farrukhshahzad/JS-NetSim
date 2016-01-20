var generalNetworkData = {};
var removed = {};


var dist = function(x1, y1, x2, y2) {
  if (!x2) x2 = 0;
  if (!y2) y2 = 0;
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

var NetworkXGenerator = function(networkJSON) {

  generalNetworkData = {};
  removed = {};

  var g;
  if (networkJSON.directed) {
    g = new jsnx.DiGraph();
  } else {
    g = new jsnx.Graph();
  }

  // Load nodes
  networkJSON.nodes.forEach(function(node) {
    var name = node.name.toString();
    g.addNode(name, node);
  });

  // See if r exists, and save it.
  if (networkJSON.r) {
    generalNetworkData.r = networkJSON.r;
  } else {
    generalNetworkData.r = Infinity;
  }

  // Our edge weight will be defined using distance between coordiantes.
  // See pythagorean theorom
  networkJSON.links.forEach(function(link) {

    var sourceName = link.source.toString();
    var sourceIndex;
    var sourceNode;
    var destinationName = link.target.toString();
    var destinationIndex;
    var destinationNode;

    g.nodes(true).forEach(function(node, index) {
      if (node[0] === sourceName) {
        sourceIndex = index;
        sourceNode = node;
      } else if (node[0] === destinationName) {
        destinationIndex = index;
        destinationNode = node;
      }
    });


    g.addEdge(sourceName, destinationName, {
      source: sourceIndex,
      target: destinationIndex,
      destinationNode: destinationNode,
      sourceNode: sourceNode
    });

  })

  return g;

}

// These network settings methods play with the modal. They are aspects of a view.
// TODO: Maybe use backbone for MVC setup. Or React
var updateNetworkSettings = function() {
  debugger;
  for (var key in generalNetworkData) {
    if ($('#' + key).val()) {
      generalNetworkData[key] = $('#' + key).val();
    }
  }
}

var displayNetworkSettings = function() {
  
  var makeInputDiv = function(name, val) {
    return '<div class="input-group">' + 
      '<div class="input-group-addon">' + name + '</div>' + 
      '<input type="text" class="form-control" id="' + name + '" placeholder="' + val +'">' + 
      '</div><br >';
  }

  $('.graph-selection').empty();
  for (var key in generalNetworkData) {
    $('.graph-selection').append(makeInputDiv(key, generalNetworkData[key]));
  }

}

// TODO: Clean this up, and make it more efficient.
// Meaning, it doesn't need to run on "every tickback"
var updateNetwork = function(graph, nodeData) {

  var changes = {};
  //  Calculate a new distance
  var newDist = dist(nodeData.source.x, nodeData.source.y, nodeData.target.x, nodeData.target.y);

  // Replace nodes with new x and y positions
  graph.addNode(nodeData.source.name, nodeData.source);
  graph.addNode(nodeData.target.name, nodeData.target);

  // console.log(generalNetworkData.r, newDist);
  // Remove edge in networkx if r is large
  if (generalNetworkData.r < newDist) {

    if (!removed[nodeData.source.name + nodeData.target.name]) {
      graph.removeEdge(nodeData.source.name, nodeData.target.name);
      changes.removedEdge = [nodeData.source.name, nodeData.target.name];
      removed[nodeData.source.name + nodeData.target.name] = true;
    }


  } else {
    // replace the edge with new weight
    if (removed[nodeData.source.name + nodeData.target.name]) {
      changes.addedEdge = [nodeData.source.name, nodeData.target.name]
      removed[nodeData.source.name + nodeData.target.name] = false;
    }

    graph.addEdge(nodeData.source.name, nodeData.target.name, {
      weight: newDist
    });
  }


  // Graph is mutated. No need to return. 
  // TODO: return settings, which topology.js will read, and update svg accordingly.
  return changes;
}
