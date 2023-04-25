import React, { useRef, useEffect, useState, Fragment } from 'react';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import Sidebar from './Sidebar';
import Nav from './Nav';
import IMG_1 from '../public/IMG_1302.JPG';
import IMG_2 from '../public/IMG_9028.JPG';

mapboxgl.accessToken = 'pk.eyJ1IjoidGlmZmJvdWNoYXJkIiwiYSI6ImNsZ3U3Zjh1NTAwN2czcnRuaXhlbDB2dWMifQ.EGbYZc90g-91we5t1FUShQ';

export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(-40);
    const [lat, setLat] = useState(45);
    const [zoom, setZoom] = useState(2);
    const [buttons, setButtons] = useState([
        { id: 0, name: 'Map', isActive: false, class: 'border-r dark:border-slate-800', style: 'mapbox://styles/mapbox/streets-v12' },
        { id: 1, name: 'Satellite', isActive: true, class: '', style: 'mapbox://styles/mapbox/satellite-streets-v12' },
        { id: 2, name: 'Fun', isActive: false, class: 'border-l dark:border-slate-800', style: 'mapbox://styles/mapbox/outdoors-v11' },
    ]);

    const geojson = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Greece',
                'properties': {
                    'message': 'Foo',
                    'iconSize': [80, 80]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [23.728305, 37.983941]
                },
                'images': [
                    {
                        'url': `${process.env.NEXT_PUBLIC_PUBLIC_URL}${IMG_1.src}`,
                    }
                ]
            },
            {
                'type': 'Barcelona',
                'properties': {
                    'message': 'Bar',
                    'iconSize': [80, 80]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [2.165093, 41.393305]
                },
                'images': [
                    {
                        'url': `${process.env.NEXT_PUBLIC_PUBLIC_URL}${IMG_2.src}`,
                    }
                ]
            }
        ]
    };

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
        // add markers with custom icons
        geojson.features.forEach((marker) => {
            console.log(marker.images[0].url)
            // create a DOM element for the marker
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.backgroundImage = `url(${marker.images[0].url})`;
            el.style.backgroundSize = 'cover';
            el.style.width = marker.properties.iconSize[0] + 'px';
            el.style.height = marker.properties.iconSize[1] + 'px';

            // add marker to map
            new mapboxgl.Marker(el)
                .setLngLat([marker.geometry.coordinates[0], marker.geometry.coordinates[1]])
                .addTo(map.current!);
        });
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

    const flyTo = (coordinates: LngLatLike) => { 
        if (!map.current) return; // wait for map to initialize
        map.current.flyTo({
            center: coordinates,
            zoom: 15,
            speed: 1,
            curve: 1,
          });
    }

    return (
        <div className='flex flex-row grow'>
            <Sidebar fly={flyTo} data={geojson}/>
            <div className='flex flex-column z-0 w-4/5'>
                <nav className='dark:bg-black-90 dark:text-white secondary bg-offwhite text-slate-900 flex items-center justify-center h-14 drop-shadow-md rounded-tr-xl backdrop-blur-sm absolute z-10 main'>
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
                <div ref={mapContainer} className="main rounded-tr-xl rounded-br-lg" />
            </div>
        </div>
    );
}