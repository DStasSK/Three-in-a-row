// подсчет очков в find_and_del_row.js и отображение очков в документе
game.m.check_score = function(i,j) {
	let ball_score = game.fild.biom[i][j];
	(ball_score==1||ball_score==6) ? game.score+=game.fild.score_1 :'';
	(ball_score==2||ball_score==5) ? game.score+=game.fild.score_2 :'';
	(ball_score==3||ball_score==4) ? game.score+=game.fild.score_3 :'';

	let score_length = 0;
	if (game.score) {
		score_length = ('' + game.score).length;
		game.selectors.score_bg.innerHTML = score_bg.slice(0,-score_length) + score_str.slice(-score_length);
		game.selectors.score_info.innerHTML = score_str.slice(0,-score_length) + game.score;
	} else {
		game.selectors.score_bg.innerHTML = score_bg;    // score_bg - game_live.js
		game.selectors.score_info.innerHTML = score_str; // score_bg - game_live.js
	}

	if (score_length > game.max_score_length) {
		game.selectors.score_info.innerHTML = '';
		game.selectors.score_bg.innerHTML =  new Array(game.max_score_length).fill('8').join('');
		game.m.game_over();
	}
}
