import React, { useEffect, useRef, useState } from "react";
import namImage from "../assets/hulugram.png";
import openSound from "../assets/open-sound.mp3"; 
import "../index.css";

const GiftBox = () => {
  const [open, setOpen] = useState(false);
  const [keyPop, setKeyPop] = useState(""); // for showing pressed key
  const canvasRef = useRef(null);
  const audioRef = useRef(null); // ref for audio

  const toggleOpen = () => {
    setOpen(prev => {
      if (!prev) audioRef.current.play(); // play sound only when opening
      return !prev;
    });
  };

  // Handle keyboard events
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleOpen();

      // Show key pop
      setKeyPop(e.key === " " ? "Space" : e.key);
      setTimeout(() => setKeyPop(""), 1000); // disappear after 1 second
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let snowflakes = [];
    const maxSnowflakes = Math.max(width / 10, 100);
    let animationFrameId;

    class Snowflake {
      constructor() { this.spawn(); }
      spawn() {
        this.x = Math.random() * width;
        this.y = Math.random() * -50;
        this.xVel = (Math.random() - 0.5) * 0.1;
        this.yVel = 0.02 + Math.random() * 0.08;
        this.size = 7 + Math.random() * 5;
      }
      update() {
        this.x += this.xVel * 16;
        this.y += this.yVel * 16;
        if (this.y > height) this.spawn();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fill();
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      if (snowflakes.length < maxSnowflakes) snowflakes.push(new Snowflake());
      snowflakes.forEach(f => f.update());
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="snow-canvas"></canvas>

      {/* Audio */}
      <audio ref={audioRef} src={openSound} preload="auto" />

      {/* Key pop */}
      {keyPop && <div className="key-pop">{keyPop}</div>}

      {/* Gift Box */}
      <div
        className={`present ${open ? "open" : ""}`}
        onClick={toggleOpen}
        tabIndex={0}
        role="button"
        aria-pressed={open}
      >
        <div className="name">
          <img src={namImage} alt="namlehoai" id="namlehoai" />
        </div>

        <div className="rotate-container">
          <div className="bottom"></div>
          <div className="front"></div>
          <div className="left"></div>
          <div className="back"></div>
          <div className="right"></div>

          <div className="lid">
            <div className="lid-top"></div>
            <div className="lid-front"></div>
            <div className="lid-left"></div>
            <div className="lid-back"></div>
            <div className="lid-right"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GiftBox;
