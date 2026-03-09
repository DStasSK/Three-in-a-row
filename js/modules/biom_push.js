// построение биома для отображения элементов в HTML документе по биому

// check = -1		для заполения HTML страницы после загрузки
//							и генерация пустого массива биома

// check = 1		для заполнения биома при начале игры
//							стартовая генерация поля

// check = 2		для обновления биома + после удаления 3-х в ряд
//							добавляет класс del для анимации удаления шаров

game.m.biom_push = function(check=0) {
	if (check == -1) {
		let fild = '';
		let div = '<div class="col">' + Array.from({length:game.fild.y}, ()=>'<i></i>').join('') + '</div>';
		for (let i=0; i<game.fild.x; i++) {
			game.fild.biom[i] = Array.from( {length:game.fild.y}, () => 0 );
			game.fild.biom_boom[i] = [...game.fild.biom[i]];
			fild += div;
		}
		game.selectors.fild_box.innerHTML = fild;
		game.selectors.biom_box.innerHTML = fild;
		div = fild = null;
		return
	}


	if (check==1) {
		let count = 0;
		for (let i=0; i<game.fild.x; i++) {
			for (let j=0; j<game.fild.y; j++) {
				if (check==1 && game.fild.biom[i][j]==0) { // генерация цвета
					j<game.fild.h ? game.fild.biom[i][j] = 1 + Math.round(Math.random()*5) :'';
					count++;
				}
			}
		}

		game.m.boom();	// проверка на "три в ряд"
		if (!count==0 && game.status.find_row) {game.m.clear_row(1);}
		else {game.interval.interval_del = setInterval(game.m.clear_row, game.interval.timeClearStep);}
	}


	// отрисовка поля через классы
	let el;
	for (let i=0; i<game.fild.x; i++) {
		for (let j=0; j<game.fild.y; j++) {
			el = game.selectors.biom_box.children[i].children[j];
			game.fild.biom[i][j]>0 ? el.classList=`el${game.fild.biom[i][j]}` : el.classList='';
			(check==2 && game.fild.biom_boom[i][j]==1) ? el.classList.add('del') :'';
		}
	}
	el = null;
}
