import React from 'react';
import './css/Bill.css';

const TokenBil = () => {
    return (
        <div style={{ width: 'fit-content', height: 'fit-content',fontFamily:'Verdana' }}>
            <div style={{ width: 'fit-content', border: '1px solid black',borderCollapse: 'collapse', margin: '4px', textAlign: 'center' }}>
                <div style={{padding:'16px 0px 16px 0px', borderBottom:'2px solid black'}}>
                    <div  style={{fontWeight:'bold', fontSize:'16px', lineHeight:'24px'}}>
                        SHRI BHAGAWATI
                        <br />
                        DELIVERY
                    </div>
                </div>
                <div style={{ padding: '2px', width: '305px', height: 'min-content' }}>
                    <div style={{display:'flex',justifyContent:'space-between',fontWeight:'500',fontSize:'12px',lineHeight:'16px', margin:'4px'}}>
                        <div style={{textAlign:'start', width:'75%'}}>
                            <div className='text-start' style={{textAlign:'start'}}>
                                <div>Date : 19/04/2024</div>
                            </div>
                            <div style={{textAlign:'start',marginTop:'4px'}}>
                                <div>Time: 23:38</div>
                            </div>
                            <div style={{textAlign:'start',marginTop:'4px'}}>
                                <div>Cashier:Admin</div>
                            </div>
                        </div>
                        <div  style={{textAlign:'start', width:'25%' }}>
                            <div  style={{border:'1px solid black',paddingTop:'2px',paddingBottom:'2px',width:'100%', textAlign:'center',width:'100%'}}>
                                TOKEN NO
                            </div>
                            <div style={{border:'1px solid black', borderTop:'0px', padding:'2px',width:'95%'}}>
                                <p style={{textAlign:'center', fontWeight:'700', fontSize:'18px', lineHeight:'18px', width:'100%'}}>H999</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{padding:'2px',borderTop:'2px solid black',width:'309px',height:'min-content'}}>
                    <div style={{textAlign:'start', marginTop:'4px'}}>
                        <div>PHONE NO : 9879248281 </div>
                    </div>
                    <div style={{textAlign:'start',marginTop:'4px'}}>
                        <div>NAME : CHIRAG BHAI </div>
                    </div>
                    <div style={{textAlign:'start', marginTop:'4px'}}>
                        <div>ADR:ghare</div>
                    </div>
                    <div style={{textAlign:'start', marginTop:'4px'}}>
                        <div>LOCALITY:SHAHER</div>
                    </div>
                </div>
                <div style={{width:'316px',height:'min-height'}}>
                <table style={{borderCollapse:'collapse',width:'100%'}}>
                        <thead>
                            <tr>
                                <th style={{border:'1px solid black', paddingTop:'2px', paddingBottom:'2px', borderLeft:'0px', textAlign:'start'}}>Particulars</th>
                                <th style={{border:'1px solid black', paddingTop:'4px', paddingBottom:'4px', textAlign:'center', width:'20%'}}>Qty</th>
                                <th style={{border:'1px solid black', paddingTop:'4px', paddingBottom:'4px', borderRight:'0px', textAlign:'center'}}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{border:'1px solid black',width:'60%', padding:'4px',borderLeft:'0px',textAlign:'start'}}>Panerr Tika Masala <br /> <span className="text-xs">(Small text comment)</span> </td>
                                <td style={{border:'1px solid black',padding:'4px 0px 4px 0px', textAlign:'center', width:'20%'}}>99 Full</td>
                                {/* <td className="border fourth_column py-2 border-e-0 border-black text-end pr-1">121.00</td> */}
                                <td style={{border:'1px solid black',width:'20%',borderRight:'0px', textAlign:'end', paddingRight:'2px'}}>10500.00</td>
                            </tr>
                            <tr>
                                <td style={{border:'1px solid black',width:'60%', padding:'4px',borderLeft:'0px',textAlign:'start'}}>Panerr Tika Masala <br /> <span className="text-xs">(Small text comment)</span> </td>
                                <td style={{border:'1px solid black',padding:'4px 0px 4px 0px', textAlign:'center'}}>99 Full</td>
                                {/* <td className="border fourth_column py-2 border-e-0 border-black text-end pr-1">121.00</td> */}
                                <td style={{border:'1px solid black',width:'20%',borderRight:'0px', textAlign:'end', paddingRight:'2px'}}>10500.00</td>
                            </tr>
                            <tr>
                                <td style={{border:'1px solid black',width:'60%', padding:'4px',borderLeft:'0px',textAlign:'start'}}></td>
                                <td style={{border:'1px solid black',padding:'4px 0px 4px 0px', textAlign:'center'}}>Total:</td>
                                <td style={{border:'1px solid black',width:'20%',borderRight:'0px', textAlign:'end', paddingRight:'2px'}}>135000.00</td>
                            </tr>
                            <tr>
                                <td colSpan='3'  style={{border:'1px solid black', padding:'4px 0px 4px 0px', width:'60%',borderLeft:'0px',textAlign:'right'}}>TOTAL QTY: 2, &nbsp; SUB TOTAL: 290</td>
                            </tr>
                            <tr className=''>
                                <td  style={{textAlign:'end',padding:'4px 0px 4px 0px', borderTop:'1px solid black'}} colSpan="2" >Discount:</td>
                                <td className="text-center py-2 border-t border-black">14.00</td>
                            </tr>
                            <tr>
                                <td colSpan='3'  style={{textAlign:'end', borderTop:'1px solid black', borderBottom:'1px solid black',padding:'4px 0px 4px 0px'}}>Grand Total Rs.290.00</td>
                            </tr>
                            <tr>
                                <td colSpan='3'> Commnet: JAIN  PUCHDU FALANU </td>
                            </tr>
                            <tr>
                                <td colSpan='3' style={{textAlign:'center', fontWeight:'700', borderTop:'1px solid black', padding:'4px 0px 4px 0px'}}>Thanks</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TokenBil;
