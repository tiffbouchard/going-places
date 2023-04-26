import Image from 'next/image'
import { Inter } from 'next/font/google'
import 'mapbox-gl/dist/mapbox-gl.css';
import Map from '@app/components/Map';
import Nav from '@app/components/Nav';
import { createClient } from "next-sanity";
import Dialog from '@app/components/Dialog';

const inter = Inter({ subsets: ['latin'] })

export type Location = {
  coordinates: {
    lat: number;
    lng: number;
  };
  images: {
    asset: {
      url: string;
    }
  }[];
  name: string;
}

interface HomeProps {
  locations: Location[];
}

export default function Home({ locations }: HomeProps) {
  return (
    <div className='flex flex-col h-screen'>
        <Dialog/>
        <Nav />
        <Map locations={locations} />
    </div>
  )
}

const client = createClient({
  projectId: "cb1cf1lr",
  dataset: "production",
  apiVersion: "2023-04-25",
  useCdn: false
});

export async function getStaticProps() {
  const query = `*[_type == "location"]{
    coordinates,
    images[] 
      {
        asset -> {
          url
        }
      },
    name
  }`;
  const locations = await client.fetch(query);

  return {
    props: {
      locations
    }
  };
}