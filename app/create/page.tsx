"use client";
import { Fragment, useState, Suspense, useRef, useEffect } from 'react'
import { RadioGroup, Listbox, Transition, Switch } from '@headlessui/react';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// components
import ItemCard from '@/components/ItemCard';
import { classNames } from '@/lib/common';
const ThreeDModel = dynamic(() => import('../../components/ThreeDModel'), {
    suspense: true
});
import UnlockConditionModal from '@/components/Modal/UnlockConditionModal';
import Button from '@/components/Button';

//icons
import {
    CheckCircleIcon
} from '@heroicons/react/20/solid';
import { AiFillSkin, AiOutlineCheck } from 'react-icons/ai';
import { IoIosBody } from 'react-icons/io';
import { HiChevronDown, HiOutlineX, HiCubeTransparent } from 'react-icons/hi';
import { BiCopy, BiCard } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';
import { BsFillShieldFill, BsFillHeartFill } from 'react-icons/bs';
import { GiRubberBoot, GiClover, GiBroadsword } from 'react-icons/gi';

const Categories = [
    {
        name: 'character',
        icon: IoIosBody,
        disabled: false,
        description: 'Character is a humanoid 3D model',
    },
    {
        name: 'skin',
        icon: AiFillSkin,
        disabled: true,
        description: 'Skins are costumes for characters',
    }
];

const AvailableUpgrades = [{
    id: 1,
    name: 'health',
    icon: BsFillHeartFill,
},
{
    id: 2,
    name: 'defense',
    icon: BsFillShieldFill,
},
{
    id: 3,
    name: 'speed',
    icon: GiRubberBoot,
},
{
    id: 4,
    name: 'evasion',
    icon: GiClover,
}];

const totalUpgradeCells = 16;

const NftTypes = [
    {
        name: 'single',
        icon: BiCard,
        description: 'Sell a single unique NFT',
        disabled: false
    },
    {
        name: 'multiple',
        icon: BiCopy,
        description: 'Sell a NFT multiple times',
        disabled: true
    }
];

const currencies = [
    { id: 1, name: 'SOUL', disabled: false, image: '/images/logo.jpg' },
    { id: 2, name: 'TON', disabled: false, image: '/images/tonlogo.jpeg' },
];

type upgradesType = {
    health: number;
    defense: number;
    speed: number;
    evasion: number;
}

type formData = {
    name: string;
    price: string;
    category: 'character' | 'skin';
    type: 'single' | 'multiple';
    currency: 'SOUL' | 'TON';
    listNFT: boolean;
    item: File | null;
    cover: File | null;
    conditions: number[];
    upgrades: upgradesType;
}

type upgradeHoverProps = {
    health: number | null;
    defense: number | null;
    speed: number | null;
    evasion: number | null;
}


