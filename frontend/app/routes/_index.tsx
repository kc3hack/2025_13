import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import type { JSX } from "react";

import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { FaMicrophone, FaRegSquare } from "react-icons/fa";

import Globe from "~/components/globe";
import Layout from "~/components/layout";
import Oracle from "~/components/oracle";
import Wave from "~/components/wave";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { content: "Welcome to Remix!", name: "description" }];
};

type ApiResponse = Record<string, number>;
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

export async function action({ request }: ActionFunctionArgs): Promise<Response> {
  const formData = await request.formData();
  const file = formData.get("request") as File | null;

  if (!file) {
    return Response.json({ error: "No file uploaded" }, { status: 400 });
  }

  const uploadFormData = new FormData();
  uploadFormData.append("request", file);

  try {
    const response = await fetch("http://163.51.196.119/predict", {
      body: uploadFormData,
      method: "POST",
    });

    if (!response.ok) {
      const errorData = (await response.json()) as { detail?: string };

      return Response.json(
        { error: errorData.detail ?? "Internal server error. Please try again later." },
        { status: response.status },
      );
    }
    const result = (await response.json()) as ApiResponse;
    return Response.json({ result });
  } catch {
    return Response.json({ error: "Failed to fetch from prediction server." }, { status: 500 });
  }
}

export default function Index() {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const actionData = useActionData<typeof action>() as { error?: string; result?: ApiResponse };
  const navigation = useNavigation();
  const submit = useSubmit();

  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (actionData?.error) {
      setError(actionData.error);
    }
    setRecordingState("idle");
  }, [actionData]);

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

  const result = actionData?.result;

  if (result) {
    const sortedAccents = Object.entries(result).sort(([, valueA], [, valueB]) => valueB - valueA);
    const top3Accents = sortedAccents.slice(0, 3);
    const predictedAccent = top3Accents[0]?.[0];

    return (
      <Layout status="success">
        <div className="flex flex-1 flex-col items-center self-stretch lg:min-h-[456px] min-h-[522px]">
          <div className="flex w-full h-[220px] items-center justify-center self-start">
            <div className="h-[100px]">
              <Oracle />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-8 w-full">
            <span className="text-[58px] font-medium leading-[120%] text-center" style={{ color: "#11D1A7" }}>
              {predictedAccent}
            </span>
            <div className="flex flex-col items-center gap-4 w-[30%]">
              {top3Accents.map(([accent, probability]) => (
                <div className="flex flex-col gap-2 w-full" key={accent}>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-1 text-white text-base leading-[130%] font-bold">{accent}</div>
                    <div className="text-white text-base leading-[130%] font-bold">
                      {(probability * 100).toFixed(0)}%
                    </div>
                  </div>
                  <div className="h-[12px] relative w-[100%] items-center flex rounded-[16px] border border-[#11D1A7]">
                    <div
                      className="absolute h-[12px] bg-[#11D1A7] rounded-[16px]"
                      style={{ width: `${probability * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // recordingページ退避、if文は適当
  if (error) {
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
              <p className={`text-sm font-bold leading-[130%] ${error ? "text-error" : "text-recording"}`}>
                The Oracle
              </p>
              <p className="text-base font-medium leading-[130%] text-white">
                {error ? oracleText.error : oracleText[recordingState]}
              </p>
            </div>
          </div>
          <div className="text-xl tracking-[-0.6px] text-[#f7bb43] lg:text-4xl lg:text-center">
            I love exploring local markets and trying out different foods. Whether it&apos;s fresh produce, unique
            spices, or handmade treats, it&apos;s exciting to discover new flavors. I always leave inspired to cook
            something creative at home.
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

  return (
    <Layout status={"landing"}>
      <div className="flex flex-1 flex-col items-center self-stretch lg:min-h-[700px] min-h-[522px]">
        <div className="z-20 flex flex-col gap-6">
          <div className="rounded-[30px] relative pt-5 flex items-center justify-center">
            <div className="w-[87px] h-[87px] lg:w-[97px] lg:h-[97px] z-10">
              <div>
                <div className="w-[60px] h-[60px] p-2">
                  <div className="w-full h-full bg-red-500 rounded-full" />
                  {/** <Oracle /> */}
                  {/** ↑エラー吐く */}
                </div>
              </div>
            </div>
            <div className="absolute w-[768px] md:w-[980px] lg:w-[1082px] lg:bottom-[-17px]">
              <img alt="OracleWaveAudioFuzzy" height="100%" src="/OracleWaveAudioFuzzy.png" width="100%" />
            </div>
          </div>
          <div className="flex flex-col gap-6 lg:max-w-[610px] lg:w-[610px] items-center justify-center">
            <div className="flex flex-col w-[100%] items-center gap-5">
              <div className="font-normal font-sofia leading-[80%] lg:text-[65px] text-[60px] text-center uppercase opacity-100 text-white relative top-[9px] mb-[12px]">
                BoldVoice <span className="text-indigo-500">Accent</span> Oracle
              </div>
              <div className="font-medium spacing-[-0.48px] lg:text-2xl text-xl text-center text-indigo-500">
                Do you have an accent when speaking Japanese? I bet I can guess it in 30 seconds or less.
              </div>
            </div>
            <form className="w-full justify-center flex flex-col items-center gap-[16px]">
              <button
                className="flex max-w-[300px] w-[100%] pt-4 pb-4 pl-8 pr-8 rounded-[40px] gap-2 z-20 items-center justify-center cursor-pointer bg-[#fff]"
                type="submit"
              >
                <div className="text-text-contrast-dark text-center font-bold lg:text-xl text-base leading-[120%] spacing-[-0.2px]">
                  Try Me
                </div>
              </button>
              <div className="text-center font-normal text-sm text-indigo-500">
                {/* 元ネタは &quot; なし */}
                Powered by OBACHAN: &quot;Kansaibenn&quot; Accent Training App
              </div>
            </form>
          </div>
        </div>
        <div className="flex flex-col items-center justify-end mt-10 relative h-[280px] w-[100%]">
          <div className="absolute bottom-0 mb-[-32px] h-[307px] w-[825px]">
            <Globe />
          </div>
        </div>
      </div>
    </Layout>
  );
}
