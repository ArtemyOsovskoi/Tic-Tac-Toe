const gameBoard = function (){
    //empty gameboard array for storing player choice
    const boardArray = ["", "", "", "", "", "", "", "", ""]; 
};

//factory function to create players with name and marker
const players = (name, marker) => {
    return {name, marker}
}

/* IIFE to store all related to game flow */
const gameFlow = (() => {
    //players stored in objects made from factory
    const player1 = players("John", "X");
    const player2 = players("Alex", "O");

    let currentPlayer = player1;

    function playerSwitcher() {
        if (currentPlayer == player1) {
            currentPlayer = player2;
        }
        else currentPlayer = player1;
    }
})();






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

1. Храним игровую доску как массив в объекте Gameboard
1.1. Храним игроков в объектах
1.2. Объект для управления ходом игры  
*/

/* Алгоритм:
Клик на пустую клетку -> изменение содержимого кликаемой клетки на Х -> следующий клик будет 0 
-> изменение содержимого кликаемой клетки на 0 -> и т.д. пока 3 клетки в ряд не будут все Х или все 0 
-> нажать кнопку рестарт -> очистить все клетки от содержимого и по новой. 

1) клик на пустую клетку - кто кликает, какой символ
2) изменение содержимого кликаемой клетки на X - при условии клика поменять содержимое
3) следующий клик будет О - менять следующий клик
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
now i left out a couple details, beccause there will be things you'll have to figure out 
and solve and it will become more obvious as you get all the base game working and it meets the real world.
but thats the basic idea
 */