const board = document.querySelector('#board');

const StartingMenuContainer = document.createElement('div');
StartingMenuContainer.classList.add('starting-menu-container');
board.append(StartingMenuContainer);

const instruction = document.createElement('h2');
instruction.id = 'instruction';
instruction.classList.add('instruction');
instruction.innerText = 'Choose Board Size';
StartingMenuContainer.append(instruction);

const buttonsContainer = document.createElement('div');
buttonsContainer.classList.add('buttons-container')
StartingMenuContainer.append(buttonsContainer);

for (let i = 3; i < 6; i++) {
  const boardSizeButton = document.createElement('button');
  boardSizeButton.id = `bord-size-button${i - 2}`;
  boardSizeButton.classList.add('board-size-button');
  boardSizeButton.value = i;
  boardSizeButton.innerText = `${i} X 4`;
  buttonsContainer.append(boardSizeButton);
}

board.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const rows = e.target.value;
    StartingMenuContainer.remove();
    const cardQuantity = rows * 4;
    drawBoard(cardQuantity);
  }
})

const drawBoard = cardQuantity => {
  for (let i = 0; i < cardQuantity; i++) {
    const card = document.createElement('div');
    card.id = `card${i + 1}`;
    card.classList.add('card')
    board.append(card);
  }
  board.classList.add(`collumns-4`)
  prepareCards(cardQuantity);
}


const availableCards = [];
const prepareCards = cardQuantity => {

  for (let i = 0; i < cardQuantity / 2; i++) {
    availableCards.push({ cardId: i, cardsLeft: 2 });
  }
  shuffleCards();
}

const shuflledcards = [];
const shuffleCards = () => {
  const pairsQuantity = availableCards.length;
  const cardsQuantity = pairsQuantity * 2;

  for (let i = 0; i < cardsQuantity; i++) {

    let procede = true;

    while (procede) {
      let randomIndex = Math.floor(Math.random() * pairsQuantity);
      let leftToDraw = availableCards[randomIndex].cardsLeft;

      if (leftToDraw > 0) {
        availableCards[randomIndex].cardsLeft--;
        const id = availableCards[randomIndex].cardId;
        const url = `url(img/img${id + 1}.png)`;

        shuflledcards.push({ cardUrl: url });
        procede = false;
      }
    }

  }
}

let revealdCards = 0;
let revealdCardsArray = [];
let revealdCardsUrl = [];

board.addEventListener('click', e => {

  if (e.target.matches('div')) {

    if (revealdCards < 2) {
      revealCard(e.target);

    }

  }
});

const revealCard = card => {
  let id = card.id;
  let index = id.match(/\d+/)[0] - 1;
  card.style.backgroundImage = shuflledcards[index].cardUrl;
  revealdCardsUrl.push(shuflledcards[index].cardUrl);
  revealdCardsArray.push(card);
  revealdCards++;

  if (revealdCards === 2) {
    if (revealdCardsUrl[0] === revealdCardsUrl[1]) {
      revealdCardsArray[0].style.opacity = '0';
      revealdCardsArray[1].style.opacity = '0';
      revealdCardsArray = [];
      revealdCardsUrl = [];
      revealdCards = 0;
    } else {
      console.log(revealdCardsArray)
      setTimeout('hideCards(revealdCardsArray)', '1000');
    }

  }
}

const hideCards = revealdCardsArr => {
  revealdCardsArr[0].style.backgroundImage = 'url(img/crowSmoking.png)';
  revealdCardsArr[1].style.backgroundImage = 'url(img/crowSmoking.png)';
  revealdCardsArray = [];
  revealdCardsUrl = [];
  revealdCards = 0;
}

