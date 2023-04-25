import { LngLatLike } from 'mapbox-gl';
import React, { useRef, useEffect, useState } from 'react';

interface SidebarProps {
    fly: (coordinates: LngLatLike) => void;
    data: any;
}

export default function Sidebar({fly, data}: SidebarProps) {
    return (
        <aside className='flex flex-col max-h-screen sidebar p-5 w-1/5 bg-offwhite dark:bg-black-70 dark:text-white rounded-tl-xl rounded-bl-xl border-r dark:border-slate-800 backdrop-blur-md'>
            <div className='buttons flex pb-9 gap-2'>
                <div className='bg-red'></div>
                <div className='bg-yellow'></div>
                <div className='bg-green'></div>
            </div>
            <div className='overflow-y-auto'>
                <span className='font-bold text-sm'>Fly to</span>
                <div className='flex flex-col pt-2'>
                    {data.map((marker: any, index: number) => (
                        <button key={index} className='flex align-start ml-3 dark:hover:bg-transgray py-1 px-4 rounded-lg' onClick={() => {fly([marker.coordinates.lat, marker.coordinates.lng])}}>
                            {marker.name}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
}