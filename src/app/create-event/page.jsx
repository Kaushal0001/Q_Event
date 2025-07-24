"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

export default function CreateEvent() {
  const router = useRouter();
  const randomNumber = Math.floor(Math.random() * 99) + 1;
  const [formData, setFormData] = useState({
    id: uuidv4(),
    name: "",
    location: "",
    date: "",
    time: "",
    tags: [],
    image: `https://randomuser.me/api/portraits/men/${randomNumber}.jpg`,
    artist: "",
    price: "",
    description: "ad et deserunt arcu vel morbi et id Ut ultricies adipiscing posuere fames quis vel ea vel senectus turpis sunt bibendum ultrices arcu ac ipsum in minim nisi anim id curae quis luctus pellentesque et proident et ad minim senectus Excepteur ipsum sunt nisi tristique turpis senectus ullamco tristique in primis libero vulputate ac ac mollit nisi et Vivamus et sapien egestas est cubilia Integer Vestibulum amet sagittis ullamco facilisis adipiscing nibh vel quis nec ac Duis Nunc bibendum velit Nullam voluptate labore velit est senectus nec mauris do Excepteur anim qui Donec sit tristique Curabitur et incididunt suscipit culpa at proident sit fermentum Integer nisi in in velit aliquip Etiam dolor ut velit ullamco occaecat aute eiusmod Ut pariatur facilisis in vehicula primis lectus sagittis Praesent irure morbi et volutpat Nullam anim nulla proident eu Pellentesque in mollis magna luctus turpis netus mollis primis Curabitur officia justo elementum ultricies elit at lacus at morbi adipiscing Etiam tincidunt elit ut et sagittis ac malesuada posuere malesuada lectus nec nec ipsum libero enim ipsum in orci minim fringilla scelerisque fringilla amet est erat et sit consectetur eu est laborum mollis velit fugiat dolore et ultrices habitant volutpat pharetra vehicula erat ipsum senectus ac et fermentum lacinia mollis officia sagittis et sed sint libero esse amet erat nec aliquip enim pellentesque mollit eiusmod in ut fringilla fringilla sit porta arcu id dolor erat bibendum in leo vehicula sint tristique ante qui habitant libero malesuada sit exercitation curae et in sagittis elit porta at ultricies commodo vehicula eiusmod Pellentesque quis fames tristique ipsum arcu sit morbi anim cupidatat mollis in scelerisque aute amet velit scelerisque adipiscing pellentesque egestas Nullam malesuada ac ac libero non non qui cubilia sit cillum id ornare nec fringilla vehicula eiusmod do Excepteur Aliquam suscipit ornare facilisis Nunc netus volutpat incididunt nulla voluptate Fusce habitant lacus ut occaecat sit vel ultricies est Nullam volutpat minim habitant velit turpis ultricies fringilla tristique fames amet nulla porta Excepteur laboris nunc sagittis in bibendum officia turpis volutpat ac laborum habitant suscipit justo proident ac eu ipsum enim Excepteur posuere Etiam eiusmod fugiat in tristique officia dolor est cubilia id laboris et bibendum ac Integer ad velit Integer aliqua Pellentesque amet dolor libero sagittis consectetur magna fermentum pellentesque ornare malesuada justo vehicula ultrices fringilla consectetur malesuada ut tempor malesuada curae ac vulputate proident enim faucibus aliqua in Curabitur lacus Nunc tristique Vivamus dolor anim nec mauris consectetur Nullam sagittis Donec malesuada commodo malesuada lacus mollis erat sagittis id dolore dolore est dolore ornare fugiat amet Nullam Lorem et malesuada Nullam dolore et sunt Vivamus arcu volutpat libero consectetur eiusmod sit suscipit ex primis Sed ac mollis ac Vestibulum erat lectus exercitation et quis dolore ac eu cupidatat lectus sagittis tincidunt",

  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTag, setCurrentTag] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagChange = (e) => {
    setCurrentTag(e.target.value);
  };

  const addTag = () => {
    if (currentTag.trim() !== "") {
      setFormData({ ...formData, tags: [...formData.tags, currentTag.trim()] });
      setCurrentTag(""); 
    }
  };

  const removeTag = (index) => {
    const updatedTags = formData.tags.filter((_, i) => i !== index);
    setFormData({ ...formData, tags: updatedTags });
  };

  const handleEventCreate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log(formData);
      const response = await fetch("https://qevent-backend.labs.crio.do/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Event created successfully!");
        
        setFormData({
          id: "",
          name: "",
          location: "",
          date: "",
          time: "",
          tags: [],
          image: "",
          artist: "",
          price: "",
          description: "",
      
        });
        router.push("/events");
      } else {
        const error = await response.json();
        alert("Event creation failed");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center ">Create a New Event</h1>
      <form onSubmit={handleEventCreate} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name">Event Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location">Event location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tags">Tags:</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              id="tags"
              value={currentTag}
              onChange={handleTagChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={addTag}
              className="bg-indigo-500 text-white px-3 py-2 rounded-md shadow-sm"
            >
              Add Tag
            </button>
          </div>
          <div className="mt-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-md m-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="ml-2 text-red-500"
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="artist">Artist:</label>
          <input
            type="text"
            id="artist"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          ></textarea>
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          {isSubmitting ? "Submitting..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}
