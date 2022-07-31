// логика клавиш

// import {game_start, pause, game_over} from './modules/game_live.js';
// import {to_left, to_right, to_down} from './modules/player_arrow.js';
// import {showInfo, showOption} from './showMenu.js';
document.write('<script src="./js/modules/game_live.js"></script>');
document.write('<script src="./js/modules/player_arrow.js"></script>');
document.write('<script src="./js/modules/showMenu.js"></script>');


document.addEventListener('keydown', keys);
function keys(event){
	// начало игры
	if(event.key=='n'||event.key=='N'||event.key=='т'||event.key=='Т'||event.keyCode=='78') {
		start_game_status = false;
		game_status = false;
		clearInterval(interval);
		game_start();
	}

	// пауза
	if(event.key=='p'||event.key=='P'||event.key=='з'||event.key=='З'||event.key==' '||event.keyCode=='32'||event.keyCode=='80'){
		pause();
	}

	// конец игры
	if(event.key=='g'||event.key=='G'||event.key=='п'||event.key=='П'||event.keyCode=='71'){
		game_over();
	}

	// открыть меню опций
	if(event.key=='o'||event.key=='O'||event.key=='щ'||event.key=='Щ'||event.keyCode=='79') {
		showOption();
	}

	// открыть меню информации
	if(event.key=='i'||event.key=='I'||event.key=='ш'||event.key=='Ш'||event.keyCode=='16'){
		showInfo();
	}

	// сдвиг шара влево
	if(event.key=='a'||event.key=='A'||event.key=='ф'||event.key=='Ф'||event.key=='ArrowLeft'||event.keyCode=='65'||event.keyCode=='37'){
		to_left();
	}

	// сдвиг шара вниз
	if(event.key=='s'||event.key=='S'||event.key=='ы'||event.key=='Ы'||event.key=='ArrowDown'||event.keyCode=='83'||event.keyCode=='40'){
		to_down();
	}

	// сдвиг шара вправо
	if(event.key=='d'||event.key=='D'||event.key=='в'||event.key=='В'||event.key=='ArrowRight'||event.keyCode=='68'||event.keyCode=='39'){
		to_right();
	}
}


// export {keys};
