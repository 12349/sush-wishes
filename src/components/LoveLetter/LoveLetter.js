import React, { useState, useRef } from 'react';
import Confetti from 'react-confetti';
import './LoveLetter.css';
import audioFile from './kushi.mp3'; // Updated to kushi.mp3

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isTurningPage, setIsTurningPage] = useState(false);
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

  const handleOpenBook = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play()
            .then(() => console.log("Playback succeeded"))
            .catch(e => console.error("Playback failed:", e));
        }
      }, 800);
    } else if (pageIndex < totalMessages - 1) {
      setIsTurningPage(true);
      setTimeout(() => {
        setPageIndex(prevIndex => prevIndex + 1);
        setIsTurningPage(false);
        triggerConfetti();
      }, 400); // Duration of page turn effect
    } else {
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setIsOpen(false);
        }
      }, 800);
      setPageIndex(0);
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
    <div className="book" onClick={handleOpenBook}>
      {showConfetti && <Confetti numberOfPieces={300} recycle={false} />}
      <div className={`cover ${isOpen ? 'open' : ''}`}>
        <div className="pages">
          {messages.map((message, index) => (
            <div key={index} className="page" style={{transform: `rotateX(${index * -90}deg)`}}>
              {message}
            </div>
          ))}
        </div>
      </div>
      <audio ref={audioRef} src={audioFile} onError={(e) => console.error('Audio error:', e.message)} />
    </div>
  );
};

export default LoveLetter;
