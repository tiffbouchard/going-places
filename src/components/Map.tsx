import React, { useRef, useEffect, useState, Fragment } from 'react';
import mapboxgl from 'mapbox-gl';
import Sidebar from './Sidebar';
import Nav from './Nav';

mapboxgl.accessToken = 'pk.eyJ1IjoidGlmZmJvdWNoYXJkIiwiYSI6ImNsZ3U3Zjh1NTAwN2czcnRuaXhlbDB2dWMifQ.EGbYZc90g-91we5t1FUShQ';

export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(-40);
    const [lat, setLat] = useState(45);
    const [zoom, setZoom] = useState(2);
    const [buttons, setButtons] = useState([
        { id: 0, name: 'Map', isActive: false, class: 'border-r', style: 'mapbox://styles/mapbox/streets-v12' },
        { id: 1, name: 'Satellite', isActive: true, class: '', style: 'mapbox://styles/mapbox/satellite-streets-v12' },
        { id: 2, name: 'Fun', isActive: false, class: 'border-l', style: 'mapbox://styles/mapbox/outdoors-v11' },
    ]);

    useEffect(() => {
        if (!mapContainer.current || map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/satellite-streets-v12',
            center: [lng, lat],
            attributionControl: false,
            zoom: zoom
        });
        map.current?.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
        console.log(lng, lat, zoom)
    }, []);

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(Number(map.current?.getCenter().lng.toFixed(4)));
            setLat(Number(map.current?.getCenter().lat.toFixed(4)));
            setZoom(Number(map.current?.getZoom().toFixed(2)));
        });
    }, []);

    const handleClick = (mapStyle: string, id: number): void => {
        if (!map.current) return; // wait for map to initialize
        map.current.setStyle(mapStyle);
        setButtons(buttons.map((button) => {
            if (button.id === id) {
                button.isActive = true;
            } else {
                button.isActive = false;
            }
            return button;
        }
        ));
    };

    return (
        <div className='flex flex-row grow'>
            <Sidebar />
            <div className='flex flex-column z-0 w-4/5'>
                <nav className='secondary bg-offwhite text-slate-900 flex items-center justify-center h-14 drop-shadow-md rounded-tr-xl backdrop-blur-sm absolute z-10 main'>
                    <div className='flex justify-around rounded-lg border w-2/6 hover:bg-transgray hover:ease-in duration-200'>
                        {buttons.map((button, id) => (
                            <button
                                key={button.id}
                                className={`w-1/3 p-1 rounded-lg ${button.class} ${button.isActive ? 'bg-transgray2' : ''}`}
                                onClick={() => handleClick(button.style, id)}
                            >
                                {button.name}
                            </button>
                        ))}
                    </div>
                </nav>
                <div ref={mapContainer} className="main rounded-tr-xl rounded-br-lg" />
            </div>
        </div>
    );
}