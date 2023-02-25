import Image from 'next/image'
import cover from '../public/images/joker_cover.png';


export default function Hero() {

    return (
        <div className="relative isolate bg-gray-900 ">

            <svg
                viewBox="0 0 1108 632"
                aria-hidden="true"
                className="absolute top-10 left-[calc(50%-4rem)] -z-10 w-[69.25rem] max-w-none transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
            >
                <path
                    fill="url(#175c433f-44f6-4d59-93f0-c5c51ad5566d)"
                    fillOpacity=".2"
                    d="M235.233 402.609 57.541 321.573.83 631.05l234.404-228.441 320.018 145.945c-65.036-115.261-134.286-322.756 109.01-230.655C968.382 433.026 1031 651.247 1092.23 459.36c48.98-153.51-34.51-321.107-82.37-385.717L810.952 324.222 648.261.088 235.233 402.609Z"
                />
                <defs>
                    <linearGradient
                        id="175c433f-44f6-4d59-93f0-c5c51ad5566d"
                        x1="1220.59"
                        x2="-85.053"
                        y1="432.766"
                        y2="638.714"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#4F46E5" />
                        <stop offset={1} stopColor="#80CAFF" />
                    </linearGradient>
                </defs>
            </svg>

            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
                    <h1 className="max-w-xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        Unleash your identity in the metaverse
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        the soulbound NFT avatar marketplace that can be used across metaverse.
                    </p>
                    <div className="mt-10 flex items-center gap-x-6">
                        <a
                            href="#"
                            className="rounded-md bg-white hover:bg-gray-200 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm"
                        >
                            Explore Avatars
                        </a>
                        <a href="#" className="text-sm font-semibold leading-6 text-white">
                            Create Avatar <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
                <div className="mt-16 sm:mt-24 lg:mt-0 flex items-center justify-center">
                    <div className='h-96 w-96 relative rounded-lg overflow-hidden cursor-pointer'>
                        <div className="absolute z-10 inset-0 bg-gradient-to-t from-black opacity-40" />
                        <div className="w-full absolute z-20 p-4 bottom-0 flex flex-col ml-1 font-medium text-white">
                            <h3 className="text-lg truncate">
                                Joker
                            </h3>
                            <p className="text-sm">
                                0.01 SOL
                            </p>
                        </div>
                        <Image
                            src={cover}
                            alt=""
                            fill
                            priority
                            placeholder='blur'
                            className='object-cover'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
