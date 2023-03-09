"use client"
import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { classNames } from '@/lib/common'
import Image from 'next/image'
import Link from 'next/link'

const navigation = [
    { name: 'Explore', href: '/explore' },
    { name: 'Apps', href: '/apps' },
    { name: 'Create', href: '/create' },
    { name: 'Partner', href: '/partner' }
]

export default function Header() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    let [isOpaque, setIsOpaque] = useState(false);

    useEffect(() => {
        let offset = 50
        function onScroll() {
            if (!isOpaque && window.scrollY > offset) {
                setIsOpaque(true)
            } else if (isOpaque && window.scrollY <= offset) {
                setIsOpaque(false)
            }
        }
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [isOpaque]);

    return (
        <header className={classNames(
            "bg-gray-900 fixed top-0 z-10 w-full",
            isOpaque ? "bg-opacity-90 backdrop-blur transition-colors duration-500" : "bg-opacity-0"
        )}>
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex flex-1">
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-400 hover:text-white">
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>
                <Link href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    <Image
                        className="h-8 w-auto"
                        src="/images/logo.jpg"
                        alt="soulmint logo"
                        width={100}
                        height={100}
                    />
                </Link>
                <div className="flex flex-1 justify-end">
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-400 hover:text-white cursor-pointer">
                        Connect <span className='md:inline hidden'>wallet</span> <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-black px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-1">
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-400"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <Link href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <Image
                                className="h-8 w-auto"
                                src="/images/logo.jpg"
                                alt="soulmint logo"
                                width={100}
                                height={100}
                            />
                        </Link>
                        <div className="flex flex-1 justify-end">
                            <a href="#" className="text-sm font-semibold leading-6 text-gray-100">
                                Connect <span className='md:inline hidden'>wallet</span> <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div>
                    <div className="mt-6 space-y-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-400 hover:bg-gray-900"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}
