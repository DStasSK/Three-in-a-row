const game = {
	interval:{
		interval:0,        // основной интервал движения шаров
		showMenuInfo:0,    // интервал закрытия меню информации
		showMenuOption:0,  // интервал закрытия меню опций
		interval_del:0,    // интервал удаления шаров - для анимации

		timeByStep:420,    // время прохождения шаром одной клетки ms
		timeClearStep:450, // время на удаления элементов ms
		showMenu:5000,     // время на отображение меню информации в showInfo(),showOption()
		showMenuS:5000,    // время на отображение меню опций при настройке скролла в setBalls()
	},
	status:{
		find_row: false,   // статус обнаружения 3-х в ряд
		start_game: false, // статус игры - для паузы
		game: false,       // статуc запуска новой игры
		ball: false,       // нужно ли выпускать новый шар
		clear: 0,          // статус очистки от 3-х в ряд: 0 - не требуется
		add: true,         // добалять шар вниз биома?
		add_now: false,    // добалять шар вниз биома при первом шаре
		ask: -1,           // вопрос о прерывании игры: 1 - при запуске новой игры, 0 - при GG
		dabl_N_key: 0,     // при повторном нажатии (после вопроса) кнопки новой игры - новая игра
		dabl_G_key: 0,     // при повторном нажатии (после вопроса) кнопки конца игры - конец игры
	},
	fild:{
		biom:[],       // основное поле данных
		biom_boom:[],  // биом для удаления 3-х в ряд из основного биома
		x:16,          // ширина игрового поля
		y:18,          // число строк игрового поля
		h:6,           // количество заполненных линий на старте
		score_1:90,    // очки за шар при совпадении 3-х в ряд
		score_2:75,    // см check_score.js
		score_3:60,
	},

	m:{              // методы
		start_game:0,  // подготовка к началу игры - отображение в HTML
		biom_push:0,   // обновление элементов в биоме
		keys:0,        // прослушивание клавиш
		game_start:0,  // начало игры
		pause:0,       // пауза
		game_over:0,   // конец игры
		ask:0,         // подтверждение новой игры или GG
		showOption:0,  // показать/скрыть меню опций
		showInfo:0,    // показать/скрыть меню инфо
		to_left:0,
		to_down:0,
		to_right:0,
		boom:0,        // заполнение массвива при поиске 3-х в ряд
		clear_row:0,   // удаление 3-х в ряд
		move_ball:0,   // отображение анимации падения шара
		check_score:0, // подсчет отчков
		addBall:0,     // добавляет шар в нижнюю доступную точку
		setBalls:0,    // выбор количества заполненных начальных строк
	},

	selectors:{      // селекторы
		game: document.querySelector('#game'),
		game_menu: document.querySelector('.game_menu'),
		btn_start: document.querySelector('.btn_start'),
		option_btn_start: document.querySelector('.btn_start_i'),

		panel: document.querySelector('.panel'),
		fild_box: document.querySelector('.fild_box'),  // фоновое поле
		biom_box: document.querySelector('.biom_box'),  // основное поле

		option: document.querySelector('.icon_option'), // иконка меню опций
		info: document.querySelector('.icon_info'),     // иконка меню информации
		option_box: document.querySelector('.option_box'), // меню опций
		info_box: document.querySelector('.info_box'),     // меню информации

		score_bg: document.querySelector('.score_bg'),
		score_info: document.querySelector('.score_info'),

		filling: document.querySelector('.filling'),

		message: document.querySelector('.message'),
		ask: document.querySelector('.ask'),
		btn_ask: document.querySelectorAll('.btn_ask'),
	},

	fontSize:20,        // font-size для гибкой модели
	score:0,            // счетчик набранных очков
	max_score_length:7, // max число цифр в набранных очках
	ball_x:0,           // текущая координата падающего шара по Х
	ball_y:0,           // текущая координата падающего шара по Y
}
