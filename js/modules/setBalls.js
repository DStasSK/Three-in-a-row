// выбор количества заполненных начальных строк
const filling = document.querySelector('.filling');
filling.addEventListener('change', setBalls);

function setBalls(){
	clearInterval(showMenuOption);
	h = filling.value;

	let date2 = Date.now();
	showMenuOption = setInterval( ()=> {
		if((Date.now() - date2) > 7000) {
			clearInterval(showMenuOption);
			if (!option_box.classList.contains('ani')) {
				option_box.classList.toggle('ani');
			}
			if (option.classList.contains('ani')) {
				option.classList.toggle('ani');
			}
		}
	}, 900);
}

// export {setBalls};
