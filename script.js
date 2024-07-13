const API_URL = 'https://history.muffinlabs.com/date';

const monthEl = document.getElementById('month');
const dayEl = document.getElementById('day');
const eventsEl = document.getElementById('events');
const submitBtn = document.getElementById('submit');
const thisDay = document.getElementById('this-day');

submitBtn.addEventListener('click', handleSubmit);

function getEvents() {
    const month = monthEl.value;
    const day = dayEl.value;
    const url = `${API_URL}/${month}/${day}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const events = data.data.Events;
            const date = data.date;
            thisDay.innerHTML = `<h2>🗓️ Events on ${date} 🗓️</h2>`;
            eventsEl.innerHTML = '';
            events.forEach(event => {
                const year = event.year;
                const text = event.text;
                const eventEl = document.createElement('div');
                eventEl.classList.add('event');
                eventEl.innerHTML = `${year} - ${text}`;
                eventsEl.appendChild(eventEl);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function handleSubmit(event) {
    event.preventDefault();
    getEvents();
}