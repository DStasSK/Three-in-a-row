let fild_box = document.querySelector('.fild')
let biom_box = document.querySelector('.biom')
let biom = [];   // основное поле данных

let x = 11;
let y = 15;

// стартовая генерация поля в документе
// LS - чуть попожже :-)
let fild = '';
for (let i = 0; i<x; i++){
	fild += '<div class="col">';
	// biom[i] = [];
	for (let j=0; j<y; j++){
		fild +=`<i></i>`;
		// fild +=`<i>${i}-${j}</i>`;
		// biom[i][j] = 0;
	}
	fild += '</div>'
}
fild_box.innerHTML = fild;
biom_box.innerHTML = fild;



box = document.querySelector('.box');
let biom_columns = document.querySelectorAll('.biom .col');
console.log(box);
// console.table(biom);
console.log(biom_box);
// console.log(biom_box.children);
console.log(biom_columns[0].children);

// biom[0][0] = 1;
for (let i = 0; i<x; i++){
	biom[i] = [];
	for (let j=0; j<5; j++){
		biom[i][j] = Math.round(Math.random()*6);
		if(biom[i][j]){
			biom_columns[i].children[j].classList.add(`el${biom[i][j]}`);
		}
	}
}
console.table(biom);


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
				// console.log(e.target);
				// console.log(biom_columns[i]);
				let teg_i = document.createElement('i');
				biom_columns[i].appendChild(teg_i);
				setTimeout(()=>{
					e.target.remove();
				}, 200)
				break;
			}
			j++;
		}
		if(exit) break;
		i++;
	}
	console.log('i = ', i, '; j = ', j);
	console.log(biom_box);
}
console.log(biom_box);
