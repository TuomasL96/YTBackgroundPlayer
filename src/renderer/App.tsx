import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import "tailwindcss/tailwind.css";

function Player() {
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const playlistIdMatch = playlistUrl.match(/list=([^&]+)/);
    if (playlistIdMatch && playlistIdMatch[1]) {
      const playlistId = playlistIdMatch[1]!;
     
      const embedUrl = `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
      setEmbedUrl(embedUrl);
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
              frameBorder="0"
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
