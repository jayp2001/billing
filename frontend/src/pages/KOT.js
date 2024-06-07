import React from "react";
import "./css/Bill.css";
import "./css/RestaurantBill.css";
import { useActionData } from "react-router-dom";

const KOT = (props) => {
  const customerData =
    props && props.data && props.data.customerDetails
      ? props.data.customerDetails
      : {};
  const itemList =
    props && props.data && props.data.itemsData ? props.data.itemsData : [];

  return (
    <div
      style={{
        width: "fit-content",
        height: "fit-content",
        fontFamily: "Verdana",
      }}
    >
      <div
        style={{
          width: "fit-content",
          border: "1px solid black",
          borderCollapse: "collapse",
          margin: "4px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            padding: "16px 0px 16px 0px",
            borderBottom: "2px solid black",
          }}
        >
          <div
            style={{ fontWeight: "bold", fontSize: "20px", lineHeight: "24px" }}
          >
            <meta charSet="utf-8" />
            {/* {props.data.billPayType == 'cash'?'SHRI BHAGAWATI':props.data.firmData.firmName} */}
            {/* {props.data.billType} */}
            Delivery
            <br />
            KOT
            <br />
            {props.isEdit ? '( NEW BILL )' : ''}
          </div>
        </div>
        <div
          style={{
            padding: "8px 4px 8px 4px ",
            width: "305px",
            height: "min-content",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "500",
              fontSize: "14px",
              lineHeight: "16px",
              alignItems: "center",
            }}
          >
            <div style={{ textAlign: "start" }}>
              <div>Date : {props.data.billDate}</div>
              <div style={{ textAlign: "start", marginTop: "6px" }}>
                <div>Time: {props.data.billTime}</div>
              </div>
              <div style={{ marginTop: "6px", fontSize: "14px" }}>
                Cashier : {props.data.cashier}
              </div>
              {props.data.billType == "Dine In" && (
                <div style={{ textAlign: "start", marginTop: "6px" }}>
                  <div>
                    Table No{" "}
                    <span style={{ fontSize: "16px", fontWeight: "700" }}>
                      {props.data.tableNo}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div
              style={{ textAlign: "start", maxWidth: "34%", padding: "2px" }}
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
                    lineHeight: "18px",
                  }}
                >
                  {props.data.tokenNo}
                </p>
              </div>
            </div>
          </div>
        </div>
        {customerData &&
          (customerData.mobileNo ||
            customerData.customerName ||
            customerData.address ||
            customerData.locality) ? (
          <div
            style={{
              padding: "8px 4px 8px 4px ",
              width: "309px",
              height: "min-content",
              borderTop: "2px solid black",
            }}
          >
            <div
              style={{ textAlign: "start", marginTop: "6px", fontSize: "14px" }}
            >
              <div>Phone No : {customerData.mobileNo} </div>
            </div>
            <div
              style={{ textAlign: "start", marginTop: "6px", fontSize: "14px" }}
            >
              <div>Name : {customerData.customerName} </div>
            </div>
            <div
              style={{ textAlign: "start", marginTop: "6px", fontSize: "14px" }}
            >
              <div>Address : {customerData.address}</div>
            </div>
            <div
              style={{ textAlign: "start", marginTop: "6px", fontSize: "14px" }}
            >
              <div>Locality : {customerData.locality}</div>
            </div>
            <div
              style={{ textAlign: "start", marginTop: "6px", fontSize: "14px" }}
            >
              <div>Locality : હેલો આ મારું સરનામું છે</div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="main_bill h-min">
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th
                  style={{
                    border: "1px solid black",
                    paddingTop: "2px",
                    paddingBottom: "2px",
                    borderLeft: "0px",
                    textAlign: "start",
                  }}
                >
                  Items
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    borderRight: "0px",
                    textAlign: "center",
                    width: "20%",
                  }}
                >
                  Qty
                </th>
              </tr>
            </thead>
            <tbody>
              {itemList?.map((item) => (
                <tr>
                  <td
                    style={{
                      border: "1px solid black",
                      width: "80%",
                      fontWeight: "700",
                      paddingTop: "6px",
                      lineHeight: "30px",
                      paddingLeft: "4px",
                      paddingRight: "4px",
                      paddingBottom: "6px",
                      fontSize: "18px",
                      borderLeft: "0px",
                      textAlign: "start",
                    }}
                  >
                    {item.itemName} <br />{" "}
                    {item.comment && (
                      <span
                        className="text-xs"
                        style={{ fontSize: "16px", marginTop: "4px" }}
                      >
                        ({item.comment})
                      </span>
                    )}{" "}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "4px 0px 4px 0px",
                      borderRight: "0px",
                      textAlign: "center",
                      width: "20%",
                    }}
                  >
                    {item.qty} {item.unit}
                  </td>
                </tr>
              ))}
              {/* <tr>
                                <td style={{ border: '1px solid black', width: '60%', padding: '4px', borderLeft: '0px', textAlign: 'start' }}>Panerr Tika Masala <br /> <span className="text-xs">(Small text comment)</span> </td>
                                <td style={{ border: '1px solid black', padding: '4px 0px 4px 0px', textAlign: 'center' }}>99 Full</td>
                            </tr> */}
            </tbody>
          </table>
        </div>
        {
          <div
            style={{
              padding: "2px",
              width: "313px",
              height: "min-content",
              borderTop: "1px solid black",
            }}
          >
            <div style={{ textAlign: "start", width: "100%" }}>
              <div
                style={{
                  textAlign: "start",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                <div>Commnet: {props.data.billComment}</div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default KOT;
