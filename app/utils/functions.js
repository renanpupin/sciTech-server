module.exports = function() { 
	return {
		formatDate: function (dateToFormat){
			var dateValue = new Date(dateToFormat);
			var monthValue = dateValue.getMonth() + 1;
			var dayValue = dateValue.getDate();
			var yearValue = dateValue.getFullYear();
			var hoursValue = dateValue.getHours();
			var minutesValue = dateValue.getMinutes();

			if ( monthValue < 10 )
			monthValue = '0' + monthValue;
			if ( dayValue < 10 )
			dayValue = '0' + dayValue;
			if ( hoursValue < 10 )
			hoursValue = '0' + hoursValue;
			if ( minutesValue < 10 )
			minutesValue = '0' + minutesValue;

			// dd/mm/yyyy-hh mm:ss
			return (dayValue + '/' + monthValue + '/' + yearValue + ' às ' + hoursValue + ':' + minutesValue);
		},
		formatDateYyMmDd: function (dateToFormat){
			var dateValue = new Date(dateToFormat);
			var monthValue = dateValue.getMonth() + 1;
			var dayValue = dateValue.getDate();
			var yearValue = dateValue.getFullYear();
			var hoursValue = dateValue.getHours();
			var minutesValue = dateValue.getMinutes();

			if ( monthValue < 10 )
			monthValue = '0' + monthValue;
			if ( dayValue < 10 )
			dayValue = '0' + dayValue;
			if ( hoursValue < 10 )
			hoursValue = '0' + hoursValue;
			if ( minutesValue < 10 )
			minutesValue = '0' + minutesValue;

			// yyyy-mm-dd
			return (yearValue + '-' + monthValue + '-' + dayValue);
		},
		formatDateWithoutTime: function (dateToFormat){
			var dateValue = new Date(dateToFormat);
			var monthValue = dateValue.getMonth() + 1;
			var dayValue = dateValue.getDate();
			var yearValue = dateValue.getFullYear();

			if ( monthValue < 10 )
			monthValue = '0' + monthValue;
			if ( dayValue < 10 )
			dayValue = '0' + dayValue;

			// dd/mm/yyyy-hh mm:ss
			return (dayValue + '/' + monthValue + '/' + yearValue);
		},
		resetTimeFromDate: function (dateToFormat){
			var formated_date = new Date(dateToFormat).toUTCString();
			formated_date = formated_date.split(' ').slice(0, 4).join(' ');
			//y-m-d 00:00
			return new Date(formated_date);
		},
		addEndOfDayTimeFromDate: function (dateToFormat){
			var formated_date = new Date(dateToFormat);
			formated_date = new Date(formated_date).setHours(23);
			formated_date = new Date(formated_date).setMinutes(59);
			formated_date = new Date(formated_date).setSeconds(59);
			return new Date(formated_date);
		}
	}
}();