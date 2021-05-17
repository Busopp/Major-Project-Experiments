import * as handTrack from './hand_tracking.js'
var counter = 0;
var trackingModel;

// Load model
async function loadModel() {
  console.log("Start load")
  handTrack.load({
    flipHorizontal: true,   // flip for video
    maxNumBoxes: 1,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.85,    // confidence threshold for predictions.
    showFPS: false
  }).then(model => {
    trackingModel = model;
    console.log("Finish load")
  });
}
loadModel();

// Smooth Anchor to div
function scrollToAnchor(aid){
  console.log(aid)
  var aTag = $("a[name='"+ aid +"']");
  $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}
$("#btn-try").click(function() {
   scrollToAnchor('prediction-container');
});


$(function() {
  const dominantHand = new CameraWidget($('#dominant-hand'));
  $('#results').hide();
});

// Run detection
function runDetection(widget) {
  trackingModel.detect(widget.video[0]).then(predictions => {
    trackingModel.renderPredictions(predictions, widget.canvas[0], widget.context, widget.video[0]);

    if(counter == 12) {//36) {
      handTrack.stopVideo(widget.video[0]);
      widget.prediction = predictions[0];
      widget.showGraphEditor();
      $('#results').show();
    } else {
      requestAnimationFrame(() => runDetection(widget));
    }

    counter = predictions.length == 0 ? 0 : ++counter;
  });
}

/* ==================================
-------------------------------------
	    C A M E R A    W I D G E T
 ------------------------------------
 ====================================*/
class Graph {
  constructor(nodes, context, color) {
    this.context = context;
    this.nodes = nodes;
    this.color = color;
  }

  draw() {
    let self = this;

    if(this.nodes.length == 0)
      return;

    // Draw edges
    let n1 = self.nodes[0];
    let n2 = self.nodes[1];
    let n3 = self.nodes[2];
    let lineProm = {
      x : (n1.position.x + n3.position.x) / 2,
      y : (n1.position.y + n3.position.y) / 2,
    };
    let lineAdjus = {
      x : (n2.position.x - lineProm.x),
      y : (n2.position.y - lineProm.y)
    };

    self.context.beginPath();
    self.context.strokeStyle = self.color;
    self.context.lineWidth = 3;
    self.context.moveTo(n1.position.x, n1.position.y);
    self.context.quadraticCurveTo(n2.position.x + lineAdjus.x, n2.position.y + lineAdjus.y,
                               n3.position.x, n3.position.y
                              );
    self.context.stroke();

    // Draw nodes
    for(var n of self.nodes) {
      self.context.beginPath();
      self.context.arc(n.position.x, n.position.y, n.size, 0, 2 * Math.PI, false)
      self.context.fillStyle = self.color;
      self.context.fill();
      self.context.strokeStyle = self.color;
      self.context.stroke();
    }
  }

  getClickedNode(mousePos) {
    let node = undefined;

    for(var n of this.nodes) {
      if(mousePos.x > (n.position.x - n.size) &&
         mousePos.x < (n.position.x + n.size) &&
         mousePos.y > (n.position.y - n.size) &&
         mousePos.y < (n.position.y + n.size)) {
           node = n;
      }
    }

    return node;
  }
}

class Node {
  constructor(position) {
    this.position = position;
    this.size = 6;
  }
}