export default function Create() {

    // form data state
    const [formData, setFormData] = useState<formData>({
        name: '',
        price: '',
        category: 'character',
        type: 'single',
        currency: 'SOUL',
        listNFT: false,
        item: null,
        cover: null,
        conditions: [],
        upgrades: {
            health: 0,
            defense: 0,
            speed: 0,
            evasion: 0,
        }
    });
    const itemInputRef = useRef<HTMLInputElement>(null);
    const coverInputRef = useRef<HTMLInputElement>(null);
    const [itemUrl, setItemUrl] = useState("");
    const [coverUrl, setCoverUrl] = useState("");
    const [userNfts, setUserNfts] = useState<any[]>([]);
    const [totalUpgrades, setTotalUpgrades] = useState(0);
    const [upgradeHover, setUpgradeHover] = useState<upgradeHoverProps>({
        health: null,
        defense: null,
        speed: null,
        evasion: null,
    });

    // update total upgrades used when upgrades state changes (health + defense + speed + evasion)
    useEffect(() => {
        const { health, defense, speed, evasion } = formData.upgrades;
        setTotalUpgrades(health + defense + speed + evasion);
    }, [formData.upgrades]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCategoryChange = (category: string) => {
        setFormData(prevState => ({
            ...prevState,
            item: null,
            category: category.toLowerCase() as 'character' | 'skin'
        }));
    }

    const handleItemInputClick = () => {
        if (itemUrl !== "") {
            return;
        }
        itemInputRef.current?.click();
    }

    const handleItemUpload = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.files && e.target.files[0]) {
            if (e.target.files[0].size > 50000000) {
                toast.error("File size is too large");
                return;
            }

            setFormData(prevState => ({
                ...prevState,
                item: e.target.files && e.target.files[0]
            }));
            setItemUrl(URL.createObjectURL(e.target.files[0]));

            e.target.value = "";
        }

    }

    const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.files && e.target.files[0]) {
            if (e.target.files[0].size > 10000000) {
                toast.error("File size is too large");
                return;
            }

            setFormData(prevState => ({
                ...prevState,
                cover: e.target.files && e.target.files[0]
            }));
            setCoverUrl(URL.createObjectURL(e.target.files[0]));

            e.target.value = "";
        }
    }

    const handleCreate = () => {
        console.log(formData);
    }



    return (
        <>
            <div className="min-h-full mt-20">
                <main className="py-10">

                    <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">

                        <div className="space-y-10 lg:col-span-2 lg:col-start-1 px-6 max-w-2xl">

                            <h2 className="text-3xl font-bold text-gray-100 sm:text-4xl">Create New NFT</h2>

                            {/* Categories */}
                            <div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-400 leading-6 mb-3">Category</h4>
                                </div>


                                <RadioGroup
                                    value={formData.category}
                                    onChange={(category: string) => handleCategoryChange(category)}
                                >
                                    <RadioGroup.Label className="sr-only">
                                        Choose a category
                                    </RadioGroup.Label>

                                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                        {Categories.map((category) => (
                                            <RadioGroup.Option
                                                key={category.name}
                                                value={category.name}
                                                disabled={category.disabled}
                                                className={({ checked, active }) =>
                                                    classNames(
                                                        category.disabled ? 'cursor-not-allowed bg-gray-800 bg-opacity-70' : 'cursor-pointer',
                                                        checked ? 'border-transparent' : 'border-gray-700',
                                                        active ? 'border-white ring-2 ring-white' : '',
                                                        'relative flex rounded-2xl border p-4 shadow-sm focus:outline-none'
                                                    )
                                                }
                                            >
                                                {({ checked, active }) => (
                                                    <>
                                                        <span className="flex flex-1">
                                                            <span className="flex flex-col">
                                                                <RadioGroup.Label as="span" className="text-sm font-medium text-gray-100 flex items-center">
                                                                    {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                                                                    {category.disabled && (<p className='text-pink-600 text-xs ml-2'>COMING SOON</p>)}
                                                                </RadioGroup.Label>
                                                                <RadioGroup.Description as="span" className="mt-1 flex items-center text-sm text-gray-400">
                                                                    {category.description}
                                                                </RadioGroup.Description>
                                                                <RadioGroup.Description as="span" className="mt-6 text-lg font-medium text-gray-100">
                                                                    <category.icon />

                                                                </RadioGroup.Description>
                                                            </span>
                                                        </span>
                                                        <CheckCircleIcon
                                                            className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-white')}
                                                            aria-hidden="true"
                                                        />
                                                        <span
                                                            className={classNames(
                                                                active ? 'border' : 'border-2',
                                                                checked ? 'border-white' : 'border-transparent',
                                                                'pointer-events-none absolute -inset-px rounded-2xl'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                    </>
                                                )}
                                            </RadioGroup.Option>
                                        ))}
                                    </div>
                                </RadioGroup>

                            </div>

                            {/* upload item */}
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-400 mb-3">Upload Item</label>
                                <div className='relative max-w-lg'>
                                    <div
                                        className={classNames(
                                            "flex justify-center items-center rounded-2xl border-2 border-dashed border-gray-700  w-full aspect-1 max-w-lg cursor-pointer relative",
                                            itemUrl !== "" ? "" : "hover:bg-gray-800"
                                        )}
                                        onClick={handleItemInputClick}
                                    >
                                        {itemUrl !== "" ? (
                                            <div className='w-full h-full overflow-hidden'>
                                                <Suspense fallback={<div role="status" className="flex justify-center items-center h-[35rem] w-screen bg-gray-700 rounded-2xl animate-pulse">
                                                    <HiCubeTransparent className='w-12 h-12 text-gray-400' />
                                                    <span className="sr-only">Loading</span>
                                                </div>}>
                                                    <ThreeDModel
                                                        modelUrl={itemUrl}
                                                        modelScale={1}
                                                        animate
                                                        enableDamping
                                                        enablePan
                                                        enableZoom
                                                        loader={
                                                            <div role="status" className="flex justify-center items-center h-[35rem] w-screen bg-gray-700 rounded-2xl animate-pulse">
                                                                <HiCubeTransparent className='w-12 h-12 text-gray-400' />
                                                                <span className="sr-only">Loading</span>
                                                            </div>
                                                        }
                                                    />
                                                </Suspense>
                                            </div>
                                        ) : (
                                            <div className="space-y-1 text-center">
                                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <div className="flex text-sm text-gray-600 justify-center">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative font-medium text-gray-200 cursor-pointer">
                                                        <span>Upload file</span>
                                                    </label>
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    GLB up to 50MB
                                                </p>
                                            </div>
                                        )}
                                        <input
                                            id="file-upload"
                                            ref={itemInputRef}
                                            name="file-upload"
                                            type="file"
                                            className="sr-only"
                                            onChange={handleItemUpload}
                                            accept=".glb"
                                        />
                                    </div>
                                    {itemUrl !== "" && (
                                        <div
                                            className="absolute top-0 right-0 p-2 rounded-full m-3 cursor-pointer bg-gray-800 shadow-xl hover:scale-110"
                                            onClick={() => {
                                                setFormData({ ...formData, item: null });
                                                setItemUrl("");
                                            }}>
                                            <HiOutlineX className={`h-4 w-4 text-gray-400 stroke-2`} />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* cover image */}
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-400 mb-3">Upload Cover</label>
                                <div className='relative max-w-lg'>
                                    <div
                                        className="flex justify-center items-center rounded-2xl border-2 border-dashed border-gray-700 hover:bg-gray-800 w-full aspect-1 max-w-lg cursor-pointer relative"
                                        onClick={() => coverInputRef.current?.click()}
                                    >
                                        {coverUrl !== "" ? (
                                            <Image
                                                src={coverUrl}
                                                alt="item"
                                                fill
                                                className='object-cover object-center rounded-2xl'
                                            />
                                        ) : (
                                            <div className="space-y-1 text-center">
                                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <div className="flex text-sm text-gray-600 justify-center">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative font-medium text-gray-200">
                                                        <span>Upload Cover</span>
                                                    </label>
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    PNG, JPG, GIF up to 10MB
                                                </p>
                                            </div>
                                        )}
                                        <input
                                            id="file-upload"
                                            ref={coverInputRef}
                                            name="file-upload"
                                            type="file"
                                            className="sr-only"
                                            onChange={handleCoverUpload}
                                            accept={'image/*'}
                                        />
                                    </div>
                                    {coverUrl !== "" && (
                                        <div
                                            className="absolute top-0 right-0 p-2 rounded-full m-3 cursor-pointer bg-gray-800 hover:scale-110"
                                            onClick={() => {
                                                setFormData({ ...formData, cover: null });
                                                setCoverUrl("");
                                            }}>
                                            <HiOutlineX className={`h-4 w-4 text-gray-400 stroke-2`} />
                                        </div>
                                    )}
                                </div>
                            </div>


                            {/* Upgrades */}
                            <div>
                                <div className='flex justify-between items-center mb-4'>
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-200 mb-1">Upgrades</h4>
                                        <h5 className="text-sm font-medium text-gray-400">Available upgrade cells: {totalUpgradeCells - totalUpgrades}</h5>
                                    </div>
                                </div>
                                <div className='bg-gray-800 px-10 py-2 rounded-2xl'>
                                    {AvailableUpgrades.map((upgrade, i) => (
                                        <div key={i} className='flex-row sm:flex justify-between items-center my-6'>
                                            <label className="block text-base font-medium text-gray-400 mb-1 sm:mb-0">
                                                {upgrade.name.charAt(0).toUpperCase() + upgrade.name.slice(1)} upgrade
                                            </label>
                                            <div className='flex items-center mt-1 sm:mt-0'>
                                                {[...Array(10)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className='flex items-center justify-center pr-1 sm:pl-1 cursor-pointer'
                                                        onClick={() => {
                                                            let upgradeNo = formData.upgrades[upgrade.name as keyof upgradesType];
                                                            // i => 0 - 9
                                                            // upgradeNo => 1 - 10

                                                            // the new update should not exceed the total upgrade cells
                                                            if (totalUpgrades + i - upgradeNo < totalUpgradeCells) {
                                                                if (i === 0) {
                                                                    upgradeNo === 0 && setFormData(formData => ({ ...formData, upgrades: { ...formData.upgrades, [upgrade.name]: 1 } }));
                                                                    upgradeNo === 2 && setFormData(formData => ({ ...formData, upgrades: { ...formData.upgrades, [upgrade.name]: 1 } }));
                                                                    upgradeNo > 0 && upgradeNo !== 2 && setFormData(formData => ({ ...formData, upgrades: { ...formData.upgrades, [upgrade.name]: 0 } }));
                                                                } else {
                                                                    setFormData(formData => ({ ...formData, upgrades: { ...formData.upgrades, [upgrade.name]: i + 1 } }));
                                                                }
                                                            } else {
                                                                // if the new update exceeds the total upgrade cells
                                                                // then the upgrade should be set to the max upgrade cells
                                                                setFormData(formData => ({ ...formData, upgrades: { ...formData.upgrades, [upgrade.name]: totalUpgradeCells - totalUpgrades + upgradeNo } }));
                                                            }
                                                        }}
                                                        onMouseEnter={() => {
                                                            let upgradeNo = formData.upgrades[upgrade.name as keyof upgradesType];
                                                            // i => 0 - 9
                                                            // upgradeNo => 1 - 10

                                                            // the new update should not exceed the total upgrade cells
                                                            if (totalUpgrades + i - upgradeNo < totalUpgradeCells) {
                                                                if (i === 0) {
                                                                    upgradeNo === 0 && setUpgradeHover(upgrades => ({ ...upgrades, [upgrade.name]: 1 }));
                                                                    upgradeNo === 2 && setUpgradeHover(upgrades => ({ ...upgrades, [upgrade.name]: 1 }));
                                                                    upgradeNo > 0 && upgradeNo !== 2 && setUpgradeHover(upgrades => ({ ...upgrades, [upgrade.name]: 0 }));
                                                                } else {
                                                                    setUpgradeHover(upgrades => ({ ...upgrades, [upgrade.name]: i + 1 }));
                                                                }
                                                            } else {
                                                                // if the new upgrade exceeds the total upgrade cells then upgrade till the max
                                                                setUpgradeHover(upgrades => ({ ...upgrades, [upgrade.name]: totalUpgradeCells - totalUpgrades + upgradeNo }));
                                                            }
                                                        }}
                                                        onMouseLeave={() => {
                                                            setUpgradeHover(upgrades => ({ ...upgrades, [upgrade.name]: 0 }));
                                                        }}
                                                    >
                                                        {formData.upgrades[upgrade.name as keyof upgradesType] > i ? (
                                                            <upgrade.icon className='w-5 h-5 text-gray-400' />
                                                        ) : (
                                                            <>
                                                                {upgradeHover[upgrade.name as keyof upgradeHoverProps] && upgradeHover[upgrade.name as keyof upgradeHoverProps]! > i ? (
                                                                    <upgrade.icon className='w-5 h-5 text-gray-400 opacity-40' />
                                                                ) : (
                                                                    <upgrade.icon className='w-5 h-5 text-gray-400 opacity-20 dark:opacity-10' />
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            {/* Nft types */}
                            <div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-400 leading-6 mb-3">Type</h4>
                                </div>


                                <RadioGroup
                                    value={formData.type}
                                    onChange={(type) => setFormData({ ...formData, type })}
                                >
                                    <RadioGroup.Label className="sr-only">
                                        Choose a type of nft
                                    </RadioGroup.Label>

                                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                        {NftTypes.map((type) => (
                                            <RadioGroup.Option
                                                key={type.name}
                                                value={type.name}
                                                disabled={type.disabled}
                                                className={({ checked, active }) =>
                                                    classNames(
                                                        type.disabled ? 'cursor-not-allowed bg-gray-800 bg-opacity-70' : 'cursor-pointer',
                                                        checked ? 'border-transparent' : 'border-gray-700',
                                                        active ? 'border-white ring-2 ring-white' : '',
                                                        'relative flex rounded-2xl border p-4 shadow-sm focus:outline-none'
                                                    )
                                                }
                                            >
                                                {({ checked, active }) => (
                                                    <>
                                                        <span className="flex flex-1">
                                                            <span className="flex flex-col">
                                                                <RadioGroup.Label as="span" className="text-sm font-medium text-gray-100 flex items-center">
                                                                    {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                                                                    {type.disabled && (<p className='text-pink-600 text-xs ml-2'>Only for skins</p>)}
                                                                </RadioGroup.Label>
                                                                <RadioGroup.Description as="span" className="mt-1 flex items-center text-sm text-gray-400">
                                                                    {type.description}
                                                                </RadioGroup.Description>
                                                                <RadioGroup.Description as="span" className="mt-6 text-lg font-medium text-gray-100">
                                                                    <type.icon />

                                                                </RadioGroup.Description>
                                                            </span>
                                                        </span>
                                                        <CheckCircleIcon
                                                            className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-white')}
                                                            aria-hidden="true"
                                                        />
                                                        <span
                                                            className={classNames(
                                                                active ? 'border' : 'border-2',
                                                                checked ? 'border-white' : 'border-transparent',
                                                                'pointer-events-none absolute -inset-px rounded-2xl'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                    </>
                                                )}
                                            </RadioGroup.Option>
                                        ))}
                                    </div>
                                </RadioGroup>

                            </div>

                            {/* sell item */}
                            <div className='py-4'>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-200 mb-1">Sell on store</h4>
                                        <label className="block text-sm font-medium text-gray-400">List your item for sale on store</label>
                                    </div>
                                    <Switch
                                        checked={formData.listNFT}
                                        onChange={() => setFormData({ ...formData, listNFT: !formData.listNFT, price: '' })}
                                        className={`${formData.listNFT ? 'bg-white' : 'bg-gray-700'}
          relative inline-flex h-[22px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                    >
                                        <span className="sr-only">Sell Item</span>
                                        <span
                                            aria-hidden="true"
                                            className={`${formData.listNFT ? 'translate-x-7 bg-black' : 'translate-x-0 bg-white'}
            pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out`}
                                        />
                                    </Switch>
                                </div>
                            </div>

                            {/* price input */}
                            {formData.listNFT && (
                                <div className='my-10'>
                                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-400">
                                        Price
                                    </label>
                                    <div className="relative mt-2 rounded-2xl">
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            id="price"
                                            min="0"
                                            className="block w-full h-12 rounded-2xl pl-5 border-0 py-1.5 bg-gray-800 text-gray-200 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-gray-600 text-sm leading-6"
                                            placeholder="0.00"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center">
                                            <Listbox
                                                value={formData.currency}
                                                onChange={
                                                    (currency) => {
                                                        setFormData({ ...formData, currency });
                                                    }}
                                            >
                                                <div className="relative mt-1">
                                                    <Listbox.Button className="relative w-48 cursor-pointer rounded-lg py-2 pl-3 pr-10 text-left sm:text-sm text-gray-400 h-12">
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                                                            <span className="block truncate mr-1">{formData.currency}</span>
                                                            <HiChevronDown
                                                                className="h-5 w-5"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Listbox.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute mt-1 z-40 max-h-60 w-full overflow-auto rounded-md bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {currencies.map((currency) => (
                                                                <Listbox.Option
                                                                    key={currency.id}
                                                                    className={({ active }) =>
                                                                        `relative cursor-default select-none py-2 px-4 ${active ? 'bg-gray-900 text-gray-200' : 'text-gray-400'
                                                                        }`
                                                                    }
                                                                    value={currency.name}
                                                                    disabled={currency.disabled}
                                                                >
                                                                    {({ selected }) => (
                                                                        <div className='flex items-center justify-between'>
                                                                            <div className='flex items-center'>
                                                                                <Image
                                                                                    src={currency.image}
                                                                                    width={28}
                                                                                    height={28}
                                                                                    alt={currency.name + 'currency image'}
                                                                                    className="rounded-full"
                                                                                />
                                                                                <p
                                                                                    className={`block ml-3 text-gray-200  truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                                                    {currency.name}
                                                                                </p>
                                                                            </div>
                                                                            {currency.disabled && (
                                                                                <span
                                                                                    className="text-xs font-semibold inline-block uppercase rounded text-pink-600"
                                                                                >
                                                                                    coming soon
                                                                                </span>
                                                                            )}
                                                                            {selected ? (
                                                                                <span className="flex items-center text-gray-400">
                                                                                    <AiOutlineCheck className="h-4 w-4" aria-hidden="true" />
                                                                                </span>
                                                                            ) : null}
                                                                        </div>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </Listbox>
                                        </div>
                                    </div>

                                    <div className='border border-gray-700 rounded-2xl mt-4 px-6 '>
                                        <div className='flex items-center justify-between w-full my-4 '>
                                            <p className="text-sm font-medium text-gray-400">Service charges</p>
                                            <p className="text-sm font-medium text-gray-400">
                                                <span className='ml-2 text-gray-200'>{formData.price && `${((formData.currency === "SOUL" ? 0.01 : 0.02) * parseFloat(formData.price))} ${formData.currency}`}</span>
                                                <span className='ml-2'>{formData.currency === "SOUL" ? "1 %" : "2 %"}</span>
                                            </p>
                                        </div>
                                        <div className='border-t border-gray-700 w-full'></div>
                                        <div className='flex items-center justify-between w-full my-4'>
                                            <p className="text-sm font-medium text-gray-400">You will receive</p>
                                            <p className="text-sm font-medium text-gray-400">
                                                <span>
                                                    {formData.price ? `${(((formData.currency === "SOUL" ? 0.99 : 0.98)) * parseFloat(formData.price))} ${formData.currency}` : '_'}
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            )}


                            {/* unlock on condition */}
                            <div>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <h4 className="text-xl font-semibold mb-1 text-gray-200">Unlock on condition</h4>
                                        <label className="block text-sm font-medium text-gray-400">Restrict who can buy this item</label>
                                    </div>
                                    <UnlockConditionModal
                                        setConditions={
                                            (conditions: any) => {
                                                setFormData({ ...formData, conditions });
                                            }
                                        }
                                        setUserNfts={setUserNfts}
                                    />
                                </div>
                                {userNfts.length > 0 && (
                                    <p className='text-gray-400 mt-4 font-medium'>Buyer must hold these items to unlock the current item</p>
                                )}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                                    {userNfts.map(nft => (
                                        <div
                                            key={nft.tokenId}
                                            className="flex  hover:bg-opacity-60 primary-hover p-4 rounded-2xl cursor-pointer"
                                        >
                                            <Image
                                                src={nft.image}
                                                width={50}
                                                height={50}
                                                alt={nft.name + ' logo'}
                                                className="rounded-xl"
                                            />
                                            <p className="text-md font-medium ml-3 mt-1 text-gray-400">{nft.name}</p>
                                            <FaTrash
                                                className='ml-auto text-gray-400 hover:text-red-500 self-center cursor-pointer'
                                                onClick={() => {
                                                    const newConditions = formData.conditions.filter(condition => condition !== nft.tokenId)
                                                    setFormData({ ...formData, conditions: newConditions })
                                                    const newUserNfts = userNfts.filter((userNft: any) => userNft.tokenId !== nft.tokenId)
                                                    setUserNfts(newUserNfts)
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>


                            {/* item name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-400">
                                    Item Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="block w-full h-12 rounded-2xl pl-5 border-0 py-1.5 bg-gray-800 text-gray-200 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-gray-600 text-sm leading-6"
                                        placeholder="Enter your item name"
                                    />
                                </div>
                            </div>

                            {/* Create Button */}
                            <div className='mt-20 mb-10'>
                                <Button
                                    type='event'
                                    onClick={handleCreate}
                                    variant="blackNwhite"
                                    className='w-full h-12'
                                >
                                    Create {formData.category}
                                </Button>

                            </div>

                        </div>

                        <section aria-labelledby="timeline-title" className="lg:col-span-1 lg:col-start-3 px-6 max-w-2xl">
                            <ItemCard
                                name={formData.name}
                                price={formData.price}
                                imgSrc={coverUrl}
                                imgAlt={'nft image'}
                                rarity="common"
                                currency={formData.currency}
                            />
                        </section>
                    </div>
                </main>
            </div>
        </>
    )
}
