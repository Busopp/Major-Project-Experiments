var boardLength = 12;
var boardWidth = 12;

var boardState = init2DArray();
var temp = init2DArray();
var global = this;

//lets just initialize with some random words

var injectedWord = [0,0, ""];

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

setTimeout(mainLoop, 2000);



//outlines the steps for each "generation"
function mainLoop() {
    //add synonyms to the temp board
    //calcNewState();
    checkSurroundings();
    //reconcile temp issues


    // Apply the injected word after all other calculations
    if (injectedWord[2] != "") {
        temp[injectedWord[1]][injectedWord[2]] = injectedWord[0];
        temp[injectedWord[1]+1][injectedWord[2]] = injectedWord[0];
        temp[injectedWord[1]][injectedWord[2]+1] = injectedWord[0];
        temp[injectedWord[1]+1][injectedWord[2]+1] = injectedWord[0];
        injectedWord = [0,0, ""];
    }
    //apply temp to board
    boardState = temp;
    temp = init2DArray();

    // console.log(boardState);
    
    // set styles for each individual word i guess


    //apply boardstate to the html page i guess
    createHTMLTable(boardState);

    //go thorugh and add unique colors for each unique word, maybe only have to do the first 10?


    //call it all agian
    setTimeout(mainLoop, 2000);

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
    document.body.innerHTML = "";
    document.body.appendChild(table);
    usedWords = ["."];
    return usedWords;
}
  



function injectWord(i, j, word){
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

                // Game of Life rules
                if (activeCells == 1){
                    // Do nothing
                    //temp[i][j] = mode(surroundingWords);
                }else if (activeCells == 2 || activeCells == 3 == 2 || activeCells == 4){
                    // Make alive
                    temp[i][j] = mode(surroundingWords);
                }else{
                    // Make dead
                    temp[i][j] = ".";
                }
                
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