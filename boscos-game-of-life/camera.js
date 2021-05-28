var video = document.querySelector("#videoElement");

var pixelCanvas = document.getElementById("canvas");

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

}


function crossCheck(answerSet) {
    // Figure out the ideal based on the answers (big case statement?) and return it.

}


function addUserValue() {
    // randomly select some tiles and then call injectWord(x,y,"") based on these

}