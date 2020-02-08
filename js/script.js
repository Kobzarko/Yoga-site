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

	let deadLine = '2020-02-02';

// получаем данные о времени
function getTimeRemaining(endtime){
	// вычисляем разницу между датами
	// находим количество миллисекунд в промежутке
	let t = Date.parse(endtime) - Date.parse(new Date()),
	//количество секунд
	seconds = Math.floor((t/1000)%60),
	// количество минут
	minutes = Math.floor((t/60000)%60),
	// количество часов
	hours = Math.floor(t/(1000*60*60));
		// РЕЗУЛЬТАТ 
		return{
			'total':t,
			'hours':hours,
			'minutes': minutes,
			'seconds': seconds
		};

	// // количество часов
	// 	hours = Math.floor((t/(1000*60*60)%24);
	// // количество дней	
	// 	days = Math.floor((t/(1000*60*60*24)));
}

// функция для изменения статической верстки
function setClock(id , endtime){
	let timer = document.getElementById('timer'),
		hours = timer.querySelector('.hours'),
		minutes = timer.querySelector('.minutes'),
		seconds = timer.querySelector('.seconds');
		timeinterval = setInterval(updateClock,1000);
		// МЕНЯЕМ текст. значение в тегах с классами
		function updateClock(){
			let t = getTimeRemaining(endtime);
			hours.textContent = t.hours;
			minutes.textContent = t.minutes;
			seconds.textContent = t.seconds;

			if (t.total<=0) {
				clearInterval(timeinterval);
			}
		}
	}

	setClock('timer', deadline);
});