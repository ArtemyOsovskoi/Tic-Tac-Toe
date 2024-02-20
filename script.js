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
  const playerX = playersFactory("PlayerX", "X");
  const playerO = playersFactory("PlayerO", "O");
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
                    logWindow.innerHTML = "Player X has won!";
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
                    logWindow.innerHTML = "Player O has won!";
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


/* 19.02 рабочая версия DOM, остался стайлинг и в принципе все! ура)
Доработать:
 - нельзя нажимать после победы другие кнопки
по сути после объявления победы состояние доски должно быть "заморожено"
до нажатия кнопки рестарт
 */

/* 16.02 закончил консоль версию, теперь дело за DOMом.
Нужно взять действие клик на квадрат
По клику изменить содержимое ДИВа на
текущую марку игрока
Занести эту марку в массив

!!!Изменить условия победы
!!Добавить кнопку РЕСТАРТ */


/* 16.02: и так, у меня есть массив состоящий из простых строк Х и О. Каждая строка - элемент массива,
имеет индекс. Мне нужно определить когда ТРИ индекса, идущие друг за другом (123, 234, 345 и тд) 
имеют ОДНО значение ХХХ или ООО - это и будет условием победы*/

/* 15.02 что то двинулось с array.every() но пока не до конца идеально,
т.к. проверяет только после победного условия (то есть уже есть три подряд но выдает консоль лог после
четвертого хода) и в целом не ясно рабочий ли вариант, нужно писать в дискорд и уточнить */

/* 13.02 нужно проверить указанные в wincondition индексы массива
на соответствие их величине Х или О, и если это true
завершить игру победой 

Завтра работаем с массивами и их методами, ответ где то там) 
*/

/* 09/02 сегодня получилось сделать рабочую смену игроков в консоли, теперь
можно делать ход makeMove() и каждый игрок ходит с Х и О. 

Проблема в том, что они ходят по одному разу
и задача далее понять как сделать win condition и 
вставлять в массив больше символов, чем один (всего 9 максимум) 
*/
/* по сути (индексы) let boardArray = [1, 2, 3, 4...9];
  aka:
  1 2 3
  4 5 6
  7 8 9 
т.е. нужно связать клик на квадарат DOM с индексом в массиве выше
и когда кликает на него, мы добавляем currentPlayer.mark в нужное место массива 

winConditions будут 3 индекса подряд с одинаковой playerMark
например если 1 5 9 == Х (каждый индекс равен Х) то игрокХ = победитель
*/

/* 13.02 как САМОМУ выбирать позицию массива куда вставить марку и уже выбирать победителя?
сейчас просто идут по очереди Х О Х О и тд 
нужно как то передать аргумент функции makeMove когда мы ее вызываем
и в этом аргументе будет индекс позиция массива КУДА мы хотим поставить currentPlayer.mark*/

/* псевдокод 08\02 (игра в консоли)
нажимаем наш "клик" - запускаем функцию makeMove()

*/

/* 07.02 дело сдвинулось с мертвой точки! Нужно изучить scope и понять как получать доступ к
элементам из IIFE, чтобы доделать рабочую версию игры в консоли - завтра спросить в дискорде если что */
/* 08.02 поменял место playerSwitch в makeMove и теперь работает смена игроков после 1 хода */

/* NOTES: 
- Returning from IIFE makes returned things visible in outer scope
- Accessing a module is actually accessing whatever it returns.
- Чтобы получить доступ к элементу из IIFE нужно не просто return его, но
и добавить название функции с точкой ПЕРЕД ним 
(например не просто playerSwitcher() а gameFlow.playerSwitcher())
*/
