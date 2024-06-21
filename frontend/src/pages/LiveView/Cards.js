import React from "react";
import { CardActions, CardContent } from "@mui/material";
import { Card } from "react-bootstrap";
import { IoIosCall } from "react-icons/io";
import { GiWaterRecycling } from "react-icons/gi";
import { TbPinned } from "react-icons/tb";
import "./css/Cards.css";

const Cards = ({ data }) => {
  return (
    <div>
      {/* Delivery Card */}
      <Card
        className="shadow-md  rounded-md relative w-full h-full"
        sx={{ minWidth: 275, padding: 0 }}
      >
        <CardContent sx={{ padding: 0 }} className="CardContent">
          <div className="bg-white w-full rounded-lg overflow-hidden border-black border">
            <div className={` pt-2 pb-1 px-2 flex justify-between text-start ${data.billType === 'Delivery' ? 'bg-purple-200' : 'bg-yellow-200'} `}>
              <div>
                <div className="text-xs text-gray">{`${data.firmData.firmName.slice(
                  0,
                  15
                )}...`}</div>
                <div className="mt-2 text-xs">
                  {/* KOT: 71 | BILL: {data.billNumber} */}
                  Token No: {data.tokenNo}
                </div>
              </div>
              <div className="self-center">
                <div className="ml-2 text-black border border-black mr-14 p-1 rounded-2xl px-2 text-xs bg-white">
                  {data.billTime}
                </div>
              </div>
              <div className="self-start">
                <div className="flex justify-end">
                  {/* <div className="text-gray-700 text-sm">Paid OTP:</div>
                  <div className="ml-1 text-gray-500 text-sm">1547</div> */}
                  <div className="bg-gray-300 p-1 rounded-md text-xs">
                    {data.billPayType}
                  </div>
                </div>
                <div>
                  {/* <div className=" text-gray-500 text-xs">173195324584065</div> */}
                  <div className=" text-gray-700 text-sm mt-1 ">{data.billType}</div>
                </div>
              </div>
            </div>
            <div className="">
              {/* <div className="flex p-2 justify-between text-gray-700">
                <div>
                  <div className="flex  items-center">
                    <div className="headr_icon">
                      <TbPinned className="text-gray-700" />
                    </div>
                    <div className="headr_icon">
                      <p className="text-gray-700 text-xs ml-1">
                        {" "}
                        Not Assigned
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <div className="header_icon">
                      <IoIosCall className="text-gray-700" />
                    </div>
                    <div className="headr_icon">
                      <p className="text-gray-700">7990311863</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <div className="header_icon">
                      <GiWaterRecycling className="text-gray-700" />
                    </div>
                    <div className="headr_icon">
                      <p className="text-gray-700">ARRIVED</p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="bg-gray-200 border-t-2 pt-2 ">
              <div className="px-2 h-12 flex items-center">
                {/* <div className="flex items-center">
                  <div className="header_icon">
                    <IoIosCall className="text-gray-700" />
                  </div>
                  <div className="headr_icon">
                    <p className="text-gray-700">Call Customer</p>
                  </div>
                </div> */}
                <div>
                  <div className="headr_icon text-xs">
                    {data.customerDetails.mobileNo}
                  </div>
                  <div className="headr_icon text-xs">
                    {data.customerDetails.address ? `${data.customerDetails.address}` : 'address'}{data.customerDetails.customerName ? `, ${data.customerDetails.customerName}`:''}{data.customerDetails.locality ? `, ${data.customerDetails.locality}` : ''}
                  </div>
                </div>
              </div>
              <div className="my-2 px-2  border-t-2 border-gray-300">
                {/* <div className="flex flex-wrap items-center mb-2"> */}
                {/* <div className=" my-2 text-sm w-2/4">1x Pau</div>
                  <div className=" my-2 text-sm w-2/4">1x Veg. Sandwich</div>
                  <div className=" my-2 text-sm w-2/4">2x Butter Pau Bhaji</div> */}
                <div className="my-2  border-gray-300 itemCustomheight">
                  <div className="flex flex-wrap items-center mb-2">
                    {data.itemData.map((item, index) => (
                      <div
                        key={index}
                        className="my-2 text-xs font-semibold w-2/4"
                      >
                        {item.qty}x {item.itemName} ({item.unit})
                      </div>
                    ))}
                  </div>
                </div>
                {/* </div> */}
              </div>
              <div className="flex items-end px-2 justify-end">
                {/* <div className="flex items-center bg-white rounded-t-xl  p-1 ">
                  /<div className="text-gray-700">
                    <IoIosCall className="text-gray-500" />
                  </div>
                  <div className="ml-2 text-gray-500">Swiggy</div>
                </div> */}
                <div className="ml-2 bg-white p-1 rounded-t-xl text-gray-500 border-black border border-b-0">
                  {" "}
                  Rs.{data.totalAmount}
                </div>
              </div>
            </div>
            <div className="flex items-center p-2 justify-between border-t">
              <div>
                {/* <div className="text-gray-700">Prepare In:</div>
                <div className="ml-2 text-gray-500">03:43</div> */}
              </div>
              <div className="flex">
                <div className="text-gray-500 p-2 bg-gray-300 rounded-md text-xs">
                  Info
                </div>
                <div className=" ml-2 bg-orange-500 text-white p-2 rounded-md text-xs">
                  Food Is Ready
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cards;
