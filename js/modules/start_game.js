// import {game} from '../main.js';
// начало игры:
// - установка констант???
// - установка событий


game.start_game = function(){
	// const game_menu = document.querySelector('.game_menu');
	// const btn_start = document.querySelector('.btn_start');
	// const option_btn_start = document.querySelector('.option_btn_start');
	// const fild_box = document.querySelector('.bg_fild');
	// const biom_box = document.querySelector('.biom');
	// const option = document.querySelector('.option');
	// const option_box = document.querySelector('.option_box');
	// const info = document.querySelector('.info');
	// const info_box = document.querySelector('.info_box');
	// const score_bg = document.querySelector('.score_bg');
	// const score_info = document.querySelector('.score_info');
	// const message = document.querySelector('.message');
	// const result = document.querySelector('.result');
	// const filling = document.querySelector('.filling');

	document.addEventListener('keydown', game.m.keys);   // прослушивание клавиш
	btn_start.addEventListener('click', game.m.game_start);        // начало игры
	option_btn_start.addEventListener('click', game.m.game_start); // начало игры
	option.addEventListener('click', game.m.showOption); // показать меню опций
	info.addEventListener('click', game.m.showInfo);     // показать меню информации
	filling.addEventListener('change', game.m.setBalls); // выбор кол-ва заполненных строк на старте

	// стартовая генерация поля в документе и пустого массива биома
	game.m.biom_push(-1);
}


game.start_game();

// export {game};
