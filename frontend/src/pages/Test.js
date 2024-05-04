import React, { useState,useEffect } from 'react'
import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";
import { renderToString } from 'react-dom/server';
import TokenBil from './TokenBill';
import HotelBill from './HotelBill';
import KOT from './KOT';
import RestaurantBill from './RestaurantBill';
const { ipcRenderer } = window.require('electron');

const Test = () => {
    const [text, setText] = useState("");
    useEffect(() => {
        ipcRenderer.on('messageFromMain', (event, arg) => {
            console.log('onrendereer', arg); // Output received message from main process
            // Do something with the received data
        })

        // Clean up the listener when the component unmounts
        return () => {
            ipcRenderer.removeAllListeners('messageFromMain');
        };
    }, []);
    const handleClick = () => {
        const htmlString = renderToString(<RestaurantBill />)
        ipcRenderer.send('set-title', htmlString)
    }
    // const handleClick =()=>{
    //     ipcRenderer.send('button-click');
    // }
    return (
        <div>
            <button onClick={handleClick}>Click me</button>
        </div>
    )
}

export default Test