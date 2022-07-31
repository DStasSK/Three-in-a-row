// import {keys} from './modules/keys.js';
// import {biom_push} from './modules/player_arrow.js';
// import {move_ball} from './modules/move_ball.js';
// import {boom, clear_row} from './modules/find_and_del_row.js';
// import {setBalls} from './modules/setBalls.js';

// Эмуляция импорта xD
document.write('<script src="./js/modules/keys.js"></script>');
document.write('<script src="./js/modules/biom_push.js"></script>');
document.write('<script src="./js/modules/move_ball.js"></script>');
document.write('<script src="./js/modules/find_and_del_row.js"></script>');
document.write('<script src="./js/modules/setBalls.js"></script>');

const game_menu = document.querySelector('.game_menu');
const btn_start = document.querySelector('.btn_start');
const option_btn_start = document.querySelector('.option_btn_start');
const fild_box = document.querySelector('.bg_fild');
const biom_box = document.querySelector('.biom');
const option = document.querySelector('.option');
const option_box = document.querySelector('.option_box');
const info = document.querySelector('.info');
const info_box = document.querySelector('.info_box');
const score_bg = document.querySelector('.score_bg');
const score_info = document.querySelector('.score_info');
const message = document.querySelector('.message');
const result = document.querySelector('.result');
// const filling = document.querySelector('.filling');

// прослушивание клавиш
// document.addEventListener('keydown', keys);
// filling.addEventListener('change', setBalls);

// btn_start.addEventListener('click', game_start);        // начало игры
// option_btn_start.addEventListener('click', game_start); // начало игры
// option.addEventListener('click', showOption);      // показать меню опций
// info.addEventListener('click', showInfo);          // показать меню информации

let biom = [];     // основное поле данных
let biom_boom=[];  // биом для очистки по нему основного биома

let find_row = false;           // статус обнаружения 3-х в ряд
let start_game_status = false;  // стату запуска новой игры
let game_status = false;        // статус игры - для паузы
let ball_status = false;        // нужно ли выпускать новый шар
let clear_status = 0;           // статус очистки от 3-х в ряд
let add_status = false;         // статус для добалвения шара вниз биома

let ball_x;         // текущая коорданата падающего шара по Х
let ball_y;         // текущая координата падающего шара по Y

let interval;       // основной интервал движения шаров
let interval_del;   // интервал удаления шаров - для анимации
let showMenuInfo;   // интервал закрытия меню информации
let showMenuOption; // интервал закрытия меню опций

let score = 0;            // счетчик очков
let score_str = 0;
let timeBySpep = 420;     // время прохождения шаром одной клетки ms
let timeClearSpep = 450;  // время на удаления элементов ms
let x = 11; // ширина поля
let y = 15; // высота поля
let h = 8;  // количество заполненных линий на старте



// стартовая генерация поля в документе и пустого массива биома
// biom_push(x,y,-1);
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


// // логика клавиш
// function keys(event){
// 	// начало игры
// 	if(event.key=='n'||event.key=='N'||event.key=='т'||event.key=='Т'||event.keyCode=='78') {
// 		start_game_status = false;
// 		game_status = false;
// 		clearInterval(interval);
// 		game_start();
// 	}
//
// 	// пауза
// 	if(event.key=='p'||event.key=='P'||event.key=='з'||event.key=='З'||event.key==' '||event.keyCode=='32'||event.keyCode=='80'){
// 		pause();
// 	}
//
// 	// конец игры
// 	if(event.key=='g'||event.key=='G'||event.key=='п'||event.key=='П'||event.keyCode=='71'){
// 		game_over();
// 	}
//
// 	// открыть меню опций
// 	if(event.key=='o'||event.key=='O'||event.key=='щ'||event.key=='Щ'||event.keyCode=='79') {
// 		showOption();
// 	}
//
// 	// открыть меню информации
// 	if(event.key=='i'||event.key=='I'||event.key=='ш'||event.key=='Ш'||event.keyCode=='16'){
// 		showInfo();
// 	}
//
// 	// сдвиг шара влево
// 	if(event.key=='a'||event.key=='A'||event.key=='ф'||event.key=='Ф'||event.key=='ArrowLeft'||event.keyCode=='65'||event.keyCode=='37'){
// 		to_left();
// 	}
//
// 	// сдвиг шара вниз
// 	if(event.key=='s'||event.key=='S'||event.key=='ы'||event.key=='Ы'||event.key=='ArrowDown'||event.keyCode=='83'||event.keyCode=='40'){
// 		to_down();
// 	}
//
// 	// сдвиг шара вправо
// 	if(event.key=='d'||event.key=='D'||event.key=='в'||event.key=='В'||event.key=='ArrowRight'||event.keyCode=='68'||event.keyCode=='39'){
// 		to_right();
// 	}
// }


