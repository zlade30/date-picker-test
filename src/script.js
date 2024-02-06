const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectedTime = '9:00 AM';
let selectedTimezone = 'EST';
let selectedDate = '';

function renderCalendar(month, year, selectedDate) {
    const daysElement = document.getElementById('days');
    const monthElement = document.getElementById('month');
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    const monthName = monthNames[month];
    const totalDays = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDayIndex = new Date(year, month, totalDays).getDay();
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const prevMonthDays = firstDayIndex - 1 === -1 ? 6 : firstDayIndex + 1;
    const nextMonthDays = 7 - lastDayIndex;

    let days = '';

    for (let i = prevMonthLastDay - prevMonthDays + 1; i <= prevMonthLastDay; i++) {
        days += `<div class="text-gray-300 py-4 cursor-default">${i}</div>`;
    }

    for (let i = 1; i <= totalDays; i++) {
        const date = `${String(i).padStart(2, '0')}/${month + 1}/${year}`
        const currentDate = `${String(new Date().getDate()).padStart(2, '0')}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
       
        if (date === currentDate) {
            days += `<div class="py-2 flex items-center justify-center"><p onclick="dateSelected('${date}');" id='${date}' class="available-days cursor-pointer bg-[#ec7e76] text-white hover:bg-[#b82419] hover:text-white py-1 w-[30px] rounded-md">${i}</p></div>`;
        } else if (date === selectedDate) {
            days += `<div class="py-2 flex items-center justify-center"><p onclick="dateSelected('${date}');" id='${date}' class="available-days cursor-pointer bg-[#b82419] text-white hover:bg-[#b82419] hover:text-white py-1 w-[30px] rounded-md">${i}</p></div>`;
        } else {
            days += `<div class="py-2 flex items-center justify-center"><p onclick="dateSelected('${date}');" id='${date}' class="available-days cursor-pointer hover:bg-[#b82419] hover:text-white py-1 w-[30px] rounded-md">${i}</p></div>`;
        }
    }

    for (let i = 1; i <= nextMonthDays; i++) {
        days += `<div class="text-gray-300 py-4 cursor-default">${i}</div>`;
    }

    daysElement.innerHTML = days;
    monthElement.textContent = `${monthName} ${year}`;
}

function prevMonth() {
    currentMonth--;
    if (currentMonth === -1) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear, selectedDate);
}

function nextMonth() {
    currentMonth++;
    if (currentMonth === 12) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear, selectedDate);
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('prev-month-btn').addEventListener('click', prevMonth);
    document.getElementById('next-month-btn').addEventListener('click', nextMonth);

    renderCalendar(currentMonth, currentYear);
});

function dateSelected(date) {
    const days = document.getElementsByClassName('available-days');
    const fieldPH = document.getElementById('placeholder');
    const value = document.getElementById('date-value');
    const calendar = document.getElementById('calendar');

    for (var i = 0; i < days.length; i++) {
        days[i].style.backgroundColor = 'white';
        days[i].style.color = 'black';
    }

    const day = document.getElementById(date);
    day.style.backgroundColor = '#b82419';
    day.style.color = 'white';
    fieldPH.style.display = 'none';
    calendar.style.display = 'none';
    value.style.display = 'block';
    value.innerText = `${date} ${selectedTime} (${selectedTimezone})`;
    selectedDate = date;
    console.log(date);
}

function onChangeDate() {
    const calendar = document.getElementById('calendar');
    const chevron = document.getElementById('chevron');

    if (calendar.style.display === 'block') {
        calendar.style.display = 'none';
        chevron.style.transform = 'rotate(0)';
    } else {
        calendar.style.display = 'block';
        chevron.style.transform = 'rotate(180deg)';
    }

    console.log(selectedDate);
    renderCalendar(currentMonth, currentYear, selectedDate);
}

function onSelectTime() {
    const time = document.getElementById('time');
    selectedTime = time.value;
}

function onSelectTimezone() {
    const timezone = document.getElementById('timezone');
    selectedTimezone = timezone.value;
}