// падение мяча
// import {game} from './addBall.js';
document.write('<script src="./js/modules/addBall.js"></script>');

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
					game.m.biom_push();
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
				clearInterval(game.interval.interval_del);
				game.status.clear = 0;
				game.interval.interval_del = setInterval(game.m.clear_row, game.interval.timeClearStep);
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
				else {
					game.status.start_game = false;
					game.status.game = false;
					game.m.game_over();
				}

				// отображение щара в игре
				game.m.biom_push();
			}
		}
	}
}


// export {game};
