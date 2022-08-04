// import {game} from './keys.js';

// открытие и закрытие меню опций и информации

game.m.showInfo = function(){
	clearInterval(game.interval.showMenuInfo);
	game.selectors.info_box.classList.toggle('ani');
	game.selectors.info.classList.toggle('ani');
	if (!game.selectors.info_box.classList.contains('ani')){
		let date1 = Date.now();
		game.interval.showMenuInfo = setInterval( () => {
			if((Date.now() - date1) > game.interval.showMenu) {
				clearInterval(game.interval.showMenuInfo);
				if (!game.selectors.info_box.classList.contains('ani')) {
					game.selectors.info_box.classList.toggle('ani');
				}
				if (game.selectors.info.classList.contains('ani')){
					game.selectors.info.classList.toggle('ani');
				}
			}
		}, 900);
	} else clearInterval(game.interval.showMenuInfo);
}
game.m.showOption = function(){
	clearInterval(game.interval.showMenuOption);
	game.selectors.option_box.classList.toggle('ani');
	game.selectors.option.classList.toggle('ani');
	if (!game.selectors.option_box.classList.contains('ani')) {
		let date2 = Date.now();
		game.interval.showMenuOption = setInterval( ()=> {
			if((Date.now() - date2) > game.interval.showMenu) {
				clearInterval(game.interval.showMenuOption);
				if (!game.selectors.option_box.classList.contains('ani')) {
					game.selectors.option_box.classList.toggle('ani');
				}
				if (game.selectors.option.classList.contains('ani')) {
					game.selectors.option.classList.toggle('ani');
				}
			}
		}, 900);
	} else clearInterval(game.interval.showMenuOption);
}

// export {game};
