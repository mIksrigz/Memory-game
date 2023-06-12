const numberOfpairs = 6;
const cardValues = [];
for (let i = 1; i <= numberOfpairs; i++) {
  cardValues.push(i);
}

const checkForPaieObject = {};
cardValues.forEach(value => { checkForPaieObject[`${value}`] = 0; });

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
    if (checkForPaieObject[`${randomCardValue}`] < 2) {
      cardObject[`${i + 1}`].cardValue = randomCardValue;
      cardObject[`${i + 1}`].cardImgSrc = `url(img/img${randomCardValue}.png)`;
      checkForPaieObject[`${randomCardValue}`] += 1;
      proceed = false;
    }
  }
}

/*************
 Drawing board
 *************/

const board = document.querySelector('#board');

for (id in cardObject) {
  const card = document.createElement('div');
  card.setAttribute('id', `card${id}`);
  card.setAttribute('class', 'card-back');
  card.setAttribute('onclick', `revealCard(${id})`);
  board.append(card);
}

/*********
 functions
 *********/

const cardBackImgSrc = 'url(img/crowSmoking.png)';
let canRevealCard = true;
let revealdCardsId = [];

const revealCard = (id) => {
  if (canRevealCard) {
    document.querySelector(`#card${id}`).style.backgroundImage = `${cardObject[id]['cardImgSrc']}`;
    revealdCardsId.push(id);

    if (revealdCardsId.length == 2 && canRevealCard) {
      canRevealCard = false;
      setTimeout(`hideCard(${revealdCardsId[0]})`, '1000');
      setTimeout(`hideCard(${revealdCardsId[1]})`, '1000');
      setTimeout('canRevealCard = true', '1000');
      revealdCardsId = [];
    }
  }
}
const hideCard = nr => document.querySelector(`#card${nr}`).style.backgroundImage = cardBackImgSrc;
const checkForPair = () => { };