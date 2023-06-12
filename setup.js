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
    button.setAttribute('onclick', `removeMenu(${(i + 2) * 4})`);
    button.textContent = `4 X ${i + 2}`;
    board.appendChild(button);
  }
}; createMenu();

/*************
 removing menu
 *************/

const removeMenu = numberOfCards => {
  const menu = board.children;
  for (let i = 0; i < menu.length; i++) {
    menu[i].setAttribute('class', 'display-none');
  }
  board.setAttribute('class', 'board')
  preparingCards(numberOfCards);
}

/***************
 preparing cards
 ***************/

const preparingCards = numberOfCards => {
  const availableCards = {};
  for (let i = 1; i <= numberOfCards; i++) {
    if (i <= numberOfCards / 2) {
      availableCards[`card${i}`] = { cardValue: i, cardImgUrl: `url(img/img${i}.png)` };
    } else {
      let value = i - numberOfCards / 2;
      availableCards[`card${i}`] = { cardValue: value, cardImgUrl: `url(img/img${value}.png)` };
    }
  }
  shufflingCards(availableCards, numberOfCards);
}

/***************
 shuffling cards
 ***************/

const shufflingCards = (cardsObj, numberOfCards) => {

  for (let i = 1; i < numberOfCards; i++) {
    let { cardValue, cardImgUrl } = cardsObj[`card${i}`]
    console.log(cardValue);
    console.log(cardImgUrl);
  }
  // for (let obj in cardsObj) {
  //   const card = document.createElement('div');
  //   card.setAttribute('id', `${obj}`)
  //   card.style.backgroundImage = cardsObj[obj].cardImgUrl;
  //   board.appendChild(card);
  // }
}