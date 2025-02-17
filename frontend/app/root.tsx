import type { LinksFunction } from '@remix-run/node'
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from '@remix-run/react'

import './tailwind.css'

export const links: LinksFunction = () => [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
    },
    {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
    },
]

export function Layout() {
    return (
        <html lang="ja">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            {/* 背景画像は暫定なので後で変更してください */}
            <body className="bg-cover bg-[url(/background_v2.webp)] text-black">
                {/**<div className="bg-[radial-gradient(circle,transparent_20%,transparent_20%)] bg-[length:10px_10px]">**/}
                <header className="flex flex-col items-center gap-9">
                    <h1 className="leading text-2xl font-bold text-gray-500 dark:text-gray-100">
                        関西弁Detector
                    </h1>
                </header>
                <main className="w-full p-4">
                    <div className="border rounded-xl max-w-screen-lg w-full m-auto">
                        <Outlet />
                    </div>
                </main>
                <footer className="flex flex-col items-center gap-4 p-6 text-gray-500 dark:text-gray-200">
                    <p>© 2025 KDIX.Security</p>
                </footer>
                {/*</div>*/}

                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

export default function App() {
    return <Outlet />
}
