import React, { useRef, useEffect, useState } from 'react';

export default function Sidebar() {
    return (
        <aside className='sidebar p-5 w-1/5 bg-offwhite rounded-tl-xl rounded-bl-xl border-r'>
            <div className='buttons flex pb-9 gap-2'>
                <div className='bg-red'></div>
                <div className='bg-yellow'></div>
                <div className='bg-green'></div>
            </div>
            <span className='font-bold text-sm'>Fly To</span>
            <div className='flex flex-col pt-1 gap-1'>
                <button className='flex align-start ml-3'>Greece</button>
                <button className='flex align-start ml-3'>California</button>
            </div>
        </aside>
    );
}