class CameraWidget {
  constructor(cameraWidget) {
    this.cameraWidget = cameraWidget;
    this.video = cameraWidget.find("video");
    this.canvas = cameraWidget.find("canvas");
    this.startButton = cameraWidget.find('.btn-1');
    this.predictButton = cameraWidget.find('.btn-2');
    this.message = cameraWidget.find('.message');
    this.context = this.canvas[0].getContext("2d");
    this.prediction = {};
    this.heartLine = new Graph([], this.context, "#E5242E");
    this.headLine = new Graph([], this.context, "#E5242E");
    this.lifeLine = new Graph([], this.context, "#E5242E");
    this.selectedNode;
    this.finalImage = this.canvas[0].toDataURL('image/jpeg', 1.0);
    this.calculated = false;

    this.heartLineResults = [
      "You’re a rational, analytical thinker who always considers others’ feelings, and people appreciate that about you.",
      "You need your freedom. You show your love through actions more than words.",
      "Your passions and desires drive you, and you don’t care who knows it.",
      "You are reserved and prefer small groups to big ones. You open up in one-on-one settings.",
      "You have a habit of putting your emotions on the back burner to meet others’ needs."
    ];
    this.headLineResults = [
      "You’re a fast thinker who reaches conclusions without any hemming and hawing.",
      "Analyze much? You often find yourself mulling things over (and over) before coming to a decision.",
      "Sensitive to others, you can easily see someone else’s perspective. This means you may change your opinion now and then.",
      "You’re a creative thinker who can imagine many possible outcomes or approaches to any situation."
    ];
    this.lifeLineResults = [
      "You’re a rock whom people count on to stay strong in difficult times.",
      "When the going gets tough, keeping busy helps you feel safe and secure.",
      "You may need to chill out now and then. Yoga, meditation, walking, or taking time to play could do you good.",
    ]

    this.canvas[0].width = this.canvas[0].offsetWidth;
    this.canvas[0].height = this.canvas[0].offsetHeight;
    this.context.font = "14px Arial";
    this.context.fillStyle = "#493465";
    this.context.textAlign = "center";
    this.context.fillText("Hand not detected", this.canvas.width() / 2, this.canvas.height() / 2);
    this.message.hide();
    this.predictButton.hide();

    this.configEvents();
  }

  configEvents() {
    let self = this;

    this.startButton.click(function(ev) {
      self.message.hide();
      self.startButton.prop('disabled', true);
      self.startVideo();
      ev.preventDefault();
    });

    this.predictButton.click(function(ev) {
      ev.preventDefault();
      scrollToAnchor('results-container');

      if(self.calculated === false) {
        $('#results .heartline-res').text(self.heartLineResults[
          Math.floor(Math.random() * self.heartLineResults.length)
        ]);
        $('#results .headline-res').text(self.headLineResults[
          Math.floor(Math.random() * self.headLineResults.length)
        ]);
        $('#results .lifeline-res').text(self.lifeLineResults[
          Math.floor(Math.random() * self.lifeLineResults.length)
        ]);
        self.calculated = true;
        $('#results').show();
      }
    });

    this.canvas[0].addEventListener('mousedown', function(event) {
      var rect = self.canvas[0].getBoundingClientRect();
      var scaleX = self.canvas[0].width / rect.width,    // relationship bitmap vs. element for X
          scaleY = self.canvas[0].height / rect.height;

      let mousePos = {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
      }
      self.selectedNode = self.heartLine.getClickedNode(mousePos);

      if(self.selectedNode == undefined)
        self.selectedNode = self.headLine.getClickedNode(mousePos);
      if(self.selectedNode == undefined)
        self.selectedNode = self.lifeLine.getClickedNode(mousePos);
    });

    this.canvas[0].addEventListener('mouseup', function(event) {
      self.selectedNode = undefined;
    });

    this.canvas[0].addEventListener('mousemove', function(event) {
      var rect = self.canvas[0].getBoundingClientRect();
      var scaleX = self.canvas[0].width / rect.width,    // relationship bitmap vs. element for X
          scaleY = self.canvas[0].height / rect.height;

      let mousePos = {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
      }
      if(self.selectedNode != undefined) {
        self.selectedNode.position = mousePos;
        self.draw();
      }
    });
  }

  /**
   * Start video stream on canvas
   */
  startVideo() {
    var self = this;
    handTrack.startVideo(this.video[0]).then(function (status) {
        if (status) {
          self.cameraWidget.find('.particles').hide();
          self.context.clearRect(0, 0, self.canvas.width(), self.canvas.height());
          self.context.fillText("Loading Machine Learning model...", self.canvas.width() / 2, self.canvas.height() / 2);
          runDetection(self);
        }
    });
  }

