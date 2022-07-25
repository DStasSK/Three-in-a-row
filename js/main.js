const start = document.querySelector('.start')
start.addEventListener('click', game_start);
let fild_box = document.querySelector('.fild')
let biom_box = document.querySelector('.biom')
let biom = [];   // основное поле данных
let biom_boom=[]
let find_row = false;

let start_game_status = false;
let game_status = false;
let ball_status = false;

let ball_x;
let ball_y;
let interval;
let interval_del;
let score = 0;

let x = 11; // ширина поля
let y = 15; // высота поля
let h = 12;  // количество заполненных линий на старте

// стартовая генерация биома и поля в документе
// LS - чуть попожже :-)
let fild = '';
for (let i = 0; i<x; i++){
	fild += '<div class="col">';
	biom[i] = [];
	biom_boom[i] = [];
	for (let j=0; j<y; j++){
		fild +=`<i></i>`;
		biom[i][j] = 0;
		biom_boom[i][j] = 0;
	}
	fild += '</div>'
}
fild_box.innerHTML = fild;



// построение элементов в HTML документе согласно биому
function biom_push(x,y,z){
	fild = '';
	for (let i = 0; i<x; i++){
		fild += '<div class="col">';
		for (let j=0; j<y; j++){
			if((z==1) && j<h) {biom[i][j] = 1 + Math.round(Math.random()*5)}
			if((z==1) && j>=h) {biom[i][j] = 0}
			if(!biom[i][j]) biom[i][j]=0;
			fild +=`<i class="el${biom[i][j]}"></i>`;
		}
		fild += '</div>'
	}
	biom_box.innerHTML = fild;
	// console.table(biom);
}



// удаление элемента по клику на нем
biom_box.onclick = (e)=>{
	let biom_columns = document.querySelectorAll('.biom .col');
	let i = 0;
	let j = 0;
	for (let el of biom_columns){
		let exit = false;
		let col = el.children;
		j = 0;
		for (let el_i of col){
			if(el_i == e.target){
				// e.target.style.background = 'red';
				e.target.classList.add('del');
				exit = true;
				for (let k = j; k<y; k++){
					biom[i][k] = biom[i][k+1];
					if(biom[i][k]==undefined) biom[i][k] = 0;
				}
				setTimeout(()=>{e.target.remove();}, 200)
				break;
			}
			j++;
		}
		if(exit) break;
		i++;
	}
	// console.log('i = ', i, '; j = ', j);
	// console.table(biom);
}



// начало игры при нажатии на кнопку
function game_start(){
	if(start_game_status){
		start_game_status = false;
		start.innerHTML = 'продолжить игру';
		clearInterval(interval);
		// console.log('pause');
	} else {
		start_game_status = true;
		start.innerHTML = 'пауза';
		// console.log('start');
		if(!game_status) {
			biom_push(x,y,1);  // страртовое заполнение биома
			game_status = true;
			clearInterval(interval_del);
			interval_del = setInterval(clear_row, 500);
			// clear_row();
			// console.log(1);
		}
		// move_ball();
		clearInterval(interval);
		interval = setInterval(move_ball, 500);
	}
}



// падение мяча
function move_ball(){
	if (ball_status) {
		if(biom[ball_x][ball_y-1]>0){
			ball_status = false;
			if(biom[ball_x][ball_y-1]>0 && ball_y==y){
				start_game_status = false;
				game_status = false;
				start.innerHTML = 'начать игру';
				console.table(biom);
				console.table(biom_boom);
				clearInterval(interval);
			}
		} else {
			biom[ball_x][ball_y-1] = biom[ball_x][ball_y];
			biom[ball_x][ball_y] = 0;
			ball_y--;
			biom_push(x,y);
			if(biom[ball_x][ball_y-1]>0){
				ball_status = false;
			}
		}
	} else {
		ball_status = true;
		ball_y = y;
		// генерация линии падения
		ball_x = Math.round(Math.random()*(x - 1));
		// генерация цвета мяча
		biom[ball_x][ball_y] = Math.round(Math.random()*5) + 1;
		// console.log(ball_x, ball_y)
		boom()
		biom_push(x,y);
	}
}



// поиск совпадений 3 в ряд и более для удаления
function boom(){
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
		}
		// проверка на наличие "трех в ряд"
		if(biom[i].indexOf(1)>-1) find_row = true;
	}
	// console.table(biom);
	// console.table(biom_boom);
}



// удаление элементов согласно biom_boom
function clear_row(){
	// поиск 3 в ряд
	boom();

	let biom_columns = document.querySelectorAll('.biom .col');
	let i = 0;
	let j = 0;
	for (let el of biom_columns){
		let col = el.children;
		j = 0;
		for (let el_i of col){
			if(biom_boom[i][j] == 1){
				el_i.classList.add('del');
				biom_boom[i][j] == 0;
				check_score(i,j);   // подсчет очков
				biom[i][j] == 0;
				// console.log(el_i);
				setTimeout(()=>{el_i.remove()}, 400)
			}
			j++;
		}
		i++;
	}
	console.table(biom);

	// падение элементов в биоме
	for(let i=0; i<x; i++){
		for(let j=0; j<y; j++){
			while (biom[i][j] == 0){
				biom[i].splice(j,1);
			}
			if(!biom[i][j]) biom[i][j]=0;
		}
	}


	// проверка на "три в ряд"
	find_row = false;
	boom();

	// если элементов для удаления нет - выход из цикла
	if(!find_row) clearInterval(interval_del);
	// console.table(biom)
}


function check_score(i,j){
	if (biom[i][j] == 1) score += 30;
	if (biom[i][j] == 2) score += 25;
	if (biom[i][j] == 3) score += 20;
	if (biom[i][j] == 4) score += 20;
	if (biom[i][j] == 5) score += 25;
	if (biom[i][j] == 6) score += 30;
	// console.log('score = ',score);
}
