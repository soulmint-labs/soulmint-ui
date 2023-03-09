import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { AiFillApple, AiFillWindows } from 'react-icons/ai';
import { FiGlobe } from 'react-icons/fi';

const relatedProducts = [
    {
        id: 1,
        name: 'Fusion',
        category: 'UI Kit',
        href: '#',
        price: '$49',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-05-related-product-01.jpg',
        imageAlt:
            'Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.',
    },
    {
        id: 2,
        name: 'Fusion',
        category: 'UI Kit',
        href: '#',
        price: 'Free',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-05-related-product-01.jpg',
        imageAlt:
            'Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.',
    },
    {
        id: 3,
        name: 'Fusion',
        category: 'UI Kit',
        href: '#',
        price: '$32',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-05-related-product-01.jpg',
        imageAlt:
            'Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.',
    },
    {
        id: 4,
        name: 'Fusion',
        category: 'UI Kit',
        href: '#',
        price: '$12',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-05-related-product-01.jpg',
        imageAlt:
            'Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.',
    },
    {
        id: 5,
        name: 'Fusion',
        category: 'UI Kit',
        href: '#',
        price: 'Free',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-05-related-product-01.jpg',
        imageAlt:
            'Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.',
    },

]

const page = () => {
    return (
        <div className="mx-auto mt-24 max-w-7xl sm:mt-32 px-6">
            <h2 className="text-xl font-medium text-gray-100">Games and apps</h2>
            <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                {relatedProducts.map((product) => (
                    <Link key={product.id} href={`/app/${product.id}`}>
                        <div className="group relative">
                            <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-800">
                                <Image src={product.imageSrc} alt={product.imageAlt} fill className="object-cover object-center group-hover:brightness-50" />
                                <div className="flex items-end p-4 opacity-0 group-hover:opacity-100" aria-hidden="true">
                                    <div className="w-full rounded-md bg-white bg-opacity-90 py-2 px-4 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter">
                                        View App
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-100">
                                <h3>
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    {product.name}
                                </h3>
                                <p>{product.price}</p>
                            </div>
                            {/* <p className="mt-1 text-sm text-gray-500">{product.category}</p> */}
                            <div className="mt-1 flex items-center space-x-2 text-xl font-medium text-gray-500">
                                <AiFillApple />
                                <AiFillWindows />
                                <FiGlobe />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default page