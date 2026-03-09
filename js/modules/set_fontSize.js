// расчет font-size при изменении размера окна или при изменении масштаба

setFontSize();
game.selectors.game.style.opacity = '1';


window.addEventListener('resize', setFontSize);
function setFontSize(event) {
	game.selectors.game.style.fontSize = 0;
	game.selectors.game.style.width = 0;

	let p = check_parent_offsets();
	let x = game.fild.x * 1.5 + 0.3;
	let y = game.fild.y * 1.5 + 2.8;  // 2.8 = меню 2.5 и тень-border 0.3

	let fontSize;
	let pw = game.selectors.game.parentElement.clientWidth;
	let ph = game.selectors.game.parentElement.clientHeight;

	!pw ? pw = document.documentElement.clientWidth : '';
	!ph ? ph = document.documentElement.clientHeight : '';

	pw > window.innerWidth	? pw = window.innerWidth :'';
	ph > window.innerHeight ? ph = window.innerHeight :'';

	pw -= (p.l + p.r);
	ph -= (p.t + p.b);

	fontSize = Math.min( pw/x, ph/y );

	fontSize = fontSize.toFixed(1); // округляем после зяпятой
	game.selectors.game.style.fontSize = fontSize + 'px';
	game.selectors.game.style.width = game.selectors.fild_box.offsetWidth + 'px';
	game.fontSize = +fontSize;
}

function check_parent_offsets() {
	let o = {};
	let p = getComputedStyle(game.selectors.game.parentElement);
	o.t = parseInt(p.paddingTop) + parseInt(p.marginTop) + parseInt(p.borderTopWidth);
	o.r = parseInt(p.paddingRight) + parseInt(p.marginRight) + parseInt(p.borderRightWidth);
	o.l = parseInt(p.paddingLeft) + parseInt(p.marginLeft) + parseInt(p.borderLeftWidth);
	o.b = parseInt(p.paddingBottom) + parseInt(p.marginBottom) + parseInt(p.borderBottomWidth);
	return o;
}
