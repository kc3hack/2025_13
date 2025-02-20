import type { MetaFunction } from "@remix-run/node";

import { JSX, useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { FaMicrophone, FaRegSquare } from "react-icons/fa";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { content: "Welcome to Remix!", name: "description" }];
};

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
      // TODO: 送信処理を実装する
      const formData = new FormData();
      formData.append("audio", event.data, "audio.wav");
      // fetch("backend", {
      //   method: "POST",
      //   body: formData,
      // });
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // eslint-disable-next-line no-constant-condition
      if (false /* 処理に成功したか？ */) {
        // ページ遷移
      } else {
        setError("エラーが発生しました");
        setRecordingState("idle");
      }
    };
    setRecordingState("processing");
  };

  return (
    <div className="flex flex-1 flex-col justify-between items-center self-stretch lg:min-h-[456px] min-h-[522px]">
      <div className="gap-[6px] flex items-start self-start min-h-[110px]">
        <div className="w-[60px] h-[60px] p-2">
          <div className="w-full h-full bg-red-500 rounded-full" />
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
