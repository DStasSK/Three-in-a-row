// выбор количества заполненных начальных строк
// import {game} from '../main.js';

game.m.setBalls = function(){
	clearInterval(game.interval.showMenuOption);
	game.fild.h = game.selectors.filling.value;

	let date2 = Date.now();
	game.interval.showMenuOption = setInterval( ()=> {
		if((Date.now() - date2) > game.interval.showMenuS) {
			clearInterval(game.interval.showMenuOption);
			if (!game.selectors.option_box.classList.contains('ani')) {
				game.selectors.option_box.classList.toggle('ani');
			}
			if (game.selectors.option.classList.contains('ani')) {
				game.selectors.option.classList.toggle('ani');
			}
		}
	}, 900);
}


// export {game};
