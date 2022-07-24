const start = document.querySelector('.start')
start.addEventListener('click', game_start);
let fild_box = document.querySelector('.fild')
let biom_box = document.querySelector('.biom')
let biom = [];   // основное поле данных

let start_game_status = false;
let ball_status = false;
// let ball;
let ball_x;
let ball_y;
let interval;

let x = 11; // ширина поля
let y = 15; // высота поля
let h = 13;  // количество заполненных линий на старте

// стартовая генерация биома и поля в документе
// LS - чуть попожже :-)
let fild = '';
for (let i = 0; i<x; i++){
	fild += '<div class="col">';
	biom[i] = [];
	for (let j=0; j<y; j++){
		fild +=`<i></i>`;
		// fild +=`<i>${i}-${j}</i>`;
		biom[i][j] = 0;
	}
	fild += '</div>'
}
fild_box.innerHTML = fild;
biom_box.innerHTML = fild;



box = document.querySelector('.box');
let biom_columns = document.querySelectorAll('.biom .col');
// console.log(box);
// console.log(biom_box);
// console.log(biom_box.children);
// console.log(biom_columns[0].children);



// построение элементов в HTML документе согласно биому
function biom_push(x,y,z){
	for (let i = 0; i<x; i++){
		for (let j=0; j<y; j++){
			if((z) && j<h) {biom[i][j] = 1 + Math.round(Math.random()*5)}
			if((z) && j>=h) {biom[i][j] = 0}

			if(biom[i][j]){
				biom_columns[i].children[j].classList.add(`el${biom[i][j]}`);
			} else {
				biom_columns[i].children[j].classList = 0;
			}
		}
	}
	// console.table(biom);
}
// biom_push(x,y,1);



// удаление элемента по клику на нем
biom_box.onclick = (e)=>{
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
				setTimeout(()=>{
					e.target.remove();
					let teg_i = document.createElement('i');
					biom_columns[i].appendChild(teg_i);
				}, 200)
				break;
			}
			j++;
		}
		if(exit) break;
		i++;
	}
	console.log('i = ', i, '; j = ', j);
	for (let k = j; k<y; k++){
		biom[i][k] = biom[i][k+1];
		if(biom[i][k]==undefined) biom[i][k] = 0;
	}
	console.table(biom);
}
// console.log(biom_box);



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
		biom_push(x,y,1);
		move_ball();
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
				start.innerHTML = 'начать игру';
				console.table(biom);
				clearInterval(interval);
			}
		} else {
			biom[ball_x][ball_y-1] = biom[ball_x][ball_y];
			biom[ball_x][ball_y] = 0;
			ball_y--;
			// console.log(ball_y);
			biom_push(x,y);
			if(biom[ball_x][ball_y-1]>0){
				ball_status = false;
			}
		}
	} else {
		ball_status = true;
		// генерация линии падения
		ball_x = Math.round(Math.random()*(x - 1));
		// генерация цвета мяча
		ball_y = y;
		biom[ball_x][ball_y] = Math.round(Math.random()*5) + 1;
		console.log(ball_x, ball_y)
		biom_push(x,y);
	}

}
