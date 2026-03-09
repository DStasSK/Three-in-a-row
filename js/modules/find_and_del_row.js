// поиск 3-х в ряд; удаление;


// поиск совпадений 3 в ряд и более
game.m.boom = function() {
	game.status.find_row = false;

	for (let i=0; i<game.fild.x; i++) {
		for (let j=0; j<game.fild.y; j++) {
			if (game.fild.biom[i][j]!=0) {
				if (i>0 && i<game.fild.x-1 && j>0 && j<game.fild.y-1) {
					if ((game.fild.biom[i][j]==game.fild.biom[i+1][j]) && (game.fild.biom[i][j]==game.fild.biom[i-1][j])){
						game.fild.biom_boom[i][j] = 1;
						game.fild.biom_boom[i+1][j] = 1;
						game.fild.biom_boom[i-1][j] = 1;
					}
					if (game.fild.biom[i][j]==game.fild.biom[i][j+1] && game.fild.biom[i][j]==game.fild.biom[i][j-1]){
						game.fild.biom_boom[i][j] = 1;
						game.fild.biom_boom[i][j+1] = 1;
						game.fild.biom_boom[i][j-1] = 1;
					}
					if (game.fild.biom[i][j]==game.fild.biom[i+1][j+1] && game.fild.biom[i][j]==game.fild.biom[i-1][j-1]){
						game.fild.biom_boom[i][j] = 1;
						game.fild.biom_boom[i+1][j+1] = 1;
						game.fild.biom_boom[i-1][j-1] = 1;
					}
					if (game.fild.biom[i][j]==game.fild.biom[i-1][j+1] && game.fild.biom[i][j]==game.fild.biom[i+1][j-1]){
						game.fild.biom_boom[i][j] = 1;
						game.fild.biom_boom[i-1][j+1] = 1;
						game.fild.biom_boom[i+1][j-1] = 1;
					}
				}

				if ((i==0||i==game.fild.x-1) && j>0 && j<game.fild.y-1) {
					if (game.fild.biom[i][j]==game.fild.biom[i][j+1] && game.fild.biom[i][j]==game.fild.biom[i][j-1]){
						game.fild.biom_boom[i][j] = 1;
						game.fild.biom_boom[i][j+1] = 1;
						game.fild.biom_boom[i][j-1] = 1;
					}
				}

				if ((j==0||j==game.fild.y-1) && i>0 && i<game.fild.x-1) {
					if (game.fild.biom[i][j]==game.fild.biom[i+1][j] && game.fild.biom[i][j]==game.fild.biom[i-1][j]){
						game.fild.biom_boom[i][j] = 1;
						game.fild.biom_boom[i+1][j] = 1;
						game.fild.biom_boom[i-1][j] = 1;
					}
				}

			}
			if (game.fild.biom_boom[i][j]==1) {game.status.find_row = true;}
		}
	}
}


// удаление элементов согласно biom_boom и подсчет очков в check_score.js
game.m.clear_row = function(check_r = 2) {
	clearInterval(game.interval.interval);	// остановка падения шаров
	check_r==2 ? game.m.biom_push(check_r) :'';	// 2 - для анимация удаления

	// падение элементов в биоме
	for (let i=0; i<game.fild.x; i++) {
		for (let j=game.fild.y-1; j>=0; j--) {
			if (game.fild.biom_boom[i][j]==1) {
				check_r==2 ? game.m.check_score(i,j) :'';  // подсчет очков
				game.fild.biom[i].splice(j,1); // удаление элемента из биома
				game.fild.biom[i].push(0);     // добавление элемента в конец массива биома
				game.fild.biom_boom[i][j]=0;   // обнуление в массиве совпадений
			}
			if (game.fild.biom[i][j-1]==0 && game.fild.biom_boom[i][j-1]==0) {
				game.fild.biom[i].splice(j-1,1);
				game.fild.biom[i].push(0);
				game.status.ball = false;
			}
		}
	}

	check_r==1 ? game.m.biom_push(check_r) :'';
	game.m.boom();	// проверка на "три в ряд"

	if (game.status.find_row==false && check_r==2) {
		game.status.clear = 2;
		clearInterval(game.interval.interval_del);
		game.interval.interval = setInterval(game.m.move_ball, game.interval.timeByStep);
	}
}
