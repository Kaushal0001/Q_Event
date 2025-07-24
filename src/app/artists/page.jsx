"use client";
import { useEffect, useState } from "react";
import { dummyEvents } from "@/constants/dummyEvents";
import ArtistCard from "@/components/ArtistCard";
import React from "react";

export default function Artists(){

    const api = "https://qevent-backend.labs.crio.do/artists";

    const [artists, setArtists] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(api);
                const data = await response.json();
                console.log(data);
                setArtists(data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    return(
        <div className="h-full">
            <div className="grid grid-cols-4">
                {artists.map((artistData) => (
            <ArtistCard key={artistData.id} artistData={artistData} />
            ))}
            </div>
        </div>
     
    );
}