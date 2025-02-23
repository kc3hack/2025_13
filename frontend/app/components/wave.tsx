import { useCallback, useEffect, useRef } from "react";

export default function Wave() {
  const requestId = useRef<number>(-1);
  const startTime = useRef(performance.now());
  const element = useRef<SVGSVGElement>(null);

  const waveLoop = useCallback(() => {
    requestId.current = requestAnimationFrame(waveLoop);
    if (element.current === null) return;

    const elapsed = (performance.now() - startTime.current) / 1000;
    const scaleY = Math.sin(elapsed * Math.PI);
    element.current.style.transform = `scaleY(${scaleY})`;
  }, []);

  useEffect(() => {
    waveLoop();
    return () => cancelAnimationFrame(requestId.current);
  }, [waveLoop]);

  return (
    <svg viewBox="0 0 1082 267" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <title>Wave</title>
      <g transform="matrix(1,0,0,1,4.1400146484375,133.5)">
        <path
          className="fill-recording"
          d=" M0,0.5 C0,0.5 1073.72998046875,0.5 1073.72998046875,0.5 C1073.72998046875,0.5 1073.72998046875,-0.5 1073.72998046875,-0.5 C1073.72998046875,-0.5 0,-0.5 0,-0.5 C0,-0.5 0,0.5 0,0.5 C0,0.5 0,0.5 0,0.5z"
        />
      </g>
      <g className="origin-center" ref={element}>
        <g transform="matrix(1,0,0,1,0,50.752960205078125)">
          <path
            className="stroke-recording"
            d=" M0,82.89158630371094 C142.49000549316406,82.89158630371094 186.16000366210938,110.44576263427734 219.13999938964844,110.44576263427734 C277.6300048828125,110.44576263427734 303.3699951171875,23.30495262145996 345.0799865722656,23.30495262145996 C395.989990234375,23.30495262145996 427.4700012207031,165.78317260742188 473.6600036621094,165.78317260742188 C522.9600219726562,165.78317260742188 557.77001953125,0 606.3800048828125,0 C654.989990234375,0 683.5999755859375,142.3629150390625 735.0800170898438,142.3629150390625 C776.3300170898438,142.3629150390625 803.22998046875,55.165225982666016 860.7999877929688,55.165225982666016 C900.0999755859375,55.165225982666016 939.4000244140625,82.834716796875 1082,82.834716796875"
            fill="none"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
            strokeOpacity="1"
            strokeWidth="1"
          />
        </g>
        <g transform="matrix(1,0,0,1,0,92.03285217285156)">
          <path
            className="stroke-recording"
            d=" M0,41.583255767822266 C142.49000549316406,41.583255767822266 186.16000366210938,54.22183609008789 219.13999938964844,54.22183609008789 C277.6300048828125,54.22183609008789 303.3699951171875,11.693928718566895 345.0799865722656,11.693928718566895 C395.989990234375,11.693928718566895 427.4700012207031,83.223388671875 473.6600036621094,83.223388671875 C522.9600219726562,83.223388671875 557.77001953125,0 606.3800048828125,0 C654.989990234375,0 683.5999755859375,71.46680450439453 735.0800170898438,71.46680450439453 C776.3300170898438,71.46680450439453 803.22998046875,29.001548767089844 860.7999877929688,29.001548767089844 C900.0999755859375,29.001548767089844 939.4000244140625,41.583255767822266 1082,41.583255767822266"
            fill="none"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
            strokeOpacity="1"
            strokeWidth="1"
          />
        </g>
      </g>
    </svg>
  );
}
