import React, { useEffect, useRef } from "react";
import "../styles/RevolvingProgressBar.css";

const RevolvingProgressBar = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const sweepAngleRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const backgroundColor = "#222222";
    const circleColor = "#444444";
    const progressColor = "magenta";
    const strokeWidth = 25;
    const gapAngle = 15;
    const progressArcLength = 65;
    const margin = 40;
    const cornerRadius = 10;

    const draw = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      sweepAngleRef.current =
        (sweepAngleRef.current + (deltaTime / 1000) * 360) % 360;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = backgroundColor;
      ctx.beginPath();
      ctx.roundRect(0, 0, canvas.width, canvas.height, cornerRadius);
      ctx.fill();

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius =
        Math.min(canvas.width, canvas.height) / 2 - strokeWidth / 2 - margin;

      ctx.strokeStyle = circleColor;
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        radius,
        ((sweepAngleRef.current + gapAngle / 2) * Math.PI) / 180,
        ((sweepAngleRef.current + gapAngle / 2 + 360 - gapAngle) * Math.PI) /
          180
      );
      ctx.stroke();

      ctx.strokeStyle = progressColor;
      ctx.beginPath();
      const progressStartAngle = sweepAngleRef.current - gapAngle / 2;
      ctx.arc(
        centerX,
        centerY,
        radius,
        (progressStartAngle * Math.PI) / 180,
        ((progressStartAngle + progressArcLength) * Math.PI) / 180
      );
      ctx.stroke();

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="progress-spinner">
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        className="revolving-progress-canvas"
      />
    </div>
  );
};

export default RevolvingProgressBar;
