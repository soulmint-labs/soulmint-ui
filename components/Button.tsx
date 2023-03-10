"use client";
import React from 'react';
import Link from 'next/link';
import { classNames } from '@/lib/common';


const styleClass = {
    base: 'flex items-center justify-center rounded-md shadow-sm focus:outline-none transition ease-in-out duration-300',
    disabled: 'opacity-50 cursor-not-allowed',
    pill: 'rounded-full',
    size: {
        small: 'px-2 py-1 text-xs',
        normal: 'px-4 py-2 text-sm font-medium',
        large: 'px-8 py-3 text-lg',
    },
    variant: {
        primary:
            'bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white',
        secondary:
            'bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-gray-900',
        danger:
            'bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-white',
        dark: 'text-gray-200 hover:bg-gray-100 hover:dark:bg-gray-700 bg-gray-800',
        light:
            'bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-gray-900',
        success:
            'bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-white',
        warning:
            'bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 text-white',
        indigo:
            'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-white',
        link: 'hover:text-white underline font-medium shadow-none',
        blackNwhite: 'text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200',
        outline: 'border border-gray-300 text-gray-300 hover:bg-gray-800'
    },
    spinnerVariant: {
        blackNwhite: 'text-white dark:text-black',
        indigo: 'text-indigo-800',
        primary: 'text-blue-500',
        secondary: 'text-gray-500',
        danger: 'text-red-500',
        dark: 'text-gray-900',
        light: 'text-gray-500',
        success: 'text-green-500',
        warning: 'text-orange-500',
        link: '',
        outline: 'text-gray-300'
    }
};

interface CommonProps {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    pill?: boolean;
    size?: 'small' | 'normal' | 'large';
    variant?: 'primary' | 'secondary' | 'danger' | 'dark' | 'light' | 'success' | 'warning' | 'indigo' | 'link' | 'blackNwhite' | 'outline';
    loading?: boolean;
}

type conditionalProps =
    | { type: "link"; to: string; external?: boolean; onClick?: never }
    | { type: "event"; onClick: () => void; to?: never; external?: never };


type ButtonProps = CommonProps & conditionalProps;

const Button = ({
    children,
    type,
    className,
    disabled,
    pill,
    size = 'normal',
    variant = 'primary',
    to,
    external,
    onClick,
    loading = false,
}: ButtonProps) => {
    const classes = classNames(
        className ? className : '',
        styleClass.base,
        styleClass.size[size],
        styleClass.variant[variant],
        pill ? styleClass.pill : '',
        disabled ? styleClass.disabled : ''
    );

    if (type === 'event') {
        return (
            <button
                disabled={disabled || loading}
                className={classes}
                onClick={onClick}
            >
                {loading && (
                    <svg aria-hidden="true" role="status" className={classNames(
                        styleClass.spinnerVariant[variant],
                        'animate-spin -ml-1 mr-3 h-5 w-5 bg-transparent!',

                    )} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                    </svg>
                )}
                {children}
            </button>
        );
    } else {
        if (external) {
            return (
                <a
                    href={to}
                    className={classes}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {children}
                </a>
            );
        } else {
            return (
                <Link href={to || ''} className={classes}>
                    {children}
                </Link>
            );
        }
    }
};

export default Button;
