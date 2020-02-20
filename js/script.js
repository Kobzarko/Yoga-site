// назначение обработчика на всю нашу страницу
// событие срабатывает только после полной загрузки страницы
window.addEventListener('DOMContentLoaded', function(){
	'use strict';
	// получаем переменные
	// если получаем через класс не забыть поставить индекс [0] в конце
	let tab = document.querySelectorAll('.info-header-tab'),
	info = document.querySelector('.info-header'),
	tabContent= document.querySelectorAll('.info-tabcontent');
		// прячем остальные табы со страницы
		function hideTabContent(a){
			for(let i=a; i< tabContent.length; i++){
				tabContent[i].classList.remove('show');
				tabContent[i].classList.add('hide');
			}
		}
	// скрываются все табы кроме первого
	hideTabContent(1);

	// показывает определенный таб
	function showTabContent(b){
		if(tabContent[b].classList.contains('hide')){
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}
	// ЖДем клик для выполнения события
	info.addEventListener('click', function(event)
	{
		let target = event.target;
		if(target && target.classList.contains('info-header-tab'))
		{
			for(let i =0; i < tab.length; i++)
			{
				if(target == tab[i]){
					hideTabContent(0);
					showTabContent(i);
					break;
				}
			}
		}
	});


	// Timer

	// конечная дата
    let deadline = new Date(2020, 2, 25);
    // считает разницу между датами
    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor(((t / 1000) / 60) % 60),
            hours = Math.floor((t / 1000 / 60 / 60) % 24),
            days = Math.floor((t / (1000 * 60 * 60 * 24)));

        // hours = Math.floor((t / 1000) / 3600),


        //возвращаем в виде объекта
        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
            'days': days
        };

    }

    // функция будет изменять статическую верстку на динмаическую
    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            days = timer.querySelector('.days'),
            word = timer.querySelector('.word'),
            timeInterval = setInterval(updateClock, 1000); // обновляет данные каждую секунду




        // обновляет данные в выбранных полях
        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num) {
                if (num <= 9) {
                    return "0" + num;
                } else {
                    return num;
                }
            }

            function updateDay(days) {
                if (t.days <= 0) {
                    t.days = '';
                } else {
                    return t.days;
                }
            }

            function changeWord(word) {
                if (t.days == 4 || t.days == 3 || t.days == 2) {
                    return word.textContent = "дня";
                } else if (t.days == 1) {
                    return word.textContent = "день";
                } else if (t.days < 1) {
                    return word.textContent = '';
                } else {
                    return word.textContent = "дней";
                }
            }


            hours.textContent = addZero(t.hours); //  поле часы
            minutes.textContent = addZero(t.minutes); // field minutes
            seconds.textContent = addZero(t.seconds); // field seconds
            days.textContent = updateDay(t.days); // field days
            word.textContent = changeWord(word);

            // 
            //
            //если дата прошла выводим нули
            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
                days.textContent = '';
                word.textContent = '';

            }
        }
    }
    // вызываем 
    setClock('timer', deadline);

	// Modal window---------------------------------------------

	 // our variables
	let more = document.querySelector('.more'),
		overlay = document.querySelector('.overlay'),
		close = document.querySelector('.popup-close');

	// create our window
	more.addEventListener('click', ()=>{
		overlay.style.display = 'block';   // window has appear style after click
		more.classList.add('more-splash'); //add class animation for this button 
		document.body.style.overflow = 'hidden'; // stop scroll site page
	});

	// close our window
	close.addEventListener('click', ()=>{
		overlay.style.display = 'none';    // button has block style after click
		more.classList.remove('more-splash'); // remove classList animation for this button 
		document.body.style.overflow = '';  // can scroll page
	});


	// if you want to cancel to scroll page add this code row
	// document.body.style.overflow = 'hidden'; // stop scroll site page
	// document.body.style.overflow = '';  // can scroll page

    // Form

    let message ={
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с Вами свяжемся!',
        failure: 'Что-то пошло не так'
    };

    //form by create new element in the page
    let form = document.querySelector('.main-form'),
        input = form.getElementsByName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status'); // add class status to new element

        // create event for our form when form will be submit
        form.addEventListener('submit', function(event){
            event.preventDefault(); // cancel standard load method
            form.appenChild(statusMessage); // add new element in the end of parent

            let request = new new XMLHttpRequest(); // create new request
            request.open('POST', 'server.php');

            // FORM DATA EXAMPLE
            // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            
            // JSON FORM EXAMPLE 
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

            // get data in this item from user
            let formData = new FormData(form);

            // create object for JSON EXAMPLE
            let obj ={};
            formData.foreach(function(value, key){
                obj[key] = value;
            });

            // parse in json type data 
            let json = JSON.stringify(json);

            request.send(json);

            //request.send(formData);

            // will react on our request
            request.addEventListener('readystatechange', function(){

                if(request.readyState<4){

                    statusMessage.innerHTML = message.loading; // write loading 

                } else if(request.readyState === 4 && request.status == 200){

                    // here we write success or add some graphic change data from user here
                    statusMessage.innerHTML = message.success; // 'Спасибо! Скоро мы с Вами свяжемся!'

                } else{
                    statusMessage.innerHTML = message.failure; // 'Что-то пошло не так'
                }
            });
                // clean our form after request
               for(let i=0; i< input.lentgh; i++){
                input[i].value = '';
               } 
        });





});