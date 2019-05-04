// To do list
// Add a score board
// Implement a modal so that user can modify player name
// Add a victory message

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

// Coverts node list to array, this is the entire grid
const grid = () => Array.from(document.querySelectorAll('.q'));
// console.log(grid());

// Passes in a div element, separate its ID and  covert it to int
const qNumId = (qEL) => Number.parseInt(qEL.id.replace('q', ''));

// Returns all elements within the grid that are empty
const emptyQs = () => grid().filter((_qEL) => _qEL.innerText === '');

// Checks an array of div elements if they all hold 'X' or 'O'
const allSame = (arr) => arr.every((_qEL) => _qEL.innerText === arr[0].innerText && _qEL.innerText !== '');

// User's turn
// Sets the square that was click on to designated letter, void if the square is occupied
const takeTurn = (index, letter) => {
	let turnSuccess = true;
	if (grid()[index].innerText !== '') {
		turnSuccess = false;
		return;
	}

	grid()[index].innerText = letter;
	return turnSuccess;
};

// Picks a random empty div elements from emptyQs and extract the number using qNumId
const opponentChoice = () => qNumId(emptyQs()[Math.floor(Math.random() * emptyQs().length)]);

// Styles the winning sequence
const endGame = (winningSequence) => {
	winningSequence.forEach((_qEL) => _qEL.classList.add('winner'));
	disableListeners();
};

// Checks for victory
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

// Opponent's turn
const opponentTurn = () => {
	disableListeners();
	setTimeout(() => {
		if (takeTurn(opponentChoice(), 'O') && !checkForVictory()) enableListeners();
	}, 1000);
};

// Clicks events for the user
const clickFn = ($event) => {
	if (takeTurn(qNumId($event.target), 'X') && !checkForVictory()) opponentTurn();
};

// Resets the entire grid to empty and removes css effect from the elements
const resetGame = () => {
	grid().forEach((_qEL) => {
		_qEL.innerText = '';
		_qEL.classList.remove('winner');
	});
	enableListeners();
};

const modalSwitch = () => {
	const menuModal = document.querySelector('#panel');
	menuModal.style.display = menuModal.style.display ? '' : 'block';
};

document.querySelector('#new-game').addEventListener('click', resetGame);
document.querySelector('#menu').addEventListener('click', modalSwitch);
const enableListeners = () => grid().forEach((_qEL) => _qEL.addEventListener('click', clickFn));
const disableListeners = () => grid().forEach((_qEL) => _qEL.removeEventListener('click', clickFn));

enableListeners();
