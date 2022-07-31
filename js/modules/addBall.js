// добавляем шар в нижнюю доступную точку биома
function addBall(){
	if(add_status){
		add_status = false;
		let fild_for_add = [];
		let e = false;
		let j = 0;
		for(j=0; j<y; j++){
			for(let i=0; i<x; i++){
				if(biom[i][j]==0){
					e = true;
					fild_for_add.push(i);
				}
			}
			if(e) break;
		}
		let place = Math.round(Math.random()*(fild_for_add.length-1));
		biom[fild_for_add[place]][j] = Math.round(Math.random()*5) + 1;
	}
}

// export {abbBall};
