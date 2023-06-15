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
}

