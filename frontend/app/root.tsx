import type { LinksFunction } from "@remix-run/node";

import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";

import globalsStylesheetUrl from "~/globals.css?url";

export const links: LinksFunction = () => {
  return [
    {
      href: "/favicon-96x96.png",
      rel: "icon",
      sizes: "96x96",
      type: "image/png",
    },
    { href: "/favicon.svg", rel: "icon", type: "image/svg+xml" },
    { href: "/favicon.ico", rel: "shortcut icon" },
    {
      href: "/apple-touch-icon.png",
      rel: "apple-touch-icon",
      sizes: "180x180",
    },
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
        <div className="bg-[#13141b] relative min-h-[100dvh]">
          <svg className="absolute top-0 left-0 right-0 bottom-0 min-h-[100dvh]" height="100%" width="100%">
            <title>Background</title>
            <defs>
              <pattern height="10" id="pattern" patternUnits="userSpaceOnUse" width="10">
                <rect fill="#13141b" height="10" width="10" />
                <circle cx="5" cy="5" fill="#343434" r="0.5" stroke="#f7bb43" strokeWidth="1.5" />
              </pattern>
            </defs>
            <rect fill="url(#pattern)" height="100%" width="100%" x="0" y="0" />
          </svg>
          <div className="z-10 relative h-[100%] min-h-[100dvh] flex gap-6">
            <div className="pt-[20px] pl-[20px] pr-[20px] lg:ml-auto mr-auto absolute w-[100%] flex lg:items-center lg:justify-center items-start justify-start">
              <a className="pt-1 pb-1 pr-[6px] pl-[6px] bg-[#13141b] text-white font-bold text-2xl" href="/">
                OBACHAN
              </a>
            </div>
            <div className="mt-[88px] mb-[72px] px-[20px] flex items-center flex-col justify-center flex-1">
              <div className="bg-[#13141b] flex flex-col flex-1 overflow-auto lg:p-[32px] lg:pb-[64px] p-[20px] pb-[30px] justify-between items-center rounded-[1.875rem] shadow-[0_0_36px_rgba(0,0,0,0.3)] border border-[#f7bb43] lg:w-[980px] md:max-w-[100%] lg:max-h-[660px] max-h-[100%] min-h-[100%]">
                <Outlet />
              </div>
            </div>
            <div className="max-[427px]:pb-[14px] pb-[24px] ml-auto mr-auto absolute bottom-0 w-[100%] flex items-center justify-center">
              <div className="text-[#f7bb43] flex-row gap-1 flex-wrap bg-[#13141b] py-[5.81px] text-xs leading-[120%] font-bold pr-[20px] pl-[20px] flex items-center justify-center text-center">
                <div>© 2025 KDIX.Security. All rights reserved.</div>
              </div>
            </div>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
