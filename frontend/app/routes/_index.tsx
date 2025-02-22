import type { MetaFunction } from "@remix-run/node";

import { useRouteLoaderData } from "@remix-run/react";
import { JSX, useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { FaMicrophone, FaRegSquare } from "react-icons/fa";

import Oracle from "~/oracle";
import { loader as rootLoader } from "~/root";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { content: "Welcome to Remix!", name: "description" }];
};

type ApiResponse = Record<string, number>;

type RecordingState = "idle" | "processing" | "recording";

const oracleText = {
  idle: "Read this sentence for me and I'll guess your accent.",
  recording: "Read this sentence for me and I'll guess your accent.",
  processing: "Have you said enough? Let's see…",
  error: "Something's not right. Try me again.",
} satisfies Record<"error" | RecordingState, string>;

const buttonIcon = {
  idle: <FaMicrophone className="w-[46px] h-[46px] text-bg-primary" />,
  recording: <FaRegSquare className="w-[40px] h-[40px] text-white" />,
  processing: <AiOutlineLoading className="animate-spin w-[46px] h-[46px] text-white" />,
} satisfies Record<RecordingState, JSX.Element>;

const buttonText = {
  idle: "Tap to speak",
  processing: "Loading...",
  recording: "Listening...",
} satisfies Record<RecordingState, string>;

export default function Index() {
  const rootData = useRouteLoaderData<typeof rootLoader>("root");

  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [error, setError] = useState<string>();
  const mediaRecorder = useRef<MediaRecorder>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setError(undefined);
      mediaRecorder.current = new MediaRecorder(stream);
    } catch {
      setError(
        "Audio recording permission is denied. Please refresh the page, grant audio recording permission and try again.",
      );
      return;
    }

    mediaRecorder.current.start();
    setRecordingState("recording");
  };

  const stopRecording = () => {
    if (!mediaRecorder.current) return;

    mediaRecorder.current.stop();
    mediaRecorder.current.ondataavailable = async (event) => {
      const formData = new FormData();
      formData.append("file", event.data, "audio.wav");

      try {
        const result = (await fetch(`${rootData?.ENV.BACKEND_ORIGIN}/predict`, {
          method: "POST",
          body: formData,
        }).then((response) => response.json())) as ApiResponse;
        console.log(result);
        //TODO: ページ遷移する
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Internal server error. Please try again later.");
        }
        setRecordingState("idle");
      }
    };
    setRecordingState("processing");
  };

  return (
    <div className="flex flex-1 flex-col justify-between items-center self-stretch lg:min-h-[456px] min-h-[522px]">
      <div className="gap-[6px] flex items-start self-start min-h-[110px]">
        <div className="w-[60px] h-[60px]">
          <Oracle />
        </div>
        <div
          className={`flex flex-col justify-center items-start gap-[2px] py-3 px-4 border rounded-[20px] rounded-tl-none ${error ? "border-error" : "border-recording"}`}
        >
          <p className={`font-bold text-sm leading-[130%] ${error ? "text-error" : "text-recording"}`}>The Oracle</p>
          <p className="text-white font-medium text-base leading-[130%]">
            {error ? oracleText.error : oracleText[recordingState]}
          </p>
        </div>
      </div>
      <div
        className={`lg:text-4xl text-xl tracking-[-0.6px] lg:text-center ${error ? "text-error" : "text-recording"}`}
      >
        I love exploring local markets and trying out different foods. Whether it&apos;s fresh produce, unique spices,
        or handmade treats, it&apos;s exciting to discover new flavors. I always leave inspired to cook something
        creative at home.
      </div>
      <div className="flex w-full relative flex-col justify-end items-center gap-[12px]">
        <div className="flex justify-center items-center relative overflow-visible h-[90px]">
          <button
            className={`z-20 cursor-pointer flex transition-all duration-200 justify-center items-center rounded-full w-[90px] h-[90px] border ${recordingState === "idle" ? "border-white bg-white" : "border-recording bg-bg-primary"}`}
            disabled={recordingState === "processing"}
            onClick={recordingState === "idle" ? startRecording : stopRecording}
            type="button"
          >
            {buttonIcon[recordingState]}
          </button>
          {recordingState === "recording" && (
            <div className="absolute w-[1082px]">
              <Wave />
            </div>
          )}
          <div
            className={`w-[504px] h-[274px] transition-all will-change-transform absolute left-1/2 transform -translate-x-1/2 blur-[77px] bg-radial-[50%_50%_at_50%_50%] ${error ? "from-error-60" : "from-recording-60"} from-20% to-bg-primary-60`}
          />
        </div>
        <div className="flex flex-col justify-center items-center z-10">
          <svg
            className="rotate-180"
            fill="none"
            height="8"
            viewBox="0 0 21 8"
            width="21"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Arrow</title>
            <path
              className="fill-bg-primary"
              d="M20.5 0L13.5465 6.7712C11.8639 8.4096 9.13605 8.4096 7.45353 6.7712L0.5 0H20.5Z"
            />
          </svg>
          <div className="flex max-w-[280px] py-[6px] px-[12px] justify-center items-center gap-[7.5px] rounded-lg bg-bg-primary">
            {recordingState === "recording" && <div className="bg-listening w-2 h-2 rounded-full" />}
            <p className={`text-center text-sm leading-[120%] font-medium ${error ? "text-error" : "text-recording"}`}>
              {error ?? buttonText[recordingState]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const Wave = () => {
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
};
