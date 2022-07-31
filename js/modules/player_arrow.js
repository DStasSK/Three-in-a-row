// движение мяча игроком
function to_left(){
	if((ball_x-1) >= 0 && biom[ball_x-1][ball_y]==0 && biom[ball_x][ball_y-1]==0){
		biom[ball_x-1][ball_y] = biom[ball_x][ball_y];
		biom[ball_x][ball_y] = 0;
		ball_x--;
		biom_push(x,y);
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
function to_down(){
	while((ball_y-1) >= 0 && biom[ball_x][ball_y-1]==0){
		biom[ball_x][ball_y-1] = biom[ball_x][ball_y];
		biom[ball_x][ball_y] = 0;
		ball_y--;
	}
	biom_push(x,y);
}

// export {to_left, to_right, to_down};
