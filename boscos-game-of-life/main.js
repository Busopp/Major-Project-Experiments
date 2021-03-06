var boardLength = 24;
var boardWidth = 24;

var boardState = init2DArray();
var temp = init2DArray();
var global = this;

//lets just initialize with some random words


var tickSpeed = 500;

var injectedWord = ["", 0, 0];

boardState[1][1] = "love";
boardState[1][2] = "love";
boardState[1][3] = "love";
boardState[3][4] = "hate";
boardState[10][8] = "JUSTICE";

console.log(boardState);
console.log(temp);

var uniqueColors = ["azure", "aqua", "CadetBlue", "DarkSalmon", "Lavender", "MistyRose", "Sienna", "Snow"];
var uniqueWords = 0;
var usedWords = ["."];
var surroundingWords = [];

createHTMLTable(boardState);

setTimeout(mainLoop, tickSpeed);



//outlines the steps for each "generation"
function mainLoop() {
    //add synonyms to the temp board
    //calcNewState();
    checkSurroundings();
    //reconcile temp issues

    // Apply the injected word after all other calculations
    if (injectedWord[2] != "") {
        console.log("injecting");
        //call the patterns down the bottom randomly
        var num = Math.floor(Math.random()*4);
        switch (num) {
            case 0:
                makeToad(injectedWord[1], injectedWord[2], injectedWord[0]); console.log("toad");
                break;
            case 1:
                makeBeacon(injectedWord[1], injectedWord[2], injectedWord[0]); console.log("beacon");
                break;
            case 2:
                makeBlinker(injectedWord[1], injectedWord[2], injectedWord[0]); console.log("blinker");
                break;
            case 3:
                makeSquare(injectedWord[1], injectedWord[2], injectedWord[0]); console.log("square");
                break;
        }
        injectedWord = [0,0, ""];
    }
    
    //apply temp to board
    boardState = temp;
    temp = init2DArray();

    // console.log(boardState);
    
    // set styles for each individual word i guess


    //apply boardstate to the html page, and add colors
    createHTMLTable(boardState);

    //take a picture w/ webcam, process image, and then inject word based on result


    //call it all agian
    setTimeout(mainLoop, tickSpeed);
}


function camera() {
    cameraOperations();
}



function createHTMLTable(tableData) {
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');
  
    tableData.forEach(function(rowData) {
      var row = document.createElement('tr');
  
      rowData.forEach(function(cellData) {
        var cell = document.createElement('td');

        //if its not included in the includedWords, add it in, change included count.
        if (!usedWords.includes(cellData)) {
            usedWords.push(cellData);
        }
        //add the words indexOf() color from the colors object as a class
        cell.setAttribute( "class", uniqueColors[ usedWords.indexOf(cellData) ] );


        cell.appendChild(document.createTextNode(cellData));
        row.appendChild(cell);
      });
  
      tableBody.appendChild(row);
    });
  
    table.appendChild(tableBody);
    document.getElementById("tablestuff").innerHTML = "";
    document.getElementById("tablestuff").appendChild(table);
    usedWords = ["."];
    return usedWords;
}
  



function injectWord(i, j, word){
    console.log(i);
    console.log(j);
    console.log(word);

    injectedWord = [word, i, j];
}



