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

  //win condition logic - three marks in a row (X or O)
  function threeXCheck(array) {
    return array.some(function (element, index, array) {
      return (
        index > 1 &&
        element === array[index - 2] &&
        element === array[index - 1] &&
        element === "X"
      );
    });
  }
  function threeOCheck(array) {
    return array.some(function (element, index, array) {
      return (
        index > 1 &&
        element === array[index - 2] &&
        element === array[index - 1] &&
        element === "O"
      );
    });
  }

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
  console.log("Make move by typing makeMove(1-9). First player moves X.");
  console.log("First to put three X or O in a row wins!");

  return {
    currentPlayer,
    playerX,
    playerO,
    threeXCheck,
    threeOCheck,
    playerSwitcher,
  };
})();

//click on the square and get X or O based on current player
const playRound = () => {
    let square = document.querySelectorAll('.gameboardCell');
    Array.from(square).forEach((boardSquare) => {
        boardSquare.addEventListener('click', () => {
            boardSquare.innerHTML = gameFlow.currentPlayer.mark;

    
        });
    });

};
playRound();

/* const makeMove = (index) => {
  //current mark to move
  if (
    gameFlow.currentPlayer.mark == "X" &&
    gameBoard.boardArray[index - 1] != "O"
  ) {
    gameBoard.boardArray[index - 1] = "X";
  } else if (
    gameFlow.currentPlayer.mark == "O" &&
    gameBoard.boardArray[index - 1] != "X"
  ) {
    gameBoard.boardArray[index - 1] = "O";
  }

  //if position already marked with X or O (prevent rewriting finished moves)
  if (
    gameBoard.boardArray[index - 1] == "X" &&
    gameFlow.currentPlayer.mark == "O"
  ) {
    console.log("%cThis position is already taken!", "color: red");
    gameFlow.playerSwitcher();
  } else if (
    gameBoard.boardArray[index - 1] == "O" &&
    gameFlow.currentPlayer.mark == "X"
  ) {
    console.log("%cThis position is already taken!", "color: red");
    gameFlow.playerSwitcher();
  }

  //check if there's three same marks in a row
  const checkIfThreeX = gameFlow.threeXCheck(gameBoard.boardArray);
  const checkIfThreeO = gameFlow.threeOCheck(gameBoard.boardArray);

  //log game flow in console and switch players
  console.log(
    gameFlow.currentPlayer.name,
    "moves",
    gameFlow.currentPlayer.mark,
    "to position",
    index
  );
  console.log(gameBoard.boardArray);
  gameFlow.playerSwitcher();
  console.log(
    gameFlow.currentPlayer.name,
    "moves",
    gameFlow.currentPlayer.mark,
    "next"
  );

  //win condition, game ends, clear array to play again
  if (checkIfThreeX === true) {
    console.log("XXX won!");
    gameBoard.boardArray = ["", "", "", "", "", "", "", "", ""];
    if (gameFlow.currentPlayer == gameFlow.playerO) {
      gameFlow.playerSwitcher();
    }
  }
  if (checkIfThreeO === true) {
    console.log("OOO won!");
    gameBoard.boardArray = ["", "", "", "", "", "", "", "", ""];
    if (gameFlow.currentPlayer == gameFlow.playerO) {
      gameFlow.playerSwitcher();
    }
  }
}; */


/* 16.02 закончил консоль версию, теперь дело за DOMом.
Нужно взять действие клик на квадрат
По клику изменить содержимое ДИВа на
текущую марку игрока
Занести эту марку в массив

!!!Изменить условия победы
!!Добавить кнопку РЕСТАРТ */


/* 0 1 2
     3 4 5
     6 7 8 */
/*   const winConditionOne = gameBoard.boardArray[1, 2, 3];
  const winConditionTwo = gameBoard.boardArray[4, 5, 6];
  const winConditionThree = gameBoard.boardArray[7, 8, 9];
  const winConditionFour = gameBoard.boardArray[1, 5, 9];
  const winConditionFive = gameBoard.boardArray[3, 5, 7];
  const winConditionSix = gameBoard.boardArray[1, 4, 7];
  const winConditionSeven = gameBoard.boardArray[2, 5, 8];
  const winConditionEight = gameBoard.boardArray[3, 6, 9]; */
//for 3x3 gameboard:
/*   let winConditionsList = [
    gameBoard.boardArray[0, 1, 2],
    gameBoard.boardArray[3, 4, 5],
    gameBoard.boardArray[6, 7, 8],
    gameBoard.boardArray[0, 4, 8],
    gameBoard.boardArray[2, 4, 6],
    gameBoard.boardArray[0, 3, 6],
    gameBoard.boardArray[1, 4, 7],
    gameBoard.boardArray[2, 5, 8],
  ];  */
//for 1-9 line in console
/* indexes: 0 1 2 3 4 5 6 7 8 */

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

/* Алгоритм:
Клик на пустую клетку -> изменение содержимого кликаемой клетки на Х -> следующий клик будет 0 
-> изменение содержимого кликаемой клетки на 0 -> и т.д. пока 3 клетки в ряд не будут все Х или все 0 
-> нажать кнопку рестарт -> очистить все клетки от содержимого и по новой. 

1) клик на пустую клетку - кто кликает, какой символ
2) изменение содержимого кликаемой клетки на X - при условии клика поменять содержимое
3) следующий клик будет О - менять следующий клик
*/
