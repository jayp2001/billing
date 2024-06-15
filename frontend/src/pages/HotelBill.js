import React from "react";
import "./css/Bill.css";

const HotelBill = () => {
  return (
    <div
      className="w-fit h-fit"
      style={{
        width: "260px",
        height: "fit-content",
        fontFamily: "Verdana",
      }}
    >
      <meta charSet="utf-8" />
      <div
        style={{
          width: "260px",
          border: "1px solid black",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        <div
          style={{
            paddingTop: "6px",
            paddingBottom: "0px",
            borderBottom: "2px solid black",
          }}
        >
          <div
            style={{
              fontWeight: "700",
              fontSize: "14px",
              lineHeight: "24px",
              paddingBottom: "1rem",
              paddingTop: "0.6rem",
            }}
          >
            SHRI BHAGAWATI FAST FOOD
          </div>
          <div
            style={{ fontSize: "12px", lineHeight: "20px", fontWeight: "500" }}
          >
            PALACE ROAD RAJKOT - 360 001
          </div>
          <div
            style={{
              fontWeight: "500",
              fontSize: "12px",
              lineHeight: "20px",
              marginBottom: "8px",
              paddingBottom: "4px",
            }}
          >
            PHONE: 2243235(M) : 9825360287
          </div>
        </div>
        <div style={{ paddingBottom: "0px", borderBottom: "2px solid black" }}>
          <div
            className="name font-medium text-sm"
            style={{ fontWeight: "500",fontSize:'12px' }}
          >
            GSTIN: 24BDZPC3972L1ZX
          </div>
        </div>
        <div style={{ paddingBottom: "0px", borderBottom: "2px solid black" }}>
          <div
            className="name font-bold text-sm"
            style={{ fontWeight: "700", fontSize: "12px", lineHeight: "20px" }}
          >
            BILL OF SUPPLY
          </div>
        </div>
        <div style={{  width: "260px", height: "min-content",padding:'1px' }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "500",
              fontSize: "12px",
              lineHeight: "16px",
              padding:'1px'
            }}
          >
            <div style={{ textAlign: "start" }}>
              <div style={{fontSize:'10px'}}>Date : 19/04/2024</div>
            </div>
            <div style={{ textAlign: "start" }}>
              <div style={{fontSize:'10px'}}>Time: 23:38</div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "500",
              fontSize: "12px",
              lineHeight: "16px",
              marginTop: "8px",
            }}
          >
            <div
              className="text-start upper_right"
              style={{ textAlign: "start", maxWidth: "75%",fontSize:'10p' }}
            >
              <div>
                HOTEL CASH :{" "}
                <span style={{ fontWeight: "700",fontSize:'10p' }}> 94809902</span>
              </div>
              <div style={{ marginTop: "4px",fontSize:'10p' }}>
                HOTEL : Ever Krishna Palace
              </div>
              <div style={{ marginTop: "4px",fontSize:'10p' }}>
                ROOM NO : <span className="font-bold">201</span>
              </div>
              <div
                style={{
                  marginTop: "4px",
                  textAlign: "start",
                  fontWeight: "100",
                  fontSize: "12px",
                  lineHeight: "16px",
                }}
              >
                ADDRESS :{" "}
                <span className="text-xs font-thin" style={{fontSize:'12px'}}>
                  Palcae Road Bhagawati restaurant Rajkot{" "}
                </span>
              </div>
            </div>
            <div
              style={{ textAlign: "start", width: "50%", marginRight:'6px' }}
            >
              <div
                style={{
                  border: "1px solid black",
                  borderCollapse: "collapse",
                  padding: "2px",
                }}
              >
                TOKEN NO
              </div>
              <div
                style={{
                  border: "1px solid black",
                  borderCollapse: "collapse",
                  borderTop: "0px",
                  padding: "2px",
                }}
              >
                <p
                  style={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: "20px",
                    lineHeight: "28px",
                  }}
                >
                  H999
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "4px",
              textAlign: "start",
              fontWeight: "100",
              fontSize: "10px",
              lineHeight: "16px",
            }}
          >
            LOCALITY : BHAKTINAGAR
          </div>
        </div>
        <div
          className="main_bill h-min"
          style={{ width: " 260px", height: "min-content" }}
        >
          <table
            className="table-auto w-full"
            style={{
              tableLayout: "auto",
              width: "260px",
              border: "1px solid black",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    textAlign: "start",
                    fontSize:'14px'
                  }}
                >
                  Particulars
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    textAlign: "center",
                    fontSize:'14px'
                  }}
                >
                  Qty
                </th>
                <th
                  className="border py-2 border-e-0 border-black text-center"
                  style={{
                    bprder: "1px solid black",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    textAlign: "center",
                    fontSize:'14px'
                  }}
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    width: "60%",
                    paddingRight: "2px",
                    paddingLeft: "2px",
                    textAlign: "start",
                    fontSize:'12px'
                  }}
                >
                  Panerr Tika Masala{" "}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    width: "20%",
                    textAlign: "center",
                    fontSize:'12px'
                  }}
                >
                  99 Full
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    width: "20%",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    textAlign: "end",
                    paddingRight: "2px",
                    paddingLeft: "2px",
                    fontSize:'12px'
                  }}
                >
                  10555.00
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    width: "60%",
                    paddingRight: "2px",
                    paddingLeft: "2px",
                    textAlign: "start",
                    fontSize:'10px'
                  }}
                >
                  Butter Milk{" "}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    width: "20%",
                    textAlign: "center",
                    fontSize:'12px'
                  }}
                >
                  99 Full
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    width: "20%",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    textAlign: "end",
                    paddingRight: "2px",
                    paddingLeft: "2px",
                    fontSize:'12px'
                  }}
                >
                  105.00
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    width: "60%",
                    paddingRight: "2px",
                    paddingLeft: "2px",
                    textAlign: "start",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    width: "20%",
                    textAlign: "center",
                    fontSize:'12px'
                  }}
                >
                  Total:
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    width: "20%",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    textAlign: "end",
                    paddingRight: "2px",
                    paddingLeft: "2px",
                    fontSize:'12px'
                  }}
                >
                  135000.00
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  {" "}
                  <hr
                    style={{
                      border: "1px dashed black",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  />
                </td>
              </tr>
              <tr className="">
                <td
                  colSpan="2"
                  style={{
                    textAlign: "end",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    fontSize:'14px'
                  }}
                >
                  Discount:
                </td>
                <td
                  style={{
                    textAlign: "center",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    fontSize:'14px'
                  }}
                >
                  14.00
                </td>
              </tr>
              <tr>
                <td
                  colSpan="3"
                  style={{
                    textAlign: "end",
                    borderTop: "1px solid black",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    fontSize:'14px'
                  }}
                >
                  Grand Total Rs.290.00
                </td>
              </tr>
              <tr>
                <td
                  colSpan="3"
                  style={{
                    textAlign: "center",
                    fontWeight: "700",
                    borderTop: "1px solid black",
                    paddingTop: "8px",
                    paddingRight: "8px",
                  }}
                >
                  Thanks
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HotelBill;
