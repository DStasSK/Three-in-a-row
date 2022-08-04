// import {game} from '../main.js';
// начало игры:
// - установка констант???
// - установка событий


game.m.start_game = function(){
	document.addEventListener('keydown', game.m.keys);   // прослушивание клавиш
	game.selectors.btn_start.addEventListener('click', game.m.game_start); // начало игры
	game.selectors.info.addEventListener('click', game.m.showInfo);        // показать меню информации
	game.selectors.filling.addEventListener('change', game.m.setBalls);    // выбор кол-ва заполненных строк на старте
	game.selectors.option.addEventListener('click', game.m.showOption);    // показать меню опций
	game.selectors.option_btn_start.addEventListener('click', ()=>{
		// задать вопрос о начале новой игры если игра запущена
		if(game.status.game){
			game.status.ask = 1;
			game.status.dabl_N_key++;
			game.m.ask();
		} else {
			game.status.start_game = false;
			game.status.game = false;
			clearInterval(interval);
			game.m.game_start();
		}
	});    // начало игры

	// стартовая генерация поля в документе и пустого массива биома
	game.m.biom_push(-1);
}


game.m.start_game();

// export {game};
