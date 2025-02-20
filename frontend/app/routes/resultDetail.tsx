import { MdOutlineThumbUpOffAlt } from "react-icons/md";
import { MdOutlineThumbDownOffAlt } from "react-icons/md";

export default function index() {
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
         )
           
}