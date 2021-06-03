var video = document.querySelector("#videoElement");

var pixelCanvas = document.getElementById("canvas");
var context = pixelCanvas.getContext("2d");
var answerSet = [];

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment'}})
      .then(function (stream) {
        video.srcObject = stream;
      })
      .catch(function (err0r) {
        console.log("Something went wrong!");
      });
  }

function takeSnapshot() {
    //take a pic, put it on a canvas
    context.drawImage(video, 0, 0, 360, 480 );
}



function checkAnswers() {
    //process the images, and store the answers in a data structure (dictionary?)
    //get answer for 1
    pushAnswers(1);
    pushAnswers(2);
    pushAnswers(3);
    pushAnswers(4);

}


function crossCheck(answerSet) {
    // Figure out the ideal based on the answers (big case statement?) and return it.
    //if 
}


function addUserValue() {
    // randomly select some tiles and then call injectWord(x,y,"") based on these

}



function pushAnswers(qNumber) {
    var data = context.getImageData(x, y, qNumber*50, 100).data;
    var rgb = [ data[0], data[1], data[2] ];
    var composite = rgb[0] + rgb[1] + rgb[2];
    if (composite < 150) {
        answerSet.push(true);
    } else {
        answerSet.push(false);
    }
}