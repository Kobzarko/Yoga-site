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
		};
	})
})