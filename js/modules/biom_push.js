// построение для отображения элементов в HTML документе согласно биому

// zz = -1  для заполения HTML страницы после загрузки
//          и генерация пусото массива биома

// zz = 1   для заполнения биома при начале игры
//          стартовая генерация поля

// zz = 2   для обновления биома после удаления 3-х в ряд
//          добавляет класс для анимации удаления шаров


function biom_push(x,y,zz){
	let fild = '';
	let biom_fild = '';
	let del = ''
	for (let i = 0; i<x; i++){
		if(zz==-1) {
			fild += '<div class="col">';
			biom[i] = [];
			biom_boom[i] = [];
		}
		else {
			biom_fild += '<div class="col">';
		}

		for (let j=0; j<y; j++){
			if((zz==1) && j<h) {biom[i][j] = 1 + Math.round(Math.random()*5)}
			if((zz==1) && j>=h) {biom[i][j] = 0}

			if(zz==2){
				if(biom_boom[i][j]==1) {del = 'del'}
				else {del = ''}
			}
			if(zz==-1) {
				fild +=`<i></i>`;
				biom[i][j] = 0;
				biom_boom[i][j] = 0;
			} else {
				if(!biom[i][j]) biom[i][j]=0;
				biom_fild +=`<i class="el${biom[i][j]} ${del}"></i>`;
			}
		}

		if(zz==-1) {fild += '</div>';}
		else {biom_fild += '</div>';}
	}

	if(zz==-1) fild_box.innerHTML = fild;
	else biom_box.innerHTML = biom_fild;
}

// export {biom_push};
