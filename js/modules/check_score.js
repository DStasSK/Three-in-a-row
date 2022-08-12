// подсчет очков в find_and_del_row.js и отображение очков в документе
// import {game} from '../main.js';

game.m.check_score = function(i,j){
	if (game.fild.biom[i][j] == 1) game.score += game.fild.score_1;
	if (game.fild.biom[i][j] == 2) game.score += game.fild.score_2;
	if (game.fild.biom[i][j] == 3) game.score += game.fild.score_3;
	if (game.fild.biom[i][j] == 4) game.score += game.fild.score_3;
	if (game.fild.biom[i][j] == 5) game.score += game.fild.score_2;
	if (game.fild.biom[i][j] == 6) game.score += game.fild.score_1;
	// console.log('score = ',score);

	// отображение очков в документе
	if (game.score_str < 7){
		if (game.score < 100) {
			game.score_str = 2;
			game.selectors.score_bg.innerHTML = '0000  ';
			game.selectors.score_info.innerHTML = '    ' + game.score;
		}
		if (game.score > 99 && game.score < 1000) {
			game.score_str = 3;
			game.selectors.score_bg.innerHTML = '000   ';
			game.selectors.score_info.innerHTML = '   ' + game.score;
		}
		if (game.score > 999 && game.score < 10000) {
			game.score_str = 4;
			game.selectors.score_bg.innerHTML = '00    ';
			game.selectors.score_info.innerHTML = '  ' + game.score;
		}
		if (game.score > 9999 && game.score < 100000) {
			game.score_str = 5;
			game.selectors.score_bg.innerHTML = '0     ';
			game.selectors.score_info.innerHTML = ' ' + game.score;
		}
		if (game.score > 99999 && game.score < 1000000) {
			game.score_str = 6;
			game.selectors.score_bg.innerHTML = '      ';
			game.selectors.score_info.innerHTML = '' + game.score;
		}
		if (game.score > 999999) {
			game.score_str = 7;
			game.selectors.score_bg.innerHTML = '      ';
			game.selectors.score_info.innerHTML = 888888;
		}
	}
}

// export {game};
