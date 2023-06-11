const pairsArray = [1, 2, 3, 4, 5, 6, 7, 8];
const numberOfCard = pairsArray.length * 2;
let boardContent = [];

for (let i = 0; i < numberOfCard; i++) {
  boardContent.push(`<div id="card${i}" class="card" onClick="backGround(${i})"></div>`);
}
const board = document.getElementById('board');
board.innerHTML = boardContent.join('');

let boardChildren = board.children;
const backGround = nr => {
  boardChildren[nr];
}