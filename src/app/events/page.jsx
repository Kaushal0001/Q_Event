'use client'; 
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import EventCard from "@/components/EventCard";

 function Events() {
  const searchParams = useSearchParams();
  const artistName = searchParams.get("artist");
  const tagName = searchParams.get("tag");

  const api =  "https://qevent-backend.labs.crio.do/events";

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(api);
        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.statusText}`);
        }
        const data = await response.json();
        setEvents(data);

        if (artistName) {
          const filtered = data.filter(event => event.artist === artistName);
          setFilteredEvents(filtered);
        } else if (tagName) {
          const filtered = data.filter(event => event.tags && event.tags.includes(tagName));
          setFilteredEvents(filtered);
        } else {
          setFilteredEvents(data);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEvents();
  }, [artistName, tagName]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (filteredEvents.length === 0) {
    return <div>No events found for the given filters.</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-3">
        {filteredEvents.map(eventData => (
          <EventCard key={eventData.id} eventData={eventData} />
        ))}
      </div>
    </div>
  );
}

export default function SuspendedEvents() {
  return (
    <Suspense fallback={<div>Loading events...</div>}>
      <Events />
    </Suspense>
  );
}
