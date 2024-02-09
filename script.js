//IIFE storing gameboard array
const gameBoard = (() => {
  //empty gameboard array for storing player marks
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
  let currentPlayer = playerX;

  return { currentPlayer, playerX, playerO };
})();

//play one round (same as user clicking on DOM element, but for console version)
const playRound = () => {
  if (gameFlow.currentPlayer.mark == "X") {
    gameBoard.boardArray[0] = "X";
  } else gameBoard.boardArray[0] = "O";

  function playerSwitcher() {
    if (gameFlow.currentPlayer == gameFlow.playerX) {
      gameFlow.currentPlayer = gameFlow.playerO;
    } else gameFlow.currentPlayer = gameFlow.playerX;
  }

  playerSwitcher();
  console.log(gameFlow.currentPlayer), console.log(gameBoard.boardArray);
};

/* псевдокод 08\02 (игра в консоли)
нажимаем наш "клик" - запускаем функцию playRound()

*/

/* 07.02 дело сдвинулось с мертвой точки! Нужно изучить scope и понять как получать доступ к
элементам из IIFE, чтобы доделать рабочую версию игры в консоли - завтра спросить в дискорде если что */
/* 08.02 поменял место playerSwitch в playRound и теперь работает смена игроков после 1 хода */

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
