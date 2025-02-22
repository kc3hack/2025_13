/* eslint-disable unicorn/prevent-abbreviations */
import { useCallback, useEffect, useRef } from "react";

const setGradient = (ctx: CanvasRenderingContext2D, angle: number) => {
  const x0 = 30 + 30 * Math.cos(angle);
  const y0 = 30 + 30 * Math.sin(angle);
  const x1 = 30 - 30 * Math.cos(angle);
  const y1 = 30 - 30 * Math.sin(angle);

  const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
  gradient.addColorStop(0, "rgba(255, 77, 109, 0.3)");
  gradient.addColorStop(1, "rgba(179, 62, 84, 0)");
  ctx.fillStyle = gradient;
};

const drawEllipse1 = (ctx: CanvasRenderingContext2D, time: number) => {
  const angle = (time * Math.PI) / 4;

  const coff = Math.cos(2 * (angle - Math.PI / 4));
  ctx.beginPath();
  setGradient(ctx, angle);
  ctx.ellipse(30, 30, 25, 15 - 5 * coff, angle, 0, 2 * Math.PI);
  ctx.fill();
};

const drawEllipse2 = (ctx: CanvasRenderingContext2D, time: number) => {
  const angle = (time * Math.PI) / 4;

  const coff = Math.cos(2 * (angle + Math.PI / 8));
  ctx.beginPath();
  setGradient(ctx, angle);
  ctx.ellipse(30, 30, 25 + 3 * coff, 15 - 10 * coff, angle, 0, 2 * Math.PI);
  ctx.fill();
};

const drawEllipse3 = (ctx: CanvasRenderingContext2D, time: number) => {
  const angle = (time * Math.PI) / 4;

  const coff = Math.cos(2 * angle);
  ctx.beginPath();
  setGradient(ctx, angle);
  ctx.ellipse(30, 30, 25, 15 - 2 * coff, angle, 0, 2 * Math.PI);
  ctx.fill();
};

const drawEllipse4 = (ctx: CanvasRenderingContext2D, time: number) => {
  const angle = (time * Math.PI) / 4;

  const width = time % 4 < 2 ? 26 : 22 + 4 * Math.cos((time % 2) * Math.PI);
  ctx.beginPath();
  setGradient(ctx, angle);
  ctx.ellipse(30, 30, width, 15, angle, 0, 2 * Math.PI);
  ctx.fill();
};

const drawEllipse5 = (ctx: CanvasRenderingContext2D, time: number) => {
  const angle = (time * Math.PI) / 4;

  const height = time % 4 < 2 ? 20 : 17 + 3 * Math.cos((time % 2) * Math.PI);
  ctx.beginPath();
  setGradient(ctx, angle);
  ctx.ellipse(30, 30, 25, height, angle, 0, 2 * Math.PI);
  ctx.fill();
};

const drawEllipse6 = (ctx: CanvasRenderingContext2D, time: number) => {
  const angle = (time * Math.PI) / 4;

  const height = 19 + 3 * Math.cos((time % 2) * Math.PI);
  ctx.beginPath();
  setGradient(ctx, angle);
  ctx.ellipse(30, 30, 25, height, angle, 0, 2 * Math.PI);
  ctx.fill();
};

const drawBlinking = (ctx: CanvasRenderingContext2D, time: number) => {
  const intensityRadian = (time % 1) * 6 * Math.PI;

  let r = time % 2 < 1 ? 4 : 2 + 2 * Math.cos(intensityRadian);
  let gradient = ctx.createRadialGradient(30, 30, 0, 30, 30, r);
  gradient.addColorStop(0, "rgba(255, 255, 255, 0.5)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.beginPath();
  ctx.fillStyle = gradient;
  ctx.arc(30, 30, 5, 0, 2 * Math.PI);
  ctx.fill();

  r = time % 2 < 1 ? 8 : 4 + 4 * Math.cos(intensityRadian);
  gradient = ctx.createRadialGradient(30, 30, 0, 30, 30, r);
  gradient.addColorStop(0, "rgba(255, 255, 255, 0.5)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.beginPath();
  ctx.fillStyle = gradient;
  ctx.arc(30, 30, 9, 0, 2 * Math.PI);
  ctx.fill();
};

export default function Oracle() {
  const requestId = useRef<number>(-1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startTime = useRef(performance.now());

  const animation = useCallback(() => {
    requestId.current = requestAnimationFrame(animation);
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, 60, 60);
    const elapsed = (performance.now() - startTime.current) / 1000;

    drawEllipse1(ctx, elapsed);
    drawEllipse2(ctx, elapsed + 1);
    drawEllipse3(ctx, elapsed + 3);
    drawEllipse4(ctx, elapsed + 4.5);
    drawBlinking(ctx, elapsed);
    drawEllipse5(ctx, elapsed + 1);
    drawEllipse6(ctx, elapsed + 2);
  }, []);

  useEffect(() => {
    animation();
    return () => cancelAnimationFrame(requestId.current);
  }, [animation]);

  return <canvas height="60px" ref={canvasRef} width="60px" />;
}
