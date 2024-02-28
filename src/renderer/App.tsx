import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';
import './App.css';
import "tailwindcss/tailwind.css";

dotenv.config();


function Player() {

  const [playlistUrl, setPlaylistUrl] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const playlistIdMatch = playlistUrl.match(/list=([^&]+)/);
    if (playlistIdMatch && playlistIdMatch[1]) {
      const playlistId = playlistIdMatch[1];
      const apiKey = process.env.API_KEY;
      const apiUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${apiKey}`;

      try {
        const response = await axios.get(apiUrl);
        const playlistTitle = response.data.items[0].snippet.title;
        const embedUrl = `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
        setEmbedUrl(embedUrl);
      } catch (error) {
        console.error('Error fetching playlist:', error);
        alert('Error fetching playlist. Please check the URL or try again later.');
      }
    } else {
      alert('Invalid YouTube Playlist URL');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3">
        <h1 className="text-3xl font-bold mb-4">YouTube Playlist Player</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter YouTube Playlist URL"
            className="w-full border rounded py-2 px-3 mb-4"
            value={playlistUrl}
            onChange={(e) => setPlaylistUrl(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        {embedUrl && (
          <div className="mt-8">
            <iframe
              title="YouTube Playlist"
              width="560"
              height="315"
              src={embedUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Player />} />
      </Routes>
    </Router>
  );
}
