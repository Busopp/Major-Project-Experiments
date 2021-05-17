// import Webcam from 'webcam-easy';
    
    const webcamElement = document.getElementById('webcam');
    const canvasElement = document.getElementById('canvas');
    const snapSoundElement = document.getElementById('snapSound');
    const webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);

    webcam.start()
    .then(result =>{
        console.log("webcam started");
    })
    .catch(err => {
        console.log(err);
    });

    function takePicture() {
        //get access to the webcam and take a pic
        console.log("oogabooggaa");
    }


    //next step is add a button that overlays a message to respond to on the canvas