let box = document.querySelector('.box')
let fild = [];   // основное поле данных

let x = 11;
let y = 15;


// тестовая генерация поля
// for (let i = 0; i<x; i++){
// 	fild[i] = [];
// 	let div = document.createElement('div');
// 	for (let j=0; j<y-i; j++){
// 		fild[i][j] = 0;
// 		let e = document.createElement('i');
// 		e.innerHTML = `${i}-${j}`;
// 		div.appendChild(e);
// 	}
// 	box.appendChild(div);
// }
// console.table(fild);


// стартовая генерация поля в документе
const LSget = (a) => window.localStorage.getItem(a);
const LSset = (a,b)=>window.localStorage.setItem(a,b);
try {
	if(x != LSget('rows_fild_x') || y != LSget('rows_fild_y')) throw new Error();
	let fild2 = LSget('rows_fild');
	box.innerHTML = fild2;
	// console.log('try');
}
catch (e) {
	let fild2 = '';
	for (let i = 0; i<x; i++){
		fild2 += '<div>';
		fild[i] = [];
		for (let j=0; j<y; j++){
			fild2 +=`<i>${i}-${j}</i>`;
			fild[i][j] = 0;
		}
		fild2 += '</div>'
	}

	box.innerHTML = fild2;
	LSset("rows_fild", fild2);
	LSset("rows_fild_x", x.toString());
	LSset("rows_fild_y", y.toString());
	// console.log('catch');
}
// window.localStorage.clear();
