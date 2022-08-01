// падение мяча
// import {game} from '../main.js';
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
				interval_del = setInterval(clear_row, timeClearStep);
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
game.m.move_ball = function(){
	if (game.status.clear == 2 && game.status.game && game.status.start_game){
		if (game.status.ball) {
			if((game.fild.biom[game.ball_x][game.ball_y-1] > 0)
			||(game.fild.biom[game.ball_x][game.ball_y-1] == undefined)) {
				// остановка падения
				game.status.ball = false;
			}
			else {
				if(game.ball_y > 0){
					game.fild.biom[game.ball_x][game.ball_y-1] = game.fild.biom[game.ball_x][game.ball_y];
					game.fild.biom[game.ball_x][game.ball_y] = 0;
					game.ball_y--;
					game.m.biom_push(x,y);
				}
				if((game.fild.biom[game.ball_x][game.ball_y-1] > 0)
				||(game.fild.biom[game.ball_x][game.ball_y-1] == undefined)) {
					game.status.ball = false;
				}
			}
		}
		if (!game.status.ball) {
			game.m.addBall();
			game.m.boom();
			if(game.status.find_row){
				clearInterval(interval_del);
				game.status.clear = 0;
				interval_del = setInterval(game.m.clear_row, game.interval.timeClearStep);
			} else {
				game.status.add = true;
				game.status.ball = true;
				game.ball_y = game.fild.y;

				// генерация линии падения
				game.ball_x = Math.round(Math.random()*(game.fild.x - 1));

				// проверка на наличие свободного места
				if(game.fild.biom[game.ball_x][game.ball_y-1]==0) {
					game.ball_y--;
					// генерация цвета мяча
					game.fild.biom[game.ball_x][game.ball_y] = Math.round(Math.random()*5) + 1;
				}
				else game.m.game_over();

				// отображение щара в игре
				game.m.biom_push();
			}
		}
	}
}

// export {move_ball};
// export { game };
