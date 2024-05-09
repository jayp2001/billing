import React from 'react';
import './css/Bill.css';
import './css/RestaurantBill.css'
import { useActionData } from 'react-router-dom';

const KOT = (props) => {
    const customerData = props&&props.data&&props.data.customerDetails?props.data.customerDetails:{}
    const itemList = props&&props.data&&props.data.itemsData?props.data.itemsData:[]

    return (
        <div style={{ width: 'fit-content', height: 'fit-content', fontFamily: 'Verdana' }}>
            <div style={{ width: 'fit-content', border: '1px solid black', borderCollapse: 'collapse', margin: '4px', textAlign: 'center' }}>
                <div style={{ padding: '16px 0px 16px 0px', borderBottom: '2px solid black' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '16px', lineHeight: '24px' }}>
                        {/* {props.data.billPayType == 'cash'?'SHRI BHAGAWATI':props.data.firmData.firmName} */}
                        {props.data.billType}
                        <br />
                        KOT
                    </div>
                </div>
                <div style={{ padding: '2px', width: '305px', height: 'min-content' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '500', fontSize: '12px', lineHeight: '16px', margin: '4px', width: '100%' }}>
                        <div style={{ textAlign: 'start', width: '75%' }}>
                            <div className='text-start' style={{ textAlign: 'start' }}>
                                <div>Date : {props.data.billDate}</div>
                            </div>
                            <div style={{ textAlign: 'start', marginTop: '4px' }}>
                                <div>Time: {props.data.billTime}</div>
                            </div>
                            <div style={{ textAlign: 'start', marginTop: '4px' }}>
                                <div>Cashier: {props.data.cashier}</div>
                            </div>
                            { props.data.billType == 'Dine In'&&
                            <div style={{ textAlign: 'start', marginTop: '4px' }}>
                                <div>Table No  <span style={{ fontSize: '16px', fontWeight: '700' }}>{props.data.tableNo}</span></div>
                            </div>}
                        </div>
                        <div style={{ textAlign: 'start', width: '25%', marginRight: '15px' }}>
                            <div style={{ border: '1px solid black', paddingTop: '2px', paddingBottom: '2px', width: '100%', textAlign: 'center', width: '100%' }}>
                                TOKEN NO
                            </div>
                            <div style={{ border: '1px solid black', borderTop: '0px', padding: '2px', width: '95%' }}>
                                <p style={{ textAlign: 'center', fontWeight: '700', fontSize: '18px', lineHeight: '18px', width: '100%' }}>{props.data.tokenNo}</p>
                            </div>
                        </div>
                    </div>
                </div>
                { customerData && (customerData.mobileNo ||customerData.customerName||customerData.address||customerData.locality)?
                <div style={{padding:'2px',borderTop:'2px solid black',width:'309px',height:'min-content'}}>
                    <div style={{textAlign:'start', marginTop:'4px'}}>
                        <div>PHONE NO : {customerData.mobileNo} </div>
                    </div>
                    <div style={{textAlign:'start',marginTop:'4px'}}>
                        <div>NAME : {customerData.customerName} </div>
                    </div>
                    <div style={{textAlign:'start', marginTop:'4px'}}>
                        <div>ADR : {customerData.address}</div>
                    </div>
                    <div style={{textAlign:'start', marginTop:'4px'}}>
                        <div>LOCALITY : {customerData.locality}</div>
                    </div>
                </div>:<></>
                }
                <div style={{ padding: '2px', width: '305px', height: 'min-content',borderTop:'1px solid black' }}>
                    <div style={{ textAlign: 'start', width: '100%' }}>
                        <div  style={{ textAlign: 'start', fontSize:'16px' }}>
                            <div>Commnet: {props.data.billComment}</div>
                        </div>
                    </div>
                </div>
                <div className="main_bill h-min">
                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid black', paddingTop: '2px', paddingBottom: '2px', borderLeft: '0px', textAlign: 'start' }}>Particulars</th>
                                <th style={{ border: '1px solid black', paddingTop: '4px', paddingBottom: '4px', textAlign: 'center', width: '20%' }}>Qty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemList?.map((item)=>(
                                <tr>
                                    <td style={{ border: '1px solid black', width: '60%', padding: '4px', borderLeft: '0px', textAlign: 'start' }}>{item.inputName.itemName} <br /> {item.comment&&<span className="text-xs">({item.comment})</span>} </td>
                                    <td style={{ border: '1px solid black', padding: '4px 0px 4px 0px', textAlign: 'center', width: '20%' }}>{item.qty} {item.unit}</td>
                                </tr>
                            ))
                            }
                            {/* <tr>
                                <td style={{ border: '1px solid black', width: '60%', padding: '4px', borderLeft: '0px', textAlign: 'start' }}>Panerr Tika Masala <br /> <span className="text-xs">(Small text comment)</span> </td>
                                <td style={{ border: '1px solid black', padding: '4px 0px 4px 0px', textAlign: 'center' }}>99 Full</td>
                            </tr> */}
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

export default KOT;
