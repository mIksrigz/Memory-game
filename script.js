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




let cards = [];
const shuffledCards = [];



board.addEventListener('click', e => {
  if (e.target.matches('button')) prepareCards(e.target.value);
})




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
  cards = [];
  removeInstructions();
}

const removeInstructions = () => {
  startingMenuContainer.classList.add('disply-none');
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
let revealdCardsArray = []
let pairsFound = 0;

const revealCard = card => {

  if (card.style.opacity !== 0) {

    if (revealdCards < 2) {
      revealdCardsArray.push(card);
      let url = shuffledCards[card.id];
      card.style.backgroundImage = `${url}`;
      revealdCards++;

    }
    if (revealdCards === 2) {
      setTimeout('checkIfPair(revealdCardsArray)', '1000');
    }

  } else {
    console.log('already found pair');
  }

}

const checkIfPair = cards => {
  if (shuffledCards[cards[0].id] === shuffledCards[cards[1].id]) {
    cards[0].style.opacity = '0';
    cards[1].style.opacity = '0';
    cards[0].style.cursor = 'default';
    cards[1].style.cursor = 'default';
    revealdCardsArray = [];
    revealdCards = 0;
  } else {
    hideCard(revealdCardsArray);
  }
}

const hideCard = cards => {
  cards[0].style.backgroundImage = 'url(img/crowSmoking.png)';
  cards[1].style.backgroundImage = 'url(img/crowSmoking.png)';
  revealdCardsArray = [];
  revealdCards = 0;
}
