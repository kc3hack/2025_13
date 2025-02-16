import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
    return [
        { title: 'New Remix App' },
        { name: 'description', content: 'Welcome to Remix!' },
    ]
}

export default function Index() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-16">
                <header className="flex flex-col items-center gap-9">
                    <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Welcome to <span className="sr-only">Remix</span>
                    </h1>
                    <div className="h-[144px] w-[434px]">
                        <img
                            src="/logo-light.png"
                            alt="Remix"
                            className="block w-full dark:hidden"
                        />
                        <img
                            src="/logo-dark.png"
                            alt="Remix"
                            className="hidden w-full dark:block"
                        />
                    </div>
                </header>
                <p className="text-gray-700 dark:text-gray-200">
                    Remix is a full-stack web framework for React. It&apos;s
                    built for speed and scalability, and it&apos;s packed with
                    features that make building and maintaining complex
                    applications a breeze.
                </p>
                {/* <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
                    <p className="leading-6 text-gray-700 dark:text-gray-200">
                        What&apos;s next?
                    </p>
                    <ul>
                        {resources.map(({ href, text, icon }) => (
                            <li key={href}>
                                <a
                                    className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {icon}
                                    {text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav> */}
            </div>
        </div>
    )
}
