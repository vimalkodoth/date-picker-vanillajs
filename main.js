(function(){
	
	const defaults = {
		'id' : '#datepicker',
	};

	class DatePicker {
		constructor(options){
			this.options = Object.assign({}, defaults, options);
			this.init();
		}

		init(){
			let date = new Date();
			this.months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
			this.datePickerElement = document.querySelector(this.options.id);
			this.selectedDateElement = this.datePickerElement.querySelector('.selected-date');
			this.datesElement = this.datePickerElement.querySelector('.dates');
			this.mthElement = this.datesElement.querySelector('.month .mth');
			this.nextMthElement = this.datesElement.querySelector('.month .next-mth');
			this.prevMthElement = this.datesElement.querySelector('.month .prev-mth');
			this.daysElement = this.datesElement.querySelector('.dates .days');
			this.day = date.getDate();
			this.month = date.getMonth();
			this.year = date.getFullYear();
			this.selectedDate = date;
			this.selectedDay = this.day;
			this.selectedMonth = this.month;
			this.selectedYear = this.year;
			this.mthElement.textContent = this.months[this.month]+ ' '+this.year;
			this.selectedDateElement.textContent = this.formatDate(date);
			this.nextMthElement.addEventListener('click', this.goToNextMonth.bind(this));
			this.prevMthElement.addEventListener('click', this.goToPrevMonth.bind(this));
			this.datePickerElement.addEventListener('click', this.toggleDatePicker.bind(this))
			this.populateDates();
		}

		goToNextMonth(e){
			this.month++;
			if(this.month > 11){
				this.month = 0;
				this.year++;
			}
			this.mthElement.textContent = this.months[this.month]+' '+this.year;
			this.populateDates();
		}

		goToPrevMonth(e){
			this.month--;
			if(this.month < 0){
				this.month = 11;
				this.year--;
			}
			this.mthElement.textContent = this.months[this.month]+' '+this.year;
			this.populateDates();
		}
		
		populateDates(e){
			let monthDays = new Date(this.year,(this.month+1),0).getDate();
			this.daysElement.innerHTML = '';
			let fragment = document.createDocumentFragment();
			for(let i=0;i<monthDays;i++){
				const ele = document.createElement('div');
				ele.classList.add('day');
				ele.textContent = (i+1);
				if(this.selectedDay === (i+1) && this.selectedYear === this.year && this.selectedMonth === this.month){
					ele.classList.add('selected');
				}
				ele.addEventListener('click', this.selectDate.bind(this,i+1))
				fragment.appendChild(ele);
			}
			this.daysElement.appendChild(fragment);
		}

		selectDate(date){
			this.selectedDate = new Date(this.year+'-'+(this.month+1)+'-'+(date));
			this.selectedDay = date;
			this.selectedMonth = this.month;
			this.selectedYear = this.year;
			this.selectedDateElement.textContent = this.formatDate(this.selectedDate);
			this.selectedDateElement.dataset.value = this.selectedDate;
			this.populateDates();
		}

		formatDate(d){
			let day = d.getDate();
			let month = d.getMonth()+1;
			let year = d.getFullYear();

			if(day < 10){
				day = '0'+day;
			}
			if(month < 10){
				month = '0'+month;
			}

			return day+ '/'+month+'/'+year;
		}

		toggleDatePicker(e){
			if(!this.checkEventPathForClass(e.path, 'dates')){
				this.datesElement.classList.toggle('active');
			}
		}

		checkEventPathForClass(path, selector){
			for(let i=0;i<path.length;i++){
				if(path[i].classList && path[i].classList.contains(selector)){
					return true;
				}
			}
			return false;
		}



	}

	window.DatePicker = DatePicker;

})();



