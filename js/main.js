let box = document.querySelector('.box')
let fild = [];   // основное поле данных

let x = 11;
let y = 15;


// тестовая генерация поля
for (let i = 0; i<x; i++){
	fild[i] = [];
	let div = document.createElement('div');
	for (let j=0; j<y-i; j++){
		fild[i][j] = 0;
		let e = document.createElement('i');
		e.innerHTML = `${i}-${j}`;
		div.appendChild(e);
	}
	box.appendChild(div);
}
console.table(fild);
