import type { LinksFunction } from "@remix-run/node";

import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";

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
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
