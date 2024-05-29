'use client'

import Link from "next/link"

export default function Footer() {

    return (
        <div className="flex justify-center items-center">

            <div style={{ maxWidth: 750 }} className="w-full p-4">

                <div className="flex flex-col mt-4">

                    <h3 className="scroll-m-20 border-b text-2xl font-semibold tracking-tight">
                        Touch / Mouse Interactions
                    </h3>

                    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                        <li>Scroll to a sentence and Tap or Click to play TTS</li>
                        <li>Hover the mouse over any word to highlight it</li>
                    </ul>

                </div>

                <div className="flex flex-col mt-4">

                    <h3 className="scroll-m-20 border-b text-2xl font-semibold tracking-tight">
                        Keyboard Interactions
                    </h3>

                    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                        <li><b>Up and Down Arrow Keys:</b> Focus on a sentence</li>
                        <li><b>Space / Enter:</b> Play focused sentence TTS</li>
                        <li><b>Left and Right Arrow Keys:</b> Focus on a word</li>
                        <li><b>Hold Shift + Left or Right Arrow Keys:</b> Focus on multiple words</li>
                        <li><b>N:</b> Skip and Read Next Sentence</li>
                        <li><b>F:</b> Go Fullscreen</li>
                    </ul>

                </div>

                <hr></hr>

                <div className="flex flex-col md:flex-row justify-between gap-6 [&:not(:first-child)]:mt-3">

                    <div className="flex flex-col md:flex-row gap-10 mt-5 md:mt-0">
                        {/* <p className="leading-7 text-center">
                            Made by <Link className="text-blue-500 hover:underline" href="https://www.linkedin.com/in/quinston/" target="blank">Quinston Pimenta</Link>
                        </p> */}
                        <p className="leading-7 text-center">
                            <Link className="hover:underline" href="/terms-of-use" target="blank"><b>Terms of Use</b></Link>
                        </p>
                        <p className="leading-7 text-center">
                            <Link className="hover:underline" href="/privacy-policy" target="blank"><b>Privacy Policy</b></Link>
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row mt-5 md:mt-0">
                        <p className="leading-7 text-center">
                            <Link className="hover:underline" href="https://twitter.com/ADHDReaderApp" target="blank"><b>DM for Support on Twitter</b></Link>
                            {/* <Link className="hover:underline" href="https://twitter.com/messages/compose?recipient_id=1632600493280354304" target="blank">DM for Support on Twitter</Link> */}
                        </p>
                    </div>

                </div>

                <div className="mb-48"></div>

            </div>

        </div>
    )
}