// // построение элементов в HTML документе согласно биому
// function biom_push(x,y,zz){
// 	// zz = -1  для заполения HTML страницы после загрузки
// 	//          и генерация пусото массива биома
//
// 	// zz = 1   для заполнения биома при начале игры
// 	//          стартовая генерация поля
//
// 	// zz = 2   для обновления биома после удаления 3-х в ряд
// 	//          добавляет класс для анимации удаления шаров
//
// 	let fild = '';
// 	let biom_fild = '';
// 	let del = ''
// 	for (let i = 0; i<x; i++){
// 		if(zz==-1) {
// 			fild += '<div class="col">';
// 			biom[i] = [];
// 			biom_boom[i] = [];
// 		}
// 		else {
// 			biom_fild += '<div class="col">';
// 		}
//
// 		for (let j=0; j<y; j++){
// 			if((zz==1) && j<h) {biom[i][j] = 1 + Math.round(Math.random()*5)}
// 			if((zz==1) && j>=h) {biom[i][j] = 0}
//
// 			if(zz==2){
// 				if(biom_boom[i][j]==1) {del = 'del'}
// 				else {del = ''}
// 			}
// 			if(zz==-1) {
// 				fild +=`<i></i>`;
// 				biom[i][j] = 0;
// 				biom_boom[i][j] = 0;
// 			} else {
// 				if(!biom[i][j]) biom[i][j]=0;
// 				biom_fild +=`<i class="el${biom[i][j]} ${del}"></i>`;
// 			}
// 		}
//
// 		if(zz==-1) {fild += '</div>';}
// 		else {biom_fild += '</div>';}
// 	}
//
// 	if(zz==-1) fild_box.innerHTML = fild;
// 	else biom_box.innerHTML = biom_fild;
// }


// начало игры
// function game_start(){
// 	game_status = false;
// 	start_game_status = true;
// 	score_str = 0;
//
// 	if (!game_menu.classList.contains('ani')) game_menu.classList.toggle('ani');
// 	if (!message.classList.contains('ani')) message.classList.toggle('ani');
// 	if(!game_status) {
// 		// страртовое заполнение биома
// 		biom_push(x,y,1);
// 		game_status = true;
// 		score = 0;
//
// 		// поиск 3-х в ряд на стартовой генерации и их удаление
// 		dell_ball();
// 	}
//
// 	clearInterval(interval);
// 	interval = setInterval(move_ball, timeBySpep);
// }
//
//
// // pause
// function pause(){
// 	btn_start.removeEventListener('click', game_start);
// 	btn_start.addEventListener('click', pause);
// 	if(game_status){
// 		if(start_game_status) {
// 			start_game_status = false;
// 			btn_start.innerHTML = 'пауза';
// 			game_menu.classList.toggle('ani');
// 			if (!message.classList.contains('ani')) {
// 				message.classList.toggle('ani');
// 			}
// 			clearInterval(interval);
// 		}
// 		else {
// 			start_game_status = true;
// 			game_menu.classList.toggle('ani');
// 			clearInterval(interval);
// 			interval = setInterval(move_ball, timeBySpep);
// 		}
// 	}
// }
//
//
// // game over
// function game_over(){
// 	btn_start.removeEventListener('click', pause);
// 	btn_start.addEventListener('click', game_start);
// 	clearInterval(interval);
// 	start_game_status = false;
// 	game_status = false;
// 	if (message.classList.contains('ani')) {
// 		message.classList.toggle('ani');
// 	}
// 	result.innerHTML = `${score}`;
// 	btn_start.innerHTML = 'Играть снова';
//
// 	if (game_menu.classList.contains('ani')) {
// 		game_menu.classList.toggle('ani');
// 	}
// 	// console.table(biom);
// 	// console.table(biom_boom);
// }


