import type { MetaFunction } from "@remix-run/node";

import { MdOutlineThumbUpOffAlt } from "react-icons/md";
import { MdOutlineThumbDownOffAlt } from "react-icons/md";
import { IoMdRefresh } from "react-icons/io";
import { CiPlay1 } from "react-icons/ci";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { content: "Welcome to Remix!", name: "description" }];
};

export default function Result() {
  return (
    <div className="flex flex-1 flex-col justify-between items-center self-stretch lg:min-h-[456px] min-h-[522px]">
      <div className="flex items-center justify-center h-screen">
        <div className="w-[80px] h-[80px] p-2">
          <div className="w-full h-full bg-red-500 rounded-full" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="lg:text-8xl text-xl tracking-[-0.6px] lg:text-center text-[#11D1A7]">
          関西弁
        </div>
        <div className="lg:text-4xl text-xl tracking-[-0.6px] lg:text-center text-[#11D1A7]">
          I love exploring local markets and trying out different foods. Whether it&apos;s fresh produce, unique spices,
          or handmade treats, it&apos;s exciting to discover new flavors. I always leave inspired to cook something
          creative at home.
        </div>
      </div>
      <div className="flex w-full relative flex-col justify-end items-center gap-[12px]">
        <div className="flex justify-center items-center relative overflow-visible h-[90px]">
          <button
            className="z-20 cursor-pointer flex transition-all duration-200 justify-center items-center rounded-full w-[200px] h-[50px] bg-white"
            type="button"
          >
            <CiPlay1 className="w-[46px] h-[46px] text-[#13141b]" />
            <p className="lg:text-3xl">
              Replay
            </p>
          </button>
        </div>
        <Detail />
        <button
          className="z-20 cursor-pointer flex transition-all duration-200 justify-center items-center rounded-full w-[200px] h-[50px] bg-white"
          type="button"
        >
          <IoMdRefresh className="w-[46px] h-[46px] text-[#13141b]" />
          <p className="lg:text-3xl">
            Restart
          </p>
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