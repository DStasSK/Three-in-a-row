// import {game} from './keys.js';

// открытие и закрытие меню опций и информации

game.m.showInfo = function(){
	clearInterval(showMenuInfo);
	game.selectors.info_box.classList.toggle('ani');
	game.selectors.info.classList.toggle('ani');
	if (!game.selectors.info_box.classList.contains('ani')){
		let date1 = Date.now();
		showMenuInfo = setInterval( () => {
			if((Date.now() - date1) > game.interval.showMenu) {
				clearInterval(showMenuInfo);
				if (!game.selectors.info_box.classList.contains('ani')) {
					game.selectors.info_box.classList.toggle('ani');
				}
				if (game.selectors.info.classList.contains('ani')){
					game.selectors.info.classList.toggle('ani');
				}
			}
		}, 900);
	} else clearInterval(showMenuInfo);
}
game.m.showOption = function(){
	clearInterval(showMenuOption);
	game.selectors.option_box.classList.toggle('ani');
	game.selectors.option.classList.toggle('ani');
	if (!game.selectors.option_box.classList.contains('ani')) {
		let date2 = Date.now();
		showMenuOption = setInterval( ()=> {
			if((Date.now() - date2) > game.interval.showMenu) {
				clearInterval(showMenuOption);
				if (!game.selectors.option_box.classList.contains('ani')) {
					game.selectors.option_box.classList.toggle('ani');
				}
				if (game.selectors.option.classList.contains('ani')) {
					game.selectors.option.classList.toggle('ani');
				}
			}
		}, 900);
	} else clearInterval(showMenuOption);
}

// export {game};
