let score_bg = new Array(game.max_score_length).fill('0').join('');
let score_str = new Array(game.max_score_length).fill(' ').join('');
game.selectors.score_bg.innerHTML = score_bg;
game.selectors.score_info.innerHTML = score_str;


// начало игры
game.m.game_start = function() {
	clearInterval(game.interval.interval);

	game.status.game = true;
	game.status.start_game = true;
	game.status.ball = false;
	game.status.ask = -1;
	game.status.add_now = false;
	game.status.dabl_N_key = 0;
	game.status.dabl_G_key = 0;
	game.score_str = 0;
	game.score = 0;

	game.selectors.btn_start.style.display = 'block';
	game.selectors.ask.style.display = 'none';

	game.selectors.message.innerHTML = '';
	game.selectors.score_bg.innerHTML = score_bg;
	game.selectors.score_info.innerHTML = score_str;
	game.m.biom_push(-1);

	if (!game.selectors.game_menu.classList.contains('ani')) {
		game.selectors.game_menu.classList.toggle('ani');
	}
	game.m.biom_push(1);
}


// pause
game.m.pause = function() {
	game.selectors.btn_start.removeEventListener('click', game.m.game_start);
	game.selectors.btn_start.addEventListener('click', game.m.pause);

	if (game.status.game) {
		if (game.status.start_game) {
			game.selectors.btn_start.style.display = 'block';
			game.selectors.ask.style.display = 'none';
			game.selectors.btn_start.innerHTML = 'пауза';

			game.status.start_game = false;
			if (game.selectors.game_menu.classList.contains('ani')) {
				game.selectors.game_menu.classList.toggle('ani');
			}
			clearInterval(game.interval.interval);
		}
		else {
			game.status.start_game = true;
			if (!game.selectors.game_menu.classList.contains('ani')) {
				game.selectors.game_menu.classList.toggle('ani');
			}
			clearInterval(game.interval.interval);
			game.interval.interval = setInterval(game.m.move_ball, game.interval.timeByStep);
		}
	}
}


// game over
game.m.game_over = function() {
	clearInterval(game.interval.interval);
	game.status.start_game = false;
	game.status.game = false;

	if (game.selectors.game_menu.classList.contains('ani')) {
		game.selectors.game_menu.classList.toggle('ani');
	}

	game.selectors.btn_start.removeEventListener('click', game.m.pause);
	game.selectors.btn_start.addEventListener('click', game.m.game_start);

	game.selectors.btn_start.style.display = 'block';
	game.selectors.ask.style.display = 'none';

	game.selectors.message.innerHTML = `<span>Игра окончена</span><br>ваш результат:<div class="result">${game.score}</div>`;
	game.selectors.btn_start.innerHTML = 'Играть снова';
}


// вопрос при прерывании текущей игры
game.m.ask = function() {
	if (game.status.start_game) game.m.pause();

	game.selectors.btn_start.style.display = 'none';
	game.selectors.ask.style.display = 'block';

	game.selectors.ask.addEventListener('click', function(e){
		if (e.target.getAttribute('value') == 'true') {
			game.selectors.btn_start.style.display = 'block';
			game.selectors.ask.style.display = 'none';
			if (game.status.ask === 0) game.m.game_over();
			if (game.status.ask === 1) game.m.game_start();
		} else {
			game.status.start_game = false;  // для корректной работы паузы
			game.m.pause();
			game.status.dabl_N_key = 0;
			game.status.dabl_G_key = 0;
		}
	});

	if (game.status.dabl_N_key > 1) game.m.game_start();
	if (game.status.dabl_G_key > 1) game.m.game_over();
}
