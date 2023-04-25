import Image from 'next/image'
import { Inter } from 'next/font/google'
import 'mapbox-gl/dist/mapbox-gl.css';
import Map from '@app/components/Map';
import Nav from '@app/components/Nav';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='flex flex-col h-screen'>
        <Nav />
        <Map />
    </div>
  )
}
