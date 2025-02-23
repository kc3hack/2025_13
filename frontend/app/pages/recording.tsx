import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import { useSetAtom } from "jotai";
import { type JSX, useEffect, useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { FaMicrophone, FaRegSquare } from "react-icons/fa";

import type { ApiResponse, action as indexAction } from "~/routes/_index";

import Layout from "~/components/layout";
import Oracle from "~/components/oracle";
import Wave from "~/components/wave";
import { pageAtom, resultAtom } from "~/constants";

type RecordingState = "idle" | "processing" | "recording";

const oracleText = {
  error: "Something's not right. Try me again.",
  idle: "Read this sentence for me and I'll guess your accent.",
  processing: "Have you said enough? Let's see…",
  recording: "Read this sentence for me and I'll guess your accent.",
} satisfies Record<"error" | RecordingState, string>;

const buttonText = {
  idle: "Tap to speak",
  processing: "Loading...",
  recording: "Listening...",
} satisfies Record<RecordingState, string>;

const buttonIcon = {
  idle: <FaMicrophone className="h-[46px] w-[46px] text-bg-primary" />,
  processing: <AiOutlineLoading className="h-[46px] w-[46px] animate-spin text-white" />,
  recording: <FaRegSquare className="h-[40px] w-[40px] text-white" />,
} satisfies Record<RecordingState, JSX.Element>;

export default function Recording() {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const actionData = useActionData<typeof indexAction>() as undefined | { error?: string; result?: ApiResponse };
  const navigation = useNavigation();
  const submit = useSubmit();
  const setPage = useSetAtom(pageAtom);
  const setResult = useSetAtom(resultAtom);

  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (actionData === undefined) return;

    if (actionData.error) {
      setError(actionData.error);
    } else if (actionData.result) {
      setResult(actionData.result);
      setPage("result");
    }
    setRecordingState("idle");
  }, [actionData, setPage, setResult]);

  const isProcessing = navigation.state === "submitting" || recordingState === "processing";

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setError(undefined);
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.start();
      setRecordingState("recording");
    } catch {
      setError(
        "Audio recording permission is denied. Please refresh the page, grant audio recording permission and try again.",
      );
    }
  };

  const stopRecording = () => {
    if (!mediaRecorder.current) {
      return;
    }

    mediaRecorder.current.stop();
    setRecordingState("processing");

    mediaRecorder.current.ondataavailable = (event) => {
      const file = new File([event.data], "audio.wav", { type: event.data.type });
      const formData = new FormData();
      formData.append("request", file);
      submit(formData, { method: "post", encType: "multipart/form-data" });
    };
  };

  return (
    <Layout status={error ? "error" : "recording"}>
      <div className="flex flex-1 flex-col items-center justify-between self-stretch lg:min-h-[456px] min-h-[522px]">
        <div className="flex min-h-[110px] items-start gap-[6px] self-start">
          <div className="h-[60px] w-[60px]">
            <Oracle />
          </div>
          <div
            className={`flex flex-col items-start justify-center gap-[2px] rounded-[20px] border py-3 px-4 rounded-tl-none ${
              error ? "border-error" : "border-recording"
            }`}
          >
            <p className={`text-sm font-bold leading-[130%] ${error ? "text-error" : "text-recording"}`}>The Oracle</p>
            <p className="text-base font-medium leading-[130%] text-white">
              {error ? oracleText.error : oracleText[recordingState]}
            </p>
          </div>
        </div>
        <div className="text-xl tracking-[-0.6px] text-[#f7bb43] lg:text-4xl lg:text-center">
          I love exploring local markets and trying out different foods. Whether it&apos;s fresh produce, unique spices,
          or handmade treats, it&apos;s exciting to discover new flavors. I always leave inspired to cook something
          creative at home.
        </div>
        <div className="relative flex w-full flex-col items-center justify-end gap-[12px]">
          <div className="relative flex w-full h-[90px] items-center justify-center overflow-visible">
            <button
              className={`z-20 flex h-[90px] w-[90px] cursor-pointer items-center justify-center rounded-full border transition-all duration-200 ${
                recordingState === "idle" ? "bg-white border-white" : "bg-bg-primary border-recording"
              }`}
              disabled={isProcessing}
              onClick={(error) => {
                if (recordingState === "idle") {
                  error.preventDefault();
                  startRecording().catch(console.error);
                } else {
                  error.preventDefault();
                  stopRecording();
                }
              }}
              type="button"
            >
              {buttonIcon[recordingState]}
            </button>
            {recordingState === "recording" && (
              <div className="absolute w-full">
                <Wave />
              </div>
            )}
            <div
              className={`absolute left-1/2 h-[274px] w-[504px] -translate-x-1/2 transform bg-radial-[50%_50%_at_50%_50%] transition-all will-change-transform blur-[77px] ${
                error ? "from-error-60" : "from-recording-60"
              } from-20% to-bg-primary-60`}
            />
          </div>
          <div className="z-10 flex flex-col items-center justify-center">
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
            <div className="flex max-w-[280px] items-center justify-center gap-[7.5px] rounded-lg bg-bg-primary py-[6px] px-[12px]">
              {recordingState === "recording" && <div className="h-2 w-2 rounded-full bg-listening" />}
              <p
                className={`text-center text-sm font-medium leading-[120%] ${error ? "text-error" : "text-recording"}`}
              >
                {error ?? buttonText[recordingState]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
