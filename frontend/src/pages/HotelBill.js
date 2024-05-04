import React from 'react';
import './css/Bill.css';

const HotelBill = () => {
    return (
        <div className='w-fit h-fit' style={{ width: 'fit-content', height: 'fit-content',fontFamily:'Verdana' }}>
            <div style={{ width: 'fit-content', border: '1px solid black',borderCollapse: 'collapse', margin: '4px', textAlign: 'center' }}>
                <div style={{ paddingTop: '6px', paddingBottom: '0px', borderBottom: '2px solid black' }}>
                    <div style={{ fontWeight: '700', fontSize: '1rem', lineHeight: '24px', paddingBottom: '1rem', paddingTop: '0.6rem' }}>
                        SHRI BHAGAWATI FAST FOOD
                    </div>
                    <div style={{ fontSize: '14px', lineHeight: '20px', fontWeight: '500' }}>
                        PALACE ROAD RAJKOT - 360 001
                    </div>
                    <div style={{ fontWeight: '500', fontSize: '14px', lineHeight: '20px', marginBottom: '8px', paddingBottom: '4px' }}>
                        PHONE: 2243235(M) : 9825360287
                    </div>
                </div>
                <div style={{ paddingBottom: '0px', borderBottom: '2px solid black' }}>
                    <div className="name font-medium text-sm" style={{ fontWeight: '500' }}>
                        GSTIN: 24BDZPC3972L1ZX
                    </div>
                </div>
                <div style={{ paddingBottom: '0px', borderBottom: '2px solid black' }}>
                    <div className="name font-bold text-sm" style={{ fontWeight: '700', fontSize: '14px', lineHeight: '20px' }}>
                        BILL OF SUPPLY
                    </div>
                </div>
                <div style={{ padding: '2px', width: '305px', height: 'min-content' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '500', fontSize: '12px', lineHeight: '16px' }}>
                        <div style={{ textAlign: 'start' }}>
                            <div>Date : 19/04/2024</div>
                        </div>
                        <div style={{ textAlign: 'start' }}>
                            <div>Time: 23:38</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '500', fontSize: '12px', lineHeight: '16px', marginTop: '8px' }}>
                        <div className='text-start upper_right' style={{ textAlign: 'start', maxWidth: '75%' }}>
                            <div>
                                HOTEL CASH : <span style={{ fontWeight: '700' }}> 94809902</span>
                            </div>
                            <div style={{ marginTop: '8px' }}>
                                HOTEL : Ever Krishna Palace
                            </div>
                            <div style={{ marginTop: '8px' }}>
                                ROOM NO : <span className="font-bold">201</span>
                            </div>
                            <div style={{ marginTop: '8px', textAlign: 'start', fontWeight: '100', fontSize: '12px', lineHeight: '16px' }}>
                                ADDRESS : <span className="text-xs font-thin">Palcae Road Bhagawati restaurant Rajkot </span>
                            </div>
                        </div>
                        <div style={{ textAlign: 'start', maxWidth: '25%',padding:'2px' }}>
                            <div style={{ border: '1px solid black',borderCollapse: 'collapse', padding:'2px' }}>
                                TOKEN NO
                            </div>
                            <div style={{ border: '1px solid black',borderCollapse: 'collapse', borderTop: '0px', padding: '2px' }}>
                                <p style={{ textAlign: 'center', fontWeight: '700', fontSize: '20px', lineHeight: '28px' }}>H999</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '8px', textAlign: 'start', fontWeight: '100', fontSize: '12px', lineHeight: '16px' }}>
                        LOCALITY : BHAKTINAGAR
                    </div>
                </div>
                <div className="main_bill h-min" style={{ width: ' 309px', height: 'min-content' }}>
                    <table className="table-auto w-full" style={{ tableLayout: 'auto', width: '100%',border: '1px solid black',borderCollapse: 'collapse'}}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid black',borderCollapse: 'collapse', paddingTop: '8px', paddingBottom: '8px', borderLeft: '0px', textAlign: 'start' }}>Particulars</th>
                                <th style={{ border: '1px solid black',borderCollapse: 'collapse', paddingTop: '8px', paddingBottom: '8px', textAlign: 'center' }}>Qty</th>
                                <th className="border py-2 border-e-0 border-black text-center" style={{ bprder: '1px solid black', paddingTop: '8px', paddingBottom: '8px', textAlign: 'center' }}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ border: '1px solid black',borderCollapse: 'collapse', width: '60%', paddingRight: '2px', paddingLeft: '2px', textAlign: 'start' }}>Panerr Tika Masala </td>
                                <td style={{ border: '1px solid black',borderCollapse: 'collapse', width: '20%', textAlign: 'center' }}>99 Full</td>
                                <td style={{ border: '1px solid black',borderCollapse: 'collapse', width: '20%', paddingTop: '8px', paddingBottom: '8px', textAlign: 'end', paddingRight: '2px' , paddingLeft:'2px' }}>10555.00</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black',borderCollapse: 'collapse', width: '60%', paddingRight: '2px', paddingLeft: '2px', textAlign: 'start' }}>Butter Milk </td>
                                <td style={{ border: '1px solid black',borderCollapse: 'collapse', width: '20%', textAlign: 'center' }}>99 Full</td>
                                <td style={{ border: '1px solid black',borderCollapse: 'collapse', width: '20%', paddingTop: '8px', paddingBottom: '8px', textAlign: 'end', paddingRight: '2px', paddingLeft:'2px'  }}>105.00</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black',borderCollapse: 'collapse', width: '60%', paddingRight: '2px', paddingLeft: '2px', textAlign: 'start' }}></td>
                                <td style={{ border: '1px solid black',borderCollapse: 'collapse', width: '20%', textAlign: 'center' }}>Total:</td>
                                <td style={{ border: '1px solid black',borderCollapse: 'collapse', width: '20%', paddingTop: '8px', paddingBottom: '8px', textAlign: 'end', paddingRight: '2px', paddingLeft:'2px' }}>135000.00</td>
                            </tr>
                            <tr>
                                <td colSpan='3'>  <hr style={{ border: '1px dashed black', marginTop: '10px', marginBottom: '10px' }} /></td>
                            </tr>
                            <tr className=''>
                                <td colSpan="2" style={{ textAlign: 'end', paddingTop: '8px', paddingBottom: '8px' }} >Discount:</td>
                                <td style={{ textAlign: 'center', paddingTop: '8px', paddingBottom: '8px' }}>14.00</td>
                            </tr>
                            <tr>
                                <td colSpan='3' style={{ textAlign: 'end', borderTop: '1px solid black', paddingTop: '8px', paddingBottom: '8px' }}>Grand Total Rs.290.00</td>
                            </tr>
                            <tr>
                                <td colSpan='3' style={{textAlign:'center',fontWeight:'700',borderTop:'1px solid black', paddingTop:'8px', paddingRight:'8px'}}>Thanks</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HotelBill;