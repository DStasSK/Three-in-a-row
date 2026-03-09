// открытие и закрытие меню опций и информации

game.m.showInfo = function() {
	clearInterval(game.interval.showMenuInfo);
	game.selectors.info_box.classList.toggle('ani');
	game.selectors.info.classList.toggle('ani');
	if (game.selectors.info_box.classList.contains('ani')){
		let t = Date.now();
		game.interval.showMenuInfo = setInterval( () => {
			if((Date.now() - t) > game.interval.showMenu) {
				clearInterval(game.interval.showMenuInfo);
				game.selectors.info_box.classList.remove('ani');
				game.selectors.info.classList.add('ani');
			}
		}, 900);
	} else clearInterval(game.interval.showMenuInfo);
}

game.m.showOption = function() {
	clearInterval(game.interval.showMenuOption);
	game.selectors.option_box.classList.toggle('ani');
	game.selectors.option.classList.toggle('ani');
	if (game.selectors.option_box.classList.contains('ani')) {
		let t = Date.now();
		game.interval.showMenuOption = setInterval( ()=> {
			if((Date.now() - t) > game.interval.showMenu) {
				clearInterval(game.interval.showMenuOption);
				game.selectors.option_box.classList.remove('ani');
				game.selectors.option.classList.add('ani');
			}
		}, 900);
	} else clearInterval(game.interval.showMenuOption);
}
