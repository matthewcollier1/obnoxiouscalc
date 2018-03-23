const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');


keys.addEventListener('click', e => {

	if (e.target.matches('button')) {

		const key = e.target;
		const keyContent = key.textContent;
		const displayedNum = display.textContent;
		const previousKeyType = calculator.dataset.previousKeyType;
		const action = key.dataset.action;

		const calculate = (n1, operator, n2) => {

			let result = '';

			if (operator === 'add') {
				result = parseFloat(n1) + parseFloat(n2);
			} else if (operator === 'minus') {
				result = parseFloat(n1) - parseFloat(n2);
			} else if (operator === 'multiply') {
				result = parseFloat(n1) * parseFloat(n2);
			} else if (operator === 'divide') {
				result = parseFloat(n1) / parseFloat(n2);
			}

			return result;
		};

		// Bouncing display box

		let bounceBox = function () {
			let x = Math.floor(Math.random() * 100);
			let y = Math.floor(Math.random() * 100);
			display.style.top = x + 'vh';
			display.style.left = y + 'vw';
			display.style.height = x / 2 + 'vh';
			display.style.width = x / 2 + 'vw';
			keys.style.top = x + 'vh';
			keys.style.left = y + 'vw';
			keys.style.height = x / 2 + 'vh';
			keys.style.width = x / 2 + 'vw';
		};

		// Random colour 
		let randomColour = function () {
			//pick a ''red'' from 0 - 255
			let r = Math.floor(Math.random() * 256);
			//pick a ''green'' from 0 - 255
			let g = Math.floor(Math.random() * 256);
			//pick a ''blue'' from 0 - 255
			let b = Math.floor(Math.random() * 256);
			return 'rgb(' + r + ',' + ' ' + g + ',' + ' ' + b + ')';
		};

		if (!action) {
			if (displayedNum === '0' || previousKeyType === 'operator') {
				display.textContent = keyContent;
				bounceBox();
				display.style.backgroundColor = randomColour();
			} else {
				display.textContent = displayedNum + keyContent;
				bounceBox();
				display.style.backgroundColor = randomColour();
			}
		}

		if (
			action === 'add' ||
			action === 'minus' ||
			action === 'multiply' ||
			action === 'divide'
		) {
			calculator.dataset.previousKeyType = 'operator';
			calculator.dataset.firstValue = displayedNum;
			calculator.dataset.operator = action;
			display.textContent = action;
		}

		if (action === 'decimal') {
			display.textContent = displayedNum + '.';
		}

		if (action === 'clear') {
			display.textContent = 0;
		}

		if (action === 'calculate') {
			const firstValue = calculator.dataset.firstValue;
			const operator = calculator.dataset.operator;
			const secondValue = displayedNum;

			display.textContent = calculate(firstValue, operator, secondValue);
		}

	}

});

//sound effects


function playSound(e) {
	const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
	const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
	console.log(key);
	console.log(audio);


	key.classList.add('playing');
	audio.play();
}

window.addEventListener('keydown', playSound);