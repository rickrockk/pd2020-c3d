var viewer;
var htmlDiv;
var documentId;

var numOfDiv = 2;

var options = {
  env: "AutodeskProduction",
  api: "derivativeV2", // for models uploaded to EMEA change this option to 'derivativeV2_EU'
  getAccessToken: function(onTokenReady) {
    var timeInSeconds = 3600; // Use value provided by Forge Authentication (OAuth) API
    onTokenReady(token, timeInSeconds);
  }
};

var config3d = {
  extensions: ["MyAwesomeExtension"]
};

function initViewer() {
  viewer = new Autodesk.Viewing.GuiViewer3D(htmlDiv, config3d);
  var startedCode = viewer.start();

  Autodesk.Viewing.Initializer(options, function() {
    if (startedCode > 0) {
      console.error("Failed to create a Viewer: WebGL not supported.");
      return;
    }

    console.log("Initialization complete, loading a model next...");

    Autodesk.Viewing.Document.load(
      documentId,
      onDocumentLoadSuccess,
      onDocumentLoadFailure
    );

    function onDocumentLoadSuccess(viewerDocument) {
      var defaultModel = viewerDocument.getRoot().getDefaultGeometry();
      viewer.loadDocumentNode(viewerDocument, defaultModel);
    }

    function onDocumentLoadFailure() {
      console.error("Failed fetching Forge manifest");
    }
    //viewer.loadModel();
  });
}

function loadViewer(i, slider = true) {
  //
  function stileForgeCentre(id) {
    $(id).css({
      display: "block",
      "background-color": "#F0F8FF",
      position: "absolute",
      width: "100%",
      height: "100vh",
      left: "0",
      transition: "1s",
      "transition-delay": "0s"
    });
  }

  function stileForgeLeft(id) {
    $(id).css({
      "background-color": "#F0F8FF",
      position: "absolute",
      width: "100%",
      height: "100vh",
      left: "-100vw",
      transition: "0s",
      "transition-delay": "0s",
      display: "block"
    });
  }

  function stileForgeRight() {
    $("#forgeViewer" + String(numOfDiv)).css({
      position: "absolute",
      left: "+100vw",
      transition: "1.2s",
      "transition-delay": "0.2s"
    });
  }

  function stileForgeNone() {
    $("#forgeViewer" + String(numOfDiv)).css({
      display: "none"
    });
  }

  function setDocId(a) {
    switch (a) {
      case 1:
        documentId = "urn:" + docId1;
        break;
      case 2:
        documentId = "urn:" + docId2;
        break;
      case 3:
        documentId = "urn:" + docId3;
        break;
      case 4:
        documentId = "urn:" + docId4;
        break;
      case 5:
        documentId = "urn:" + docId5;
        break;
      default:
        documentId = "urn:" + i;
        break;
    }
  }
  //

  let str = "#forgeViewer" + String(numOfDiv);
  let str2 = "forgeViewer" + String(numOfDiv);
  if (numOfDiv == 2) {
    numOfDiv = 1;
  } else {
    numOfDiv = 2;
  }
  if (slider) {
    stileForgeRight();
    stileForgeLeft(str);
    htmlDiv = document.getElementById(str2);
    setTimeout(function() {
      stileForgeCentre(str);
    }, 1);
    setDocId(i);
    initViewer();
    setTimeout(function() {
      stileForgeNone();
    }, 1350);
  } else {
    stileForgeCentre(str);
    htmlDiv = document.getElementById(str2);
    setDocId(i);
    initViewer();
    stileForgeNone();
  }
}
