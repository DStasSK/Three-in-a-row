// import {game} from '../main.js';

// открытие и закрытие меню опций и информации

// option.addEventListener('click', showOption);      // показать меню опций
// info.addEventListener('click', showInfo);          // показать меню информации
// function showInfo(){
// 	clearInterval(showMenuInfo);
// 	info_box.classList.toggle('ani');
// 	info.classList.toggle('ani');
// 	if (!info_box.classList.contains('ani')){
// 		let date1 = Date.now();
// 		showMenuInfo = setInterval( () => {
// 			if((Date.now() - date1) > 5000) {
// 				clearInterval(showMenuInfo);
// 				if (!info_box.classList.contains('ani')) {
// 					info_box.classList.toggle('ani');
// 				}
// 				if (info.classList.contains('ani')){
// 					info.classList.toggle('ani');
// 				}
// 			}
// 		}, 900);
// 	} else clearInterval(showMenuInfo);
// }
// function showOption(){
// 	clearInterval(showMenuOption);
// 	option_box.classList.toggle('ani');
// 	option.classList.toggle('ani');
// 	if (!option_box.classList.contains('ani')) {
// 		let date2 = Date.now();
// 		showMenuOption = setInterval( ()=> {
// 			if((Date.now() - date2) > 5000) {
// 				clearInterval(showMenuOption);
// 				if (!option_box.classList.contains('ani')) {
// 					option_box.classList.toggle('ani');
// 				}
// 				if (option.classList.contains('ani')) {
// 					option.classList.toggle('ani');
// 				}
// 			}
// 		}, 900);
// 	} else clearInterval(showMenuOption);
// }


game.m.showInfo = function(){
	clearInterval(showMenuInfo);
	info_box.classList.toggle('ani');
	info.classList.toggle('ani');
	if (!info_box.classList.contains('ani')){
		let date1 = Date.now();
		showMenuInfo = setInterval( () => {
			if((Date.now() - date1) > 5000) {
				clearInterval(showMenuInfo);
				if (!info_box.classList.contains('ani')) {
					info_box.classList.toggle('ani');
				}
				if (info.classList.contains('ani')){
					info.classList.toggle('ani');
				}
			}
		}, 900);
	} else clearInterval(showMenuInfo);
}
game.m.showOption = function(){
	clearInterval(showMenuOption);
	option_box.classList.toggle('ani');
	option.classList.toggle('ani');
	if (!option_box.classList.contains('ani')) {
		let date2 = Date.now();
		showMenuOption = setInterval( ()=> {
			if((Date.now() - date2) > 5000) {
				clearInterval(showMenuOption);
				if (!option_box.classList.contains('ani')) {
					option_box.classList.toggle('ani');
				}
				if (option.classList.contains('ani')) {
					option.classList.toggle('ani');
				}
			}
		}, 900);
	} else clearInterval(showMenuOption);
}
option.addEventListener('click', game.m.showOption); // показать меню опций
info.addEventListener('click', game.m.showInfo);     // показать меню информации

// export {showInfo, showOption};
// export {game};
