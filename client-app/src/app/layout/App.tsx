import React, { useEffect, useState } from 'react';
import EventDashboard from '../../features/events/dashboard/EventDashboard';
import ResponsiveAppBar from './NavBar';
import { v4 as uuid } from 'uuid';

import { Event } from '../../app/models/event';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import axios from 'axios';

function App() {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        agent.Events.list().then(response => {
            let events: Event[] = [];
            response.forEach(event => {
                event.date = event.date.split('T')[0];
                events.push(event);
            });
            setEvents(events);
            setLoading(false);
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

    /**
     * Handling the Create or the Update for an event.
     * */
    function handleCreateOrEditEvent(event: Event) {
        setSubmitting(true);

        if (event.id) {
            agent.Events.update(event).then(() => {
                setEvents([...events.filter(e => e.id !== event.id), event]);
                setSelectedEvent(event);
                setEditMode(false);
                setSubmitting(false);
            });
        } else {
            //event.id = uuid();
            event.eventCategoryId = '385241f6-4e75-4910-b094-b23bae45e65e';
            event.eventTypeId = 'c28c1812-6bdb-436f-9b8c-ba8387bbf6e8';

            console.log(event);

            axios.post<void>('https://localhost:7246/api/events', event).then(() => {
                console.log('hi');
            });

            agent.Events.create(event).then(() => {
                setEvents([...events, event]);
                setSelectedEvent(event);
                setEditMode(false);
                setSubmitting(false);
            });
        }
    }

    function handleDeleteEvent(id: string) {
        setSubmitting(true);
        agent.Events.delete(id).then(() => {
            setEvents([...events.filter(e => e.id !== id)]);
            setSubmitting(false);
        });
    }

    if (loading) return <LoadingComponent content='Loading App..' />
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
                createOrEdit={handleCreateOrEditEvent}
                deleteEvent={handleDeleteEvent}
                submitting={submitting}
            />
        </>
  );
}

export default App;
