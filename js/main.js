const start = document.querySelector('.btn_start')
const fild_box = document.querySelector('.bg_fild')
const biom_box = document.querySelector('.biom')

start.addEventListener('click', game_start);

let biom = [];   // основное поле данных
let biom_boom=[]

let find_row = false;
let start_game_status = false;
let game_status = false;
let ball_status = false;
let clear_status = 0;

let ball_x;
let ball_y;
let interval;
let interval_del;

let score = 0;            // счетчик очков
let timeBySpep = 400;     // время прохождения шаром одной клетки ms
let timeClearSpep = 600;  // время на удаления элементов ms
let x = 11; // ширина поля
let y = 15; // высота поля
let h = 12; // количество заполненных линий на старте



// стартовая генерация биома и поля в документе
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
function biom_push(x,y,zz){
	fild = '';
	let del = ''
	for (let i = 0; i<x; i++){
		fild += '<div class="col">';
		for (let j=0; j<y; j++){
			if((zz==1) && j<h) {biom[i][j] = 1 + Math.round(Math.random()*5)}
			if((zz==1) && j>=h) {biom[i][j] = 0}
			if(!biom[i][j]) biom[i][j]=0;

			if(zz==2){
				if(biom_boom[i][j]==1) {del = 'del'}
				else {del = ''}
			}
			fild +=`<i class="el${biom[i][j]} ${del}"></i>`;
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
	clearInterval(interval_del);
	clear_status = 0;
	interval_del = setInterval(clear_row, timeClearSpep);
	clearInterval(interval);
}



// начало игры при нажатии на кнопку
function game_start(){
	// пауза
	if(start_game_status){
		start_game_status = false;
		start.innerHTML = 'продолжить игру';
		clearInterval(interval);
	}
	else {
		start_game_status = true;
		start.innerHTML = 'pause';
		// console.log('start');

		// начало игры
		if(!game_status) {
			// страртовое заполнение биома
			biom_push(x,y,1);
			game_status = true;
			score = 0;

			// поиск 3-х в ряд на стартовой генерации и их удаление
			clearInterval(interval_del);
			clear_status = 0;
			interval_del = setInterval(clear_row, timeClearSpep);
		}

		clearInterval(interval);
		interval = setInterval(move_ball, timeBySpep);
	}
}



// падение мяча
function move_ball(){
	if (clear_status == 2){
		if (ball_status) {
			if((biom[ball_x][ball_y-1]>0)||(biom[ball_x][ball_y-1]==undefined)){
				ball_status = false;
				if(biom[ball_x][ball_y-1]>0 && ball_y==y){
					start_game_status = false;
					game_status = false;
					start.innerHTML = 'начать игру';
					console.table(biom);
					console.table(biom_boom);
					clearInterval(interval);
				}
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
					boom();
					if(find_row){
						clearInterval(interval_del);
						clear_status = 0;
						interval_del = setInterval(clear_row, timeClearSpep);
					}
				}

			}
		}
		else {
			ball_status = true;
			ball_y = y;
			// генерация линии падения
			ball_x = Math.round(Math.random()*(x - 1));
			// генерация цвета мяча
			biom[ball_x][ball_y] = Math.round(Math.random()*5) + 1;
			// console.log(ball_x, ball_y)
			biom_push(x,y);
		}
	}
}



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
	boom();

	// анимация удаления - через добавление класса del
	biom_push(x,y,2);

	// падение элементов в биоме
	for(let i=0; i<x; i++){
		for(let j=y-1; j>=0; j--){
			if(biom_boom[i][j]==1){
				check_score(i,j)       // подсчет очков
				biom[i].splice(j,1);   // удаление элемента из биома
				biom[i].push(0);       // добавление элемента в конец массива
				biom_boom[i][j]=0;     // обнуление поиска 3-х в ряд
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
	console.log('score = ',score);

	// если элементов для удаления нет - выход из цикла
	if(find_row == false){
		clear_status++;
		if (clear_status == 2) {
			clearInterval(interval_del);
			interval = setInterval(move_ball, timeBySpep);
		}
	}
}



// подсчет очков в функции clear_row
function check_score(i,j){
	if (biom[i][j] == 1) score += 30;
	if (biom[i][j] == 2) score += 25;
	if (biom[i][j] == 3) score += 20;
	if (biom[i][j] == 4) score += 20;
	if (biom[i][j] == 5) score += 25;
	if (biom[i][j] == 6) score += 30;
	// console.log('score = ',score);
}
