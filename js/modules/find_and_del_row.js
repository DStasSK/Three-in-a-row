// import {check_score} from './check_score.js';
document.write('<script src="./js/modules/check_score.js"></script>');


// поиск совпадений 3 в ряд и более для удаления
function boom(){
	find_row = false;

	for (let i = 0; i<x; i++){
		for (let j = 0; j<y; j++){
			if(biom[i][j]!=0){
				if((i>0)&&(i<x-1)&&(j>0)&&(j<y-1)){
					if ((biom[i][j]==biom[i+1][j]) && (biom[i][j]==biom[i-1][j])){
						biom_boom[i][j] = 1;
						biom_boom[i+1][j] = 1;
						biom_boom[i-1][j] = 1;
					}
					if ((biom[i][j]==biom[i][j+1]) && (biom[i][j]==biom[i][j-1])){
						biom_boom[i][j] = 1;
						biom_boom[i][j+1] = 1;
						biom_boom[i][j-1] = 1;
					}
					if ((biom[i][j]==biom[i+1][j+1])&&(biom[i][j]==biom[i-1][j-1])){
						biom_boom[i][j] = 1;
						biom_boom[i+1][j+1] = 1;
						biom_boom[i-1][j-1] = 1;
					}
					if ((biom[i][j]==biom[i-1][j+1])&&(biom[i][j]==biom[i+1][j-1])){
						biom_boom[i][j] = 1;
						biom_boom[i-1][j+1] = 1;
						biom_boom[i+1][j-1] = 1;
					}
				}

				if(((i==0)||(i==x-1))&&(j>0)&&(j<y-1)){
					if ((biom[i][j]==biom[i][j+1]) && (biom[i][j]==biom[i][j-1])){
						biom_boom[i][j] = 1;
						biom_boom[i][j+1] = 1;
						biom_boom[i][j-1] = 1;
					}
				}

				if(((j==0)||(j==y-1))&&(i>0)&&(i<x-1)){
					if ((biom[i][j]==biom[i+1][j]) && (biom[i][j]==biom[i-1][j])){
						biom_boom[i][j] = 1;
						biom_boom[i+1][j] = 1;
						biom_boom[i-1][j] = 1;
					}
				}

			}
			if(biom_boom[i][j]==1) find_row = true;
		}
	}
}


// удаление элементов согласно biom_boom
// и подсчет очков
function clear_row(){
	// остановка падения шаров
	clearInterval(interval);

	// поиск 3 в ряд
	// boom();

	// анимация удаления - через добавление класса del
	biom_push(x,y,2);

	// падение элементов в биоме
	for(let i=0; i<x; i++){
		for(let j=y-1; j>=0; j--){
			if(biom_boom[i][j]==1){
				check_score(i,j)       // подсчет очков
				biom[i].splice(j,1);   // удаление элемента из биома
				biom[i].push(0);       // добавление элемента в конец массива биома
				biom_boom[i][j]=0;     // обнуление в массиве совпадений
			}
			if(biom[i][j-1]==0 && biom_boom[i][j-1]==0){
				biom[i].splice(j-1,1);
				biom[i].push(0);
				ball_status = false;
			}
		}
	}

	// проверка на "три в ряд"
	boom();

	// если элементов для удаления нет - выход из цикла
	if(find_row == false){
		clear_status=2;
		if (clear_status == 2) {
			clearInterval(interval_del);
			interval = setInterval(move_ball, timeByStep);
		}
	}
}


// export { boom, clear_row };
