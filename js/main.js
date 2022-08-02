// import {game} from './modules/keys.js';
// import {game} from './modules/player_arrow.js';
// import {game} from './modules/move_ball.js';
// import {game} from './modules/find_and_del_row.js';
// import {game} from './modules/setBalls.js';

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

// let biom = [];     // основное поле данных
// let biom_boom=[];  // биом для очистки по нему основного биома
//
// let find_row = false;           // статус обнаружения 3-х в ряд
// let start_game_status = false;  // стату запуска новой игры
// let game_status = false;        // статус игры - для паузы
// let ball_status = false;        // нужно ли выпускать новый шар
// let clear_status = 0;           // статус очистки от 3-х в ряд
// let add_status = false;         // статус для добалвения шара вниз биома
//
// let ball_x;         // текущая коорданата падающего шара по Х
// let ball_y;         // текущая координата падающего шара по Y

let interval;       // основной интервал движения шаров
let interval_del;   // интервал удаления шаров - для анимации
let showMenuInfo;   // интервал закрытия меню информации
let showMenuOption; // интервал закрытия меню опций

// let score = 0;            // счетчик очков
// let score_str = 0;        // для отображения набранных очков
// let timeByStep = 420;     // время прохождения шаром одной клетки ms
// let timeClearStep = 450;  // время на удаления элементов ms
// let x = 11; // ширина поля
// let y = 15; // высота поля
// let h = 8;  // количество заполненных линий на старте
// function clear_row(){}

const game = {
	interval:{
		timeByStep:420,     // время прохождения шаром одной клетки ms
		timeClearStep:450,  // время на удаления элементов ms
		showMenu:5000,      // время на отображение меню информации в showInfo(),showOption()
		showMenuS:7000,     // время на отображение меню опций при настройке скролла в setBalls()
	},
	status:{
		find_row: false,    // статус обнаружения 3-х в ряд
		start_game: false,  // статуc запуска новой игры
		game: false,        // статус игры - для паузы
		ball: false,        // нужно ли выпускать новый шар
		clear: 0,           // статус очистки от 3-х в ряд: 0 - не требуется
		add: false          // статус для добалвения шара вниз биома
	},
	fild:{
		biom:[],       // основное поле данных
		biom_boom:[],  // биом для удаления 3-х в ряд из основного биома
		x:11,          // ширина поля
		y:15,          // высота поля
		h:8            // количество заполненных линий на старте
	},

	m:{               // методы
		biom_push:0,
		keys:0,
		game_start:0,
		pause:0,
		game_over:0,
		showOption:0,
		showInfo:0,
		to_left:0,
		to_down:0,
		to_right:0,
		boom:0,
		clear_row:0,
		move_ball:0,
		check_score:0,
		addBall:0,
		setBalls:0
	},

	score:0,          // счетчик набранных очков
	score_str:0,      // для отображения набранных очков
	ball_x:0,         // текущая коорданата падающего шара по Х
	ball_y:0,         // текущая коорданата падающего шара по Y
}

// стартовая генерация поля в документе и пустого массива биома
// biom_push(x,y,-1);
// let fild = '';
// for (let i = 0; i<x; i++){
// 	fild += '<div class="col">';
// 	biom[i] = [];
// 	biom_boom[i] = [];
// 	for (let j=0; j<y; j++){
// 		fild +=`<i></i>`;
// 		biom[i][j] = 0;
// 		biom_boom[i][j] = 0;
// 	}
// 	fild += '</div>'
// }
// fild_box.innerHTML = fild;
