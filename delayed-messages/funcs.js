var textArea = document.getElementById("textConvo");
var previousArea = document.getElementById("previousMessage");
var heading = document.getElementById("titleCard");
var dialupGif = document.getElementById("dialup");
var currentConvoText = "";

function startConvo() {
    console.log("The test begins... NOW;");
    currentConvoText = textArea.value;
    textArea.value = "";
    textArea.disabled = true;
    console.log(currentConvoText);
    dialupGif.style.display = "block";
    setTimeout(reenable, 1000 * 60);
}

function reenable(){
    console.log("rebooting...");
    console.log(currentConvoText);
    console.log(heading); console.log(heading.value);
    heading.innerHTML = "Respond to the Message"
    textArea.disabled = false;
    previousArea.innerHTML = currentConvoText;
    currentConvoText = "";
    dialupGif.style.display = "none";
}