const board = document.querySelector('#board');

const startingMenuContainer = document.createElement('div');
startingMenuContainer.classList.add('starting-menu-container');
board.append(startingMenuContainer);

const instruction = document.createElement('h2');
instruction.classList.add('instruction');
instruction.innerText = 'Choose board size';
startingMenuContainer.append(instruction);

const buttonsContainer = document.createElement('div');
buttonsContainer.classList.add('buttons-container');
startingMenuContainer.append(buttonsContainer);

for (let i = 0; i < 3; i++) {

  const boardSizeButton = document.createElement('button');
  boardSizeButton.classList.add('board-size-button');
  boardSizeButton.innerText = `${i + 3} X 4`;
  boardSizeButton.value = (i + 3) * 4;
  buttonsContainer.append(boardSizeButton);

}

board.addEventListener('click', e => {
  if (e.target.matches('button')) prepareCards(e.target.value);
})




let cards = [];
let shuffledCards = [];

const prepareCards = number => {
  for (let i = 0; i < (number / 2); i++) {
    cards.push({ cardUrl: `url(img/img${i + 1}.png)`, cardsLeft: 2 });
  }
  shuffleCards();
}

const shuffleCards = () => {

  for (let i = 0; i < cards.length * 2; i++) {

    let procede = true

    while (procede) {

      let randomIndex = Math.floor(Math.random() * cards.length);
      let { cardUrl, cardsLeft } = cards[randomIndex];

      if (cardsLeft > 0) {
        shuffledCards.push(cardUrl);
        cards[randomIndex].cardsLeft--;
        procede = false;
      }
    }
  }
  removeInstructions();
}

const removeInstructions = () => {
  //startingMenuContainer.classList.add('disply-none');
  startingMenuContainer.remove();
  drawBoard();
}

const drawBoard = () => {
  board.classList.add('collumns-4');
  shuffledCards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.id = index;
    cardElement.classList.add('card');
    board.append(cardElement);
  })

  board.addEventListener('click', e => {
    if (e.target.matches('div')) revealCard(e.target);
  });
}

let revealdCards = 0;
let revealdCardsArray = [];
let turns = 0;
console.log(board.childNodes);
const revealCard = card => {


  isCardHidden = card.classList.contains('hidden-card');

  if (!isCardHidden) {

    if (revealdCards < 2) {
      if (card !== revealdCardsArray[0]) {
        revealdCardsArray.push(card);
        let url = shuffledCards[card.id];
        card.style.backgroundImage = `${url}`;
        revealdCards++;
      }
    }
    if (revealdCards === 2) {
      turns++;
      setTimeout('checkIfPair(revealdCardsArray)', '1000');
    }

  }
}

let pairsFound = 0;
const checkIfPair = cards => {
  if (shuffledCards[cards[0].id] === shuffledCards[cards[1].id]) {
    cards[0].classList.add('hidden-card');
    cards[1].classList.add('hidden-card');
    revealdCardsArray = [];
    revealdCards = 0;
    pairsFound++;
    checkIfWin(pairsFound);
  } else {
    hideCard(revealdCardsArray);
  }
}

const checkIfWin = pairs => {
  console.log(`${pairs} ${cards.length}`);
  if (pairs === cards.length) {
    displayWin();
    console.log('you won');
    cards = [];
  }
}

const hideCard = cards => {
  cards[0].style.backgroundImage = 'url(img/crowSmoking.png)';
  cards[1].style.backgroundImage = 'url(img/crowSmoking.png)';
  revealdCardsArray = [];
  revealdCards = 0;
}

const displayWin = () => {


  pairs = 0
  shuffledCards = [];
  board.remove();
  const main = document.querySelector('main');
  const win = document.createElement('div');
  win.classList = 'win';
  const winText = document.createElement('p');
  winText.classList = 'win-text';
  winText.innerText = `You Won in ${turns} turns.`;
  win.append(winText);
  const playAgain = document.createElement('button');
  playAgain.classList = 'board-size-button';
  playAgain.innerText = 'Play Again';
  win.append(playAgain);
  main.append(win);

  playAgain.addEventListener('click', () => {
    document.location.reload();
    })
}
