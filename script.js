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

  //win condition logic - three marks in a row
function threeXCheck(array) {
    return array.some(function (element, index, array) {
        return index > 1 && element === array[index - 2] 
            && element === array[index - 1] && element === "X";
    });
};
function threeOCheck(array) {
    return array.some(function (element, index, array) {
        return index > 1 && element === array[index - 2] 
            && element === array[index - 1] && element === "O";
    });
};

function playerSwitcher() {
    if (gameFlow.currentPlayer == gameFlow.playerX) {
      gameFlow.currentPlayer = gameFlow.playerO;
    } else gameFlow.currentPlayer = gameFlow.playerX;
  }

  return { currentPlayer, playerX, playerO, threeXCheck, threeOCheck, playerSwitcher };
})();

//make one move with X or O and choose position
const makeMove = (index) => {
  //current mark to move 
  if (gameFlow.currentPlayer.mark == "X") {
    gameBoard.boardArray[index - 1] = "X";
  } else gameBoard.boardArray[index - 1] = "O";

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
  };
  if (checkIfThreeO === true) {
    console.log("OOO won!");
    gameBoard.boardArray = ["", "", "", "", "", "", "", "", ""];
  };
};









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

/* GAME FLOW LOGIC -> the user dictates the play of the game
when they click, thats when we use our functions to do everything that needs to happen in that "round", 
and then we can call up switchPlayer() to switch the player */

/* BASIC IDEA: 
when your current player clicks
depending on where they click,
you get the element so you can place currentPlayer.mark in that box
you get the data Id of that location,
You create a gamePiece object with a factory that stores the ID and the mark in your gameboard array
Then you check your gameboard array to see if anybody won
then either someone won or...
you switch players
and youre back at step 1 */

/* 
- Пытаемся убрать как можно больше в фабричные функции
- Если нужен один экземпляр - то оборачиваем фабрику в IIFE чтобы не создавать доп. экземпляров
- Старайся расположить все логично, все части функционала в своих объектах
- Логика победы: проверка выйгрышных 3на3 и ничьих
- Забудь про html и css пока игра не работает в консоли!
*/

/* the rule is, if the variable is being assigned something 
that isn't going to change within that scope, 
it should be const */

/* pseudocode
player clicks
we check if the clicked element doesn't contain any text
if it doesn't, get current player 
add players mark to the square
save the id of the square that was clicked
take the id, and the current player, and put them in an object
store the object in an array
iterate over the array to get all the ids
compare the ids in the array to the groups of ids that are a matching group
if there is a matching group, check the associated players of each object
if the value of current player is the same for all three objects,
get the name and piece of that player object
display them for the winner
lock the game so that no more squares can be added marks to
IF the ids dont match, or if they do but the values of the players are not the same
switch players. 
*/

/* SIMPLER: */
/* 
player clicks
if its empty (array)
add current player mark to square
using "value"  of the element from that click, 
put the current player mark in the spot matching the "value"
check if theres a winning play by
matching 3 spots wiht the current player mark for each possible win
if its a match, someone won
otherwise switch players
 */
