import type { LinksFunction } from "@remix-run/node";

import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { PiMicrophoneFill } from "react-icons/pi";

import globalsStylesheetUrl from "~/globals.css?url";

export const links: LinksFunction = () => {
  return [
    { href: "/favicon-96x96.png", rel: "icon", sizes: "96x96", type: "image/png" },
    { href: "/favicon.svg", rel: "icon", type: "image/svg+xml" },
    { href: "/favicon.ico", rel: "shortcut icon" },
    { href: "/apple-touch-icon.png", rel: "apple-touch-icon", sizes: "180x180" },
    { href: "/site.webmanifest", rel: "manifest" },
    { href: globalsStylesheetUrl, rel: "stylesheet" },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="-z-20 bg-[#13141b] text-white font-sans min-h-screen flex flex-col items-center justify-center relative">
          <div
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage: "radial-gradient(circle, #f7bb43 1px, transparent 1px)",
              backgroundSize: "10px 10px",
            }}
          />
          <img alt="BoldVoice Logo" className="h-8 mb-7" src="/apple-touch-icon.png" />{" "}
          <div className="relative z-10 p-[32px] pb-[64px] rounded-[30px] border-1 border-[#f7bb43] h-full min-h-[751px] w-full max-w-[980px] bg-[#13141b] flex flex-col justify-between">
            <div className="flex items-center mb-4 gap-[6px]">
              <div className="w-[60px] h-[60px] p-2 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-red-500 to-pink-500" />
              </div>
              <div className="border border-[#f7bb43] rounded-[20px] rounded-tl-none py-[12px] px-[16px] flex flex-col gap-[2px] leading-[130%]">
                <h1 className="text-sm font-semibold text-[#f7bb43]">The Oracle</h1>
                <p className="text-md font-semibold text-white">
                  Read this sentence for me and I&apos;ll guess your accent.
                </p>
              </div>
            </div>
            <p className="lg:text-4xl text-xl font-medium leading-[110%] tracking-[-0.6px] lg:text-center text-[#F7BB43]">
              Whenever I travel to a new city, I like to explore local bookstores. There&apos;s something magical about
              discovering hidden gems among the shelves and finding a book that feels like it was waiting just for me.
            </p>
            <div className="flex flex-col">
              <div className="flex justify-center">
                <button
                  aria-label="Tap to speak"
                  className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg focus:outline-none"
                  type="button"
                >
                  <PiMicrophoneFill color="#13141b" size="46px" />
                </button>
              </div>
              <p className="mt-2 text-center text-sm font-bold text-[#f7bb43]">Tap to speak</p>
            </div>
          </div>
          <div className="mt-4 text-center font-semibold text-xs leading-none text-[#f7bb43] bg-[#13141b] p-2">
            <p>© 2025 BoldVoice. All rights reserved. </p>
          </div>
        </div>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
