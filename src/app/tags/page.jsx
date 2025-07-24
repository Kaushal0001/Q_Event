"use client";
import { useEffect, useState } from "react";
import Tag from "@/components/Tag";
import React from "react";
import { useRouter } from "next/navigation";

export default function Tags(){

    const api = "https://qevent-backend.labs.crio.do/tags";

    const [tags, setTags] = useState([]);

    const router = useRouter();


    const handleTagClick = (name) => {
      console.log(name);
      router.push(`/events?tag=${encodeURIComponent(name)}`);
  };
    

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch(api);
                const data = await response.json();
                setTags(data);
            } catch (error) {
                console.error("Error fetching tags:", error);
            }
        };

        fetchTags();
    }, []);

    return(
        <div className="h-full">
            <div 
            className="mt-16 rounded-full px-8 py-4 flex flex-wrap justify-center items-center gap-4"
            >
                {tags.map((tagData) => (
            <Tag  key={tagData.id} name={tagData.name} onClick={() => handleTagClick(tagData.name)}/>
            ))}
            </div>
        </div>
     
    );
}