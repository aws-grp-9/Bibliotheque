'use client'
import React, { useState } from 'react';
import Navbar from '@/components/ui/header';
//import Footer from '@/components/ui/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

interface Event {
  id: number;
  date: string;
  description: string;
}

const CalendarPage = () => {
  const [events, setEvents] = useState<Event[]>([]); 
  const [date, setDate] = useState<string>('');
  const [eventDescription, setEventDescription] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleAddEvent = () => {
    if (!date || !eventDescription) return;
    const newEvent: Event = {
      id: Date.now(),
      date,
      description: eventDescription
    };
    setEvents([...events, newEvent]);
    setDate('');
    setEventDescription('');
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setDate(event.date);
    setEventDescription(event.description);
  };

  const handleUpdateEvent = () => {
    if (!date || !eventDescription || !selectedEvent) return;
    const updatedEvents = events.map(event => {
      if (event.id === selectedEvent.id) {
        return { ...event, date, description: eventDescription };
      }
      return event;
    });
    setEvents(updatedEvents);
    setSelectedEvent(null);
    setDate('');
    setEventDescription('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Calendrier du Bibliothécaire</h1>
      <div className="flex items-center mb-4">
        <input
          type="date"
          className="mr-4 p-2 border border-green-500 rounded-lg focus:outline-none focus:border-green-600"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description de l'événement"
          className="mr-4 p-2 border border-green-500 rounded-lg focus:outline-none focus:border-green-600"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        />
        {selectedEvent ? (
          <button 
            onClick={handleUpdateEvent} 
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out"
          >
            <FontAwesomeIcon icon={faEdit} className="mr-2" />
            Modifier
          </button>
        ) : (
          <button 
            onClick={handleAddEvent} 
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out"
          >
            <FontAwesomeIcon icon={faCalendarPlus} className="mr-2" />
            Ajouter
          </button>
        )}
      </div>
      <div>
        <h2 className="text-xl font-semibold text-green-600 mb-2">Événements planifiés :</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="border border-green-500 px-4 py-2">Date</th>
              <th className="border border-green-500 px-4 py-2">Description</th>
              <th className="border border-green-500 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="text-gray-800">
                <td className="border border-green-500 px-4 py-2">{event.date}</td>
                <td className="border border-green-500 px-4 py-2">{event.description}</td>
                <td className="border border-green-500 px-4 py-2">
                  <button 
                    onClick={() => handleEditEvent(event)} 
                    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg transition duration-300 ease-in-out mr-2"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button 
                    onClick={() => handleDeleteEvent(event.id)} 
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg transition duration-300 ease-in-out"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const HomeCalendarPage = () => {
  return (
    <>
      <Navbar />
      <CalendarPage />
    </>
  );
};

export default HomeCalendarPage;

