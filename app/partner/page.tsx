"use client";
import React, { useState, Fragment, useRef } from 'react';
import Step from '@/components/Step';
import Button from '@/components/Button';
import { AiFillApple, AiFillWindows } from 'react-icons/ai';
import { BiGlobe } from 'react-icons/bi';
import { classNames } from '@/lib/common';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { Listbox, Transition } from '@headlessui/react';
import Image from 'next/image';
import { AiOutlineCheck } from 'react-icons/ai';
import { HiChevronDown } from 'react-icons/hi';
import toast from 'react-hot-toast';


const platformOptions = [
    {
        id: 1,
        name: 'web',
        icon: BiGlobe
    },
    {
        id: 2,
        name: 'windows',
        icon: AiFillWindows
    },
    {
        id: 3,
        name: 'mac',
        icon: AiFillApple
    },
];

const paymentOptions = [
    {
        id: 1,
        name: 'Free'
    },
    {
        id: 2,
        name: 'One Time'
    },
    {
        id: 3,
        name: 'Subscription'
    }
];

const currencies = [
    { id: 1, name: 'TRX', disabled: false, image: '/images/trxLogo.png' },
    { id: 2, name: 'SOUL', disabled: false, image: '/images/logo.png' },
];


type formData = {
    name: string;
    description: string;
    payment: string;
    price: string;
    currency: string;
    platform: string[];
    appLinks: {
        web: string;
        windows: string;
        mac: string;
    };
    images: File[];
};

type appLinks = {
    web: string;
    windows: string;
    mac: string;
};

type OnlyAppLinks = keyof appLinks;

type formErrors = {
    name: string;
    description: string;
    price: string;
    platform: string;
    appLinks: {
        web: string;
        windows: string;
        mac: string;
    };
    images: string;
};

