import React from 'react';
import './css/Bill.css';

const HotelBill = () => {
    return (
        <div className='w-fit h-fit' style={{width:'fit-content', height:'fit-content'}}>
            <div style={{width:'fit-content',border:'1px solid black', margin:'4px',textAlign:'center'}}>
                <div style={{paddingTop:'6px', paddingBottom:'0px', borderBottom:'2px solid black'}}>
                    <div style={{fontWeight:'700', fontSize:'16px', lineHeight:'24px',paddingBottom:'1rem', paddingTop:'0.6rem'}}>
                        SHRI BHAGAWATI FAST FOOD
                    </div>
                    <div style={{fontSize:'14px', lineHeight:'20px', fontWeight:'500'}}>
                        PALACE ROAD RAJKOT - 360 001
                    </div>
                    <div style={{fontWeight:'500', fontSize:'14px', lineHeight:'20px', marginBottom:'8px',paddingBottom:'4px'}}>
                        PHONE: 2243235(M) : 9825360287
                    </div>
                </div>
                <div style={{paddingBottom:'0px', borderBottom:'2px solid black'}}>
                    <div className="name font-medium text-sm" style={{fontWeight:'500'}}>
                        GSTIN: 24BDZPC3972L1ZX
                    </div>
                </div>
                <div className="header-bill pb-0 border-b-2 border-black">
                    <div className="name font-bold text-sm">
                        BILL OF SUPPLY
                    </div>
                </div>
                <div className="Middle-bill p-1 main_bill  border-black">
                    <div className="flex justify-between font-medium text-xs ">
                        <div className='text-start'>
                            <div>Date : 19/04/2024</div>
                        </div>
                        <div className='text-start'>
                            <div>Time: 23:38</div>
                        </div>
                    </div>
                    <div className="flex justify-between  font-medium text-xs mt-2">
                        <div className='text-start upper_right'>
                            <div>
                                HOTEL CASH : <span className="font-bold"> 94809902</span>
                            </div>
                            <div className="mt-2">
                                HOTEL : Ever Krishna Palace
                            </div>
                            <div className="mt-2">
                                ROOM NO : <span className="font-bold">201</span>
                            </div>
                            <div className="mt-2 text-start font-thin text-xs">
                                ADDRESS : <span className="text-xs font-thin">Palcae Road Bhagawati restaurant Rajkot </span>
                            </div>
                        </div>
                        <div className='text-start upper_left'>
                            <div className="border py-1 w-full border-black ">
                                TOKEN NO
                            </div>
                            <div className="border border-t-0 border-black p-1">
                                <p className='text-center font-bold text-xl'>H999</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-2 text-start font-thin text-xs">
                        LOCALITY : BHAKTINAGAR
                    </div>
                </div>
                <div className="main_bill h-min">
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="border py-2 px-1 border-s-0 border-black text-start">Particulars</th>
                                <th className="border py-2 border-black text-center">Qty</th>
                                <th className="border py-2 border-e-0 border-black text-center">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border first_column py-2 max-w-28 px-1 border-s-0 border-black text-start">Panerr Tika Masala </td>
                                <td className="border second_column py-2 border-black text-center">99 Full</td>
                                <td className="border third_column py-2 border-e-0 border-black text-end pr-1">105.00</td>
                            </tr>
                            <tr>
                                <td className="border first_column py-2 mx-w-28 px-1  border-s-0 border-black text-start">Butter Milk</td>
                                <td className="border second_column py-2 border-black text-center">99 Full</td>
                                <td className="border third_column py-2 border-e-0 border-black text-end pr-1">30.00</td>
                            </tr>
                            <tr>
                                <td className="border py-2 first_column  border-s-0 border-black text-start"></td>
                                <td className="border py-2 second_column font-bold border-black text-center">Total:</td>
                                <td className="border py-2 third_column  font-bold border-e-0 border-black text-end pr-1">135000.00</td>
                            </tr>
                            <tr>
                                <td colSpan='3'>  <hr className='bill_hr' /></td>
                            </tr>
                            <tr className=''>
                                <td className="text-end py-2 border-t border-black" colSpan="2" >Discount:</td>
                                <td className="text-center py-2 border-t border-black">14.00</td>
                            </tr>
                            <tr>
                                <td colSpan='3' className="text-end border-t border-black py-2">Grand Total Rs.290.00</td>
                            </tr>
                            <tr>
                                <td colSpan='3' className="text-center font-bold border-t border-black py-2">Thanks</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HotelBill;
