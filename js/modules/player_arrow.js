// движение мяча игроком
// import {game} from '../main.js';

function to_left(){
	if((ball_x-1) >= 0 && biom[ball_x-1][ball_y]==0 && biom[ball_x][ball_y-1]==0){
		biom[ball_x-1][ball_y] = biom[ball_x][ball_y];
		biom[ball_x][ball_y] = 0;
		ball_x--;
		biom_push(x,y);
	}
}
game.m.to_left = function(){
	if((game.ball_x-1) >= 0
	&& game.fild.biom[game.ball_x-1][game.ball_y] == 0
	&& game.fild.biom[game.ball_x][game.ball_y-1] == 0) {
		game.fild.biom[game.ball_x-1][game.ball_y] = game.fild.biom[game.ball_x][game.ball_y];
		game.fild.biom[game.ball_x][game.ball_y] = 0;
		game.ball_x--;
		game.m.biom_push(game.fild.x, game.fild.y);
	}
}

function to_right(){
	if((ball_x+1) < x && biom[ball_x+1][ball_y]==0 && biom[ball_x][ball_y-1]==0){
		biom[ball_x+1][ball_y] = biom[ball_x][ball_y];
		biom[ball_x][ball_y] = 0;
		ball_x++;
		biom_push(x,y);
	}
}
game.m.to_right = function(){
	if((game.fild.game.ball_x+1) < game.fild.x
	&& game.fild.biom[game.ball_x+1][game.ball_y] == 0
	&& game.fild.biom[game.ball_x][game.ball_y-1] == 0) {
		game.fild.biom[game.ball_x+1][game.ball_y] = game.fild.biom[game.ball_x][game.ball_y];
		game.fild.biom[game.ball_x][game.ball_y] = 0;
		game.ball_x++;
		game.m.biom_push(game.fild.x, game.fild.y);
	}
}

function to_down(){
	while((ball_y-1) >= 0 && biom[ball_x][ball_y-1]==0){
		biom[ball_x][ball_y-1] = biom[ball_x][ball_y];
		biom[ball_x][ball_y] = 0;
		ball_y--;
	}
	biom_push(x,y);
}
game.m.to_down = function(){
	while((game.ball_y-1) >= 0 && game.fild.biom[game.ball_x][game.ball_y-1] == 0) {
		game.fild.biom[game.ball_x][game.ball_y-1] = game.fild.biom[game.ball_x][game.ball_y];
		game.fild.biom[game.ball_x][game.ball_y] = 0;
		game.ball_y--;
	}
	game.m.biom_push(game.fild.x, game.fild.y);
}

// export {to_left, to_right, to_down};
