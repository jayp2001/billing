import React from 'react';
import './css/Bill.css';
import './css/RestaurantBill.css'

const KOT = () => {
    return (
        <div className='w-fit h-fit'>
            <div className="box w-fit border border-black m-2  text-center">
                <div className="header-bill py-4 border-b-2 border-black">
                    <div className="name font-bold text-lg">
                        DELIVERY 
                        <br />
                        KOT
                    </div>
                </div>

                <div className="Middle-bill p-1 main_bill  border-black">
                    <div className="flex justify-between  font-medium text-xs mt-2">
                        <div className='text-start upper_right'>
                            <div className='text-start'>
                                <div>Date : 19/04/2024</div>
                            </div>
                            <div className='text-start mt-2'>
                                <div>Time: 23:38</div>
                            </div>
                            <div className="mt-2">
                                CASHIER : Admin
                            </div>
                            <div className="mt-2">
                                TABLE NO : <span className="font-bold text-base">123</span>
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
                </div>
                {/* <div className="Middle-bill p-1 border-t-2 border-black main_bill ">
                    <div className='text-start'>
                        <div>PHONE NO : 9879248281 </div>
                    </div>
                    <div className='text-start'>
                        <div>NAME : CHIRAG BHAI </div>
                    </div>
                    <div className='text-start'>
                        <div>ADR:ghare</div>
                    </div>
                    <div className='text-start'>
                        <div>LOCALITY:SHAHER</div>
                    </div>
                </div> */}
                <div className="main_bill h-min">
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="border py-2 px-1 border-s-0 border-black text-start">ITEMS</th>
                                <th className="border py-2 border-r-0 border-black text-center">Qty</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border first_column py-2 max-w-28 px-1 text-lg font-bold border-s-0 border-black text-start">Panerr Tika Masala <br /> <span className="text-xs">(Small text comment)</span> </td>
                                <td className="border border-r-0  second_column py-2 border-black text-center">99 Full</td>
                            </tr>
                            <tr>
                                <td className="border first_column   py-2 mx-w-28 px-1 text-lg font-bold  border-s-0 border-black text-start">Butter Milk</td>
                                <td className="border border-r-0  second_column px-1 py-2 border-black text-center">9 NO</td>
                            </tr>
                            <tr>
                                <td colSpan='4' className='text-sm font-bold'> Commnet: JAIN  PUCHDU FALANU </td>
                            </tr>
                            <tr>
                                <td colSpan='4' className="text-center font-bold border-t border-black py-2">Thanks</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default KOT;
