"use client";

import { useEffect, useState } from 'react';

const EventDetail = ({ params }) => {
  const { eventId } = params; 
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`https://qevent-backend.labs.crio.do/events/${eventId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event data');
        }
        const data = await response.json();
        setEventData(data);
        console.log(eventData)
      } catch (err) {
        console.error('Error fetching event data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  if (loading) return <div>Loading event details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!eventData) return <div>Event not found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">

    <div className="flex justify-center">
      <img
        src={eventData.image}
        alt={eventData.name}
        width={600}
        height={400}
        className="rounded-lg shadow-md"
      />
    </div>

    <div className="text-center mt-6">
      <h1 className="text-4xl font-bold text-orange-600">{eventData.name}</h1>
      <p className="text-lg text-gray-600">{eventData.location}</p>
      <p className="text-md text-gray-500 italic">{eventData.artist}</p>
    </div>

    <div className="flex justify-center space-x-2 mt-4">
      {(eventData?.tags ?? []).map((tag, index) => (
        <span
          key={index}
          className="bg-gradient-to-r from-orange-400 to-teal-600 text-white rounded-full px-4 py-1 text-sm font-bold"
        >
          #{tag}
        </span>
      ))}
    </div>

    <div className="mt-6 px-6 text-gray-700 leading-relaxed text-justify">
      {eventData.description}
    </div>

    <div className="flex justify-between items-center mt-8 px-6">
      <span className="text-3xl font-bold text-green-600">${eventData.price}</span>
      <button className="bg-red-500 text-white px-6 py-2 rounded-md text-lg font-semibold hover:bg-red-600 transition">
        Buy Tickets
      </button>
    </div>
  </div>
  );
};

export default EventDetail;
