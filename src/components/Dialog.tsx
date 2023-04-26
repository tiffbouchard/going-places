import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import Sidebar from './Sidebar';
import { Location } from '@app/pages';
import Draggable from 'react-draggable';

export default function Dialog() {
    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(-40);
    const [lat, setLat] = useState(45);
    const [zoom, setZoom] = useState(2);
    const [buttons, setButtons] = useState([
        { id: 0, name: 'Map', isActive: true, class: 'border-r dark:border-slate-800', style: 'mapbox://styles/mapbox/streets-v12' },
        { id: 1, name: 'Satellite', isActive: false, class: '', style: 'mapbox://styles/mapbox/satellite-streets-v12' },
        { id: 2, name: 'Fun', isActive: false, class: 'border-l dark:border-slate-800', style: 'mapbox://styles/mapbox/outdoors-v11' },
    ]);

    return (
        <Draggable
            handle=".dialogHandle"
            positionOffset={{x: '140%', y: '100%'}}
            // defaultPosition={{x: 1300, y: 500}}
            onMouseDown={(e) => {console.log('clicked')}}
        >
            {/* create function, so whenever a box is onMouseDown, the z-index updates to be the highest among all dialogs */}
        <div className='flex flex-row h-[50%] w-[50%] absolute z-10'>
            <div className='flex flex-column z-0 w-[inherit]'>
                <nav className='dialogHandle w-[inherit] dark:bg-black-90 dark:text-white bg-offwhite text-slate-900 h-14 drop-shadow-md rounded-t-xl backdrop-blur-sm absolute z-10'>
                <div className='buttons handle flex p-5 gap-2'>
                    <div className='bg-red'></div>
                    <div className='bg-yellow'></div>
                    <div className='bg-green'></div>
                </div>
                </nav>
                <div className='w-full bg-white rounded-xl h-[60%] overflow-hidden'>
                    <div className='overflow-y-auto h-[100%] pt-20 px-5'>
                        <h2 className='text-sm text-black pb-5 font-bold'>About This Website</h2>
                        <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur eius dignissimos explicabo sed, minima neque? Hic doloribus ipsum cumque, perferendis a sequi quae asperiores quod saepe doloremque. Voluptatibus, quo voluptates!</p>
                    </div>
                </div>
            </div>
        </div>
        </Draggable>
    );
}