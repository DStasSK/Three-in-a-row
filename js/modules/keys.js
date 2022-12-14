// логика клавиш

// import {game} from './start_game.js';
// import {game} from './game_live.js';
// import {game} from './player_arrow.js';
// import {game} from './showMenu.js';
document.write('<script src="./js/modules/game_live.js"></script>');
document.write('<script src="./js/modules/player_arrow.js"></script>');
document.write('<script src="./js/modules/showMenu.js"></script>');


game.m.keys = function(event){
	// console.log('event.key = ', event.key, ' event.keyCode = ', event.keyCode);

	// начало новой игры
	if(event.key=='n'||event.key=='N'||event.key=='т'||event.key=='Т'||event.keyCode=='78') {
		if(game.status.game){// задать вопрос о начале новой игры если игра запущена
			game.status.ask = 1;
			game.status.dabl_N_key++;
			game.m.ask();
		} else {
			game.status.start_game = false;
			game.status.game = false;
			clearInterval(game.interval.interval);
			game.m.game_start();
		}
	}

	// пауза
	if(event.key=='p'||event.key=='P'||event.key=='з'||event.key=='З'||event.key==' '||event.keyCode=='32'||event.keyCode=='80'){
		game.status.dabl_N_key = 0;
		game.status.dabl_G_key = 0;
		game.m.pause();
	}

	// конец игры
	if(event.key=='g'||event.key=='G'||event.key=='п'||event.key=='П'||event.keyCode=='71'){
		if(game.status.game) {  // задать вопрос о начале новой игры если игра запущена
			game.status.ask = 0;
			game.status.dabl_G_key++;
			game.m.ask();
		}
	}

	// открыть меню опций
	if(event.key=='o'||event.key=='O'||event.key=='щ'||event.key=='Щ'||event.keyCode=='79') {
		game.m.showOption();
	}

	// открыть меню информации
	if(event.key=='i'||event.key=='I'||event.key=='ш'||event.key=='Ш'||event.keyCode=='73'){
		game.m.showInfo();
	}

	// сдвиг шара влево
	if(event.key=='a'||event.key=='A'||event.key=='ф'||event.key=='Ф'||event.key=='ArrowLeft'||event.keyCode=='65'||event.keyCode=='37'){
		game.m.to_left();
	}

	// сдвиг шара вниз
	if(event.key=='s'||event.key=='S'||event.key=='ы'||event.key=='Ы'||event.key=='ArrowDown'||event.keyCode=='83'||event.keyCode=='40'){
		game.m.to_down();
	}

	// сдвиг шара вправо
	if(event.key=='d'||event.key=='D'||event.key=='в'||event.key=='В'||event.key=='ArrowRight'||event.keyCode=='68'||event.keyCode=='39'){
		game.m.to_right();
	}
}


// export {game};
