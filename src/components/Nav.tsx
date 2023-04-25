import React, { useRef, useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import Dropdown from './Dropdown';

export default function Nav() {
    // create a date variable for the current date and time formatted like this: "Wed Sep 22 11:30 PM"
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [open, setOpen] = useState(false);
    const buttons = [
        { name: '🥑', className: ''},
        { name: 'Going Places', className: 'font-bold'},
        { name: 'File', className: 'z-50'},
        { name: 'Edit', className: 'z-50'},
        { name: 'Image', className: 'z-50'},    
        { name: 'View', className: 'z-50'},
        { name: 'Window', className: 'z-50'},
        { name: 'Help', className: 'z-50'}
    ];

    useEffect(() => {
        const date = new Date();
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          };
        const dateTimeString = date.toLocaleString('en-US', options);
        setCurrentDateTime(dateTimeString);
    }, []);


    return (
        <nav className='bg-black dark:bg-black text-slate-900 dark:text-white relative flex items-center justify-between h-10 px-4 backdrop-blur-lg z-10 grow-0'>
            <div className='flex gap-4'>
                { buttons.map((button, index) => ( <Dropdown key={index} name={button.name} style={button.className} /> )) }
            </div>
            <div className='flex gap-4'>
                <button>🔋</button>
                <button>🎛</button>
                <button onClick={() => setOpen(!open)}>{currentDateTime}</button>
            </div>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-30" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed h-full top-10 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-300 sm:duration-300"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-300 sm:duration-300"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto relative w-80">
                         
                                        <div className="flex h-full flex-col overflow-y-auto bg-white py-6 ">
                                            <div className="px-4 sm:px-6">
                                                <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                </Dialog.Title>
                                            </div>
                                            <div className="relative mt-6 flex-1 px-4 sm:px-6">

                                                <div></div>
                                            
                                                {/* Your content */}
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </nav>
    );
}