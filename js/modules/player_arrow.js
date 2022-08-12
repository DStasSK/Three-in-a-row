// движение мяча игроком
// import {game} from '../main.js';

game.m.to_left = function(){
	if((game.ball_x-1) >= 0
	&& game.fild.biom[game.ball_x-1][game.ball_y] == 0
	&& game.fild.biom[game.ball_x][game.ball_y-1] == 0) {
		game.fild.biom[game.ball_x-1][game.ball_y] = game.fild.biom[game.ball_x][game.ball_y];
		game.fild.biom[game.ball_x][game.ball_y] = 0;
		game.ball_x--;
		game.m.biom_push();
	}
}

game.m.to_right = function(){
	if((game.ball_x+1) < game.fild.x
	&& game.fild.biom[game.ball_x+1][game.ball_y] == 0
	&& game.fild.biom[game.ball_x][game.ball_y-1] == 0) {
		game.fild.biom[game.ball_x+1][game.ball_y] = game.fild.biom[game.ball_x][game.ball_y];
		game.fild.biom[game.ball_x][game.ball_y] = 0;
		game.ball_x++;
		game.m.biom_push();
	}
}

game.m.to_down = function(){
	while((game.ball_y-1) >= 0 && game.fild.biom[game.ball_x][game.ball_y-1] == 0) {
		game.fild.biom[game.ball_x][game.ball_y-1] = game.fild.biom[game.ball_x][game.ball_y];
		game.fild.biom[game.ball_x][game.ball_y] = 0;
		game.ball_y--;
	}
	game.m.biom_push();
}

// export {game};
