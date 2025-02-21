import type { MetaFunction } from "@remix-run/node";

import RotatingGlobe from "~/components/rotating-globe";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { content: "Welcome to Remix!", name: "description" }];
};

export default function Landing() {
  return (
    <div className="flex flex-1 flex-col items-center self-stretch lg:min-h-[700px] min-h-[522px]">
      <div className="z-20 flex flex-col gap-6">
        <div className="rounded-[30px] relative pt-5 flex items-center justify-center">
          <div className="w-[87px] h-[87px] lg:w-[97px] lg:h-[97px] z-10">
            <div>
              <div className="w-[60px] h-[60px] p-2">
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
          <RotatingGlobe />
        </div>
      </div>
    </div>
  );
}
