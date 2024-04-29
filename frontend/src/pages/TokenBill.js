import React from 'react';
import './css/Bill.css';

const TokenBil = () => {
    return (
        <div className='w-fit h-fit'>
            <div className="box w-fit border border-black m-2  text-center">
                <div className="header-bill py-4   border-b-2 border-black">
                    <div className="name font-bold text-base">
                        SHRI BHAGAWATI
                        <br />
                        DELIVERY
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
                            <div className='text-start mt-2'>
                                <div>Cashier:Admin</div>
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
                <div className="Middle-bill p-1 border-t-2 border-black main_bill ">
                    <div className='text-start mt-2'>
                        <div>PHONE NO : 9879248281 </div>
                    </div>
                    <div className='text-start mt-2'>
                        <div>NAME : CHIRAG BHAI </div>
                    </div>
                    <div className='text-start mt-2'>
                        <div>ADR:ghare</div>
                    </div>
                    <div className='text-start mt-2'>
                        <div>LOCALITY:SHAHER</div>
                    </div>
                </div>
                <div className="main_bill h-min">
                <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="border py-2 px-1 border-s-0 border-black text-start">Particulars</th>
                                <th className="border py-2 border-black text-center">Qty</th>
                                {/* <th className="border py-2 border-black text-center">Price</th> */}
                                <th className="border py-2 border-e-0 border-black text-center">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border first_column py-2 max-w-28 px-1 border-s-0 border-black text-start">Panerr Tika Masala <br /> <span className="text-xs">(Small text comment)</span> </td>
                                <td className="border second_column py-2 border-black text-center">99 Full</td>
                                {/* <td className="border fourth_column py-2 border-e-0 border-black text-end pr-1">121.00</td> */}
                                <td className="border third_column py-2 border-e-0 border-black text-end pr-1">10500.00</td>
                            </tr>
                            <tr>
                                <td className="border first_column py-2 mx-w-28 px-1  border-s-0 border-black text-start">Butter Milk</td>
                                <td className="border second_column px-1 py-2 border-black text-center">9 NO</td>
                                {/* <td className="border fourth_column third_column py-2 border-e-0 border-black text-end pr-1">999.00</td> */}
                                <td className="border third_column py-2 border-e-0 border-black text-end pr-1">30.00</td>
                            </tr>
                            <tr>
                                {/* <td className="border py-2 first_column  border-s-0 border-black text-start"></td> */}
                                <td className="border py-2 first_column  border-s-0 border-black text-start"></td>
                                <td className="border py-2 second_column font-bold border-black text-center">Total:</td>
                                <td className="border py-2 third_column  font-bold border-e-0 border-black text-end pr-1">135000.00</td>
                            </tr>
                            <tr>
                                <td colSpan='3' className="border py-2 first_column  border-s-0 border-black text-end">TOTAL QTY: 2, &nbsp; SUB TOTAL: 290</td>
                            </tr>
                            <tr className=''>
                                <td className="text-end py-2 border-t border-black" colSpan="2" >Discount:</td>
                                <td className="text-center py-2 border-t border-black">14.00</td>
                            </tr>
                            <tr>
                                <td colSpan='3' className="text-end border-y border-black py-2">Grand Total Rs.290.00</td>
                            </tr>
                            <tr>
                                <td colSpan='3'> Commnet: JAIN  PUCHDU FALANU </td>
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

export default TokenBil;
