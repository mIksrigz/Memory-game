const board = document.querySelector('#board');

/************
 drawing menu
 ************/

const createMenu = () => {
  const instruction = document.createElement('p');
  instruction.textContent = 'Choose board size';
  board.appendChild(instruction);
  for (let i = 0; i < 3; i++) {
    const button = document.createElement('button');
    button.setAttribute('id', `button${i}`);
    button.setAttribute('class', 'button');
    button.setAttribute('onclick', `prepareCards(${(i + 2) * 4})`);
    button.textContent = `4 X ${i + 2}`;
    board.appendChild(button);
  }
}; createMenu();


/***************
 preparing cards
 ***************/

const prepareCards = numberOfCards => {
  const avaivableCards = {};
  for (let i = 0; i < numberOfCards / 2; i++) {
    avaivableCards[`card${i + 1}`] = { 'value': i + 1, amountLeft: 2 };
  }
  removeMenu();
  shuffleCards(avaivableCards, numberOfCards);
}

/*************
removing menu
*************/

const removeMenu = () => {
  const menu = board.children;
  for (let i = 0; i < menu.length; i++) {
    menu[i].setAttribute('class', 'display-none');
  }
  board.classList.add('board');
}

/***************
 shuffling cards
 ***************/

const shuffleCards = (avaivableCards, numberOfCards) => {
  const shuffledCards = [];
  for (let i = 0; i < numberOfCards; i++) {
    let procede = true;
    while (procede) {
      let randomNumber = Math.floor(Math.random() * (numberOfCards / 2)) + 1;
      if (avaivableCards[`card${randomNumber}`].amountLeft > 0) {
        let cardValue = avaivableCards[`card${randomNumber}`].value;
        shuffledCards.push(cardValue);
        avaivableCards[`card${randomNumber}`].amountLeft--;
        procede = false
      }
    }
  }
  drawBoard(shuffledCards);
}

/*************
 drawing board
 ************/

const drawBoard = shuffledCards => {
  for (let i = 0; i < shuffledCards.length; i++) {
    const card = document.createElement('div');
    card.setAttribute('id', `card${i + 1}`);
    card.setAttribute('class', `card-back`);
    card.setAttribute('onclick', `revealCard(${i + 1}, ${shuffledCards[i]})`);
    board.appendChild(card);
  }
}

/**************
 revealing card
 **************/

const revealCard = (id, nr) => {
  const card = document.querySelector(`#card${id}`);
  card.style.backgroundImage = `url(img/img${nr}.png)`;
  setTimeout(`hideCard(${id})`, '1000');
}

const hideCard = id => {
  const card = document.querySelector(`#card${id}`);
  card.style.backgroundImage = 'url(img/crowSmoking.png)';
}
