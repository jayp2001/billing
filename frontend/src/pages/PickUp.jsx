/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  Button,
  Input,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import "./css/pickUp.css";
import Header from "../components/Header/Header";
import { IoIosRestaurant } from "react-icons/io";
import Button1 from "../components/Button/Button1";
import { MdCancel } from "react-icons/md";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";
import { FormControl } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { renderToString } from "react-dom/server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_BASE_URL } from "../url";
import InputAdornment from "@mui/material/InputAdornment";
import InputBase from "@mui/material/InputBase";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PercentIcon from "@mui/icons-material/Percent";
import BlockIcon from "@mui/icons-material/Block";
import KOT from "./KOT";
import RestaurantBill from "./RestaurantBill";
import TokenBil from "./TokenBill";
import { Switch } from "@mui/material";
import e from "express";
const { ipcRenderer } = window.require("electron");
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 14,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      // border:'1px sold #80bdff !important'
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));
const PickUp = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const systemPrinter = JSON.parse(localStorage.getItem("printerPreference"));
  const pickupkot = systemPrinter.filter(
    (printer) => printer.categoryId == "pickupkot"
  );
  const pickupbill = systemPrinter.filter(
    (printer) => printer.categoryId == "pickupbill"
  );
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  // const data = [
  //   {
  //     "itemShortKey": "BT",
  //     "itemCode": 22,
  //     "itemName": "Butter Tika - BT",
  //     "variantsList": ["kg", "g", "lb", "oz"]
  //   },
  //   {
  //     "itemShortKey": "CG",
  //     "itemCode": 33,
  //     "itemName": "Cheese Garlic Bread",
  //     "variantsList": ["kg"]
  //   },
  //   {
  //     "itemShortKey": "FP",
  //     "itemCode": 44,
  //     "itemName": "French Pizza",
  //     "variantsList": ["kg"]
  //   }
  // ];

  const [fullFormData, setFullFormData] = useState({
    inputCode: "",
    itemId: "",
    inputName: "",
    qty: 1,
    unit: "",
    comment: "",
    selectedItem: "",
    selectedUnit: "",
    itemPrice: 0,
    price: 0,
  });

  const [items, setItems] = useState([]);
  const [billData, setBillData] = useState({
    subTotal: 0,
    discountType: "none",
    discountValue: 0,
    settledAmount: "",
    billPayType: "cash",
    billComment: "",
  });
  const [customerData, setCustomerData] = useState({
    customerId: "",
    addressId: "",
    mobileNo: "",
    customerName: "",
    address: "",
    locality: "",
    birthDate: "",
    aniversaryDate: "",
  });
  const [isEnglish, setIsEnglish] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [validationError, setValidationError] = useState(false);
  const [buttonCLicked, setButtonCLicked] = useState("tab1");
  const quantityInputRef = useRef(null);
  const [data, setData] = useState([]);
  const unitInputRef = useRef(null);
  const commentInputRef = useRef(null);
  const first = useRef(null);
  const second = useRef(null);
  const handleInputCodeChange = (e) => {
    const value = e.target.value;
    setFullFormData((prevState) => ({
      ...prevState,
      inputCode: value,
    }));
    // const matchingProduct = data.find(item => item.itemCode.toString() === value);

    // if (e.key === 'Enter') {
    //   e.preventDefault();
    //   setValidationError(false)
    //   quantityInputRef.current && quantityInputRef.current.focus();
    // }
    // console.log('value' , matchingProduct)

    // if(matchingProduct === value){
    //   setValidationError(false)
    // }

    // if (matchingProduct) {
    //   setFullFormData(prevState => ({
    //     ...prevState,
    //     inputName: matchingProduct
    //   }));
    // }
  };

  const getData = async () => {
    await axios
      .get(
        `${BACKEND_BASE_URL}menuItemrouter/getItemData?menuId=base_2001`,
        config
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        // setError(error.response && error.response.data ? error.response.data : "Network Error ...!!!");
        setData(null);
      });
  };

  useEffect(() => {
    first.current.focus();
    getData();
  }, []);
  const handleInputNameChange = (e, value) => {
    // const filtered = value ? data.filter(item =>
    //   (item.itemShortKey && item.itemShortKey.toLowerCase().includes(value.toLowerCase())) ||
    //   (item.itemName && item.itemName.toLowerCase().includes(value.toLowerCase()))
    // ) : [];
    console.log("filltered", value);
    setValidationError(false);
    setFullFormData((prevState) => ({
      ...prevState,
      inputName: value ? value : "",
      selectedItem: value ? value : "",
      itemId: value && value.itemId ? value.itemId : "",
    }));

    if (value) {
      setFullFormData((prevState) => ({
        ...prevState,
        inputCode: value.itemCode.toString(),
      }));
    }
  };
  const addBillData = async () => {
    setLoading(true);
    const customData = {
      customerDetails: {
        ...customerData,
      },
      billType: "Pick Up",
      printBill: true,
      printKot: true,
      firmId: "A",
      billComment: "Tikkha Name",
      billStatus: "Print",
      totalDiscount: billData.subTotal - billData.settledAmount,
      ...billData,
      itemsData: items,
    };
    console.log(
      "DISCOUNT",
      billData.subTotal - billData.settledAmount,
      billData.subTotal,
      billData.settledAmount
    );
    await axios
      .post(
        `${BACKEND_BASE_URL}billingrouter/addPickUpBillData`,
        customData,
        config
      )
      .then((res) => {
        setSuccess(true);
        setLoading(false);
        setItems([]);
        setFullFormData({
          inputCode: "",
          itemId: "",
          inputName: "",
          qty: 1,
          unit: "",
          comment: "",
          selectedItem: "",
          selectedUnit: "",
          itemPrice: 0,
          price: 0,
        });
        setBillData({
          subTotal: 0,
          discountType: "none",
          discountValue: 0,
          settledAmount: "",
          billPayType: "cash",
          billComment: "",
        });
        const pickupKotPrint = renderToString(<KOT data={res.data} />);
        const pickupBillPrint = renderToString(
          res && res.data && res.data.isOfficial ? (
            <RestaurantBill data={res.data} />
          ) : (
            <TokenBil data={res.data} />
          )
        );
        const printerDataKot = {
          printer: pickupkot,
          data: pickupKotPrint,
        };
        const printerDataBill = {
          printer: pickupbill,
          data: pickupBillPrint,
        };
        // const htmlString = renderToString(<RestaurantBill />)
        if (res && res.data && res.data.printBill && res.data.printKot) {
          ipcRenderer.send("set-title", printerDataKot);
          ipcRenderer.send("set-title", printerDataBill);
        } else if (res && res.data && res.data.printBill) {
          ipcRenderer.send("set-title", printerDataBill);
        } else if (res && res.data && res.data.printKot) {
          ipcRenderer.send("set-title", printerDataKot);
        }
      })
      .catch((error) => {
        setError(
          error.response && error.response.data
            ? error.response.data
            : "Network Error ...!!!"
        );
      });
  };
  const saveBill = () => {
    if (loading || success) {
    } else {
      if (
        !items ||
        items.length < 1 ||
        !billData ||
        !billData.subTotal ||
        !billData.settledAmount ||
        !billData.discountType ||
        (billData.discountType != "none" && !billData.discountValue)
      ) {
        setError("Please Fill All Field");
      } else if (billData.settledAmount <= 0) {
        setError("Sattle Amount can not be less than zero");
      } else {
        // console.log(">>", fullFormData, fullFormData.stockInDate, fullFormData.stockInDate != 'Invalid Date' ? 'ue' : 'false')
        addBillData();
      }
    }
  };
  const handleQuantityChange = (e) => {
    const value = e.target.value;
    setFullFormData((prevState) => ({
      ...prevState,
      qty: value,
    }));

    if (e.key === "Enter") {
      e.preventDefault();
      if (unitOptionsExist(fullFormData.inputName)) {
        unitInputRef.current && unitInputRef.current.focus();
      } else {
        commentInputRef.current && commentInputRef.current.focus();
      }
    }
  };
  const handleUnitChange = (e) => {
    const value = e.target.value;
    const options =
      fullFormData &&
      fullFormData.selectedItem &&
      fullFormData.selectedItem.variantsList
        ? fullFormData &&
          fullFormData.selectedItem &&
          fullFormData.selectedItem.variantsList
        : [];

    if (!isNaN(value)) {
      const index = parseInt(value) - 1;
      if (index >= 0 && index < options.length) {
        setFullFormData((prevState) => ({
          ...prevState,
          unit: options[index],
        }));
      }
    } else {
      const optionIndex = options.findIndex(
        (option) => option.toLowerCase() === value.toLowerCase()
      );
      if (optionIndex !== -1) {
        setFullFormData((prevState) => ({
          ...prevState,
          unit: options[optionIndex],
        }));
      } else {
        setFullFormData((prevState) => ({
          ...prevState,
          unit: "",
        }));
      }
    }
  };

  const handleAutofill = (name, code) => {
    setFullFormData((prevState) => ({
      ...prevState,
      inputCode: code.toString(),
      inputName: name,
    }));

    commentInputRef.current && commentInputRef.current.focus();
  };

  const handleEnterPressFirst = (e) => {
    const value = e.target.value;
    if (e.key === "Enter") {
      e.preventDefault();
      const matchingProduct = data.find(
        (item) =>
          item.itemCode.toString() === value ||
          item.itemShortKey.toString().toLocaleLowerCase() ===
            value.toString().toLocaleLowerCase()
      );
      console.log("Search Item", matchingProduct);
      //    if (matchingProduct) {
      //   setFullFormData(prevState => ({
      //     ...prevState,
      //     inputName: matchingProduct
      //   }));
      // }
      if (!matchingProduct || value === "") {
        setValidationError(true);
        second.current && second.current.focus();
        setFullFormData((prevState) => ({
          ...prevState,
          selectedItem: "",
          inputName: "",
        }));
      } else if (
        value === matchingProduct.itemCode.toString() ||
        matchingProduct.itemShortKey.toString().toLocaleLowerCase() ===
          value.toString().toLocaleLowerCase()
      ) {
        e.preventDefault();
        setValidationError(false);
        setFullFormData((prevState) => ({
          ...prevState,
          inputCode: matchingProduct.itemCode,
          itemId: matchingProduct.itemId,
          inputName: matchingProduct,
          selectedItem: matchingProduct,
        }));
        quantityInputRef.current && quantityInputRef.current.focus();
      }
    }
  };
  const handleEnterPressName = (e) => {
    // const value = e.target.value;
    // console.log('VALUE',value,e.target.value)
    if (e.key === "Enter") {
      if (fullFormData.inputName) {
        // e.preventDefault();
        // setValidationError(false)
        quantityInputRef.current && quantityInputRef.current.focus();
      }
    }
  };

  const handleEnterPressThird = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commentInputRef.current && commentInputRef.current.focus();
    }
  };

  const handleEnterPressSecond = (e) => {
    if (e.key === "Enter") {
      setFullFormData((perv) => ({
        ...perv,
        unit:
          fullFormData &&
          fullFormData.selectedItem &&
          fullFormData.selectedItem.variantsList
            ? fullFormData.selectedItem.variantsList[0].unit
            : "",
        itemPrice:
          fullFormData &&
          fullFormData.selectedItem &&
          fullFormData.selectedItem.variantsList
            ? fullFormData.selectedItem.variantsList[0].price
            : 0,
        selectedUnit:
          fullFormData &&
          fullFormData.selectedItem &&
          fullFormData.selectedItem.variantsList
            ? fullFormData.selectedItem.variantsList[0]
            : {},
        price:
          (fullFormData &&
          fullFormData.selectedItem &&
          fullFormData.selectedItem.variantsList
            ? fullFormData.selectedItem.variantsList[0].price
            : 0) * fullFormData.qty,
      }));
      console.log("name", fullFormData.inputName);
      e.preventDefault();
      if (
        fullFormData &&
        fullFormData.selectedItem &&
        fullFormData.selectedItem.variantsList
          ? fullFormData.selectedItem.variantsList.length > 1
            ? true
            : false
          : false
      ) {
        unitInputRef.current && unitInputRef.current.focus();
      } else if (
        fullFormData &&
        fullFormData.selectedItem &&
        fullFormData.selectedItem.variantsList
          ? fullFormData.selectedItem.variantsList.length == 1
            ? true
            : false
          : false
      ) {
        commentInputRef.current && commentInputRef.current.focus();
      }
    }
  };

  const handleAddItem = (e) => {
    if (e.key === "Enter") {
      if (fullFormData.inputName !== "") {
        const isExist = items.findIndex(
          (item) =>
            item.inputCode == fullFormData.inputCode &&
            item.unit == fullFormData.unit
        );
        console.log("<LKLLKK>", isExist, items[isExist]);
        if (isExist != -1) {
          const newItem = {
            inputCode: fullFormData.inputCode,
            inputName: fullFormData.inputName,
            qty: fullFormData.qty,
            unit: fullFormData.unit,
            itemPrice: fullFormData.itemPrice,
            unit: fullFormData.unit,
            price: fullFormData.price,
            comment: fullFormData.comment,
          };
          // console.log("<>LOG<>",fullFormData.price,fullFormData.itemPrice)
          setBillData((perv) => ({
            ...perv,
            subTotal: billData.subTotal + fullFormData.price,
            settledAmount: billData.subTotal + fullFormData.price,
          }));
          setItems((prevItems) =>
            prevItems?.map((data, index) =>
              isExist == index
                ? {
                    ...data,
                    qty: parseFloat(data.qty) + parseFloat(fullFormData.qty),
                    price:
                      data.price + fullFormData.qty * fullFormData.itemPrice,
                  }
                : data
            )
          );
          setFullFormData({
            inputCode: "",
            inputName: "",
            qty: 1,
            unit: "",
            comment: "",
            selectedItem: "",
            selectedUnit: "",
            itemPrice: "",
          });
          setValidationError(false);
          first.current && first.current.focus();
          e.target.value = "";
        } else {
          const newItem = {
            inputCode: fullFormData.inputCode,
            inputName: fullFormData.inputName,
            qty: fullFormData.qty,
            unit: fullFormData.unit,
            itemPrice: fullFormData.itemPrice,
            unit: fullFormData.unit,
            price: fullFormData.price,
            comment: fullFormData.comment,
            itemId: fullFormData.itemId,
          };
          console.log("<>LOG<>", fullFormData.price, fullFormData.itemPrice);
          setBillData((perv) => ({
            ...perv,
            subTotal: billData.subTotal + fullFormData.price,
            settledAmount: billData.subTotal + fullFormData.price,
          }));
          setItems((prevItems) => [...prevItems, newItem]);
          setFullFormData({
            inputCode: "",
            inputName: "",
            qty: 1,
            unit: "",
            comment: "",
            selectedItem: "",
            selectedUnit: "",
            itemPrice: "",
          });
          setValidationError(false);
          first.current && first.current.focus();
          e.target.value = "";
        }
      } else {
      }
    }
  };
  const handleReset = (e) => {
    setValidationError(false);
    setFullFormData({
      inputCode: "",
      inputName: "",
      qty: 1,
      unit: "",
      comment: "",
    });

    if (unitOptionsExist(fullFormData.inputName)) {
      unitInputRef.current && unitInputRef.current.focus();
    } else {
      commentInputRef.current && commentInputRef.current.focus();
    }

    first.current && first.current.focus();
    e.target.value = "";
  };

  const unitOptionsExist = (itemName) => {
    const product = data.find((item) => item.itemName === itemName);
    return product && product.variantsList && product.variantsList.length > 0;
  };
  const handleDeleteRow = (index) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
    setBillData((perv) => ({
      ...perv,
      subTotal: billData.subTotal - items[index].price,
      settledAmount: billData.subTotal - items[index].price,
    }));
  };
  const handleIncreaseQuantity = (index) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].qty += 1;
      updatedItems[index].price =
        updatedItems[index].qty * updatedItems[index].itemPrice;
      return updatedItems;
    });
    setBillData((perv) => ({
      ...perv,
      subTotal: billData.subTotal + items[index].itemPrice,
      settledAmount:
        billData.subTotal +
        items[index].itemPrice -
        (billData.discountType == "fixed"
          ? billData.discountValue
          : billData.discountType == "percentage"
          ? (billData.subTotal + items[index].itemPrice) *
            (billData.discountValue / 100)
          : 0),
    }));
  };
  const [text, setText] = useState("");

  const handleDecreaseQuantity = (index, qty1) => {
    console.log("<QTY?>", qty1);
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      if (updatedItems[index].qty > 1) {
        updatedItems[index].qty -= 1;
        updatedItems[index].price =
          updatedItems[index].qty * updatedItems[index].itemPrice;
      }
      return updatedItems;
    });
    setBillData((perv) => ({
      ...perv,
      subTotal:
        qty1 > 1
          ? billData.subTotal - items[index].itemPrice
          : billData.subTotal,
      settledAmount:
        qty1 > 1
          ? billData.subTotal -
            items[index].itemPrice -
            (billData.discountType == "fixed"
              ? billData.discountValue
              : billData.discountType == "percentage"
              ? (billData.subTotal - items[index].itemPrice) *
                (billData.discountValue / 100)
              : 0)
          : billData.subTotal -
            (billData.discountType == "fixed"
              ? billData.discountValue
              : billData.discountType == "percentage"
              ? billData.subTotal * (billData.discountValue / 100)
              : 0),
    }));
  };
  if (loading) {
    console.log(">>>>??");
    toast.loading("Please wait...", {
      toastId: "loading",
    });
  }
  if (success) {
    toast.dismiss("loading");
    toast("success", {
      type: "success",
      toastId: "success",
      position: "top-right",
      toastId: "error",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setTimeout(() => {
      setSuccess(false);
      setLoading(false);
    }, 50);
  }
  if (error) {
    setLoading(false);
    toast.dismiss("loading");
    toast(error, {
      type: "error",
      position: "top-right",
      toastId: "error",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setError(false);
  }
  return (
    <div className="" style={{ background: "#f0f2f5" }}>
      <Header />
      <section className="right_section ">
        <div className="right_top_header gap-6 p-2 flex">
          <div className="w-32">
            <TextField
              placeholder="Short Code"
              value={fullFormData.inputCode ? fullFormData.inputCode : ""}
              onChange={handleInputCodeChange}
              onKeyDown={handleEnterPressFirst}
              variant="outlined"
              inputRef={first}
              error={validationError ? true : false}
              helperText={validationError ? "Incorrect Code" : ""}
            />
          </div>
          <div className="w-80">
            <Autocomplete
              options={data ? data : []}
              defaultValue={null}
              getOptionLabel={(options) =>
                options.itemName ? options.itemName : ""
              }
              value={fullFormData.inputName}
              onChange={handleInputNameChange}
              inputRef={second}
              onKeyDown={handleEnterPressName}
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputRef={second}
                  placeholder="Auto fill the name only"
                  variant="outlined"
                />
              )}
            />
          </div>
          <div className="w-28">
            <TextField
              placeholder="Quantity"
              value={fullFormData.qty}
              onChange={handleQuantityChange}
              onKeyDown={handleEnterPressSecond}
              inputRef={quantityInputRef}
              variant="outlined"
            />
          </div>
          <div className="w-28">
            {/* <Autocomplete
              options={fullFormData&&fullFormData.selectedItem&&fullFormData.selectedItem.variantsList?fullFormData.selectedItem.variantsList:[]}
              value={fullFormData.unit}
              inputRef={unitInputRef}
              onChange={(e,valu)=>{
                setFullFormData((perv)=>({
                  ...perv,
                  unit:valu?valu:''
                }))
              }}
              onKeyDown={handleEnterPressThird}
              renderInput={(params) => <TextField {...params} inputRef={unitInputRef} onChange={handleUnitChange} placeholder="Unit" variant="outlined" />}
            /> */}
            <FormControl fullWidth>
              <NativeSelect
                // defaultValue={1}
                inputRef={unitInputRef}
                placeholder="Units"
                onBlur={(e) => {
                  const json = fullFormData.selectedItem.variantsList
                    ? fullFormData.selectedItem.variantsList?.filter(
                        (varient) => varient.unit == e.target.value
                      )
                    : {};
                  setFullFormData((perv) => ({
                    ...perv,
                    selectedUnit: json[0],
                    itemPrice: json[0] && json[0].price ? json[0].price : "",
                    unit: e.target.value,
                    price:
                      (json[0] && json[0].price ? json[0].price : 0) *
                      fullFormData.qty,
                  }));
                }}
                onChange={(e) => {
                  const json = fullFormData.selectedItem.variantsList
                    ? fullFormData.selectedItem.variantsList?.filter(
                        (varient) => varient.unit == e.target.value
                      )
                    : {};
                  setFullFormData((perv) => ({
                    ...perv,
                    selectedUnit: json[0],
                    itemPrice: json[0] && json[0].price ? json[0].price : "",
                    unit: e.target.value,
                    price:
                      (json[0] && json[0].price ? json[0].price : 0) *
                      fullFormData.qty,
                  }));
                  console.log("<value>", e.target.value);
                }}
                value={fullFormData.unit}
                onKeyDown={handleEnterPressThird}
                variant="standard"
                inputProps={{
                  name: "age",
                  id: "uncontrolled-native",
                }}
                input={<BootstrapInput />}
              >
                {fullFormData &&
                  fullFormData.selectedItem &&
                  fullFormData.selectedItem.variantsList &&
                  fullFormData.selectedItem.variantsList?.map((data, index) => (
                    <option key={data.unit} value={data.unit}>
                      {data.unit}
                    </option>
                  ))}
              </NativeSelect>
            </FormControl>
          </div>
          <div className="w-28">
            <TextField value={fullFormData.itemPrice} />
          </div>
          <div className="w-96">
            <TextField
              placeholder="Comment"
              variant="outlined"
              inputRef={commentInputRef}
              onChange={(e) =>
                setFullFormData((prevState) => ({
                  ...prevState,
                  comment: e.target.value,
                }))
              }
              onKeyDown={handleAddItem}
              className="w-full"
            />
          </div>
          <div className="w-12">
            <button
              onClick={handleReset}
              className="button mt-1 text-sm px-2 py-1 rounded-sm text-white"
            >
              RESET
            </button>
          </div>
        </div>
      </section>
      <section className="left_section ">
        <div className=" w-full p-0 my-2">
          <div className="flex justify-between h-full">
            <div className="Righ_bill_menu w-2/5">
              <div className="w-full right_meun rounded-md">
                {/* {buttonCLicked === "tab1" && ( */}
                <div className="w-full text-base h-full overflow-auto  table_no p-4">
                  {/* <div className="bg-white  rounded-md shadow-md my-4 p-2">
                      <p className="w-20">Table No </p>
                      <hr />
                      <div className="py-2 flex justify-between main_div ">
                        <div>
                          <span className="w-3">Enter No &nbsp;</span>{" "}
                          <input
                            type="text"
                            name=""
                            id=""
                            className="w-20 p-1 border-2 rounded-sm"
                          />
                        </div>
                        <div>
                          <Button1>Assign Captain</Button1>
                        </div>
                      </div>
                    </div> */}
                  <div className="shadow-md bg-white rounded-md my-2 p-2">
                    <div className="flex justify-between mb-2">
                      <div className="header_toggle ml-2 grid content-center ">
                        <p className="w-32">Customer Details</p>
                      </div>
                      <div className="header_toggle ml-2 grid content-center ">
                        <div>
                          ENG{" "}
                          <Switch
                            checked={isEnglish}
                            onChange={() => setIsEnglish(!isEnglish)}
                          />{" "}
                          GUJ
                        </div>
                      </div>
                    </div>
                    <hr />
                    <table className="my-2 h-44 w-full">
                      <tbody>
                        <tr className="mb-3">
                          <td className="w-5">Mobile&nbsp;</td>
                          <td>
                            <input
                              type="number"
                              className="border-2 w-48 p-1 rounded-sm"
                              name="mobileNo"
                              value={customerData.mobileNo}
                              onChange={(e) =>
                                setCustomerData((perv) => ({
                                  ...perv,
                                  mobileNo: e.target.value,
                                }))
                              }
                            />
                          </td>
                        </tr>
                        <tr className="mb-3">
                          <td className="w-5">Name&nbsp;</td>
                          <td>
                            {!isEnglish ? (
                              <input
                                value={customerData.customerName}
                                type="text"
                                name="customerName"
                                className="border-2 w-full p-1 rounded-sm"
                                onChange={(e) => {
                                  setCustomerData((perv) => ({
                                    ...perv,
                                    customerName: e.target.value,
                                  }));
                                }}
                              />
                            ) : (
                              <ReactTransliterate
                                value={customerData.customerName}
                                className="border-2 w-full p-1 rounded-sm"
                                onChangeText={(text) => {
                                  setCustomerData((perv) => ({
                                    ...perv,
                                    customerName: text,
                                  }));
                                }}
                                lang="gu"
                              />
                            )}
                          </td>
                        </tr>
                        <tr className="mb-3">
                          <td className="w-5">Address&nbsp;</td>
                          <td>
                            {isEnglish ? (
                              <ReactTransliterate
                                value={customerData.address}
                                className="border-2 w-full p-1 rounded-sm"
                                onChangeText={(text) => {
                                  setCustomerData((perv) => ({
                                    ...perv,
                                    address: text,
                                  }));
                                }}
                                lang="gu"
                              />
                            ) : (
                              <input
                                value={customerData.address}
                                type="text"
                                className="border-2 w-full p-1 rounded-sm"
                                onChange={(e) => {
                                  setCustomerData((perv) => ({
                                    ...perv,
                                    address: e.target.value,
                                  }));
                                }}
                              />
                            )}
                          </td>
                        </tr>
                        <tr className="mb-3">
                          <td className="w-5">Locality&nbsp;</td>
                          <td>
                            {isEnglish ? (
                              <ReactTransliterate
                                value={customerData.locality}
                                className="border-2 w-full p-1 rounded-sm"
                                onChangeText={(text) => {
                                  setCustomerData((perv) => ({
                                    ...perv,
                                    locality: text,
                                  }));
                                }}
                                lang="gu"
                              />
                            ) : (
                              <input
                                value={customerData.locality}
                                type="text"
                                className="border-2 w-full p-1 rounded-sm"
                                onChange={(e) => {
                                  setCustomerData((perv) => ({
                                    ...perv,
                                    locality: e.target.value,
                                  }));
                                }}
                              />
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="shadow-md bg-white  rounded-md my-2 p-2">
                    <div className="w-full py-2 my-2">
                      <table className=" w-full">
                        <tbody>
                          <tr className="mb-3">
                            <td className="w-28">Order Comment&nbsp;</td>
                            <td>
                              <input
                                type="text"
                                className="border-2 w-full p-1 rounded-sm"
                                value={billData.billComment}
                                onChange={(e) =>
                                  setBillData((perv) => ({
                                    ...perv,
                                    billComment: e.target.value,
                                  }))
                                }
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* )} */}
                {/* {(buttonCLicked === "tab3" || buttonCLicked === "tab2") && (
                  <div className="w-full text-base table_no p-2">
                    <div className="shadow-md bg-white  rounded-md my-2 p-2">
                      <p className="w-32 mb-2">Customer Details</p>
                      <hr />
                      <table className="my-2 h-44 w-full">
                        <tbody>
                          <tr className="mb-3">
                            <td className="w-5">Mobile&nbsp;</td>
                            <td>
                              <input
                                type="number"
                                className="border-2 w-48 p-1 rounded-sm"
                                name=""
                                id=""
                              />
                            </td>
                          </tr>
                          <tr className="mb-3">
                            <td className="w-5">itemName&nbsp;</td>
                            <td>
                              <input
                                type="text"
                                className="border-2 w-full p-1 rounded-sm"
                                name=""
                                id=""
                              />
                            </td>
                          </tr>
                          <tr className="mb-3">
                            <td className="w-5">Add&nbsp;</td>
                            <td>
                              <input
                                type="text"
                                className="border-2 w-full p-1 rounded-sm"
                                name=""
                                id=""
                              />
                            </td>
                          </tr>
                          <tr className="mb-3">
                            <td className="w-5">Locality&nbsp;</td>
                            <td>
                              <input
                                type="text"
                                className="border-2 w-full p-1 rounded-sm"
                                name=""
                                id=""
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="shadow-md bg-white  rounded-md my-2 p-2">
                      <div className="w-full py-2 my-2">
                        <span className="w-3">Order Comment&nbsp;</span>{" "}
                        <input
                          type="text"
                          name=""
                          id=""
                          className="w-80 p-1 border-2 rounded-sm"
                        />
                      </div>
                    </div>
                  </div>
                )} */}
                {/* {buttonCLicked === "tab4" && (
                  <div>
                    <div className="shadow-md bg-white  rounded-md  text-base m-4 p-2">
                      <p className="w-full">Hotel Information </p>
                      <hr />
                      <div className="py-2 flex justify-between main_div ">
                        <div className="w-80">
                          <Autocomplete
                              className='hotel_autocomplete'
                              options={unitOptionsExist(fullFormData.inputName) ? data.find(item => item.itemName === fullFormData.inputName).variantsList : []}
                              value={fullFormData.unit}
                              renderInput={(params) => <TextField {...params} inputRef={unitInputRef} onChange={handleUnitChange} className='hotel_input' placeholder="Hotel itemName" variant="outlined" />}
                            />
                        </div>
                        <div>
                          <span className="w-3">Room No &nbsp;</span>{" "}
                          <input
                            type="text"
                            name=""
                            id=""
                            className="w-20 p-1 border-2 rounded-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="shadow-md bg-white  rounded-md text-base m-4 p-2">
                      <table className="my-2 h-44 w-full">
                        <tbody>
                          <tr className="mb-3">
                            <td className="w-5">Mobile&nbsp;</td>
                            <td>
                              <input
                                type="number"
                                className="border-2 w-48 p-1 rounded-sm"
                                name=""
                                id=""
                              />
                            </td>
                          </tr>
                          <tr className="mb-3">
                            <td className="w-5">itemName&nbsp;</td>
                            <td>
                              <input
                                type="text"
                                className="border-2 w-full p-1 rounded-sm"
                                name=""
                                id=""
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )} */}
              </div>
            </div>
            <div className="left_bill_menu text-base w-full h-full">
              <div className="w-full  p-0 text-white">
                <div className="grid w-full grid-flow-row grid-cols-12 mr-2  bg-gray-700">
                  <div
                    onClick={() => setButtonCLicked("tab1")}
                    className={
                      buttonCLicked == "tab1"
                        ? "clicked col-3 p-0 col-span-3 text-center"
                        : "col-3 p-0 cursor-pointer  col-span-3 text-center"
                    }
                  >
                    <Button
                      variant="plain"
                      color="danger"
                      className="w-100 col-auto text-center p-2 px-0"
                    >
                      Dine In
                    </Button>
                  </div>
                  <div
                    onClick={() => setButtonCLicked("tab2")}
                    className={
                      buttonCLicked == "tab2"
                        ? "clicked col-3 p-0  col-span-3 text-center"
                        : "col-3 p-0 cursor-pointer  col-span-3 text-center"
                    }
                  >
                    <Button
                      variant="plain"
                      color="danger"
                      className="w-100 col-auto text-center p-2 px-0"
                    >
                      Delivery
                    </Button>
                  </div>
                  <div
                    onClick={() => setButtonCLicked("tab3")}
                    className={
                      buttonCLicked == "tab3"
                        ? "clicked col-3 p-0  col-span-3 text-center"
                        : "col-3 p-0 cursor-pointer  col-span-3 text-center"
                    }
                  >
                    <Button
                      variant="plain"
                      color="danger"
                      className="w-100 col-auto text-center p-2 px-0"
                    >
                      Pick Up
                    </Button>
                  </div>
                  <div
                    onClick={() => setButtonCLicked("tab4")}
                    className={
                      buttonCLicked == "tab4"
                        ? "clicked col-3 p-0  col-span-3 text-center"
                        : "col-3 p-0 cursor-pointer  col-span-3 text-center"
                    }
                  >
                    <Button
                      variant="plain"
                      color="danger"
                      className="w-100 col-auto text-center p-2 px-0"
                    >
                      Hotel
                    </Button>
                  </div>
                </div>
              </div>
              <div className=" p-0 text-base ">
                <div className="bg-gray-200">
                  <div className="grid grid-cols-12 w-full p-2">
                    <div className="col-span-3 justify-self-center underline color-gray-700 pl-3">
                      ITEMS
                    </div>
                    <div className="col-span-3 justify-self-end">COMMENTS</div>
                    <div className="col-span-3 justify-self-center">QTY.</div>
                    <div className="col-span-1 justify-self-center">Unit</div>
                    <div className="col-span-1 justify-self-end pr-3">
                      Price
                    </div>
                    <div className="col-span-1 justify-self-end pr-3">
                      Total
                    </div>
                  </div>
                </div>
                <div
                  className={validationError ? "main_billError" : "main_bill1"}
                >
                  {items.length === 0 && (
                    <div className="text-center bill_tag h-full">
                      <div>
                        <p className="text-lg text-gray-600">No items Added</p>
                        <p>Please add the item First</p>
                        <IoIosRestaurant className="Billing_icon text-center ms-7" />
                      </div>
                    </div>
                  )}
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-amber-50 billin_content itemBorder p-2 text-lg"
                    >
                      <div className="grid grid-cols-12 content-center gap-2">
                        <div className="col-span-1 underline">
                          <MdCancel
                            onClick={() => handleDeleteRow(index)}
                            className="main_bill_icon text-red-700 ml-1 mt-1 cursor-pointer"
                          />
                        </div>
                        <div className="col-span-3 justify-self-start">
                          {item.inputName.itemName}
                        </div>
                        <div className="col-span-3 justify-self-center">
                          {item.comment}
                        </div>
                        <div className="col-span-2 justify-self-start">
                          <div className="flex h-full align-star main_div">
                            <div className="plus_button">
                              <button
                                onClick={() =>
                                  handleDecreaseQuantity(index, item.qty)
                                }
                                className="border quantity_button p-0"
                              >
                                -
                              </button>
                            </div>
                            <input
                              type="text"
                              value={item.qty}
                              className="w-8 text-center"
                              readOnly
                            />
                            <div className="plus_button">
                              <button
                                onClick={() => handleIncreaseQuantity(index)}
                                className="quantity_button p-0"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-1 justify-self-center">
                          <p className="pl-2">{item.unit}</p>
                        </div>
                        <div className="col-span-1 justify-self-end">
                          <p className="pl-2">{item.itemPrice}</p>
                        </div>
                        <div className="col-span-1 justify-self-end">
                          <p className="pl-2">{item.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-base">
                <div className="w-full p-2 h-full bg-gray-700 text-white">
                  <div className="flex w-full justify-between pl-2 pr-2 gap-4 main_div">
                    <div>
                      <RadioGroup
                        className="radio_buttons text-base"
                        value={billData.billPayType}
                        onChange={(e) => {
                          console.log("radio", e.target.value);
                          setBillData((perv) => ({
                            ...perv,
                            billPayType: e.target.value,
                          }));
                        }}
                      >
                        <div>
                          <FormControlLabel
                            value="cash"
                            control={
                              <Radio
                                name="radio"
                                sx={{
                                  color: "#fff",
                                  "&.Mui-checked": {
                                    color: "#fff",
                                  },
                                }}
                              />
                            }
                            label="Cash"
                          />
                        </div>
                        <div>
                          <FormControlLabel
                            value="due"
                            control={
                              <Radio
                                name="radio"
                                sx={{
                                  color: "#fff",
                                  "&.Mui-checked": {
                                    color: "#fff",
                                  },
                                }}
                              />
                            }
                            label="Due"
                          />
                        </div>
                        <div>
                          <FormControlLabel
                            value="online"
                            control={
                              <Radio
                                name="radio"
                                sx={{
                                  color: "#fff",
                                  "&.Mui-checked": {
                                    color: "#fff",
                                  },
                                }}
                              />
                            }
                            label="Online"
                          />
                        </div>
                        <div>
                          <FormControlLabel
                            value="complementary"
                            control={
                              <Radio
                                name="radio"
                                sx={{
                                  color: "#fff",
                                  "&.Mui-checked": {
                                    color: "#fff",
                                  },
                                }}
                              />
                            }
                            label="Complementary"
                          />
                        </div>
                      </RadioGroup>
                    </div>
                    <div>
                      <div className="flex gap-2 main_div">
                        <div className="bg-red-600 p-1">
                          <MdOutlineCurrencyExchange className="text-white text-lg" />
                        </div>
                        <p className="text-xl">Total:-</p>
                        <p className="text-xl">{billData.subTotal}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full text-base flex justify-between pl-4 pr-3 text-white gap-4 bg-gray-500">
                <div>
                  <RadioGroup
                    className="radio_buttons text-base"
                    value={billData.discountType}
                    onChange={(e) => {
                      console.log("radio", e.target.value);
                      setBillData((perv) => ({
                        ...perv,
                        discountType: e.target.value,
                        discountValue: "",
                        settledAmount: billData.subTotal,
                      }));
                    }}
                  >
                    <div>
                      <FormControlLabel
                        value="none"
                        control={
                          <Radio
                            name="radio"
                            sx={{
                              color: "#fff",
                              "&.Mui-checked": {
                                color: "#fff",
                              },
                            }}
                          />
                        }
                        label="None"
                      />
                    </div>
                    <div>
                      <FormControlLabel
                        value="percentage"
                        control={
                          <Radio
                            name="radio"
                            sx={{
                              color: "#fff",
                              "&.Mui-checked": {
                                color: "#fff",
                              },
                            }}
                          />
                        }
                        label="Percentage"
                      />
                    </div>
                    <div>
                      <FormControlLabel
                        value="fixed"
                        control={
                          <Radio
                            name="radio"
                            sx={{
                              color: "#fff",
                              "&.Mui-checked": {
                                color: "#fff",
                              },
                            }}
                          />
                        }
                        label="Fixed"
                      />
                    </div>
                  </RadioGroup>
                </div>
                <div className="discountPadding">
                  {billData.discountType != "none" ? (
                    <TextField
                      className="sarchTextTEST"
                      // onChange={(e) => { onSearchChange(e); debounceFunction() }}
                      value={billData.discountValue}
                      name="discountValue"
                      placeholder="Discount"
                      onChange={(e) => {
                        setBillData((perv) => ({
                          ...perv,
                          discountValue: e.target.value,
                          settledAmount:
                            billData.discountType == "fixed"
                              ? billData.subTotal - e.target.value
                              : billData.subTotal * (1 - e.target.value / 100),
                        }));
                      }}
                      id="discountValue"
                      variant="outlined"
                      sx={{ width: "140px" }}
                      // label="Discount"
                      InputProps={{
                        endAdornment:
                          billData.discountType == "percentage" ? (
                            <InputAdornment position="end">
                              <PercentIcon fontSize="small" />
                            </InputAdornment>
                          ) : billData.discountType == "fixed" ? (
                            <InputAdornment position="end">
                              <CurrencyRupeeIcon fontSize="small" />
                            </InputAdornment>
                          ) : (
                            <InputAdornment>
                              <BlockIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        style: { fontSize: 14, background: "#fff" },
                      }}
                      // InputLabelProps={{ style: { fontSize: 16 } }}
                      fullWidth
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div
                  className="discountPadding flex gap-3"
                  style={{ width: "200px", textAlign: "end" }}
                >
                  <div className="text-white text-xl mt-1 w-full">
                    {"Total Discount : " +
                      (billData.subTotal - billData.settledAmount)}
                  </div>
                </div>
              </div>

              <div className="w-full text-base flex justify-end pl-4 pb-1 pr-3 text-white gap-4 bg-gray-700">
                <div className="discountPadding flex gap-3">
                  <div className={`text-white text-xl mt-1 `}>
                    {"Settled Amount   : "}
                  </div>
                  <TextField
                    className="sarchTextTEST"
                    // onChange={(e) => { onSearchChange(e); debounceFunction() }}
                    value={billData.settledAmount}
                    name="discountValue"
                    id="discountValue"
                    variant="outlined"
                    sx={{ width: "140px" }}
                    // label="Discount"
                    error={billData.settledAmount <= 0 && billData.subTotal > 0}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CurrencyRupeeIcon fontSize="small" />
                        </InputAdornment>
                      ),
                      style: {
                        fontSize: 16,
                        background: "#fff",
                        color:
                          billData.settledAmount <= 0 && billData.subTotal > 0
                            ? "red"
                            : "black",
                      },
                    }}
                    // InputLabelProps={{ style: { fontSize: 16 } }}
                    fullWidth
                  />
                </div>
              </div>
              <div className="w-full text-base flex justify-center gap-4 p-1 mt-1 ">
                <div>
                  <button
                    className="text-base button save_button py-1 rounded-md text-white"
                    onClick={() => {
                      saveBill();
                    }}
                  >
                    Save
                  </button>
                </div>
                <div>
                  <button className="text-base button px-2 py-1 rounded-md text-white">
                    Print & Bill
                  </button>
                </div>
                <div>
                  <button className="another_1 button text-base px-2 py-1 rounded-md text-white">
                    KOT
                  </button>
                </div>
                <div>
                  <button className="another_1 button text-base px-2 py-1 rounded-md text-white">
                    KOT & PRINT
                  </button>
                </div>
                <div>
                  <button className="another_2 button text-base px-2 py-1 rounded-md text-white">
                    HOLD
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default PickUp;
