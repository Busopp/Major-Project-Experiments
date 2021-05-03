var convoBits = document.getElementById("convoBits");
var textArea = document.getElementById("textConvo");
var previousArea = document.getElementById("previousMessage");
var heading = document.getElementById("titleCard");
var dialupGif = document.getElementById("dialup");
var waitingMessage = document.getElementById("waitingMessage");
var currentConvoText = "";

console.log("The test begins... NOW;");

function startConvo() {
    currentConvoText = textArea.value;
    textArea.value = "";
    textArea.disabled = true;
    date = new Date();
    console.log(date);
    console.log(currentConvoText);
    convoBits.style.display = "none";
    dialupGif.style.display = "block";
    waitingMessage.innerHTML = "Your message is being sent...";
    setTimeout(arriveShortly, 1000 * 30);
}

function arriveShortly() {
    waitingMessage.innerHTML = "A Message should arrive soon...";
    setTimeout(reenable, 1000 * 30);
}

function reenable(){
    //console.log("rebooting...");
    console.log(currentConvoText);
    heading.innerHTML = "Respond to the Message"
    textArea.disabled = false;
    previousArea.innerHTML = currentConvoText;
    //Add curent to a log
    
    currentConvoText = "";
    convoBits.style.display = "block";
    dialupGif.style.display = "none";
}


/*

function writeToLog(texties) {
    var fso = new CreateObject("Scripting.FileSystemObject");
    f = fso.OpenTextFile("chatlog.txt", 2, true);
    f.Write("New Message: ");
    f.Write(texties);
    f.Write(" --------------- ");
    f.Close();
}

*/