// import {game} from './keys.js';

// начало игры
game.m.game_start = function(){
	game.status.game = false;
	game.status.start_game = true;
	game.score_str = 0;

	if (!game_menu.classList.contains('ani')) game_menu.classList.toggle('ani');
	if (!message.classList.contains('ani')) message.classList.toggle('ani');
	if(!game.status.game) {
		// страртовая генерация и заполнение биома
		game.m.biom_push(1);

		game.status.game = true;
		game.score = 0;

		// поиск 3-х в ряд на стартовой генерации и их удаление
		game.m.boom();
		if(game.status.find_row){
			clearInterval(interval_del);
			game.status.clear = 0;
			interval_del = setInterval(game.m.clear_row, game.interval.timeClearStep);
		}
	}

	clearInterval(interval);
	interval = setInterval(game.m.move_ball, game.interval.timeByStep);
}

// pause
game.m.pause = function(){
	btn_start.removeEventListener('click', game.m.game_start);
	btn_start.addEventListener('click', game.m.pause);
	if(game.status.game){
		if(game.status.start_game) {
			game.status.start_game = false;
			btn_start.innerHTML = 'пауза';
			game_menu.classList.toggle('ani');
			if (!message.classList.contains('ani')) {
				message.classList.toggle('ani');
			}
			clearInterval(interval);
		}
		else {
			game.status.start_game = true;
			game_menu.classList.toggle('ani');
			clearInterval(interval);
			interval = setInterval(game.m.move_ball, game.interval.timeByStep);
		}
	}
}

// game over
game.m.game_over = function(){
	btn_start.removeEventListener('click', game.m.pause);
	btn_start.addEventListener('click', game.m.game_start);
	clearInterval(interval);
	game.status.start_game = false;
	game.status.game = false;
	if (message.classList.contains('ani')) {
		message.classList.toggle('ani');
	}
	result.innerHTML = `${game.score}`;
	btn_start.innerHTML = 'Играть снова';

	if (game_menu.classList.contains('ani')) {
		game_menu.classList.toggle('ani');
	}
}

// btn_start.addEventListener('click', game.m.game_start);        // начало игры
// option_btn_start.addEventListener('click', game.m.game_start); // начало игры


// export {game};
