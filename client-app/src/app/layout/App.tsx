import React, { useEffect, useState } from 'react';
import EventDashboard from '../../features/events/dashboard/EventDashboard';
import ResponsiveAppBar from './NavBar';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import { Event } from '../../app/models/event';

function App() {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
      axios.get<Event[]>('https://localhost:7246/api/events')
        .then(response => {
          setEvents(response.data);
        });
    }, []);

    function handleSelectEvent(id: string) {
        setSelectedEvent(events.find(e => e.id === id));
        setEditMode(false);
    }

    function handleCancelSelectEvent() {
        setSelectedEvent(undefined);
        setEditMode(false);
    }

    function handleFormOpen(id?: string) {
        id ? handleSelectEvent(id) : handleCancelSelectEvent();
        setEditMode(true);
    }

    function handleFormClose() {
        setEditMode(false);
    }

    function handleCreateorEditEvent(event: Event) {
        event.id
            ? setEvents([...events.filter(e => e.id !== event.id), event])
            : setEvents([...events, {...event, id: uuid()}]);
        setEditMode(false);
        setSelectedEvent(event);
    }

    function handleDeleteEvent(id: string) {
        setEvents([...events.filter(e => e.id !== id)]);
    }

    return (
        <>
            <ResponsiveAppBar />
            <EventDashboard
                events={events}
                selectedEvent={selectedEvent}
                selectEvent={handleSelectEvent}
                cancelSelectEvent={handleCancelSelectEvent}
                editMode={editMode}
                openForm={handleFormOpen}
                closeForm={handleFormClose}
                createOrEdit={handleCreateorEditEvent}
                deleteEvent={handleDeleteEvent}
            />
        </>
  );
}

export default App;