const Partner = () => {

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<formData>({
        name: '',
        description: '',
        payment: 'Free',
        price: '',
        currency: 'SOUL',
        platform: [],
        appLinks: {
            web: '',
            windows: '',
            mac: '',
        },
        images: [],
    });

    // usestate for form errors
    const [formErrors, setFormErrors] = useState<formErrors>({
        name: '',
        description: '',
        price: '',
        platform: '',
        appLinks: {
            web: '',
            windows: '',
            mac: '',
        },
        images: '',
    });

    const validateTravel = (toStep: number) => {

        // reset form errors
        setFormErrors({
            name: '',
            description: '',
            price: '',
            platform: '',
            appLinks: {
                web: '',
                windows: '',
                mac: '',
            },
            images: '',
        });


        switch (step) {
            case 1:
                // name and description validation
                if (formData.name === '') {
                    setFormErrors({ ...formErrors, name: 'Please enter name' });
                    break;
                }
                if (formData.description === '') {
                    setFormErrors({ ...formErrors, description: 'Please enter description' });
                    break;
                }
                setStep(toStep);
                break;
            case 2:
                // plaform validation
                if (formData.platform.length === 0) {
                    setFormErrors({ ...formErrors, platform: 'Please select at least one platform' });
                    break;
                }
                setStep(toStep);
                break;
            case 3:
                // price validation
                if (formData.price === '' && formData.payment !== 'Free') {
                    setFormErrors({ ...formErrors, price: 'Please enter price' });
                    break;
                }
                setStep(toStep);
                break;
            case 4:
                // app links validation
                if (formData.appLinks.web === '' && formData.platform.includes('web')) {
                    setFormErrors({ ...formErrors, appLinks: { ...formErrors.appLinks, web: 'Please enter web link' } });
                    break;
                }
                if (formData.appLinks.windows === '' && formData.platform.includes('windows')) {
                    setFormErrors({ ...formErrors, appLinks: { ...formErrors.appLinks, windows: 'Please enter windows link' } });
                    break;
                }
                if (formData.appLinks.mac === '' && formData.platform.includes('mac')) {
                    setFormErrors({ ...formErrors, appLinks: { ...formErrors.appLinks, mac: 'Please enter mac link' } });
                    break;
                }
                setStep(toStep);
                break;
            default:
                setStep(toStep);
                break;
        }
    }

    const handleNext = () => {
        validateTravel(step + 1);
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };

    const handleGoTo = (toStep: number) => {
        validateTravel(toStep);
    };

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        console.log(formData);
    }



    return (
        <div className='pt-32 min-h-screen flex flex-col'>
            <h2 className='text-lg md:text-2xl font-bold text-white text-center'>Become a partner</h2>
            <div className='flex items-center justify-center my-10'>
                <Step
                    steps={[1, 2, 3, 4, 5].map((stepNumber) => ({
                        name: `Step ${stepNumber}`,
                        status: step > stepNumber ? 'complete' : step < stepNumber ? 'upcoming' : 'current',
                    }))}
                    handleGoToStep={handleGoTo}
                />
            </div>
            <div className='flex-1 flex flex-col justify-between pb-12 px-4 sm:px-6 lg:px-8'>
                <div className='w-full max-w-3xl mx-auto '>
                    {step === 1 && (
                        <StepOne
                            formData={formData}
                            formErrors={formErrors}
                            handleChange={handleChange}
                        />
                    )}
                    {step === 2 && (
                        <StepTwo
                            formData={formData}
                            setFormData={setFormData}
                            formErrors={formErrors}
                        />
                    )}
                    {step === 3 && (
                        <StepThree
                            formData={formData}
                            setFormData={setFormData}
                            formErrors={formErrors}
                            handleChange={handleChange}
                        />
                    )}
                    {step === 4 && (
                        <StepFour
                            formData={formData}
                            formErrors={formErrors}
                            setFormData={setFormData}
                        />
                    )}
                    {step === 5 && (
                        <StepFive
                            formData={formData}
                            formErrors={formErrors}
                            setFormData={setFormData}
                        />
                    )}
                </div>
                <div className='max-w-3xl w-full mx-auto flex justify-between'>

                    <Button
                        type='event'
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={step === 1}
                    >
                        Previous
                    </Button>

                    {step === 5 ? (
                        <Button
                            type='event'
                            variant="blackNwhite"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    ) : (
                        <Button
                            type='event'
                            variant="blackNwhite"
                            onClick={handleNext}
                        >
                            Continue
                        </Button>
                    )}


                </div>
            </div>
        </div>
    )
}

