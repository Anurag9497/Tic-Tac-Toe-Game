var gameStatus = true;
var currentPlayer = "X";
const winningConditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
var gameRecords = ["", "", "", "", "", "", "", "", ""];


var winningMessege = () => `Player ${currentPlayer} has Won!`;

var drawMessege = () => `Match Draw!`;

var currentPlayerTurn = () => `It's ${currentPlayer} turn`;

document.getElementById("player").innerHTML = currentPlayerTurn();

document.querySelectorAll("div[data-cell]").forEach((clickedCell) => {
    clickedCell.addEventListener("click", handleClickedCell);
});

document.getElementById("resetGame").addEventListener("click", handleResetGame);


function handleCurrentPlayerTurn()
{
    currentPlayer = (currentPlayer==="X") ? "O" : "X";
    document.getElementById("player").innerHTML = currentPlayerTurn();
}


function handleClickedCell(eventObj)
{
    let clickedCellIndex = Number(eventObj.target.getAttribute("data-cell"));
    if(gameRecords[clickedCellIndex]==="" && gameStatus)
    {
        gameRecords[clickedCellIndex] = currentPlayer;
        eventObj.target.innerHTML = currentPlayer;
        resultVerification();
    }
}


function resultVerification()
{
    const len = winningConditions.length;
    for(let i=0;i<len;i++)
    {
        let first = gameRecords[winningConditions[i][0]];
        let second = gameRecords[winningConditions[i][1]];
        let third = gameRecords[winningConditions[i][2]];
        if(first===second && second===third && first!=="" && second!=="" && third!=="")
        {
            document.getElementById("result").innerHTML = winningMessege();
            document.getElementById("result").classList.add("text-success");
            gameStatus = false;
            break;
        }
    }
    if(gameStatus && !gameRecords.includes(""))
    {
        document.getElementById("result").innerHTML = drawMessege();
        document.getElementById("result").classList.add("text-danger");
        gameStatus = false;
    }
    if(gameStatus)
        handleCurrentPlayerTurn();
}


function handleResetGame()
{
    gameStatus = true;
    currentPlayer = "X";
    gameRecords = ["", "", "", "", "", "", "", "", ""];
    document.getElementById("player").innerHTML = currentPlayerTurn();
    document.getElementById("result").innerHTML = "";
    document.querySelectorAll("div[data-cell]").forEach(function(item){
        item.innerHTML = "";
    });
    let list = document.getElementById("result").classList;
    if(list.includes("text-success"))
        list.remove("text-success");
    if(list.includes("text-danger"))
        list.remove("text-danger");
}