  /**
   * Create lines as graphs each.
   * Use width as reference to calculate topLine so doesn't matter if
   * detected hand is square or rectangular ratio.
   */
  showGraphEditor() {
    var predBbox = this.prediction.bbox; // Prediction bounding box [x, y, width, height],
    var bottomLine = predBbox[1] + predBbox[3];
    var topLine = bottomLine - predBbox[2];
    let self = this;

    // Set prediction and message
    self.predictButton.show();
    self.message.text("You can drag lines for a better palm match.");
    self.message.show();
    self.startButton.prop('disabled', false);

    // Cut hand area and blur everything else.
    let handData = this.context.getImageData(predBbox[0], predBbox[1], predBbox[2], predBbox[3]);
    let allImage = this.canvas[0].toDataURL('image/jpeg', 1.0);
    var img = new window.Image();

    this.context.filter = 'grayscale(100%)';
    img.addEventListener("load", function () {
      self.context.drawImage(img, 0, 0);
      console.log(handData)
      self.context.putImageData(handData, predBbox[0], predBbox[1]);
      self.finalImage = self.canvas[0].toDataURL('image/jpeg', 1.0);
      self.context.filter = 'none';

      // Create palm lines represented by graphs.
      self.heartLine = new Graph([
        new Node({x: predBbox[0] + predBbox[2] * 0.4, y: topLine + predBbox[2] * 0.15}),
        new Node({x: predBbox[0] + predBbox[2] * 0.7, y: topLine + predBbox[2] * 0.23}),
        new Node({x: predBbox[0] + predBbox[2] * 1.0, y: topLine + predBbox[2] * 0.26}),
      ], self.context, "#E5242E");

      self.headLine = new Graph([
        new Node({x: predBbox[0] + predBbox[2] * 0.28, y: topLine + predBbox[2] * 0.23}),
        new Node({x: predBbox[0] + predBbox[2] * 0.48, y: topLine + predBbox[2] * 0.33}),
        new Node({x: predBbox[0] + predBbox[2] * 0.70, y: topLine + predBbox[2] * 0.50}),
      ], self.context, "#52BD1F");

      self.lifeLine = new Graph([
        new Node({x: predBbox[0] + predBbox[2] * 0.26, y: topLine + predBbox[2] * 0.35}),
        new Node({x: predBbox[0] + predBbox[2] * 0.50, y: topLine + predBbox[2] * 0.57}),
        new Node({x: predBbox[0] + predBbox[2] * 0.50, y: topLine + predBbox[2] * 0.95}),
      ], self.context, "#FFD700");

      self.draw();
    });
    img.setAttribute("src", allImage);
  }

  /**
   * Set final image and then draw graphs(lines) on.
   */
  draw() {
    let self = this;
    // Draw original image
    var img = new window.Image();
    img.addEventListener("load", function () {
      self.context.drawImage(img, 0, 0);
      self.heartLine.draw();
      self.headLine.draw();
      self.lifeLine.draw();
    });
    img.setAttribute("src", this.finalImage);
  }

  /**
   * Start counter and then take picture
   */
  startCounter() {
    var scope = this;
    var counterContainer = this.cameraWidget.find('.counter');
    var count = 3;

    // Show counter
    var interval = setInterval(function() {
      counterContainer.empty();
      counterContainer.text(`${count--}`);
      if(count == 0)
        takePicture();
    }, 1100);

    function takePicture() {
      counterContainer.empty();
      clearInterval(interval);
      scope.canvas.width(scope.video.width());
      scope.canvas.height(scope.video.height());

      var width = scope.canvas[0].width;
      var height = scope.canvas[0].height;
      scope.context.drawImage(scope.video[0], 0, 0);

      scope.video.hide();
      scope.canvas.show();
      scope.video[0].srcObject.getTracks().forEach(track => track.stop());
    }
  }
}