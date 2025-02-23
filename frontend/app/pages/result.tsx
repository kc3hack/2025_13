import { useAtomValue } from "jotai";

import Layout from "~/components/layout";
import Oracle from "~/components/oracle";
import { resultAtom } from "~/constants";

export default function Result() {
  const result = useAtomValue(resultAtom);

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
                  <div className="text-white text-base leading-[130%] font-bold">{(probability * 100).toFixed(0)}%</div>
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
