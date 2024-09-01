import React, { useState, useRef } from 'react';
import Confetti from 'react-confetti';
import './LoveLetter.css';
import audioFile from './wedding.mp3'; // Replace with appropriate wedding music

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullSize, setIsFullSize] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
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

  const handleOpenLetter = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => {
        setIsFullSize(true);
        if (audioRef.current) {
          audioRef.current.play()
            .then(() => console.log("Playback succeeded"))
            .catch(e => console.error("Playback failed:", e));
        }
      }, 800);
    } else if (messageIndex < totalMessages - 1) {
      setMessageIndex(prevIndex => prevIndex + 1);
      triggerConfetti();
    } else {
      setIsFullSize(false);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setIsOpen(false);
        }
      }, 800);
      setMessageIndex(0);
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
    <div className={`invitation-card ${isOpen ? 'open' : ''}`} onClick={handleOpenLetter}>
      {showConfetti && <Confetti numberOfPieces={300} recycle={false} />}
      <div className="header">Wedding Invitation</div>
      <div className="body">
        {messages[messageIndex]}
      </div>
      <audio ref={audioRef} src={audioFile} onError={(e) => console.error('Audio error:', e.message)} />
    </div>
  );
};

export default LoveLetter;