// // падение мяча
// function move_ball(){
// 	if (clear_status == 2 && game_status && start_game_status){
// 		if (ball_status) {
// 			if((biom[ball_x][ball_y-1]>0)||(biom[ball_x][ball_y-1]==undefined)){
// 				// остановка падения
// 				ball_status = false;
// 			}
// 			else {
// 				if(ball_y>0){
// 					biom[ball_x][ball_y-1] = biom[ball_x][ball_y];
// 					biom[ball_x][ball_y] = 0;
// 					ball_y--;
// 					biom_push(x,y);
// 				}
// 				if((biom[ball_x][ball_y-1]>0)||(biom[ball_x][ball_y-1]==undefined)){
// 					ball_status = false;
// 				}
// 			}
// 		}
// 		if (!ball_status) {
// 			addBall();
// 			boom();
// 			if(find_row){
// 				clearInterval(interval_del);
// 				clear_status = 0;
// 				interval_del = setInterval(clear_row, timeClearSpep);
// 			} else {
// 				add_status = true;
// 				ball_status = true;
// 				ball_y = y;
//
// 				// генерация линии падения
// 				ball_x = Math.round(Math.random()*(x - 1));
//
// 				if(biom[ball_x][ball_y-1]==0) {
// 					// генерация цвета мяча
// 					biom[ball_x][ball_y] = Math.round(Math.random()*5) + 1;
// 				}
// 				else game_over();
//
// 				// отображение щара в игре
// 				biom_push(x,y);
// 			}
// 		}
// 	}
// }


// // движение мяча игроком
// function to_left(){
// 	if((ball_x-1) >= 0 && biom[ball_x-1][ball_y]==0 && biom[ball_x][ball_y-1]==0){
// 		biom[ball_x-1][ball_y] = biom[ball_x][ball_y];
// 		biom[ball_x][ball_y] = 0;
// 		ball_x--;
// 		// ball_status = true;
// 		biom_push(x,y);
// 	}
// }
// function to_right(){
// 	if((ball_x+1) < x && biom[ball_x+1][ball_y]==0 && biom[ball_x][ball_y-1]==0){
// 		biom[ball_x+1][ball_y] = biom[ball_x][ball_y];
// 		biom[ball_x][ball_y] = 0;
// 		ball_x++;
// 		// ball_status = true; // для предотвращения зависания шара
// 		biom_push(x,y);
// 	}
// }
// function to_down(){
// 	while((ball_y-1) >= 0 && biom[ball_x][ball_y-1]==0){
// 		biom[ball_x][ball_y-1] = biom[ball_x][ball_y];
// 		biom[ball_x][ball_y] = 0;
// 		ball_y--;
// 	}
// 	biom_push(x,y);
// }


