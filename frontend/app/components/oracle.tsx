import { useCallback, useEffect, useRef, useState } from "react";

const setGradient = (context: CanvasRenderingContext2D, angle: number, width: number, height: number) => {
  const x0 = width / 2 + (width / 2) * Math.cos(angle);
  const y0 = height / 2 + (height / 2) * Math.sin(angle);
  const x1 = width / 2 - (width / 2) * Math.cos(angle);
  const y1 = height / 2 - (height / 2) * Math.sin(angle);

  const gradient = context.createLinearGradient(x0, y0, x1, y1);
  gradient.addColorStop(0, "rgba(255, 77, 109, 0.3)");
  gradient.addColorStop(1, "rgba(179, 62, 84, 0)");
  context.fillStyle = gradient;
};

const drawEllipse1 = (context: CanvasRenderingContext2D, time: number, width: number, height: number) => {
  const angle = (time * Math.PI) / 4;

  const coff = Math.cos(2 * (angle - Math.PI / 4));
  context.beginPath();
  setGradient(context, angle, width, height);
  context.ellipse(width / 2, height / 2, width / 2.4, height / 4 - 5 * coff, angle, 0, 2 * Math.PI);
  context.fill();
};

const drawEllipse2 = (context: CanvasRenderingContext2D, time: number, width: number, height: number) => {
  const angle = (time * Math.PI) / 4;

  const coff = Math.cos(2 * (angle + Math.PI / 8));
  context.beginPath();
  setGradient(context, angle, width, height);
  context.ellipse(width / 2, height / 2, width / 2.4 + 3 * coff, height / 4 - 10 * coff, angle, 0, 2 * Math.PI);
  context.fill();
};

const drawEllipse3 = (context: CanvasRenderingContext2D, time: number, width: number, height: number) => {
  const angle = (time * Math.PI) / 4;

  const coff = Math.cos(2 * angle);
  context.beginPath();
  setGradient(context, angle, width, height);
  context.ellipse(width / 2, height / 2, width / 2.4, height / 4 - 2 * coff, angle, 0, 2 * Math.PI);
  context.fill();
};

const drawEllipse4 = (context: CanvasRenderingContext2D, time: number, width: number, height: number) => {
  const angle = (time * Math.PI) / 4;

  const ellipseWidth = time % 4 < 2 ? width / 2.3 : width / 2.7 + 4 * Math.cos((time % 2) * Math.PI);
  context.beginPath();
  setGradient(context, angle, width, height);
  context.ellipse(width / 2, height / 2, ellipseWidth, height / 4, angle, 0, 2 * Math.PI);
  context.fill();
};

const drawEllipse5 = (context: CanvasRenderingContext2D, time: number, width: number, height: number) => {
  const angle = (time * Math.PI) / 4;

  const ellipseHeight = time % 4 < 2 ? height / 3 : height / 3.5 + 3 * Math.cos((time % 2) * Math.PI);
  context.beginPath();
  setGradient(context, angle, width, height);
  context.ellipse(width / 2, height / 2, width / 2.4, ellipseHeight, angle, 0, 2 * Math.PI);
  context.fill();
};

const drawEllipse6 = (context: CanvasRenderingContext2D, time: number, width: number, height: number) => {
  const angle = (time * Math.PI) / 4;

  const ellipseHeight = height / 3.1 + 3 * Math.cos((time % 2) * Math.PI);
  context.beginPath();
  setGradient(context, angle, width, height);
  context.ellipse(width / 2, height / 2, width / 2.4, ellipseHeight, angle, 0, 2 * Math.PI);
  context.fill();
};

const drawBlinking = (context: CanvasRenderingContext2D, time: number, width: number, height: number) => {
  const intensityRadian = (time % 1) * 6 * Math.PI;

  let r = time % 2 < 1 ? width / 15 : width / 30 + 2 * Math.cos(intensityRadian);
  let gradient = context.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, r);
  gradient.addColorStop(0, "rgba(255, 255, 255, 0.5)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  context.beginPath();
  context.fillStyle = gradient;
  context.arc(width / 2, height / 2, width / 12, 0, 2 * Math.PI);
  context.fill();

  r = time % 2 < 1 ? width / 7.5 : width / 15 + 4 * Math.cos(intensityRadian);
  gradient = context.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, r);
  gradient.addColorStop(0, "rgba(255, 255, 255, 0.5)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  context.beginPath();
  context.fillStyle = gradient;
  context.arc(width / 2, height / 2, width / 6.6, 0, 2 * Math.PI);
  context.fill();
};

export default function Oracle() {
  const requestId = useRef<number>(-1);
  const canvasReference = useRef<HTMLCanvasElement>(null);
  const startTime = useRef(performance.now());
  const [dimensions, setDimensions] = useState({ width: 60, height: 60 });

  const animation = useCallback(() => {
    requestId.current = requestAnimationFrame(animation);
    if (!canvasReference.current) return;
    const context = canvasReference.current.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, dimensions.width, dimensions.height);
    const elapsed = (performance.now() - startTime.current) / 1000;

    drawEllipse1(context, elapsed, dimensions.width, dimensions.height);
    drawEllipse2(context, elapsed + 1, dimensions.width, dimensions.height);
    drawEllipse3(context, elapsed + 3, dimensions.width, dimensions.height);
    drawEllipse4(context, elapsed + 4.5, dimensions.width, dimensions.height);
    drawBlinking(context, elapsed, dimensions.width, dimensions.height);
    drawEllipse5(context, elapsed + 1, dimensions.width, dimensions.height);
    drawEllipse6(context, elapsed + 2, dimensions.width, dimensions.height);
  }, [dimensions]);

  useEffect(() => {
    const currentCanvas = canvasReference.current; // Capture the current value

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    if (currentCanvas) {
      resizeObserver.observe(currentCanvas);
    }

    animation();
    return () => {
      cancelAnimationFrame(requestId.current);
      if (currentCanvas) {
        resizeObserver.unobserve(currentCanvas);
      }
    };
  }, [animation]);

  useEffect(() => {
    if (canvasReference.current) {
      canvasReference.current.width = dimensions.width;
      canvasReference.current.height = dimensions.height;
    }
  }, [dimensions]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <canvas ref={canvasReference} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
