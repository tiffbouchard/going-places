import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import Sidebar from './Sidebar';
import { Location } from '@app/pages';
import Draggable from 'react-draggable';

interface MapProps {
    locations: Location[];
}

// unique ideas for my website
// maybe have weird stuff pop up every so often
// maybe have a button that shows a random location
// have a spotify player that plays my favourite songs
// have cool weird widgets in the control panel
//  micro interactions on the map
// micro interactions on the sidebar
// micro interactions on the nav
// micro animations on the map
// micro animations on the sidebar
// Some of my favourite memories places and moments



// experiencing real life on the web
// 3d models of places
// 3d models of people
// 3d models of things
// 3d models of memories
// 3d models of experiences
// 3d models of feelings
// 3d models of emotions
// 3d models of thoughts
// 3d models of ideas
// 3d models of concepts


// add a paint brush to the map
// add a paint window with an intro
// add loading animation

mapboxgl.accessToken = 'pk.eyJ1IjoidGlmZmJvdWNoYXJkIiwiYSI6ImNsZ3U3Zjh1NTAwN2czcnRuaXhlbDB2dWMifQ.EGbYZc90g-91we5t1FUShQ';

export default function Map({ locations }: MapProps) {
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

    useEffect(() => {
        if (!mapContainer.current || map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            attributionControl: false,
            zoom: zoom
        });
        map.current?.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
        locations.forEach((marker: Location) => {
            const el = document.createElement('div');
            el.className = 'marker';
            el.innerHTML = `<span>${marker.images?.length.toString()}</span>`;
            el.style.backgroundImage = marker.images?.length ? `url(${marker.images[0].asset.url})` : '';
            el.style.backgroundSize = 'cover';
            el.style.width = '80px';
            el.style.height = '80px';

            new mapboxgl.Marker(el)
                .setLngLat([marker.coordinates?.lat ? marker.coordinates.lat : 0, marker.coordinates?.lng ? marker.coordinates.lng : 0])
                .addTo(map.current!);
        });
    }, []);

    useEffect(() => {
        if (!map.current) return;
        map.current.on('move', () => {
            setLng(Number(map.current?.getCenter().lng.toFixed(4)));
            setLat(Number(map.current?.getCenter().lat.toFixed(4)));
            setZoom(Number(map.current?.getZoom().toFixed(2)));
        });
    }, []);

    const handleClick = (mapStyle: string, id: number): void => {
        if (!map.current) return;
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

    const flyTo = (coordinates: LngLatLike) => { 
        if (!map.current) return;
        map.current.flyTo({
            center: coordinates,
            zoom: 12,
            speed: 1.3,
            curve: 1,
          });
    }

    return (
        <Draggable
            handle=".handle"
            defaultPosition={{x: 100, y: 50}}
            onMouseDown={(e) => {console.log('clicked')}}

        >
        <div className='flex flex-row h-[80%] w-[80%]'>
            <Sidebar fly={flyTo} data={locations}/>
            <div className='flex flex-column z-0 w-full' ref={mapContainer}>
                <nav className='handle w-[inherit] dark:bg-black-90 dark:text-white bg-offwhite text-slate-900 flex items-center justify-center h-14 drop-shadow-md rounded-tr-xl backdrop-blur-sm absolute z-10'>
                    <div className='flex justify-around rounded-lg dark:border-slate-800 border w-2/6 hover:bg-transgray hover:ease-in duration-200'>
                        {buttons.map((button, id) => (
                            <button
                                key={button.id}
                                className={`w-1/3 p-1 rounded-lg ${button.class} ${button.isActive ? 'bg-transgray2 dark:bg-trans-gray' : ''}`}
                                onClick={() => handleClick(button.style, id)}
                            >
                                {button.name}
                            </button>
                        ))}
                    </div>
                </nav>
                {/* <div className="w-[inherit] rounded-tr-xl rounded-br-lg" /> */}
            </div>
        </div>
        </Draggable>
    );
}