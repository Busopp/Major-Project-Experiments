var video = document.querySelector("#videoElement");

var pixelCanvas = document.getElementById("canvas");
var context = pixelCanvas.getContext("2d");
var answerSet = "";



if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment'}})
      .then(function (stream) {
        video.srcObject = stream;
      })
      .catch(function (err0r) {
        console.log("Something went wrong!");
      });
  }



function cameraOperations() {
    takeSnapshot();
    testAnswerCoordinates()
    checkAnswers();
    crossCheck();
}


function takeSnapshot() {
    //take a pic, put it on a canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
}


function checkAnswers() {
    //process the images, and store the answers in a data structure (dictionary?)
    //get answer for 1
    pushAnswers(29, 97);
    pushAnswers(102, 97);
    pushAnswers(175, 92);
    pushAnswers(252, 92);
    console.log(answerSet);
}


function addUserValue(value) {
    // randomly select some tiles and then call adduservalue(x,y,"") based on these
    injectWord(Math.floor(Math.random() * boardLength), Math.floor(Math.random() * boardWidth), value);

    answerSet = "";
}



function pushAnswers(c1, c2) {
    var data = context.getImageData(c1, c2, 3, 3).data;
    var rgb = [ data[0], data[1], data[2] ];

    var composite = rgb[0] + rgb[1] + rgb[2];
    console.log(composite);
    if (composite < 300) {
        answerSet += "1";
    } else {
        answerSet += "0";
    }
}




function crossCheck() {
    // Figure out the ideal based on the answers (big case statement?) and return it.
    //if 
    var value = "";
    console.log(answerSet);
    switch (answerSet) {
        case "0000":
            value = "Fakeness";
            break;
        case "0001":
            value = "Trouble";
            break;
        case "0010":
            value = "Feedback";
            break;
        case "0011":
            value = "Control";
            break;
        case "0100":
            value = "Apathy";
            break;
        case "0101":
            value = "Turbulence";
            break;
        case "0110":
            value = "Desperation";
            break;
        case "0111":
            value = "Nuance";
            break;
        case "1000":
            value = "Joy";
            break;
        case "1001":
            value = "Jazziness";
            break;
        case "1010":
            value = "Pride";
            break;
        case "1011":
            value = "Clemency";
            break;
        case "1100":
            value = "Freedom";
            break;
        case "1101":
            value = "Frinkiness";
            break;
        case "1110":
            value = "Community";
            break;
        case "1111":
            value = "Help";
            break;
    }   
    console.log(value);
    addUserValue(value);
}


function testAnswerCoordinates(){
    //1
    context.beginPath();
    context.arc(29, 97,         5, 0, 2 * Math.PI);
    context.stroke();

    //2
    context.beginPath();
    context.arc(102, 97,         5, 0, 2 * Math.PI);
    context.stroke();

    //etc
    context.beginPath();
    context.arc(175, 92,         5, 0, 2 * Math.PI);
    context.stroke();

    context.beginPath();
    context.arc(252, 92,         5, 0, 2 * Math.PI);
    context.stroke();
}