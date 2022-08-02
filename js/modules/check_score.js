// import {game} from '../main.js';

// подсчет очков в функции clear_row

game.m.check_score = function(i,j){
	if (game.fild.biom[i][j] == 1) game.score += 90;
	if (game.fild.biom[i][j] == 2) game.score += 75;
	if (game.fild.biom[i][j] == 3) game.score += 60;
	if (game.fild.biom[i][j] == 4) game.score += 60;
	if (game.fild.biom[i][j] == 5) game.score += 75;
	if (game.fild.biom[i][j] == 6) game.score += 90;
	// console.log('score = ',score);

	if (game.score_str < 7){
		if (game.score < 100) {
			game.score_str = 2;
			score_bg.innerHTML = '0000  ';
			score_info.innerHTML = '    ' + game.score;
		}
		if (game.score > 99 && game.score < 1000) {
			game.score_str = 3;
			score_bg.innerHTML = '000   ';
			score_info.innerHTML = '   ' + game.score;
		}
		if (game.score > 999 && game.score < 10000) {
			game.score_str = 4;
			score_bg.innerHTML = '00    ';
			score_info.innerHTML = '  ' + game.score;
		}
		if (game.score > 9999 && game.score < 100000) {
			game.score_str = 5;
			score_bg.innerHTML = '0     ';
			score_info.innerHTML = ' ' + game.score;
		}
		if (game.score > 99999 && game.score < 1000000) {
			game.score_str = 6;
			score_bg.innerHTML = '      ';
			score_info.innerHTML = '' + game.score;
		}
		if (game.score > 999999) {
			game.score_str = 7;
			score_bg.innerHTML = '      ';
			score_info.innerHTML = 888888;
		}
	}
}

// export {game};
