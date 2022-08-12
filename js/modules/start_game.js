// import {game} from '../main.js';

game.m.start_game = function(){
	document.addEventListener('keydown', game.m.keys);   // прослушивание клавиш

	game.selectors.btn_start.addEventListener('click', game.m.game_start); // начало игры
	game.selectors.info.addEventListener('click', game.m.showInfo);        // показать меню информации
	game.selectors.filling.addEventListener('change', game.m.setBalls);    // выбор кол-ва заполненных строк на старте
	game.selectors.option.addEventListener('click', game.m.showOption);    // показать меню опций
	game.selectors.option_btn_start.addEventListener('click', ()=>{
		if(game.status.game){          // если игра запущена - задать вопрос о начале новой игры
			game.status.ask = 1;
			game.status.dabl_N_key++;
			game.m.ask();               // вопрос о прерывании текущей игры
		} else {
			game.status.start_game = false;
			game.status.game = false;
			clearInterval(game.interval.interval);
			game.m.game_start();        // начало игры сразу
		}
	});

	// стартовая генерация поля в документе и пустого массива биома
	game.m.biom_push(-1);
}

// подготовка к запуску игры (инициализация)
game.m.start_game();

// export {game};
