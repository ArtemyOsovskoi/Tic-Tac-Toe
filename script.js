//IIFE storing gameboard array
const gameBoard = (() => {
  //empty array for storing player marks
  let boardArray = ["", "", "", "", "", "", "", "", ""];
  return { boardArray };
})();

//IIFE for storing all things related to the game flow
const gameFlow = (() => {
  //private factory to create players with name and mark
  const playersFactory = (name, mark) => {
    return { name, mark };
  };

  //players stored in objects made from factory
  const playerX = playersFactory(prompt("Player X choose your name", "Player X"), "X");
  const playerO = playersFactory(prompt("Player O choose your name", "Player O"), "O");
  //start from player with mark X
  let currentPlayer = playerX;

  //auto switch players after each move
  function playerSwitcher() {
    if (gameFlow.currentPlayer == gameFlow.playerX) {
      gameFlow.currentPlayer = gameFlow.playerO;
    } else gameFlow.currentPlayer = gameFlow.playerX;
  };

  //console message before game starts
  console.log(
    "Current player:",
    currentPlayer.name,
    "with mark",
    currentPlayer.mark
  );

  return {
    currentPlayer,
    playerX,
    playerO,
    playerSwitcher,
  };
})();

//click on the square and get X or O based on current player
const playRound = (() => {
    let square = document.querySelectorAll('.gameboardCell');
    let restart = document.getElementById('restartButton');
    let logWindow = document.getElementById('log');
    //click square -> place mark -> add it to array
    Array.from(square).forEach((boardSquare) => {
        boardSquare.addEventListener('click', () => {
            //prevent rewriting
            if (boardSquare.innerHTML == "") {
                boardSquare.innerHTML = gameFlow.currentPlayer.mark;
                gameBoard.boardArray[boardSquare.id] = gameFlow.currentPlayer.mark;
                gameFlow.playerSwitcher();
                logWindow.innerHTML = `${gameFlow.currentPlayer.name} moves next with mark ${gameFlow.currentPlayer.mark}`;
                console.log(gameBoard.boardArray);                
            };
            //win condition, game ends, clear array to play again
            if (    gameBoard.boardArray[0] == "X" && gameBoard.boardArray[1] == "X" && gameBoard.boardArray[2] == "X"||
                    gameBoard.boardArray[3] == "X" && gameBoard.boardArray[4] == "X" && gameBoard.boardArray[5] == "X"||
                    gameBoard.boardArray[6] == "X" && gameBoard.boardArray[7] == "X" && gameBoard.boardArray[8] == "X"||
                    gameBoard.boardArray[0] == "X" && gameBoard.boardArray[4] == "X" && gameBoard.boardArray[8] == "X"||
                    gameBoard.boardArray[2] == "X" && gameBoard.boardArray[4] == "X" && gameBoard.boardArray[6] == "X"||
                    gameBoard.boardArray[0] == "X" && gameBoard.boardArray[3] == "X" && gameBoard.boardArray[6] == "X"||
                    gameBoard.boardArray[1] == "X" && gameBoard.boardArray[4] == "X" && gameBoard.boardArray[7] == "X"||
                    gameBoard.boardArray[2] == "X" && gameBoard.boardArray[5] == "X" && gameBoard.boardArray[8] == "X") {
                    logWindow.innerHTML = `${gameFlow.playerX.name} has won!`;
                    gameBoard.boardArray = ["", "", "", "", "", "", "", "", ""];
                    Array.from(square).forEach((boardSquare) => {
                        boardSquare.style.pointerEvents = 'none';
                    }); 
                    if (gameFlow.currentPlayer == gameFlow.playerO) {
                        gameFlow.playerSwitcher();
                    } 
            };
            if (    gameBoard.boardArray[0] == "O" && gameBoard.boardArray[1] == "O" && gameBoard.boardArray[2] == "O"||
                    gameBoard.boardArray[3] == "O" && gameBoard.boardArray[4] == "O" && gameBoard.boardArray[5] == "O"||
                    gameBoard.boardArray[6] == "O" && gameBoard.boardArray[7] == "O" && gameBoard.boardArray[8] == "O"||
                    gameBoard.boardArray[0] == "O" && gameBoard.boardArray[4] == "O" && gameBoard.boardArray[8] == "O"||
                    gameBoard.boardArray[2] == "O" && gameBoard.boardArray[4] == "O" && gameBoard.boardArray[6] == "O"||
                    gameBoard.boardArray[0] == "O" && gameBoard.boardArray[3] == "O" && gameBoard.boardArray[6] == "O"||
                    gameBoard.boardArray[1] == "O" && gameBoard.boardArray[4] == "O" && gameBoard.boardArray[7] == "O"||
                    gameBoard.boardArray[2] == "O" && gameBoard.boardArray[5] == "O" && gameBoard.boardArray[8] == "O") {
                    logWindow.innerHTML = `${gameFlow.playerO.name} has won!`;
                    gameBoard.boardArray = ["", "", "", "", "", "", "", "", ""];
                    Array.from(square).forEach((boardSquare) => {
                        boardSquare.style.pointerEvents = 'none';
                    });
                    if (gameFlow.currentPlayer == gameFlow.playerO) {
                        gameFlow.playerSwitcher();
                    } 
            };
        });
    });

    restart.addEventListener('click', ()=> {
        gameBoard.boardArray = ["", "", "", "", "", "", "", "", ""];
        Array.from(square).forEach((boardSquare) => {
            boardSquare.innerHTML = "";
            boardSquare.style.pointerEvents = 'auto';
        });
        //start with player x
        if (gameFlow.currentPlayer == gameFlow.playerO) {
            gameFlow.playerSwitcher();
        } 
        logWindow.innerHTML = `${gameFlow.currentPlayer.name} moves next with mark ${gameFlow.currentPlayer.mark}`;
    });
}) ();