// // поиск совпадений 3 в ряд и более для удаления
// function dell_ball(){
// 	boom();
// 	if(find_row){
// 		clearInterval(interval_del);
// 		clear_status = 0;
// 		interval_del = setInterval(clear_row, timeClearSpep);
// 	}
// }
// function boom(){
// 	find_row = false;
//
// 	for (let i = 0; i<x; i++){
// 		for (let j = 0; j<y; j++){
// 			if(biom[i][j]!=0){
// 				if((i>0)&&(i<x-1)&&(j>0)&&(j<y-1)){
// 					if ((biom[i][j]==biom[i+1][j]) && (biom[i][j]==biom[i-1][j])){
// 						biom_boom[i][j] = 1;
// 						biom_boom[i+1][j] = 1;
// 						biom_boom[i-1][j] = 1;
// 					}
// 					if ((biom[i][j]==biom[i][j+1]) && (biom[i][j]==biom[i][j-1])){
// 						biom_boom[i][j] = 1;
// 						biom_boom[i][j+1] = 1;
// 						biom_boom[i][j-1] = 1;
// 					}
// 					if ((biom[i][j]==biom[i+1][j+1])&&(biom[i][j]==biom[i-1][j-1])){
// 						biom_boom[i][j] = 1;
// 						biom_boom[i+1][j+1] = 1;
// 						biom_boom[i-1][j-1] = 1;
// 					}
// 					if ((biom[i][j]==biom[i-1][j+1])&&(biom[i][j]==biom[i+1][j-1])){
// 						biom_boom[i][j] = 1;
// 						biom_boom[i-1][j+1] = 1;
// 						biom_boom[i+1][j-1] = 1;
// 					}
// 				}
//
// 				if(((i==0)||(i==x-1))&&(j>0)&&(j<y-1)){
// 					if ((biom[i][j]==biom[i][j+1]) && (biom[i][j]==biom[i][j-1])){
// 						biom_boom[i][j] = 1;
// 						biom_boom[i][j+1] = 1;
// 						biom_boom[i][j-1] = 1;
// 					}
// 				}
//
// 				if(((j==0)||(j==y-1))&&(i>0)&&(i<x-1)){
// 					if ((biom[i][j]==biom[i+1][j]) && (biom[i][j]==biom[i-1][j])){
// 						biom_boom[i][j] = 1;
// 						biom_boom[i+1][j] = 1;
// 						biom_boom[i-1][j] = 1;
// 					}
// 				}
//
// 			}
// 			if(biom_boom[i][j]==1) find_row = true;
// 		}
// 	}
// }
//
//
// // удаление элементов согласно biom_boom
// // и подсчет очков
// function clear_row(){
// 	// остановка падения шаров
// 	clearInterval(interval);
//
// 	// поиск 3 в ряд
// 	// boom();
//
// 	// анимация удаления - через добавление класса del
// 	biom_push(x,y,2);
//
// 	// падение элементов в биоме
// 	for(let i=0; i<x; i++){
// 		for(let j=y-1; j>=0; j--){
// 			if(biom_boom[i][j]==1){
// 				check_score(i,j)       // подсчет очков
// 				biom[i].splice(j,1);   // удаление элемента из биома
// 				biom[i].push(0);       // добавление элемента в конец массива биома
// 				biom_boom[i][j]=0;     // обнуление в массиве совпадений
// 			}
// 			if(biom[i][j-1]==0 && biom_boom[i][j-1]==0){
// 				biom[i].splice(j-1,1);
// 				biom[i].push(0);
// 				ball_status = false;
// 			}
// 		}
// 	}
//
// 	// проверка на "три в ряд"
// 	boom();
//
// 	// если элементов для удаления нет - выход из цикла
// 	if(find_row == false){
// 		clear_status=2;
// 		if (clear_status == 2) {
// 			clearInterval(interval_del);
// 			interval = setInterval(move_ball, timeBySpep);
// 		}
// 	}
// }


