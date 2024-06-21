import React from "react";
import "./css/Bill.css";
import "./css/RestaurantBill.css";

const RestaurantBill = (props) => {
  const customerData =
    props && props.data && props.data.customerDetails
      ? props.data.customerDetails
      : {};
  const itemList =
    props && props.data && props.data.itemsData ? props.data.itemsData : [];
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
              paddingBottom: "0.5rem",
              paddingTop: "0.6rem",
            }}
          >
            {props.data.firmData.firmName}
          </div>
          <div
            style={{ fontSize: "16px", lineHeight: "20px", fontWeight: "600" }}
          >
            {props.data.firmData.firmAddress}
          </div>
          <div
            style={{
              fontWeight: "500",
              fontSize: "12px",
              lineHeight: "20px",
              marginBottom: "8px",
              paddingBottom: "4px",
              paddingTop: "10px",
            }}
          >
            No: {props.data.firmData.otherMobileNo}
          </div>
        </div>
        <div
          style={{
            padding: "6px 0px 6px 0px",
            borderBottom: "2px solid black",
          }}
        >
          <div
            className="name font-medium text-sm"
            style={{ fontWeight: "500", fontSize: "14px" }}
          >
            GSTIN: {props.data.firmData.gstNumber}
          </div>
        </div>
        <div
          style={{
            padding: "6px 0px 6px 0px",
            borderBottom: "2px solid black",
          }}
        >
          <div
            className="name font-bold text-sm"
            style={{ fontWeight: "700", fontSize: "12px", lineHeight: "20px" }}
          >
            BILL OF SUPPLY
          </div>
        </div>
        {props.data.billPayType === "complimentary" && (
          <div
            style={{ paddingBottom: "0px", borderBottom: "2px solid black" }}
          >
            <div
              className="name font-bold text-sm"
              style={{
                fontWeight: "700",
                fontSize: "12px",
                lineHeight: "20px",
              }}
            >
              COMPLIMENTARY BILL
            </div>
          </div>
        )}
        {customerData &&
        (customerData.mobileNo ||
          customerData.customerName ||
          customerData.address ||
          customerData.locality) ? (
          <div
            style={{
              padding: "8px 4px 8px 4px ",
              width: "260px",
              height: "min-content",
            }}
          >
            <div
              style={{ textAlign: "start", marginTop: "8px", fontSize: "18px" }}
            >
              <div>Phone No : {customerData.mobileNo} </div>
            </div>
            <div
              style={{ textAlign: "start", marginTop: "8px", fontSize: "18px" }}
            >
              <div>Name : {customerData.customerName} </div>
            </div>
            <div
              style={{ textAlign: "start", marginTop: "8px", fontSize: "18px" }}
            >
              <div>Address : {customerData.address}</div>
            </div>
            <div
              style={{ textAlign: "start", marginTop: "8px", fontSize: "18px" }}
            >
              <div>Locality : {customerData.locality}</div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div
          style={{
            padding: "8px 4px 8px 4px ",
            width: "260px",
            height: "min-content",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "500",
              fontSize: "12px",
              lineHeight: "16px",
              alignItems: "center",
            }}
          >
            <div style={{ textAlign: "start" }}>
              <div style={{ textAlign: "start", fontSize: "12px" }}>
                Date : {props.data.billDate}
              </div>
              <div
                style={{
                  textAlign: "start",
                  marginTop: "4px",
                  fontSize: "12px",
                }}
              >
                <div>Time: {props.data.billTime}</div>
              </div>
              <div
                style={{
                  textAlign: "start",
                  marginTop: "4px",
                  fontSize: "12px",
                }}
              >
                BILL NO :{" "}
                <span style={{ fontWeight: "700", fontSize: "12px" }}>
                  {" "}
                  {props.data.billNo}
                </span>
              </div>
              <div style={{ marginTop: "4px", fontSize: "12px" }}>
                Bill Type : {props.data.billType}
              </div>
              <div style={{ marginTop: "4px", fontSize: "12px" }}>
                Cashier : {props.data.cashier}
              </div>
            </div>

            <div
              style={{
                textAlign: "start",
                maxWidth: "30%",
                marginRight: "10px",
              }}
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
                    fontSize: "16px",
                    lineHeight: "18px",
                  }}
                >
                  {props.data.billType == "Pick Up"
                    ? props.data.justToken
                    : props.data.tokenNo}{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "260px",
            height: "min-content",
            borderTop: "1px solid black",
            padding: "2px",
          }}
        >
          <div style={{ textAlign: "start", width: "100%" }}>
            <div style={{ textAlign: "start", fontSize: "12px" }}>
              <div>Comment: {props.data.billComment}</div>
            </div>
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
              width: "100%",
              border: "1px solid black",
              borderCollapse: "collapse",
              borderLeft: "0px",
              borderRight: "0px",
              borderBottom: "0px",
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
                    borderLeft: "0px",
                    textAlign: "start",
                    borderRight: "0px",
                    fontSize: "14px",
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
                    fontSize: "14px",
                  }}
                >
                  Qty
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  Price
                </th>
                <th
                  className="border py-2 border-e-0 border-black text-center"
                  style={{
                    border: "1px solid black",
                    paddingTop: "8px",
                    borderLeft: "0px",
                    borderRight: "0px",
                    paddingBottom: "8px",
                    textAlign: "center",
                  }}
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {itemList?.map((item) => (
                <tr key={item.itemName}>
                  <td
                    style={{
                      border: "1px solid black",
                      borderCollapse: "collapse",
                      borderLeft: "0px",
                      borderRight: "0px",
                      width: "60%",
                      padding: "8px 4px 8px 4px",
                      textAlign: "start",
                      fontSize: "13px",
                    }}
                  >
                    {item.itemName} <br />
                    {item.comment && (
                      <span
                        className="text-xs"
                        style={{
                          fontSize: "14px",
                          marginTop: "4px",
                          lineHeight: "27px",
                        }}
                      >
                        ({item.comment})
                      </span>
                    )}{" "}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      borderCollapse: "collapse",
                      width: "20%",
                      textAlign: "center",
                      fontSize: "13px",
                    }}
                  >
                    {item.qty}
                    {item.unit}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      borderCollapse: "collapse",
                      width: "20%",
                      textAlign: "center",
                      fontSize: "13px",
                    }}
                  >
                    {item.itemPrice.toFixed(2)}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      borderCollapse: "collapse",
                      borderLeft: "0px",
                      borderRight: "0px",
                      width: "20%",
                      paddingTop: "8px",
                      paddingBottom: "8px",
                      textAlign: "end",
                      paddingRight: "2px",
                      paddingLeft: "2px",
                      fontSize: "13px",
                    }}
                  >
                    {item.price.toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr style={{ padding: "5px" }}>
                <td
                  colSpan="4"
                  style={{
                    border: "1px solid black",
                    padding: "10px 4px 10px 0px",
                    width: "60%",
                    borderLeft: "0px",
                    textAlign: "right",
                    borderRight: "0px",
                    fontSize: "14px",
                  }}
                >
                  <pre style={{ fontFamily: "Verdana" }}>
                    Total Qty: {itemList.length}, Sub Total:{" "}
                    {props.data.subTotal.toFixed(2)}
                  </pre>
                </td>
              </tr>
              <tr className="">
                {props.data.discountType === "none" ? (
                  <></>
                ) : (
                  <>
                    <td
                      style={{
                        textAlign: "end",
                        padding: "10px 4px 10px 0px",
                        borderTop: "1px solid black",
                        fontSize: "14px",
                      }}
                      colSpan="4"
                    >
                      <pre style={{ fontFamily: "Verdana" }}>
                        Discount : {props.data.discountValue}{" "}
                        {props.data.discountType === "fixed"
                          ? ""
                          : props.data.discountType === "none"
                          ? ""
                          : "%"}
                        , {props.data.totalDiscount.toFixed(2)}
                      </pre>
                    </td>
                  </>
                )}
              </tr>
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "end",
                    borderTop: "1px solid black",
                    borderBottom: "1px solid black",
                    padding: "10px 4px 10px 0px",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  <pre style={{ fontFamily: "Verdana", fontSize: "18px" }}>
                    Grand Total Rs. {props.data.settledAmount.toFixed(2)}
                  </pre>
                </td>
              </tr>
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    fontWeight: "700",
                    borderTop: "1px solid black",
                    padding: "4px 0px 4px 0px",
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

export default RestaurantBill;
