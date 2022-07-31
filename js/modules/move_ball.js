// падение мяча
// import {addBall} from './modules/addBall.js';
document.write('<script src="./js/modules/addBall.js"></script>');


function move_ball(){
	if (clear_status == 2 && game_status && start_game_status){
		if (ball_status) {
			if((biom[ball_x][ball_y-1]>0)||(biom[ball_x][ball_y-1]==undefined)){
				// остановка падения
				ball_status = false;
			}
			else {
				if(ball_y>0){
					biom[ball_x][ball_y-1] = biom[ball_x][ball_y];
					biom[ball_x][ball_y] = 0;
					ball_y--;
					biom_push(x,y);
				}
				if((biom[ball_x][ball_y-1]>0)||(biom[ball_x][ball_y-1]==undefined)){
					ball_status = false;
				}
			}
		}
		if (!ball_status) {
			addBall();
			boom();
			if(find_row){
				clearInterval(interval_del);
				clear_status = 0;
				interval_del = setInterval(clear_row, timeClearSpep);
			} else {
				add_status = true;
				ball_status = true;
				ball_y = y;

				// генерация линии падения
				ball_x = Math.round(Math.random()*(x - 1));

				if(biom[ball_x][ball_y-1]==0) {
					// генерация цвета мяча
					biom[ball_x][ball_y] = Math.round(Math.random()*5) + 1;
				}
				else game_over();

				// отображение щара в игре
				biom_push(x,y);
			}
		}
	}
}

// export {move_ball};
