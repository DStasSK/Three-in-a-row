const game_menu = document.querySelector('.game_menu')
const start = document.querySelector('.btn_start')
const option_btn_start = document.querySelector('.option_btn_start')
const fild_box = document.querySelector('.bg_fild')
const biom_box = document.querySelector('.biom')
const option = document.querySelector('.option')
const option_box = document.querySelector('.option_box')
const info = document.querySelector('.info')
const info_box = document.querySelector('.info_box')
const score_bg = document.querySelector('.score_bg')
const score_info = document.querySelector('.score_info')

// прослушивание клавиш
document.addEventListener('keydown', keys);
start.addEventListener('click', game_start);   // начало игры
option_btn_start.addEventListener('click', game_start);
option.addEventListener('click', showOption);  // показать меню опций
info.addEventListener('click', showInfo);      // показать меню информации

let biom = [];   // основное поле данных
let biom_boom=[];

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
let score_str = 0;
let timeBySpep = 350;     // время прохождения шаром одной клетки ms
let timeClearSpep = 400;  // время на удаления элементов ms
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



// логика клавиш
function keys(event){
	// начало игры
	if(event.key=='n'||event.key=='N'||event.key=='т'||event.key=='Т'||event.keyCode=='78') {
		start_game_status = false;
		game_status = false;
		clearInterval(interval);
		start.innerHTML = 'new game';
		game_start();
	}

	// пауза
	if(event.key=='p'||event.key=='P'||event.key=='з'||event.key=='З'||event.key==' '||event.keyCode=='32'||event.keyCode=='80'){
		pause();
	}

	// конец игры
	if(event.key=='g'||event.key=='G'||event.key=='п'||event.key=='П'||event.keyCode=='71'){
		game_over();
	}

	// открыть меню опций
	if(event.key=='o'||event.key=='O'||event.key=='щ'||event.key=='Щ'||event.keyCode=='79') {
		showOption();
	}

	// открыть меню информации
	if(event.key=='i'||event.key=='I'||event.key=='ш'||event.key=='Ш'||event.keyCode=='16'){
		showInfo();
	}

	// сдвиг шара влево
	if(event.key=='a'||event.key=='A'||event.key=='ф'||event.key=='Ф'||event.key=='ArrowLeft'||event.keyCode=='65'||event.keyCode=='37'){
		to_left();
	}

	// сдвиг шара вниз
	if(event.key=='s'||event.key=='S'||event.key=='ы'||event.key=='Ы'||event.key=='ArrowDown'||event.keyCode=='83'||event.keyCode=='40'){
		to_down();
	}

	// сдвиг шара вправо
	if(event.key=='d'||event.key=='D'||event.key=='в'||event.key=='В'||event.key=='ArrowRight'||event.keyCode=='68'||event.keyCode=='39'){
		to_right();
	}
}

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


