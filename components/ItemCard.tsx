import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type ItemCardProps = {
    imgSrc?: string;
    imgAlt: string;
    name: string;
    rarity: string;
    price: string;
    currency: string;
    href?: string;
}

const ItemCard = ({
    imgSrc,
    imgAlt,
    name,
    rarity,
    price,
    currency,
    href,
}: ItemCardProps) => {
    return (
        <div
            className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-800 bg-gray-800"
        >
            <div className="bg-gray-800 group-hover:opacity-75 aspect-1 overflow-hidden relative">
                {imgSrc && (
                    <Image
                        src={imgSrc}
                        alt={imgAlt}
                        fill
                        className='object-cover'
                    />
                )}
            </div>
            <div className="flex flex-1 flex-col p-4">
                <h3 className="text-sm font-medium text-gray-100">
                    {href ? (
                        <Link href={href}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {name}
                        </Link>
                    ) : name
                    }
                </h3>
                <p className="text-sm text-gray-400">{rarity}</p>
                <div className="flex flex-1 items-center justify-end mt-4">
                    <p className="text-base font-medium text-gray-100 mr-2">{price}</p>
                    <p className="text-sm italic text-gray-400">{currency}</p>
                </div>
            </div>
        </div>
    )
}

export default ItemCard