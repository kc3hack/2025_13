import type { MetaFunction } from "@remix-run/node";
import {useEffect, useReducer, useState} from "react";
//import { RotatingGlobe } from "../components/RotatingGlobe";

import { MdOutlineThumbUpOffAlt } from "react-icons/md";
import { MdOutlineThumbDownOffAlt } from "react-icons/md";
import { IoMdRefresh } from "react-icons/io";
import { CiPlay1 } from "react-icons/ci";
import { FaMicrophone } from "react-icons/fa";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { content: "Welcome to Remix!", name: "description" }];
};

type State = {
  step: number;
};

type Action = {
  type: "NEXT_STEP";
};

const initialState: State = {
  step: 1,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "NEXT_STEP":
      return { step: state.step < 3 ? state.step + 1 : state.step };
    default:
      return state;
  }
};

function Landing({ dispatch }: { dispatch: React.Dispatch<Action> })  {
  return (
    <div className="flex flex-1 flex-col items-center self-stretch lg:min-h-[700px] min-h-[522px]">
      <div className="z-20 flex flex-col gap-6">
        <div className="rounded-[30px] relative pt-5 flex items-center justify-center">
          <div className="w-[87px] h-[87px] lg:w-[97px] lg:h-[97px] z-10">
            <div>
              <div className="w-[60px] h-[60px] p-2 items-center">
                <div className="w-full h-full bg-red-500 rounded-full" />
              </div>
              {/* <div className="absolute w-[768px] md:w-[980px] lg:w-[1082px] lg:bottom-[-17px]">
                <img alt="OracleWaveAudioFuzzy" src="/public/OracleWaveAudioFuzzy.png" />
              </div> */}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 lg:max-w-[610px] items-center justify-center">
          <div className="flex flex-col items-center gap-5">
            <div className="font-normal leading-[80%] text-center lg:text-[60px] text-[67px] uppercase text-text-primary-dark text-white relative top-[9px] mb-[-12px] pb-[50px]">
              BoldVoice<span className="text-indigo-500">Accent</span>Oracle
            </div>
            <div className="font-medium leading-[120%] spacing-[-0.48px] lg:text-2xl text-center text-indigo-500">
              Do you have an accent when speaking Japanese? I bet I can guess it in 30 seconds or less.
            </div>
          </div>
          <form className="w-full justify-center flex flex-col items-center gap-[16px]">
            <button
              className="flex max-w-[300px] w-[100%] pt-4 pb-4 pl-8 pr-8 rounded-[40px] gap-2 z-20 items-center justify-center cursor-pointer bg-[#fff]"
              type="submit"
              onClick={() => dispatch({ type: "NEXT_STEP" })}
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
          {/* 地球儀 */}
          {/* <RotatingGlobe /> */}
        </div>
      </div>
    </div>
  );
}

function Recording({ next }: { next: () => void }) {
  const [pressCount, setPressCount] = useState(0);

  const handleRecordPress = () => {
    const buttonCount = pressCount + 1;
    setPressCount(buttonCount);  
    
    if (buttonCount >= 2) {
      next();
    }
  };
  
  return (
        <div className="flex flex-1 flex-col justify-between items-center self-stretch lg:min-h-[456px] min-h-[522px]">
          <div className="gap-[6px] flex items-start self-start min-h-[110px]">
            <div className="w-[60px] h-[60px] p-2">
              <div className="w-full h-full bg-red-500 rounded-full" />
            </div>
            <div className="flex flex-col justify-center items-start gap-[2px] pt-3 pb-3 pl-4 pr-4 border border-[#f7bb43] rounded-[20px] rounded-tl-none">
              <p className="text-[#f7bb43] font-bold text-sm leading-[130%]">The Oracle</p>
              <p className="text-white font-medium text-base leading-[130%]">
                Read this sentence for me and I&apos;ll guess your accent.
              </p>
            </div>
          </div>
          <div className="lg:text-4xl text-xl tracking-[-0.6px] lg:text-center text-[#f7bb43]">
            I love exploring local markets and trying out different foods. Whether it&apos;s fresh produce, unique spices,
            or handmade treats, it&apos;s exciting to discover new flavors. I always leave inspired to cook something
            creative at home.
          </div>
          <div className="flex w-full relative flex-col justify-end items-center gap-[12px]">
            <div className="flex justify-center items-center relative overflow-visible h-[90px]">
              <button
                className="z-20 cursor-pointer flex transition-all duration-200 justify-center items-center rounded-full w-[90px] h-[90px] bg-white"
                type="button"
                onClick={handleRecordPress}
              >
                <FaMicrophone className="w-[46px] h-[46px] text-[#13141b]" />
              </button>
              <div className="w-[504px] h-[274px] transition-all will-change-transform absolute left-1/2 transform -translate-x-1/2 blur-[77px] bg-[radial-gradient(50%_50%_at_50%_50%,_rgba(247,_187,_67,_0.60)_20%,_rgba(19,_20,_27,_0.60)_100%)]" />
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
                <path d="M20.5 0L13.5465 6.7712C11.8639 8.4096 9.13605 8.4096 7.45353 6.7712L0.5 0H20.5Z" fill="#13141b" />
              </svg>
              <div className="flex max-w-[280px] py-[6px] px-[12px] justify-center items-center gap-[7.5px] rounded-lg bg-[#13141b]">
                <p className="text-center text-sm leading-[120%] font-medium text-[#f7bb43]">Tap to speak</p>
              </div>
            </div>
          </div>
        </div>
      );
}