// // подсчет очков в функции clear_row
// function check_score(i,j){
// 	if (biom[i][j] == 1) score += 90;
// 	if (biom[i][j] == 2) score += 75;
// 	if (biom[i][j] == 3) score += 60;
// 	if (biom[i][j] == 4) score += 60;
// 	if (biom[i][j] == 5) score += 75;
// 	if (biom[i][j] == 6) score += 90;
// 	// console.log('score = ',score);
//
// 	if (score_str < 7){
// 		if (score < 100) {
// 			score_str = 2;
// 			score_bg.innerHTML = '0000  ';
// 			score_info.innerHTML = '    ' + score;
// 		}
// 		if (score > 99 && score < 1000) {
// 			score_str = 3;
// 			score_bg.innerHTML = '000   ';
// 			score_info.innerHTML = '   ' + score;
// 		}
// 		if (score > 999 && score < 10000) {
// 			score_str = 4;
// 			score_bg.innerHTML = '00    ';
// 			score_info.innerHTML = '  ' + score;
// 		}
// 		if (score > 9999 && score < 100000) {
// 			score_str = 5;
// 			score_bg.innerHTML = '0     ';
// 			score_info.innerHTML = ' ' + score;
// 		}
// 		if (score > 99999 && score < 1000000) {
// 			score_str = 6;
// 			score_bg.innerHTML = '      ';
// 			score_info.innerHTML = '' + score;
// 		}
// 		if (score > 999999) {
// 			score_str = 7;
// 			score_bg.innerHTML = '      ';
// 			score_info.innerHTML = 888888;
// 		}
// 	}
// }


// // открытие и закрытие меню опций и информации
// let showMenu1, showMenu2;
// function showInfo(){
// 	clearInterval(showMenu1);
// 	info_box.classList.toggle('ani');
// 	info.classList.toggle('ani');
// 	if (!info_box.classList.contains('ani')){
// 		let date1 = Date.now();
// 		showMenu1 = setInterval( () => {
// 			if((Date.now() - date1) > 5000) {
// 				clearInterval(showMenu1);
// 				if (!info_box.classList.contains('ani')) {
// 					info_box.classList.toggle('ani');
// 				}
// 				if (info.classList.contains('ani')){
// 					info.classList.toggle('ani');
// 				}
// 			}
// 		}, 900);
// 	} else clearInterval(showMenu1);
// }
// function showOption(){
// 	clearInterval(showMenu2);
// 	option_box.classList.toggle('ani');
// 	option.classList.toggle('ani');
// 	if (!option_box.classList.contains('ani')) {
// 		let date2 = Date.now();
// 		showMenu2 = setInterval( ()=> {
// 			if((Date.now() - date2) > 5000) {
// 				clearInterval(showMenu2);
// 				if (!option_box.classList.contains('ani')) {
// 					option_box.classList.toggle('ani');
// 				}
// 				if (option.classList.contains('ani')) {
// 					option.classList.toggle('ani');
// 				}
// 			}
// 		}, 900);
// 	} else clearInterval(showMenu2);
// }


// // выбор количества заполненных начальных строк
// const filling = document.querySelector('.filling');
// filling.addEventListener('change', setBalls);
// function setBalls(){
// 	clearInterval(showMenu2);
// 	h = filling.value;
//
// 	let date2 = Date.now();
// 	showMenu2 = setInterval( ()=> {
// 		if((Date.now() - date2) > 7000) {
// 			clearInterval(showMenu2);
// 			if (!option_box.classList.contains('ani')) {
// 				option_box.classList.toggle('ani');
// 			}
// 			if (option.classList.contains('ani')) {
// 				option.classList.toggle('ani');
// 			}
// 		}
// 	}, 900);
// }


// // добавляем шар в нижнюю доступную точку биома
// function addBall(){
// 	if(add_status){
// 		add_status = false;
// 		let fild_for_add = [];
// 		let e = false;
// 		let j = 0;
// 		for(j=0; j<y; j++){
// 			for(let i=0; i<x; i++){
// 				if(biom[i][j]==0){
// 					e = true;
// 					fild_for_add.push(i);
// 				}
// 			}
// 			if(e) break;
// 		}
// 		let place = Math.round(Math.random()*(fild_for_add.length-1));
// 		biom[fild_for_add[place]][j] = Math.round(Math.random()*5) + 1;
// 	}
// }
