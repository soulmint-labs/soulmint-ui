"use client";
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { BsChevronExpand } from 'react-icons/bs';
import { AiOutlineCheck } from 'react-icons/ai';

type ListBoxProps = {
    options: { id: string, name: string }[];
    selected: number;
    setSelected: (value: number) => void;
}

export default function ListBox({ selected, setSelected, options }: ListBoxProps) {


    return (
        <Listbox
            value={selected}
            onChange={setSelected}
        >
            <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-gray-800 py-2 pl-3 pr-10 text-left shadow-md sm:text-sm">
                    <span className="block truncate text-gray-200">{options[selected].name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <BsChevronExpand
                            className="h-5 w-5 text-gray-400"
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
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {options.map((option) => (
                            <Listbox.Option
                                key={option.id}
                                className={({ active }) =>
                                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-900 text-gray-200' : 'text-gray-400'
                                    }`
                                }
                                value={option.id}
                            >
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate ${selected ? 'font-medium text-gray-200' : 'font-normal'
                                                }`}
                                        >
                                            {option.name}
                                        </span>
                                        {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-200">
                                                <AiOutlineCheck className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    )
}
