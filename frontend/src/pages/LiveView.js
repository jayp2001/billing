/* eslint-disable no-unused-vars */
import { CardActions, CardContent } from '@mui/material';
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { SiSwiggy } from "react-icons/si";
import './css/LiveView.css'
import { TbPinned } from "react-icons/tb";
import { IoIosCall } from "react-icons/io";
import { GiWaterRecycling } from "react-icons/gi";



const Timer = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [timerInterval, setTimerInterval] = useState(null);

  const startTimer = () => {
    setIsRunning(true);
    const startTime = Date.now();
    setTimerInterval(
      setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const hours = Math.floor(elapsedTime / 3600000);
        const minutes = Math.floor((elapsedTime / 60000) % 60);
        const seconds = Math.floor((elapsedTime / 1000) % 60);
        setTime({ hours, minutes, seconds });
      }, 1000)
    );
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(timerInterval);
  };

  const formatTime = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md">
      <div className="text-3xl font-bold">
        {time.hours > 0 && (
          <>
            <span>{formatTime(time.hours)}</span>:
          </>
        )}
        <span>{formatTime(time.minutes)}</span>:
        <span>{formatTime(time.seconds)}</span>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={isRunning ? stopTimer : startTimer}
          className={`px-4 py-2 mr-2 ${isRunning ? 'bg-red-500' : 'bg-blue-500'
            } text-white rounded hover:bg-blue-600`}
        >
          {isRunning ? 'Stop Timer' : 'Start Timer'}
        </button>
      </div>
    </div>
  );
};

const LiveView = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className='shadow-md  rounded-md relative w-2/6' sx={{ minWidth: 275 }}>
        <CardContent>
          <div className="bg-white shadow-md rounded-lg">
            <div className="mb-2 p-2 flex justify-between text-start ">
              <div>
                <div className="text-sm text-gray">Shree Bhagawa</div>
                <div className="text-gray-500 text-sm">KOT: 71 | BILL: 2677</div>
              </div>
              <div className='self-center'>
                <div className="ml-2text-gray-500 text-sm">07:17</div>
              </div>
              <div className="self-start">
                <div className="flex">
                  <div className="text-gray-700 text-sm">Paid OTP:</div>
                  <div className="ml-1 text-gray-500 text-sm">1547</div>
                </div>
                <div>
                  <div className=" text-gray-500 text-sm">173195324584065</div>
                </div>
              </div>
            </div>
            <div className="mt-2 border-t-2">
              <div className="flex p-2 justify-between text-gray-700">
                <div>
                  <div className="flex  items-center">
                    <div className="headr_icon">
                      <TbPinned className='text-gray-700' />
                    </div>
                    <div className="headr_icon">
                      <p className='text-gray-700'> Meet Paramr</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <div className="header_icon">
                      <IoIosCall className='text-gray-700' />
                    </div>
                    <div className="headr_icon">
                      <p className='text-gray-700'>7990311863</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <div className="header_icon">
                      <GiWaterRecycling className='text-gray-700' />
                    </div>
                    <div className="headr_icon">
                      <p className='text-gray-700'>ARRIVED</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 border-t-2 pt-2 px-2">
              <div className="py-1">
                <div className="flex items-center">
                  <div className="header_icon">
                    <IoIosCall className='text-gray-700' />
                  </div>
                  <div className="headr_icon">
                    <p className='text-gray-700'>Call Customer</p>
                  </div>
                </div>
              </div>
              <div className="my-2 p-2 border-t-2 border-gray-300">
                <div className="flex flex-wrap items-center mb-2">
                  <div className=" my-2 text-sm w-2/4">1x Pau</div>
                  <div className=" my-2 text-sm w-2/4">1x Veg. Sandwich</div>
                  <div className=" my-2 text-sm w-2/4">2x Butter Pau Bhaji</div>
                </div>
              </div>
              <div className="flex items-end px-2 justify-between">
                <div className="flex items-center bg-white rounded-t-xl  p-1 ">
                  <div className="text-gray-700"><IoIosCall className='text-gray-500' /></div>
                  <div className="ml-2 text-gray-500">Swiggy</div>
                </div>
                <div className="ml-2 bg-white p-1 rounded-t-xl text-gray-500"> Rs.320</div>
              </div>
            </div>
            <div className="flex items-center p-2 justify-between ">
              <div>
                <div className="text-gray-700">Prepare In:</div>
                <div className="ml-2 text-gray-500">03:43</div>
              </div>
              <div className="flex">
                <div className="text-gray-500">oos Info</div>
                <div className="text-gray-500">Food Is Ready</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveView;
