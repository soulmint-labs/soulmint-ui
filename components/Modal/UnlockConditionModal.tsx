"use client"
import React, { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Button from '../Button';
import Image from 'next/image';
import { AiFillCheckCircle } from 'react-icons/ai';
import toast from 'react-hot-toast';



const UnlockConditionModal = ({ setConditions, setUserNfts }: {
    setConditions: any,
    setUserNfts: any
}) => {

    let [isOpen, setIsOpen] = useState(false);
    const [nfts, setNfts] = useState<any>([]);
    const [lockedItems, setLockedItems] = useState<number[]>([]);

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleToggleClick = (id: number) => {
        if (lockedItems.includes(id)) {
            setLockedItems(lockedItems.filter((item) => item !== id));
        } else {
            setLockedItems([...lockedItems, id]);
        }
    };


    const handleLock = () => {
        const selectedNfts = nfts.filter((nft: any) => lockedItems.includes(nft.tokenId));
        setConditions(lockedItems);
        setUserNfts(selectedNfts);
        closeModal();
    }



    return (
        <>
            <Button
                type='event'
                onClick={openModal}
                variant="blackNwhite"
            >
                Add condition
            </Button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-200"
                                    >
                                        Unlock Condition
                                    </Dialog.Title>
                                    <p className='text-gray-400 mt-2 mb-4 text-sm font-medium'>Buyer must hold these items to unlock the current item</p>
                                    {nfts.length === 0 && <p className='text-gray-400 mt-10  font-medium text-center'>You don&apos;t have any NFTs</p>}
                                    <div className='max-h-80 overflow-scroll'>
                                        {nfts.map((nft: any) => (
                                            <div
                                                key={nft.tokenId}
                                                className="flex hover:bg-opacity-60 my-2 primary-bg p-4 rounded-2xl cursor-pointer"
                                                onClick={() => handleToggleClick(nft.tokenId)}
                                            >
                                                <Image
                                                    src={nft.image}
                                                    width={50}
                                                    height={50}
                                                    alt={nft.name + ' logo'}
                                                    className="rounded-xl"
                                                />
                                                <p className="text-md font-medium ml-3 mt-1 text-gray-400">{nft.name}</p>
                                                {lockedItems.includes(nft.tokenId) && (
                                                    <AiFillCheckCircle className='ml-auto text-gray-400 self-center cursor-pointer h-6 w-6' />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <Button
                                        type='event'
                                        onClick={handleLock}
                                        variant="blackNwhite"
                                        className='w-full mt-8'
                                    >
                                        Lock item
                                    </Button>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}


export default UnlockConditionModal;