//loop through each temp and checl the surroundings
function checkSurroundings(){
    for (var i = 0; i < boardLength; i++) {
        for (var j = 0; j < boardWidth; j++) {
            // What happens here happens on each box
            var activeCells = 0;
                if (j+1 < boardWidth) {
                    //check all the boardState squares with J+1, and if there is a word at it to the list
                    if (boardState[i][j+1] != ".") {surroundingWords.push(boardState[i][j+1]); activeCells++;}

                }
                if (i+1 < boardLength) {
                    //check all the boardState squares with I+1, and if there is a word at it to the list
                    if (boardState[i+1][j] != ".") {surroundingWords.push(boardState[i+1][j]);activeCells++;}
                }
                if (i-1 >= 0) {
                    //check all the boardState squares with i-1, and if there is a word at it to the list
                    if (boardState[i-1][j] != ".") {surroundingWords.push(boardState[i-1][j]);activeCells++;}
                }
                if (j-1 >= 0) {
                    //check all the boardState squares with j-1, and if there is a word at it to the list
                    if (boardState[i][j-1] != ".") {surroundingWords.push(boardState[i][j-1]);activeCells++;}
                }
                if (i-1 >= 0 && j+1 < boardWidth) {
                    //check all the boardState squares with j-1, and if there is a word at it to the list
                    if (boardState[i-1][j+1] != ".") {surroundingWords.push(boardState[i-1][j+1]);activeCells++;}
                }
                if (i+1 < boardLength && j+1 < boardWidth) {
                    if (boardState[i+1][j+1] != ".") {surroundingWords.push(boardState[i+1][j+1]);activeCells++;}
                }
                if (i-1 >= 0 && j-1 >= 0) {
                    if (boardState[i-1][j-1] != ".") {surroundingWords.push(boardState[i-1][j-1]);activeCells++;}
                }
                if (i+1 < boardLength && j-1 >= 0) {
                    if (boardState[i+1][j-1] != ".") {surroundingWords.push(boardState[i+1][j-1]);activeCells++;}
                }

                ///////////////////////////
                //    Game of Life rules
                ///////////////////////////
                if (activeCells < 1){
                    // Do nothing
                    //temp[i][j] = mode(surroundingWords);
                }else if (activeCells == 2 || activeCells == 3 ){
                    // Make alive
                    temp[i][j] = mode(surroundingWords);
                }else{
                    // Make dead
                    temp[i][j] = ".";
                }
                // if (activeCells <3  && boardState[i][j] != ".") { // if less than 3 and alive
                //     temp[i][j] = "."; //kill self
                // } else if (activeCells >5  && boardState[i][j] != ".") { // if more than 3 and alive
                //     temp[i][j] = "."; //kill self
                // } else if ((activeCells == 3 || activeCells == 4) && boardState[i][j] == ".")  { // if dead and has 3 neighbours
                //     // become neighbour
                //     temp[i][j] = mode(surroundingWords);
                // } else if (activeCells == 4  && boardState[i][j] != "."){
                
                // } else {
                //     temp[i][j] = boardState[i][j];
                // }
                
                surroundingWords = [];
                
        }
    }
}


// This checks each already made board, not each new board
function calcNewState() {
    
    for (var i = 0; i < boardLength; i++) {
        for (var j = 0; j < boardWidth; j++) {
            // What happens here happens on each box
            if (boardState[i][j] != ".") {
                if (j+1 < boardWidth)    (temp[i][j+1] = boardState[i][j]);
                if (i+1 < boardLength)   (temp[i+1][j] = boardState[i][j]);
                if (i-1 >= 0)             (temp[i-1][j] = boardState[i][j]);
                if (j-1 >= 0)             (temp[i][j-1] = boardState[i][j]);
            }

        }
    }


}


function init2DArray(x) {
    x = new Array(boardLength);

    for (var i = 0; i < x.length; i++) {
        x[i] = new Array(boardWidth);
        for (var j = 0; j < boardWidth; j++) {
            x[i][j] = ".";

        }
    }


    
    return x;
}


function mode(array)
{
    
    if(array.length == 0)
        return ".";
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if (el == "") { break; }
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    //console.log(maxEl);
    return maxEl;
}




//call these when applying injected word
function makeToad(i, j, word) {
    temp[i][j] = word;
    temp[i][j+1] = word;
    temp[i][j+2] = word;
    temp[i+1][j-1] = word;
    temp[i+1][j] = word;
    temp[i+1][j+1] = word;
    
}

function makeBeacon(i, j, word) {
    temp[i][j] = word;
    temp[i][j+1] = word;
    temp[i+1][j] = word;

    temp[i+2][j+3] = word;
    temp[i+3][j+2] = word;
    temp[i+3][j+3] = word;
}

function makeBlinker(i, j, word) {
    temp[i][j+1] = word;
    temp[i][j-1] = word;
    temp[i][j] = word;
}

function makeSquare(i, j, word) {
    temp[i][j] = word;
    temp[i][j+1] = word;
    temp[i+1][j] = word;
    temp[i+1][j+1] = word;
}