function Result({next}: {next: () => void}) {
  return (
    <div className="flex flex-1 flex-col justify-between items-center self-stretch lg:min-h-[456px] min-h-[522px] p-4">
      <div className="flex items-start">
        <div className="w-[80px] h-[80px] p-2">
          <div className="w-full h-full bg-red-500 rounded-full" />
        </div>
      </div>
      
      <div className="flex flex-col gap-4 mb-4">
        <div className="lg:text-8xl text-4xl tracking-[-0.6px] text-center text-[#11D1A7]">
          関西弁
        </div>
        <div className="lg:text-2xl text-xl tracking-[-0.6px] text-center text-[#11D1A7]">
          I love exploring local markets and trying out different foods...
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-6">
        <button
          className="z-20 cursor-pointer flex transition-all duration-200 justify-center items-center rounded-full w-[200px] h-[50px] bg-white"
          type="button"
        >
          <CiPlay1 className="w-[46px] h-[46px] text-[#13141b]" />
          <p className="lg:text-3xl">Replay</p>
        </button>

        <Detail />

        <button
          className="z-20 cursor-pointer flex transition-all duration-200 justify-center items-center rounded-full w-[200px] h-[50px] bg-white"
          type="button"
          onClick={next}
        >
          <IoMdRefresh className="w-[46px] h-[46px] text-[#13141b]" />
          <p className="lg:text-3xl">Restart</p>
        </button>
      </div>
    </div>
  );
}
  
function Detail() {
  return (
    <div className="flex flex-col justify-center items-start gap-[2px] pt-3 pb-3 pl-6 pr-16 border border-[#f7bb43] rounded-[20px] ">
      <div className="m-6  relative flex w-full z-10 items-center justify-center " >

        <div className="flex flex-col w-full h-full  gap-[30px]">

          <p className="font-bold text-white text-2xl ">Here's everything I detect in your voice</p>

          <div className="flex-1 flex-col w-full  ">
            <div className="flex flex-row flex-col w-full  justify-between mb-1">
              <span className=" text-white font-bold leading-[130%]">OSAKA </span>
              <span className=" text-white text-base  font-bold">53 %</span>
            </div>

            <div className="h-[8px] relative w-[100%] items-center flex rounded-[7px] border border-[#f7bb43]">

              <div className="absolute h-[6px] rounded-[8px] bg-white duration-500 w-[53%]" ></div>
            </div>
          </div>

          <div className="flex-1 flex-col w-full  ">
            <div className="flex flex-row flex-col w-full  justify-between mb-1">
              <span className=" text-white font-bold leading-[130%]">NAGOYA </span>
              <span className=" text-white text-base  font-bold">34 %</span>
            </div>

            <div className="h-[8px] relative w-[100%] items-center flex rounded-[7px] border border-[#f7bb43]">
              <div className="absolute h-[6px] rounded-[8px] bg-white duration-500 w-[34%]" ></div>
            </div>

          </div>

          <div className="flex-1 flex-col w-full  ">
            <div className="flex flex-row flex-col w-full  justify-between mb-1">
              <span className=" text-white font-bold leading-[130%]">HIROSHIMA </span>
              <span className=" text-white text-base  font-bold">13 %</span>
            </div>

            <div className="h-[8px] relative w-[100%] items-center flex rounded-[7px] border border-[#f7bb43]">
              <div className="absolute h-[6px] rounded-[8px] bg-white duration-500 w-[13%]" ></div>
            </div>
          </div>

          <div className="flex flex-row flex-col w-full ">

            <div className="w-[45px] h-[45px] bg-red-500 rounded-full mr-4"></div>

            <div className="w-full flex lg:flex-initial flex-1 flex-col justify-center items-start gap-spacing-25 pt-3 pb-3 pl-4 pr-4 border border-[#f7bb43] rounded-[20px] rounded-tl-none">
              <p className="text-[#f7bb43] font-bold text-sm leading-[130%]">Obachan</p>
              <p className="text-white">Tell me, Did I guess correctly ?</p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-spacing-400 flex-1 w-full ">
            <button className="mb-4 z-20 cursor-pointer flex transition-all 
                                                 duration-200 justify-center items-center rounded-full
                                                 w-full h-[48px] border border-[#f7bb43] text-white text-xl " type="button">
              <MdOutlineThumbUpOffAlt className="w-[32px] h-[32px] text-white mr-2"></MdOutlineThumbUpOffAlt>You guessed it!
            </button>
            <button className="z-20 cursor-pointer flex transition-all duration-200
                                                 justify-center items-center rounded-full w-full h-[48px]
                                                 border border-[#f7bb43] text-white text-xl" type="button">
              <MdOutlineThumbDownOffAlt className="w-[32px] h-[32px] text-white mr-2"></MdOutlineThumbDownOffAlt>Sorry, wrong accent</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const nextStep = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  useEffect(() => {
    console.log(`現在のステップ: ${state.step}`);
  }, [state.step]);

  return (
    <div key={state.step}>
      {state.step === 1 && <Landing dispatch={dispatch} />}
      {state.step === 2 && <Recording next={nextStep} />}
      {state.step === 3 && <Result next={nextStep}/>}
    </div>
  );
}
