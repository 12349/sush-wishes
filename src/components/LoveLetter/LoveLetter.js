import React, { useState, useRef } from 'react';
import Confetti from 'react-confetti';
import './LoveLetter.css';
import audioFile from './kushi.mp3'; // Updated to kushi.mp3

const LoveLetter = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef(null);

  const messages = [
    "You're Invited to Our Special Day!",
    "Join us for a celebration of love as we get married.",
    "Date: 25th December 2024",
    "Time: 4:00 PM",
    "Location: The Grand Ballroom, City Center",
    "We look forward to celebrating with you!"
  ];

  const totalMessages = messages.length;

  const handleCarouselClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play()
            .then(() => console.log("Playback succeeded"))
            .catch(e => console.error("Playback failed:", e));
        }
      }, 800);
    } else if (currentPage < totalMessages - 1) {
      setCurrentPage(prevPage => {
        triggerConfetti();
        return prevPage + 1;
      });
    } else {
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setIsOpen(false);
        }
      }, 800);
      setCurrentPage(0);
      setShowConfetti(false);
    }
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };

  return (
    <div className="carousel" onClick={handleCarouselClick}>
      {showConfetti && <Confetti numberOfPieces={300} recycle={false} />}
      <div className={`carousel-inner ${isOpen ? 'rotate' : ''}`}>
        {messages.map((message, index) => (
          <div key={index} className="page" style={{ transform: `rotateY(${index * -90}deg)` }}>
            {message}
          </div>
        ))}
      </div>
      <audio ref={audioRef} src={audioFile} onError={(e) => console.error('Audio error:', e.message)} />
    </div>
  );
};

export default LoveLetter;
