// построение для отображения элементов в HTML документе согласно биому

// zz = -1  для заполения HTML страницы после загрузки
//          и генерация пустого массива биома

// zz = 1   для заполнения биома при начале игры
//          стартовая генерация поля

// zz = 2   для обновления биома после удаления 3-х в ряд
//          добавляет класс для анимации удаления шаров

// import {game} from '../main.js';

game.m.biom_push = function(zz){
	let fild = '';
	let biom_fild = '';
	let del = ''
	for (let i = 0; i < game.fild.x; i++){
		if(zz==-1) {
			fild += '<div class="col">';
			game.fild.biom[i] = [];
			game.fild.biom_boom[i] = [];
		}
		else {
			biom_fild += '<div class="col">';
		}

		for (let j=0; j < game.fild.y; j++){
			if((zz==1) && j< game.fild.h) {game.fild.biom[i][j] = 1 + Math.round(Math.random()*5)}
			if((zz==1) && j>=game.fild.h) {game.fild.biom[i][j] = 0}

			if(zz==2){
				if(game.fild.biom_boom[i][j]==1) {del = 'del'}
				else {del = ''}
			}
			if(zz==-1) {
				fild +=`<i></i>`;
				game.fild.biom[i][j] = 0;
				game.fild.biom_boom[i][j] = 0;
			} else {
				if(!game.fild.biom[i][j]) game.fild.biom[i][j]=0;
				biom_fild +=`<i class="el${game.fild.biom[i][j]} ${del}"></i>`;
			}
		}

		if(zz==-1) {fild += '</div>';}
		else {biom_fild += '</div>';}
	}

	if(zz==-1) fild_box.innerHTML = fild;
	else biom_box.innerHTML = biom_fild;
}

// стартовая генерация поля в документе и пустого массива биома
game.m.biom_push(-1);

// export {game};