// Step 1: name and description
const StepOne = ({
    formData,
    handleChange,
    formErrors
}: {
    formData: formData,
    handleChange: (event: any) => void,
    formErrors: formErrors
}) => {
    return (
        <>
            <div className="space-y-12 py-14">
                <div>
                    <h2 className="font-extrabold text-white text-xl sm:text-2xl  md:text-4xl">
                        <span className="block">Whats your project?</span>
                    </h2>
                    <p className="mt-2 text-sm md:text-lg text-gray-400">
                        This information will be displayed in the marketplace.
                    </p>

                    <div className="mt-6 space-y-6">

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-400">
                                Name
                            </label>
                            <div className="relative mt-1 rounded-md shadow-sm">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={handleChange}
                                    value={formData.name}
                                    className={classNames(
                                        "block w-full h-10 rounded-lg border-0 py-1.5 bg-gray-800 text-gray-200 shadow-sm ring-1 ring-inset  placeholder:text-gray-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
                                        formErrors.name ? "ring-red-600 focus:ring-red-600" : "ring-gray-900 focus:ring-gray-600"
                                    )}
                                    placeholder="Enter your App / Game name"
                                />
                                {formErrors.name && (
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                    </div>
                                )}
                            </div>
                            {formErrors.name && (
                                <p className="mt-2 text-sm text-red-600" id="email-error">
                                    {formErrors.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-400">
                                Description
                            </label>
                            <div className="mt-1">
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    onChange={handleChange}
                                    value={formData.description}
                                    className={classNames(
                                        "block w-full min-h-[100px] max-h-[200px] rounded-lg border-0 py-1.5 bg-gray-800 text-gray-200 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
                                        formErrors.description ? "ring-red-600 focus:ring-red-600 placeholder:text-red-500" : "ring-gray-900 focus:ring-gray-600 placeholder:text-gray-500"
                                    )}
                                    placeholder={formErrors.description ? formErrors.description : "Enter your App / Game description (max 200 characters)"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// step 2: platform
const StepTwo = ({
    formData,
    setFormData,
    formErrors
}: {
    formData: formData,
    setFormData: (formData: formData) => void,
    formErrors: formErrors
}) => {

    const checkPlatform = (platform: string) => {
        return formData.platform.includes(platform);
    }

    const handlePlatformChange = (platform: string) => {
        if (checkPlatform(platform)) {
            setFormData({
                ...formData,
                platform: formData.platform.filter((item: string) => item !== platform)
            })
        } else {
            setFormData({
                ...formData,
                platform: [...formData.platform, platform]
            })
        }
    }

    return (
        <>
            <div className="space-y-12 py-14">
                <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white md:text-4xl">
                        <span className="block">
                            Which platform do you support?
                        </span>
                    </h2>
                    <p className="mt-2 text-sm md:text-lg text-gray-400">
                        You can select multiple platforms.
                    </p>

                    <div className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-x-3 sm:space-y-0">
                        {platformOptions.map((option) => (
                            <div
                                key={option.name}
                                className={classNames(
                                    "flex flex-1 items-center justify-center rounded-md py-6 cursor-pointer text-sm font-semibold",
                                    checkPlatform(option.name) ? "bg-white text-black" : "text-gray-400 border border-gray-800 hover:bg-gray-800"
                                )}
                                onClick={() => handlePlatformChange(option.name)}
                            >
                                <option.icon className="h-6 w-6" aria-hidden="true" />
                            </div>
                        ))}

                    </div>
                    {formErrors.platform && (
                        <p className="mt-2 text-sm text-red-600" id="email-error">
                            {formErrors.platform}
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}

// step 3: payment
const StepThree = ({
    formData,
    formErrors,
    setFormData,
    handleChange
}: {
    formData: formData,
    formErrors: formErrors,
    setFormData: (formData: formData) => void,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {

    return (
        <>
            <div className="space-y-12 py-14">
                <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white md:text-4xl">
                        <span className="block">
                            How much do you want to charge?
                        </span>
                    </h2>
                    <p className="mt-2 text-sm md:text-lg text-gray-400">
                        You can only charge in SOUL tokens.
                    </p>

                    <div className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-x-3 sm:space-y-0">
                        {paymentOptions.map((option) => (
                            <div
                                key={option.name}
                                className={classNames(
                                    "flex flex-1 items-center justify-center rounded-md py-6 cursor-pointer text-sm font-semibold",
                                    option.name === formData.payment ? "bg-white text-black" : "text-gray-400 border border-gray-800 hover:bg-gray-800"
                                )}
                                onClick={() => setFormData({
                                    ...formData,
                                    payment: option.name
                                })}
                            >
                                {option.name}
                            </div>
                        ))}
                    </div>

                    {formData.payment !== "Free" && (
                        <div className='my-10'>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-400">
                                {formData.payment === "One Time" ? "Price" : "Price per month"}
                            </label>
                            <div className="relative mt-1 rounded-2xl shadow-sm">
                                <input
                                    type="number"
                                    name="price"
                                    onChange={handleChange}
                                    value={formData.price}
                                    id="price"
                                    min="0"
                                    placeholder="0.00"
                                    className={classNames(
                                        "block h-12 bg-gray-800 pl-6 w-full rounded-lg border-0 ring-1 text-gray-200 ring-inset pr-12 sm:text-sm focus:ring-2 focus:ring-inset",
                                        formErrors.price ? "ring-red-600 focus:ring-red-600" : "ring-gray-900 focus:ring-gray-600"
                                    )}

                                />
                                <div className="absolute inset-y-0 right-0 flex items-center">
                                    <Listbox
                                        value={formData.currency}
                                        onChange={(currency) => setFormData({
                                            ...formData,
                                            currency
                                        })}
                                    >
                                        <div className="relative mt-1">
                                            <Listbox.Button className="relative w-72 cursor-pointer rounded-lg py-2 pl-3 pr-10 text-left sm:text-sm text-gray-400 h-12">
                                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4  ">
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
                                                                `relative cursor-default select-none py-2 px-4 ${active ? 'bg-gray-900 text-white' : 'text-gray-400'
                                                                }`
                                                            }
                                                            value={currency.name}
                                                            disabled={currency.disabled}
                                                        >
                                                            {({ selected }) => (
                                                                <div className='flex items-center justify-between cursor-pointer'>
                                                                    <div className='flex items-center'>
                                                                        <Image
                                                                            src={currency.image}
                                                                            width={28}
                                                                            height={28}
                                                                            alt={currency.name + 'currency image'}
                                                                            className="rounded-full"
                                                                        />
                                                                        <p
                                                                            className={`block ml-2 truncate ${selected ? 'font-medium' : 'font-normal'}`}>
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
                                                                        <span className="flex items-center">
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
                            {formErrors.price && (
                                <p className="mt-2 text-sm text-red-600" id="email-error">
                                    {formErrors.price}
                                </p>
                            )}
                            <div className='border border-gray-800 rounded-2xl mt-4 px-6 text-gray-400'>
                                <div className='flex items-center justify-between w-full my-4'>
                                    <p className="text-sm font-medium">Service charges</p>
                                    <p className="text-sm font-medium">
                                        <span className='ml-2 primary-text'>{formData.price && `${((formData.currency === "SOUL" ? 0.01 : 0.02) * parseFloat(formData.price))} ${formData.currency}`}</span>
                                        <span className='ml-2'>{formData.currency === "SOUL" ? "1 %" : "2 %"}</span>
                                    </p>
                                </div>
                                <div className='border-t border-gray-800 w-full'></div>
                                <div className='flex items-center justify-between w-full my-4'>
                                    <p className="text-sm font-medium">You will receive</p>
                                    <p className="text-sm font-medium">
                                        <span>
                                            {formData.price ? `${(((formData.currency === "SOUL" ? 0.99 : 0.98)) * parseFloat(formData.price))} ${formData.currency}` : '_'}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

// step 4: app links
const StepFour = ({
    formData,
    setFormData,
    formErrors
}: {
    formData: formData,
    setFormData: (formData: formData) => void,
    formErrors: formErrors
}) => {

    const handleAppLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            appLinks: {
                ...formData.appLinks,
                [name]: value
            }
        })
    }



    return (
        <>
            <div className="space-y-12 py-14">
                <div>
                    <h2 className="font-extrabold text-white text-xl sm:text-2xl  md:text-4xl">
                        <span className="block">Provide links to your app</span>
                    </h2>
                    <p className="mt-2 text-sm md:text-lg text-gray-400">
                        We will use these links to verify your app and to display it on the marketplace.
                    </p>

                    <div className="mt-6 space-y-6">
                        {formData.platform.map((platform, index) => (
                            <div key={index}>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-400">
                                    {platform} app link
                                </label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        {platform === "mac" ? (
                                            <AiFillApple className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        ) : platform === "windows" ? (
                                            <AiFillWindows className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        ) : (
                                            <BiGlobe className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        name={platform}
                                        id={platform}
                                        onChange={handleAppLinkChange}
                                        value={formData.appLinks[platform as OnlyAppLinks]}
                                        className={classNames(
                                            "block w-full h-10 pl-11 rounded-lg border-0 py-1.5 bg-gray-800 text-gray-200 shadow-sm ring-1 ring-inset  placeholder:text-gray-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
                                            formErrors.appLinks[platform as OnlyAppLinks] ? "ring-red-600 focus:ring-red-600" : "ring-gray-900 focus:ring-gray-600"
                                        )}
                                        placeholder={`Enter your ${platform} app link`}
                                    />
                                    {formErrors.appLinks[platform as OnlyAppLinks] && (
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                        </div>
                                    )}
                                </div>
                                {formErrors.appLinks[platform as OnlyAppLinks] && (
                                    <p className="mt-2 text-sm text-red-600" id="email-error">
                                        {formErrors.appLinks[platform as OnlyAppLinks]}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )

}

// step 5: app images
const StepFive = ({
    formData,
    setFormData,
    formErrors
}: {
    formData: formData,
    setFormData: (formData: formData) => void,
    formErrors: formErrors
}) => {

    const image1Ref = useRef<HTMLInputElement>(null);
    const [imageUrl, setImageUrl] = useState<string[]>([])

    const handleFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;

        const imageFiles = [];
        const imageUrls = [];

        if (files) {
            // loop through all the files
            for (let i = 0; i < files.length && i < 5; i++) {
                // check if the file size is greater than 10MB
                if (files[i].size > 10000000) {
                    toast.error("File size is too large");
                    return;
                }

                imageFiles.push(files[i]);
                imageUrls.push(URL.createObjectURL(files[i]));
            }

            setFormData({
                ...formData,
                images: imageFiles
            })

            setImageUrl(imageUrls);
        }
    }

    return (

        <>
            <div className="space-y-12 py-14">
                <div>
                    <h2 className="font-extrabold text-white text-xl sm:text-2xl  md:text-4xl">
                        <span className="block">
                            Upload images of your app
                        </span>
                    </h2>
                    <p className="mt-2 text-sm md:text-lg text-gray-400">
                        Minimum 3 images, maximum 5 images.
                    </p>

                    <div className="mt-6 space-y-6">

                        <div className="flex flex-col-reverse">

                            <div className="mt-6 w-full">
                                <div className="grid grid-cols-4 gap-6">

                                    {[1, 2, 3, 4].map((index) => (
                                        <div
                                            key={index}
                                            className="overflow-hidden aspect-w-4 aspect-h-3 border-2 border-dashed border-gray-800 relative rounded-2xl"
                                            onClick={() => image1Ref.current?.click()}
                                        >
                                            {imageUrl[index] ? (
                                                <Image
                                                    src={imageUrl[index]}
                                                    alt="item"
                                                    fill
                                                    className='object-cover object-center rounded-2xl'
                                                />
                                            ) : (
                                                <div className="space-y-1 text-center flex flex-col justify-center">
                                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="">
                                <div
                                    className="overflow-hidden aspect-w-4 aspect-h-3 border-2 border-dashed border-gray-800 hover:bg-gray-800 cursor-pointer relative rounded-2xl"
                                    onClick={() => image1Ref.current?.click()}
                                >
                                    {imageUrl[0] ? (
                                        <Image
                                            src={imageUrl[0]}
                                            alt="item"
                                            fill
                                            className='object-cover object-center rounded-2xl'
                                        />
                                    ) : (
                                        <div className="space-y-1 text-center flex flex-col justify-center">
                                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <div className="flex text-sm text-gray-600 justify-center">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative font-medium primary-text">
                                                    <span>Upload multiple images</span>
                                                </label>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                PNG, JPG, GIF up to 10MB
                                            </p>
                                        </div>
                                    )}
                                    <input
                                        id="file-upload"
                                        ref={image1Ref}
                                        name="file-upload"
                                        type="file"
                                        multiple
                                        max={5}
                                        className="sr-only"
                                        onChange={handleFilesUpload}
                                        accept={'image/*'}
                                    />
                                </div>

                            </div>
                        </div>




                    </div>
                </div>
            </div>
        </>
    )
}



export default Partner