// import {game} from './keys.js';

// начало игры
game.m.game_start = function(){
	game.status.game = false;
	game.status.start_game = true;
	game.status.ask = -1;
	game.score_str = 0;
	message.innerHTML = '';
	score_bg.innerHTML = '000000';
	score_info.innerHTML = '';

	if (!game_menu.classList.contains('ani')) game_menu.classList.toggle('ani');
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
			if (game_menu.classList.contains('ani')) {
				game_menu.classList.toggle('ani');
			}
			clearInterval(interval);
		}
		else {
			game.status.start_game = true;
			if (!game_menu.classList.contains('ani')) {
				game_menu.classList.toggle('ani');
			}
			clearInterval(interval);
			interval = setInterval(game.m.move_ball, game.interval.timeByStep);
		}
	}
}

// game over
game.m.game_over = function(){
	clearInterval(interval);
	game.status.start_game = false;
	game.status.game = false;

	if (game_menu.classList.contains('ani')) {
		game_menu.classList.toggle('ani');
	}

	btn_start.removeEventListener('click', game.m.pause);
	btn_start.addEventListener('click', game.m.game_start);

	message.innerHTML = `<span>Игра окончена</span><br>ваш результат:<div class="result">${game.score}</div>`;
	btn_start.innerHTML = 'Играть снова';
}

// вопрос при прерывании текущей игры
game.m.ask = function(){
	const ask = document.querySelector('.ask');
	const btn_ask = document.querySelectorAll('.btn_ask');

	btn_start.style.display = 'none';
	ask.style.display = 'block';
	game.m.pause();

	ask.addEventListener('click', function(e){
		// e.stopImmediatePropagation();  // отмена всплытия клика

		if (e.target.getAttribute('value') == 'true') {
			btn_start.style.display = 'block';
			ask.style.display = 'none';
			if (game.status.ask === 0) game.m.game_over();
			if (game.status.ask === 1) game.m.game_start();
		} else {
			game.status.start_game = false;
			game.m.pause();
		}
	}, true);
}


// export {game};
