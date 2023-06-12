const main = document.querySelector('main');
for (let i = 2; i <= 4; i++) {
  const button = document.createElement('button');
  button.setAttribute('id', `button${i - 1}`);
  button.setAttribute('class', 'button');
  button.setAttribute('onclick', `createBoard(${(4 * i) / 2})`);
  button.textContent = `4 X ${i}`;
  main.append(button);
}

const removeButtons = () => {
  const allButtons = document.querySelectorAll('.button');
  for (let i = 1; i <= allButtons.length; i++) {
    document.querySelector(`#button${i}`).setAttribute('class', 'display-none')
  }
}

const createBoard = nr => {
  removeButtons();
  const numberOfpairs = nr;
  const cardValues = [];
  for (let i = 1; i <= numberOfpairs; i++) {
    cardValues.push(i);
  }

  const checkForPairsObject = {};
  cardValues.forEach(value => { checkForPairsObject[`${value}`] = 0; });

  const cardObject = {};
  for (let i = 1; i <= cardValues.length * 2; i++) {
    cardObject[`${i}`] = {
      'cardValue': 0,
      'cardImgSrc': ''
    };
  }

  for (let i = 0; i < cardValues.length * 2; i++) {
    let proceed = true;
    while (proceed) {
      let randomCardValue = Math.floor(Math.random() * cardValues.length + 1);
      if (checkForPairsObject[`${randomCardValue}`] < 2) {
        cardObject[`${i + 1}`].cardValue = randomCardValue;
        cardObject[`${i + 1}`].cardImgSrc = `url(img/img${randomCardValue}.png)`;
        checkForPairsObject[`${randomCardValue}`] += 1;
        proceed = false;
      }
    }
  }
  drawBoard(cardObject);
}

/*************
 Drawing board
 *************/

const board = document.querySelector('#board');
const drawBoard = cardObject => {
  console.log(cardObject);
  for (id in cardObject) {
    const card = document.createElement('div');
    card.setAttribute('id', `card${id}`);
    card.setAttribute('class', 'card-back');
    card.setAttribute('onclick', `revealCard(${id}, ${cardObject})`);
    board.append(card);
  }
}


const cardBackImgSrc = 'url(img/crowSmoking.png)';
let canRevealCard = true;
let revealdCardsId = [];
let pairs = 0;
let turns = 0;

const revealCard = (id, cardObject) => {
  if (canRevealCard) {
    document.querySelector(`#card${id}`).style.backgroundImage = `${cardObject[id]['cardImgSrc']}`;
    revealdCardsId.push(id);

    if (revealdCardsId.length == 2 && canRevealCard) {
      turns++;
      checkForPair(revealdCardsId);
      canRevealCard = false;
      setTimeout(`hideCard(${revealdCardsId[0]})`, '500');
      setTimeout(`hideCard(${revealdCardsId[1]})`, '500');
      setTimeout('canRevealCard = true', '500');
      revealdCardsId = [];
    }
  }
  if (pairs == numberOfpairs) {
    displayResult(turns);
  }
}
const hideCard = nr => document.querySelector(`#card${nr}`).style.backgroundImage = cardBackImgSrc;

const checkForPair = (arr) => {
  if (cardObject[arr[0]].cardValue == cardObject[arr[1]].cardValue) {
    const card1 = document.querySelector(`#card${arr[0]}`);
    const card2 = document.querySelector(`#card${arr[1]}`);
    console.log(card1);
    console.log(card2);
    setTimeout(removeCards(card1, card2), '500')
    pairs++;
  }
};

const removeCards = (card1, card2) => {
  card1.setAttribute('onclick', ';');
  card2.setAttribute('onclick', ';');
  card1.style.opacity = '0';
  card2.style.opacity = '0';
}

const displayResult = numberOfTurns => {
  const result = document.createElement('p');
  result.textContent = `You Win in ${numberOfTurns} turns`
  result.style.fontSize = '4rem';
  board.appendChild(result);
}