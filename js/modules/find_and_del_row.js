// поиск 3-х в ряд, удаление;
// import {game} from './check_score.js';
document.write('<script src="./js/modules/check_score.js"></script>');


// поиск совпадений 3 в ряд и более для удаления
game.m.boom = function(){
	game.status.find_row = false;

	for (let i = 0; i < game.fild.x; i++){
		for (let j = 0; j < game.fild.y; j++){
			if(game.fild.biom[i][j]!=0){
				if((i > 0)&&(i < game.fild.x-1)&&(j > 0)&&(j < game.fild.y-1)){
					if ((game.fild.biom[i][j]==game.fild.biom[i+1][j]) && (game.fild.biom[i][j]==game.fild.biom[i-1][j])){
						game.fild.biom_boom[i][j] = 1;
						game.fild.biom_boom[i+1][j] = 1;
						game.fild.biom_boom[i-1][j] = 1;
					}
					if ((game.fild.biom[i][j]==game.fild.biom[i][j+1]) && (game.fild.biom[i][j]==game.fild.biom[i][j-1])){
						game.fild.biom_boom[i][j] = 1;
						game.fild.biom_boom[i][j+1] = 1;
						game.fild.biom_boom[i][j-1] = 1;
					}
					if ((game.fild.biom[i][j]==game.fild.biom[i+1][j+1])&&(game.fild.biom[i][j]==game.fild.biom[i-1][j-1])){
						game.fild.biom_boom[i][j] = 1;
						game.fild.biom_boom[i+1][j+1] = 1;
						game.fild.biom_boom[i-1][j-1] = 1;
					}
					if ((game.fild.biom[i][j]==game.fild.biom[i-1][j+1])&&(game.fild.biom[i][j]==game.fild.biom[i+1][j-1])){
						game.fild.biom_boom[i][j] = 1;
						game.fild.biom_boom[i-1][j+1] = 1;
						game.fild.biom_boom[i+1][j-1] = 1;
					}
				}

				if(((i == 0)||(i == game.fild.x-1))&&(j > 0)&&(j < game.fild.y-1)){
					if ((game.fild.biom[i][j]==game.fild.biom[i][j+1]) && (game.fild.biom[i][j]==game.fild.biom[i][j-1])){
						game.fild.biom_boom[i][j] = 1;
						game.fild.biom_boom[i][j+1] = 1;
						game.fild.biom_boom[i][j-1] = 1;
					}
				}

				if(((j == 0)||(j == game.fild.y-1))&&(i > 0)&&(i < game.fild.x-1)){
					if ((game.fild.biom[i][j]==game.fild.biom[i+1][j]) && (game.fild.biom[i][j]==game.fild.biom[i-1][j])){
						game.fild.biom_boom[i][j] = 1;
						game.fild.biom_boom[i+1][j] = 1;
						game.fild.biom_boom[i-1][j] = 1;
					}
				}

			}
			if(game.fild.biom_boom[i][j]==1) game.status.find_row = true;
		}
	}
}


// удаление элементов согласно biom_boom
// и подсчет очков в check_score.js
game.m.clear_row = function(){
	// остановка падения шаров
	clearInterval(game.interval.interval);

	// анимация удаления - через добавление класса del
	game.m.biom_push(2);

	// падение элементов в биоме
	for(let i=0; i < game.fild.x; i++){
		for(let j = game.fild.y-1; j>=0; j--){
			if(game.fild.biom_boom[i][j]==1){
				game.m.check_score(i,j)        // подсчет очков
				game.fild.biom[i].splice(j,1); // удаление элемента из биома
				game.fild.biom[i].push(0);     // добавление элемента в конец массива биома
				game.fild.biom_boom[i][j]=0;   // обнуление в массиве совпадений
			}
			if(game.fild.biom[i][j-1]==0 && game.fild.biom_boom[i][j-1]==0){
				game.fild.biom[i].splice(j-1,1);
				game.fild.biom[i].push(0);
				game.status.ball = false;
			}
		}
	}

	// проверка на "три в ряд"
	game.m.boom();

	// если элементов для удаления нет - выход из цикла
	// двойной проход нужен для отображения анимации
	// иначе шары просто удалятся без анимации
	if(game.status.find_row == false){
		game.status.clear = 2;
		if (game.status.clear == 2) {
			clearInterval(game.interval.interval_del);
			game.interval.interval = setInterval(game.m.move_ball, game.interval.timeByStep);
		}
	}
}


// export { game };
