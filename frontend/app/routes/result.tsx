import type { MetaFunction } from "@remix-run/node";

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
            <p className="lg:text-4xl">
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
          <p className="lg:text-4xl">
            Restart
          </p>
        </button>
      </div>
    </div>
  );
}

function Detail() {
  return (
    <div>

    </div>
  )
}