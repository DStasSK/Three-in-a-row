btn_start.addEventListener('click', game_start);        // начало игры
option_btn_start.addEventListener('click', game_start); // начало игры

// начало игры
function game_start(){
	game_status = false;
	start_game_status = true;
	score_str = 0;

	if (!game_menu.classList.contains('ani')) game_menu.classList.toggle('ani');
	if (!message.classList.contains('ani')) message.classList.toggle('ani');
	if(!game_status) {
		// страртовое заполнение биома
		biom_push(x,y,1);
		game_status = true;
		score = 0;

		// поиск 3-х в ряд на стартовой генерации и их удаление
		boom();
		if(find_row){
			clearInterval(interval_del);
			clear_status = 0;
			interval_del = setInterval(clear_row, timeClearStep);
		}
	}

	clearInterval(interval);
	interval = setInterval(move_ball, timeByStep);
}


// pause
function pause(){
	btn_start.removeEventListener('click', game_start);
	btn_start.addEventListener('click', pause);
	if(game_status){
		if(start_game_status) {
			start_game_status = false;
			btn_start.innerHTML = 'пауза';
			game_menu.classList.toggle('ani');
			if (!message.classList.contains('ani')) {
				message.classList.toggle('ani');
			}
			clearInterval(interval);
		}
		else {
			start_game_status = true;
			game_menu.classList.toggle('ani');
			clearInterval(interval);
			interval = setInterval(move_ball, timeByStep);
		}
	}
}


// game over
function game_over(){
	btn_start.removeEventListener('click', pause);
	btn_start.addEventListener('click', game_start);
	clearInterval(interval);
	start_game_status = false;
	game_status = false;
	if (message.classList.contains('ani')) {
		message.classList.toggle('ani');
	}
	result.innerHTML = `${score}`;
	btn_start.innerHTML = 'Играть снова';

	if (game_menu.classList.contains('ani')) {
		game_menu.classList.toggle('ani');
	}
	// console.table(biom);
	// console.table(biom_boom);
}


// export {game_start, pause, game_over};
