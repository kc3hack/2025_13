import { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
    return [
        { title: 'Result' },
        { name: 'description', content: 'Result page' },
    ]
}

export default function Result() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-16">
                <header className="flex flex-col items-center gap-9">
                    {/* <h1 className="leading text-2xl font-bold text-green-500 dark:text-gray-100">
                        あなたの方言は<span className="">関西</span>
                        弁です！
                    </h1> */}
                </header>
                <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
                    <p className="leading-6 text-2xl font-bold text-red-500 dark:text-gray-200">
                        あなたの方言は関西弁です！
                    </p>
                    <p className="leading-6 text-gre-700 dark:text-gray-200">
                        Your accent is Japanese my friend. I identified your
                        accent based on subtle details in your pronunciation.
                        Want to sound like a native English speaker? Download
                        the BoldVoice app today.
                    </p>
                </nav>
            </div>
        </div>
    )
}
