import React, { useState } from 'react';
import Calendar from './Calendar';
import EventPopup from './EventPopup';

const App = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div>
      <Calendar events={events} setSelectedDate={setSelectedDate} />
      <EventPopup
        selectedDate={selectedDate}
        events={events}
        setEvents={setEvents}
        onClose={() => setSelectedDate(null)}
      />
    </div>
  );
};

export default App;
