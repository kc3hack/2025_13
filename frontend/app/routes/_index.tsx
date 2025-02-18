import type { MetaFunction } from "@remix-run/node";

import { FaMicrophone } from "react-icons/fa";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { content: "Welcome to Remix!", name: "description" }];
};

export default function Index() {
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
