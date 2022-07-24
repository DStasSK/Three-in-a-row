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
		fild +=`<i>${i}-${j}</i>`;
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
	for (let j=0; j<y; j++){
		biom[i][j] = Math.round(Math.random()*6);
		if(biom[i][j]){
			biom_columns[i].children[j].classList.add(`el${biom[i][j]}`);
		}
	}
}
console.table(biom);


biom_box.onclick = (e)=>{
	for (let el of biom){
		let exit = false;
			// console.log(e.target);
			for (let el of biom_columns){
				console.log(e.target);
				// if(e.target===el){
					// el.classList.add('pof');
					// console.log(el);
					// console.log(1);
				// }
				e.target.style.background = 'red';
				exit = true;
				break;
			}
		if(exit) break;
	}
}
