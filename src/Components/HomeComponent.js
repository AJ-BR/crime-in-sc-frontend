import React from 'react';
import AppNav from './AppNav';
import CountyMapComponent from './CountyMapComponent';
import HeadingComponent from './HeadingComponent';


export default function Home() {
    
    return(
        <>
            <AppNav />
            <HeadingComponent />
            <CountyMapComponent />
        </>
    )
}