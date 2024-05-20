import React from 'react';
import './css/Bill.css';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PercentIcon from '@mui/icons-material/Percent';

const TokenBil = (props) => {
    const customerData = props && props.data && props.data.customerDetails ? props.data.customerDetails : {}
    const itemList = props && props.data && props.data.itemsData ? props.data.itemsData : []
    return (
        <div style={{ width: 'fit-content', height: 'fit-content', fontFamily: 'Verdana' }}>
            <div style={{ width: 'fit-content', border: '1px solid black', borderCollapse: 'collapse', margin: '4px', textAlign: 'center' }}>
                <div style={{ padding: '16px 0px 16px 0px', borderBottom: '2px solid black' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '16px', lineHeight: '24px' }}>
                        SHRI BHAGAWATI
                        {/* {props.data.billPayType == 'cash'?'SHRI BHAGAWATI':props.data.firmData.firmName} */}
                        <br />
                        {props.data.billType}
                    </div>
                </div>
                <div style={{ padding: '8px 4px 8px 4px ', width: '305px', height: 'min-content' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '500', fontSize: '14px', lineHeight: '16px', alignItems: 'center' }}>
                        <div style={{ textAlign: 'start' }}>
                            <div>Date : {props.data.billDate}</div>
                            <div style={{ textAlign: 'start', marginTop: '6px' }}>
                                <div>Time: {props.data.billTime}</div>
                            </div>
                            <div style={{ marginTop: '6px', fontSize: '14px' }}>
                                Cashier : {props.data.cashier}
                            </div>
                        </div>

                        <div style={{ textAlign: 'start', maxWidth: '34%', padding: '2px' }}>
                            <div style={{ border: '1px solid black', borderCollapse: 'collapse', padding: '2px' }}>
                                TOKEN NO
                            </div>
                            <div style={{ border: '1px solid black', borderCollapse: 'collapse', borderTop: '0px', padding: '2px' }}>
                                <p style={{ textAlign: 'center', fontWeight: '700', fontSize: '20px', lineHeight: '18px' }}>{props.data.tokenNo}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {customerData && (customerData.mobileNo || customerData.customerName || customerData.address || customerData.locality) ?
                    <div style={{  padding: '8px 4px 8px 4px ', width: '309px', height: 'min-content', borderTop:'2px solid black' }}>
                        <div style={{ textAlign: 'start', marginTop: '6px', fontSize:'16px' }}>
                            <div>Phone No : {customerData.mobileNo} </div>
                        </div>
                        <div style={{ textAlign: 'start', marginTop: '6px', fontSize:'16px' }}>
                            <div>Name : {customerData.customerName} </div>
                        </div>
                        <div style={{ textAlign: 'start', marginTop: '6px', fontSize:'16px' }}>
                            <div>Address : {customerData.address}</div>
                        </div>
                        <div style={{ textAlign: 'start', marginTop: '6px', fontSize:'16px' }}>
                            <div>Locality : {customerData.locality}</div>
                        </div>
                    </div> : <></>
                }
                <div style={{ width: '316px', height: 'min-height' }}>
                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid black', paddingTop: '2px', paddingBottom: '2px', borderLeft: '0px', textAlign: 'start' }}>Particulars</th>
                                <th style={{ border: '1px solid black', paddingTop: '4px', paddingBottom: '4px', textAlign: 'center', width: '20%' }}>Qty</th>
                                <th style={{ border: '1px solid black', paddingTop: '4px', paddingBottom: '4px', borderRight: '0px', textAlign: 'center' }}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemList?.map((item,index) => (
                                <tr>
                                    <td style={{ border: '1px solid black', width: '60%',padding: '8px 4px 8px 4px', borderLeft: '0px', textAlign: 'start' }}>{item.inputName.itemName} <br /> {item.comment&&<span className="text-xs" style={{fontSize:'14px'}}>({item.comment})</span>} </td>
                                    <td style={{ border: '1px solid black', padding: '4px 0px 4px 0px', textAlign: 'center', width: '20%' }}>{item.qty} {item.unit}</td>
                                    {/* <td className="border fourth_column py-2 border-e-0 border-black text-end pr-1">121.00</td> */}
                                    <td style={{ border: '1px solid black', width: '20%', borderRight: '0px', textAlign: 'end', paddingRight: '2px' }}>{item.price}</td>
                                </tr>
                            ))}
                            <tr>
                                <td style={{ border: '1px solid black', width: '60%', padding: '4px', borderLeft: '0px', textAlign: 'start' }}></td>
                                <td style={{ border: '1px solid black', padding: '4px 0px 4px 0px', textAlign: 'center' }}>Total:</td>
                                <td style={{ border: '1px solid black', width: '20%', borderRight: '0px', textAlign: 'end', paddingRight: '2px' }}>{props.data.subTotal}</td>
                            </tr>
                            <tr style={{ padding: '5px' }}>
                                <td colSpan='3' style={{ border: '1px solid black', padding: '10px 4px 10px 0px', width: '60%', borderLeft: '0px', textAlign: 'right', borderRight: '0px', fontSize:'18px' }}><pre style={{ fontFamily: 'Verdana' }}>Total Qty: {itemList.length + 1},      Sub Total:   {props.data.subTotal}</pre></td>
                            </tr>
                            <tr className=''>
                                {props.data.discountType == 'none' ?
                                    <></>
                                    : <>
                                        <td style={{ textAlign: 'end', padding: '10px 4px 10px 0px', borderTop: '1px solid black', fontSize:'18px' }} colSpan="4" >
                                            <pre style={{fontFamily:'Verdana'}}>
                                                Discount : {props.data.discountValue} {props.data.discountType == 'fixed' ? '' : props.data.discountType == 'none' ? '' : '%'},  {props.data.totalDiscount}
                                            </pre>
                                        </td>
                                    </>
                                }
                            </tr>
                            <tr>
                                <td colSpan='3' style={{ textAlign: 'end', borderTop: '1px solid black', borderBottom: '1px solid black', padding: '10px 4px 10px 0px', fontWeight: 'bold', fontSize:'18px' }}><pre style={{ fontFamily: 'Verdana' }}>Grand Total Rs.  {props.data.settledAmount}</pre></td>
                            </tr>
                            {props.data.billComment&&
                            <tr>
                                <td colSpan='3' style={{textAlign:'center'}}> Commnet: {props.data.billComment}</td>
                            </tr>}
                            <tr>
                                <td colSpan='3' style={{ textAlign: 'center', fontWeight: '700', borderTop: '1px solid black', padding: '4px 0px 4px 0px' }}>Thanks</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TokenBil;
