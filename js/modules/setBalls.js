// import {game} from '../main.js';
// выбор количества заполненных начальных строк

game.m.setBalls = function(){
	clearInterval(showMenuOption);
	game.fild.h = filling.value;

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


// export {game};
