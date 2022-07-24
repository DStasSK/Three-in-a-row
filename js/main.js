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
let boxColumns = document.querySelectorAll('.biom .col');
// console.log(boxColumns);
console.log(box);
console.log(biom_box);
// console.log(biom_box.children);
console.log(boxColumns[0].children);


// biom[0][0] = 1;
for (let i = 0; i<x; i++){
	biom[i] = [];
	// let biom_coll = biom_box.child[i];
	for (let j=0; j<y; j++){
		biom[i][j] = Math.round(Math.random()*6);
		if(biom[i][j]){
			boxColumns[i].children[j].classList.add(`el${biom[i][j]}`);
		}
	}
}
console.table(biom);
