const winningCombos = [
	[ 0, 1, 2 ],
	[ 3, 4, 5 ],
	[ 6, 7, 8 ],
	[ 0, 4, 8 ],
	[ 2, 4, 6 ],
	[ 0, 3, 6 ],
	[ 1, 4, 7 ],
	[ 2, 5, 8 ]
];

// covert node list to array, this is the entire grid
const grid = () => Array.from(document.querySelectorAll('.q'));
// console.log(grid());

// covert id to int
const qNumId = (qEL) => Number.parseInt(qEL.id.replace('q', ''));

// find empty Qs
const emptyQs = () => grid().filter((_qEL) => _qEL.innerText === '');

// check if elements in an array are the same
const allSame = (arr) => arr.every((_qEL) => _qEL.innerText === arr[0].innerText && _qEL.innerText !== '');

// user's turn
const takeTurn = (index, letter) => {
	let turnSuccess = true;
	if (grid()[index].innerText !== '') {
		turnSuccess = false;
		return;
	}

	grid()[index].innerText = letter;
	return turnSuccess;
};

// opponent's choice
const opponentChoice = () => qNumId(emptyQs()[Math.floor(Math.random() * emptyQs().length)]);

// end game
const endGame = (winningSequence) => {
	winningSequence.forEach((_qEL) => _qEL.classList.add('winner'));
	disableListeners();
};

// check for victory
const checkForVictory = () => {
	let victory = false;
	winningCombos.forEach((_c) => {
		const _grid = grid();
		const sequence = [ _grid[_c[0]], _grid[_c[1]], _grid[_c[2]] ];
		if (allSame(sequence)) {
			victory = true;
			endGame(sequence);
		}
	});
	return victory;
};

// opponent's turn
const opponentTurn = () => {
	disableListeners();
	setTimeout(() => {
		if (takeTurn(opponentChoice(), 'O') && !checkForVictory()) enableListeners();
	}, 1000);
};

// click events
const clickFn = ($event) => {
	if (takeTurn(qNumId($event.target), 'X') && !checkForVictory()) opponentTurn();
};

const enableListeners = () => grid().forEach((_qEL) => _qEL.addEventListener('click', clickFn));
const disableListeners = () => grid().forEach((_qEL) => _qEL.removeEventListener('click', clickFn));

enableListeners();
