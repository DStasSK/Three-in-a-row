const start = document.querySelector('.start')
start.addEventListener('click', game_start);
let fild_box = document.querySelector('.fild')
let biom_box = document.querySelector('.biom')
let biom = [];   // основное поле данных

let start_game_status = false;
let x = 11;
let y = 15;

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


function biom_push(x,y,z){
	for (let i = 0; i<x; i++){
		for (let j=0; j<y; j++){
			if(z) biom[i][j] = 1 + Math.round(Math.random()*5);
			if(biom[i][j]){
				biom_columns[i].children[j].classList.add(`el${biom[i][j]}`);
			}
		}
	}
	console.table(biom);
}
biom_push(x,5,1);


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
	// console.table(biom);
}
// console.log(biom_box);


function game_start(){
	if(start_game_status){
		start_game_status = false;
		start.innerHTML = 'продолжить игру';
		// console.log('pause');
	} else {
		start_game_status = true;
		start.innerHTML = 'пауза';
		// console.log('start');
		move_ball();
	}
}

function move_ball(){
	let pos = Math.round(Math.random()*x);

}
