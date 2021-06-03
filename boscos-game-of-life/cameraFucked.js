var video = document.querySelector("#videoElement");

var pixelCanvas = document.getElementById("canvas");
var context = pixelCanvas.getContext("2d");

var gotResult = false;
var currentAnswer;
var useTess = false;

var link = document.getElementById('link');
    link.setAttribute('download', 'MintyPaper.png');
    link.setAttribute('href', pixelCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    link.click();


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

    if (useTess) {
      takeSnapshot();
      var lol = getAnswer();

      checkRes(lol);
    } else {
      //Get the user text 
      // var url = "./userInput.txt";
      // var jsonFile = new XMLHttpRequest();
      //     jsonFile.open("GET",url,true);
      //     jsonFile.send();

      //     jsonFile.onreadystatechange = function() {
      //         if (jsonFile.readyState== 4 && jsonFile.status == 200) {
      //             //Do something with the text
      //             var x = jsonFile.responseText;
      //             console.log(x);
      //             addUserValue(x);
      //         }
      //     }
      var file = new File();
    }
}

function checkRes(lol) {
  if (gotResult ==true ) {

    addUserValue(lol);
    gotResult = false;
  } else {
    setTimeout(checkRes, 500, lol);
  }  
}

function takeSnapshot() {
    //take a pic, put it on a canvas
    context.drawImage(video, 0, 0, 360, 480 );

    // then save that canvas as answer.png or whatever
    // var link = document.getElementById('link');
    // link.setAttribute('download', 'MintyPaper.png');
    // link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    // link.click();


    // var image = pixelCanvas.toDataURL("image/png").replace("answer/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
    // window.location.href=image; // it will save locally

}



function getAnswer() {
    //process the images, and store the answers in a data structure (dictionary?)
    
      var answer = "0122819267";
      Tesseract.recognize(
        './test3.jpg',
        'eng',
        { logger: m => console.log(m) }
      ).then(({ data: { text } }) => {
        console.log(text);
        answer = text.split(" ")[0];
        currentAnswer = answer;
        gotResult = true;
      })
    
    // setTimeout(() => {
    //   console.log("answer: "+answer);
    //   return answer;
    // }, 30000)
    
}



function addUserValue(val) {
    // randomly select some tiles and then call injectWord(x,y,"") based on these
    console.log("injecting: " +val);
    injectWord(8,8,val);
}