// начало игры
function game_start(){
	game_status = false;
	start_game_status = true;
	score_str = 0;

	if (!game_menu.classList.contains('ani')) game_menu.classList.toggle('ani');

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


// pause
function pause(){
	if(game_status){
		if(start_game_status) {
			start_game_status = false;
			start.innerHTML = 'пауза';
			game_menu.classList.toggle('ani');
			clearInterval(interval);
		}
		else {
			start_game_status = true;
			game_menu.classList.toggle('ani');
			clearInterval(interval);
			interval = setInterval(move_ball, timeBySpep);
		}
	}
}


// game over
function game_over(){
	clearInterval(interval);
	start_game_status = false;
	game_status = false;
	start.innerHTML = 'игра окончена';

	if (game_menu.classList.contains('ani')) {
		game_menu.classList.toggle('ani');
	}
	// console.table(biom);
	// console.table(biom_boom);
}


// падение мяча
function move_ball(){
	if (clear_status == 2 && game_status && start_game_status){
		if (ball_status) {
			if((biom[ball_x][ball_y-1]>0)||(biom[ball_x][ball_y-1]==undefined)){
				ball_status = false;
				if(biom[ball_x][ball_y-1]>0 && ball_y==y){
					game_over()
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
					// boom();
					// if(find_row){
					// 	clearInterval(interval_del);
					// 	clear_status = 0;
					// 	interval_del = setInterval(clear_row, timeClearSpep);
					// }
				}
			}
		}
		else {
			boom();
			if(find_row){
				clearInterval(interval_del);
				clear_status = 0;
				interval_del = setInterval(clear_row, timeClearSpep);
			} else {
				ball_status = true;
				ball_y = y-1;

				// генерация линии падения
				ball_x = Math.round(Math.random()*(x - 1));

				if(biom[ball_x][ball_y]==0) {
					// генерация цвета мяча
					biom[ball_x][ball_y] = Math.round(Math.random()*5) + 1;
				}
				else game_over();

				// console.log(ball_x, ball_y)
				biom_push(x,y);
			}
		}
	}
}


// движение мяча игроком
function to_left(){
	if((ball_x-1) >= 0 && biom[ball_x-1][ball_y]==0){
		biom[ball_x-1][ball_y] = biom[ball_x][ball_y];
		biom[ball_x][ball_y] = 0;
		ball_x--;
		ball_status = true;
		biom_push(x,y);
	}
}
function to_right(){
	if((ball_x+1) < x && biom[ball_x+1][ball_y]==0){
		biom[ball_x+1][ball_y] = biom[ball_x][ball_y];
		biom[ball_x][ball_y] = 0;
		ball_x++;
		ball_status = true;
		biom_push(x,y);
	}
}
function to_down(){
	while((ball_y-1) >= 0 && biom[ball_x][ball_y-1]==0){
		biom[ball_x][ball_y-1] = biom[ball_x][ball_y];
		biom[ball_x][ball_y] = 0;
		ball_y--;
	}
	biom_push(x,y);
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

	const score_bg = document.querySelector('.score_bg')
	const score_info = document.querySelector('.score_info')

	if (score_str < 7){
		if (score < 100) {
			score_str = 2;
			score_bg.innerHTML = '0000  ';
			score_info.innerHTML = '    ' + score;
		}
		if (score > 99 && score < 1000) {
			score_str = 3;
			score_bg.innerHTML = '000   ';
			score_info.innerHTML = '   ' + score;
		}
		if (score > 999 && score < 10000) {
			score_str = 4;
			score_bg.innerHTML = '00    ';
			score_info.innerHTML = '  ' + score;
		}
		if (score > 9999 && score < 100000) {
			score_str = 5;
			score_bg.innerHTML = '0     ';
			score_info.innerHTML = ' ' + score;
		}
		if (score > 99999 && score < 1000000) {
			score_str = 6;
			score_bg.innerHTML = '      ';
			score_info.innerHTML = '' + score;
		}
		if (score > 999999) {
			score_str = 7;
			score_bg.innerHTML = '      ';
			score_info.innerHTML = 888888;
		}
	}
}


// открытие и закрытие меню
function showInfo(){
	info_box.classList.toggle('ani');

	if (!info_box.classList.contains('ani')){
		let date1 = Date.now();
		showMenu1 = setInterval( () => {
			if((Date.now() - date1) > 5000) {
				clearInterval(showMenu1);
				if (!info_box.classList.contains('ani')) {
					info_box.classList.toggle('ani');
				}
			}
		}, 900);
	} else clearInterval(showMenu1);
}
function showOption(){
	option_box.classList.toggle('ani');
	if (!option_box.classList.contains('ani')) {
		let date2 = Date.now();
		showMenu2 = setInterval( ()=> {
			if((Date.now() - date2) > 5000) {
				clearInterval(showMenu2);
				if (!option_box.classList.contains('ani')) {
					option_box.classList.toggle('ani');
				}
			}
		}, 900);
	} else clearInterval(showMenu2);
}
