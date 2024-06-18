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
  MenuItem,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Popover from "@mui/material/Popover";
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
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import axios from "axios";
import { renderToString } from "react-dom/server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_BASE_URL } from "../url";
import RemoveIcon from "@mui/icons-material/Remove";
import InputAdornment from "@mui/material/InputAdornment";
import InputBase from "@mui/material/InputBase";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PercentIcon from "@mui/icons-material/Percent";
import BlockIcon from "@mui/icons-material/Block";
import KOT from "./KOT";
import RestaurantBill from "./RestaurantBill";
import Chip from "@mui/material/Chip";

import TokenBil from "./TokenBill";
import { Switch } from "@mui/material";
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
  const freeSoloValue = React.useRef("");
  const systemPrinter = JSON.parse(localStorage.getItem("printerPreference"));
  const regexMobile = /^[0-9\b]+$/;
  const regex = /^-?\d*(?:\.\d*)?$/;
  const isValidInput = /^(?:\d{1,4}(?:\.\d{0,3})?|\.\d{1,3})$/;
  const pickupkot = systemPrinter?.filter(
    (printer) => printer.categoryId == "pickupKot"
  );
  console.log(">>>>printer", pickupkot, systemPrinter);
  const pickupbill = systemPrinter?.filter(
    (printer) => printer.categoryId == "pickupBill"
  );
  const deliverykot = systemPrinter?.filter(
    (printer) => printer.categoryId == "deliveryKot"
  );
  const deliverybill = systemPrinter?.filter(
    (printer) => printer.categoryId == "deliveryBill"
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
    commentAutoComplete: [],
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

  const [billError, setBillError] = useState({
    mobileNo: false,
    settledAmount: false,
    discountValue: false,
  });

  const [items, setItems] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [itemComment, setItemComment] = useState({
    itemComment: [],
    index: "",
    comment: "",
    oldComment: "",
  });
  const [billData, setBillData] = useState({
    subTotal: 0,
    discountType: "none",
    discountValue: 0,
    settledAmount: "",
    billPayType: "cash",
    billComment: "",
    billCommentAuto: [],
  });
  const [disbledFeild, setDisabledFeild] = useState({
    quantity: true,
    comment: true,
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

  const [customerList, setCustomerList] = React.useState([]);
  const [editBillData, setEditBillData] = React.useState();
  const [commentList, setCommentList] = React.useState([]);
  const [freeSoloField, setFreeSoloField] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [validationError, setValidationError] = useState(false);
  const [buttonCLicked, setButtonCLicked] = useState("tab2");
  const [openSuggestions, setopenSuggestions] = useState(false);
  const quantityInputRef = useRef(null);
  const [data, setData] = useState([]);
  const unitInputRef = useRef(null);
  const commentInputRef = useRef(null);
  const first = useRef(null);
  const second = useRef(null);
  const mobileNo = useRef(null);
  const [suggestionData, setSuggestionData] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionSelectedValue, setSuggestionSelectedValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const suggestionListRef = useRef(null);
  const handleInputCodeChange = (e) => {
    const value = e.target.value;
    setFullFormData((prevState) => ({
      ...prevState,
      inputCode: value,
    }));
    setDisabledFeild({ ...disbledFeild, quantity: false, comment: false });
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

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setItemComment((perv) => ({
      ...perv,
      index: index,
      oldComment:
        items && items[index] && items[index].comment
          ? items[index].comment
          : "",
      itemComment:
        items && items[index] && items[index].comment
          ? items[index].comment?.split(/,\s*/)
          : [],
    }));
    // console.log('split', items && items[index] && items[index].comment ? items[index].comment?.split(/,\s*/) : [],)
  };
  const handleClose = () => {
    setItemComment({
      itemComment: [],
      index: "",
      comment: "",
      oldComment: "",
    });
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const saveItemComment = async () => {
    setItems((perv) =>
      perv.map((data, index) =>
        index == itemComment.index
          ? { ...data, comment: itemComment.itemComment?.join(", ") }
          : data
      )
    );
    handleClose();
    setItemComment({
      itemComment: [],
      index: "",
      comment: "",
      oldComment: "",
    });
  };
  // const cancleComment = async () => {
  //   setItemComment({
  //     itemComment: [],
  //     index: '',
  //     comment: '',
  //     oldComment: ''
  //   });
  //   handleClose();
  // }

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
  const handleCommentAutocomplete = (e, value) => {
    // setFullFormData((perv) => ({
    //   ...perv,
    //   commentAutoComplete: value ? value : "",
    // }));
    setBillData((perv) => ({
      ...perv,
      billCommentAuto: value ? value : [],
    }));
  };
  useEffect(() => {
    first.current.focus();
    getData();
    getcustomerDDL();
    getComments();
  }, []);
  const handleInputNameChange = (e, value) => {
    // const filtered = value ? data.filter(item =>
    //   (item.itemShortKey && item.itemShortKey.toLowerCase().includes(value.toLowerCase())) ||
    //   (item.itemName && item.itemName.toLowerCase().includes(value.toLowerCase()))
    // ) : [];
    console.log("filltered", value);
    setDisabledFeild({ ...disbledFeild, quantity: false, comment: false });
    setValidationError(false);
    setFullFormData((prevState) => ({
      ...prevState,
      inputName: value ? value : "",
      itemName: value && value.itemName ? value.itemName : "",
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
  const handleFreeSoloChange = (e, value) => {
    // const filtered = value ? data.filter(item =>
    //   (item.itemShortKey && item.itemShortKey.toLowerCase().includes(value.toLowerCase())) ||
    //   (item.itemName && item.itemName.toLowerCase().includes(value.toLowerCase()))
    // ) : [];
    console.log("freesoloonchange", value);
    // setValidationError(false);
    // setFullFormData((prevState) => ({
    //   ...prevState,
    //   inputName: value ? value : "",
    //   selectedItem: value ? value : "",
    //   itemId: value && value.itemId ? value.itemId : "",
    // }));

    // if (value) {
    //   setFullFormData((prevState) => ({
    //     ...prevState,
    //     inputCode: value.itemCode.toString(),
    //   }));
    // }
  };
  const joinArray = (array) => {
    return array.join(", ");
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
      billStatus: "Print",
      totalDiscount:
        billData.discountType == "none"
          ? 0
          : billData.subTotal - billData.settledAmount,
      ...billData,
      itemsData: items,
      billComment: billData.billCommentAuto?.join(", "),
      footerKot: "Thank You",
      footerBill: "Thank You",
    };
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
          itemName: "",
          qty: 1,
          unit: "",
          comment: "",
          selectedItem: "",
          selectedUnit: "",
          itemPrice: 0,
          price: 0,
          commentAutoComplete: [],
        });
        setCustomerData({
          customerId: "",
          addressId: "",
          mobileNo: "",
          customerName: "",
          address: "",
          locality: "",
          birthDate: "",
          aniversaryDate: "",
        });
        setBillData({
          subTotal: 0,
          discountType: "none",
          discountValue: 0,
          settledAmount: "",
          billPayType: "cash",
          billComment: "",
          billCommentAuto: [],
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
          printer: pickupkot[0],
          data: pickupKotPrint,
        };
        const printerDataBill = {
          printer: pickupbill[0],
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
  const addBillDataDelivery = async () => {
    setLoading(true);
    const customData = {
      customerDetails: {
        ...customerData,
      },
      billType: "Delivery",
      printBill: true,
      printKot: true,
      firmId: "A",
      billStatus: "Print",
      totalDiscount:
        billData.discountType == "none"
          ? 0
          : billData.subTotal - billData.settledAmount,
      ...billData,
      itemsData: items,
      billComment: billData.billCommentAuto?.join(", "),
      footerKot: "Thank You",
      footerBill: "Thank You",
    };
    await axios
      .post(
        `${BACKEND_BASE_URL}billingrouter/addDeliveryBillData`,
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
          itemName: "",
          qty: 1,
          unit: "",
          comment: "",
          selectedItem: "",
          selectedUnit: "",
          itemPrice: 0,
          price: 0,
          commentAutoComplete: [],
        });
        setCustomerData({
          customerId: "",
          addressId: "",
          mobileNo: "",
          customerName: "",
          address: "",
          locality: "",
          birthDate: "",
          aniversaryDate: "",
        });
        setBillData({
          subTotal: 0,
          discountType: "none",
          discountValue: 0,
          settledAmount: "",
          billPayType: "cash",
          billComment: "",
          billCommentAuto: [],
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
          printer: deliverykot[0],
          data: pickupKotPrint,
        };
        const printerDataBill = {
          printer: deliverybill[0],
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

  const holdBillData = async () => {
    setLoading(true);
    const customData = {
      customerDetails: {
        ...customerData,
      },
      billType: "Pick Up",
      printBill: true,
      printKot: true,
      firmId: "A",
      billStatus: "Hold",
      totalDiscount:
        billData.discountType == "none"
          ? 0
          : billData.subTotal - billData.settledAmount,
      ...billData,
      itemsData: items,
      billComment: billData.billCommentAuto?.join(", "),
      footerKot: "Thank You",
      footerBill: "Thank You",
    };
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
          itemName: "",
          qty: 1,
          unit: "",
          comment: "",
          selectedItem: "",
          selectedUnit: "",
          itemPrice: 0,
          price: 0,
          commentAutoComplete: [],
        });
        setCustomerData({
          customerId: "",
          addressId: "",
          mobileNo: "",
          customerName: "",
          address: "",
          locality: "",
          birthDate: "",
          aniversaryDate: "",
        });
        setBillData({
          subTotal: 0,
          discountType: "none",
          discountValue: 0,
          settledAmount: "",
          billPayType: "cash",
          billComment: "",
          billCommentAuto: [],
        });
        // const pickupKotPrint = renderToString(<KOT data={res.data} />);
        // const pickupBillPrint = renderToString(
        //   res && res.data && res.data.isOfficial ? (
        //     <RestaurantBill data={res.data} />
        //   ) : (
        //     <TokenBil data={res.data} />
        //   )
        // );
        // const printerDataKot = {
        //   printer: pickupkot,
        //   data: pickupKotPrint,
        // };
        // const printerDataBill = {
        //   printer: pickupbill,
        //   data: pickupBillPrint,
        // };
        // // const htmlString = renderToString(<RestaurantBill />)
        // if (res && res.data && res.data.printBill && res.data.printKot) {
        //   ipcRenderer.send("set-title", printerDataKot);
        //   ipcRenderer.send("set-title", printerDataBill);
        // } else if (res && res.data && res.data.printBill) {
        //   ipcRenderer.send("set-title", printerDataBill);
        // } else if (res && res.data && res.data.printKot) {
        //   ipcRenderer.send("set-title", printerDataKot);
        // }
      })
      .catch((error) => {
        setError(
          error.response && error.response.data
            ? error.response.data
            : "Network Error ...!!!"
        );
      });
  };
  const holdBillDataDelivery = async () => {
    setLoading(true);
    const customData = {
      customerDetails: {
        ...customerData,
      },
      billType: "Delivery",
      printBill: true,
      printKot: true,
      firmId: "A",
      billStatus: "Hold",
      totalDiscount:
        billData.discountType == "none"
          ? 0
          : billData.subTotal - billData.settledAmount,
      ...billData,
      itemsData: items,
      billComment: billData.billCommentAuto?.join(", "),
      footerKot: "Thank You",
      footerBill: "Thank You",
    };
    await axios
      .post(
        `${BACKEND_BASE_URL}billingrouter/addDeliveryBillData`,
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
          itemName: "",
          qty: 1,
          unit: "",
          comment: "",
          selectedItem: "",
          selectedUnit: "",
          itemPrice: 0,
          price: 0,
          commentAutoComplete: [],
        });
        setCustomerData({
          customerId: "",
          addressId: "",
          mobileNo: "",
          customerName: "",
          address: "",
          locality: "",
          birthDate: "",
          aniversaryDate: "",
        });
        setBillData({
          subTotal: 0,
          discountType: "none",
          discountValue: 0,
          settledAmount: "",
          billPayType: "cash",
          billComment: "",
          billCommentAuto: [],
        });
        // const pickupKotPrint = renderToString(<KOT data={res.data} />);
        // const pickupBillPrint = renderToString(
        //   res && res.data && res.data.isOfficial ? (
        //     <RestaurantBill data={res.data} />
        //   ) : (
        //     <TokenBil data={res.data} />
        //   )
        // );
        // const printerDataKot = {
        //   printer: pickupkot,
        //   data: pickupKotPrint,
        // };
        // const printerDataBill = {
        //   printer: pickupbill,
        //   data: pickupBillPrint,
        // };
        // // const htmlString = renderToString(<RestaurantBill />)
        // if (res && res.data && res.data.printBill && res.data.printKot) {
        //   ipcRenderer.send("set-title", printerDataKot);
        //   ipcRenderer.send("set-title", printerDataBill);
        // } else if (res && res.data && res.data.printBill) {
        //   ipcRenderer.send("set-title", printerDataBill);
        // } else if (res && res.data && res.data.printKot) {
        //   ipcRenderer.send("set-title", printerDataKot);
        // }
      })
      .catch((error) => {
        setError(
          error.response && error.response.data
            ? error.response.data
            : "Network Error ...!!!"
        );
      });
  };
  const cancleBillData = async () => {
    setLoading(true);
    const customData = {
      ...editBillData,
      customerDetails: {
        ...customerData,
      },
      billType: "Pick Up",
      printBill: true,
      printKot: true,
      firmId: "A",
      billStatus: "Cancel",
      totalDiscount:
        billData.discountType == "none"
          ? 0
          : billData.subTotal - billData.settledAmount,
      ...billData,
      itemsData: items,
      billPayType: "Cancel",
      billComment: billData.billCommentAuto?.join(", "),
      footerKot: "Thank You",
      footerBill: "Thank You",
    };
    await axios
      .post(
        `${BACKEND_BASE_URL}billingrouter/updatePickUpBillData`,
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
          itemName: "",
          qty: 1,
          unit: "",
          comment: "",
          selectedItem: "",
          selectedUnit: "",
          itemPrice: 0,
          price: 0,
          commentAutoComplete: [],
        });
        setCustomerData({
          customerId: "",
          addressId: "",
          mobileNo: "",
          customerName: "",
          address: "",
          locality: "",
          birthDate: "",
          aniversaryDate: "",
        });
        setBillData({
          subTotal: 0,
          discountType: "none",
          discountValue: 0,
          settledAmount: "",
          billPayType: "cash",
          billComment: "",
          billCommentAuto: [],
        });
        setIsEdit(false);
        // const pickupKotPrint = renderToString(<KOT data={res.data} />);
        // const pickupBillPrint = renderToString(
        //   res && res.data && res.data.isOfficial ? (
        //     <RestaurantBill data={res.data} />
        //   ) : (
        //     <TokenBil data={res.data} />
        //   )
        // );
        // const printerDataKot = {
        //   printer: pickupkot,
        //   data: pickupKotPrint,
        // };
        // const printerDataBill = {
        //   printer: pickupbill,
        //   data: pickupBillPrint,
        // };
        // // const htmlString = renderToString(<RestaurantBill />)
        // if (res && res.data && res.data.printBill && res.data.printKot) {
        //   ipcRenderer.send("set-title", printerDataKot);
        //   ipcRenderer.send("set-title", printerDataBill);
        // } else if (res && res.data && res.data.printBill) {
        //   ipcRenderer.send("set-title", printerDataBill);
        // } else if (res && res.data && res.data.printKot) {
        //   ipcRenderer.send("set-title", printerDataKot);
        // }
      })
      .catch((error) => {
        setError(
          error.response && error.response.data
            ? error.response.data
            : "Network Error ...!!!"
        );
      });
  };
  const cancleBillDataDelivery = async () => {
    setLoading(true);
    const customData = {
      ...editBillData,
      customerDetails: {
        ...customerData,
      },
      billType: "Delivery",
      printBill: true,
      printKot: true,
      firmId: "A",
      billStatus: "Cancel",
      totalDiscount:
        billData.discountType == "none"
          ? 0
          : billData.subTotal - billData.settledAmount,
      ...billData,
      itemsData: items,
      billPayType: "Cancel",
      billComment: billData.billCommentAuto?.join(", "),
      footerKot: "Thank You",
      footerBill: "Thank You",
      billPayType: "Cancel",
    };
    await axios
      .post(
        `${BACKEND_BASE_URL}billingrouter/updateDeliveryBillData`,
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
          itemName: "",
          qty: 1,
          unit: "",
          comment: "",
          selectedItem: "",
          selectedUnit: "",
          itemPrice: 0,
          price: 0,
          commentAutoComplete: [],
        });
        setCustomerData({
          customerId: "",
          addressId: "",
          mobileNo: "",
          customerName: "",
          address: "",
          locality: "",
          birthDate: "",
          aniversaryDate: "",
        });
        setBillData({
          subTotal: 0,
          discountType: "none",
          discountValue: 0,
          settledAmount: "",
          billPayType: "cash",
          billComment: "",
          billCommentAuto: [],
        });
        setIsEdit(false);
        // const pickupKotPrint = renderToString(<KOT data={res.data} />);
        // const pickupBillPrint = renderToString(
        //   res && res.data && res.data.isOfficial ? (
        //     <RestaurantBill data={res.data} />
        //   ) : (
        //     <TokenBil data={res.data} />
        //   )
        // );
        // const printerDataKot = {
        //   printer: pickupkot,
        //   data: pickupKotPrint,
        // };
        // const printerDataBill = {
        //   printer: pickupbill,
        //   data: pickupBillPrint,
        // };
        // // const htmlString = renderToString(<RestaurantBill />)
        // if (res && res.data && res.data.printBill && res.data.printKot) {
        //   ipcRenderer.send("set-title", printerDataKot);
        //   ipcRenderer.send("set-title", printerDataBill);
        // } else if (res && res.data && res.data.printBill) {
        //   ipcRenderer.send("set-title", printerDataBill);
        // } else if (res && res.data && res.data.printKot) {
        //   ipcRenderer.send("set-title", printerDataKot);
        // }
      })
      .catch((error) => {
        setError(
          error.response && error.response.data
            ? error.response.data
            : "Network Error ...!!!"
        );
      });
  };
  const justSaveBillData = async () => {
    setLoading(true);
    const customData = {
      customerDetails: {
        ...customerData,
      },
      billType: "Pick Up",
      printBill: true,
      printKot: true,
      firmId: "A",
      billStatus: "Print",
      totalDiscount:
        billData.discountType == "none"
          ? 0
          : billData.subTotal - billData.settledAmount,
      ...billData,
      itemsData: items,
      billComment: billData.billCommentAuto?.join(", "),
      footerKot: "Thank You",
      footerBill: "Thank You",
    };
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
          itemName: "",
          qty: 1,
          unit: "",
          comment: "",
          selectedItem: "",
          selectedUnit: "",
          itemPrice: 0,
          price: 0,
          commentAutoComplete: [],
        });
        setCustomerData({
          customerId: "",
          addressId: "",
          mobileNo: "",
          customerName: "",
          address: "",
          locality: "",
          birthDate: "",
          aniversaryDate: "",
        });
        setBillData({
          subTotal: 0,
          discountType: "none",
          discountValue: 0,
          settledAmount: "",
          billPayType: "cash",
          billComment: "",
          billCommentAuto: [],
        });
        // const pickupKotPrint = renderToString(<KOT data={res.data} />);
        // const pickupBillPrint = renderToString(
        //   res && res.data && res.data.isOfficial ? (
        //     <RestaurantBill data={res.data} />
        //   ) : (
        //     <TokenBil data={res.data} />
        //   )
        // );
        // const printerDataKot = {
        //   printer: pickupkot,
        //   data: pickupKotPrint,
        // };
        // const printerDataBill = {
        //   printer: pickupbill,
        //   data: pickupBillPrint,
        // };
        // // const htmlString = renderToString(<RestaurantBill />)
        // if (res && res.data && res.data.printBill && res.data.printKot) {
        //   ipcRenderer.send("set-title", printerDataKot);
        //   ipcRenderer.send("set-title", printerDataBill);
        // } else if (res && res.data && res.data.printBill) {
        //   ipcRenderer.send("set-title", printerDataBill);
        // } else if (res && res.data && res.data.printKot) {
        //   ipcRenderer.send("set-title", printerDataKot);
        // }
      })
      .catch((error) => {
        setError(
          error.response && error.response.data
            ? error.response.data
            : "Network Error ...!!!"
        );
      });
  };
  const justSaveBillDataDelivery = async () => {
    setLoading(true);
    const customData = {
      customerDetails: {
        ...customerData,
      },
      billType: "Delivery",
      printBill: true,
      printKot: true,
      firmId: "A",
      billStatus: "Print",
      totalDiscount:
        billData.discountType == "none"
          ? 0
          : billData.subTotal - billData.settledAmount,
      ...billData,
      itemsData: items,
      billComment: billData.billCommentAuto?.join(", "),
      footerKot: "Thank You",
      footerBill: "Thank You",
    };
    await axios
      .post(
        `${BACKEND_BASE_URL}billingrouter/addDeliveryBillData`,
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
          itemName: "",
          qty: 1,
          unit: "",
          comment: "",
          selectedItem: "",
          selectedUnit: "",
          itemPrice: 0,
          price: 0,
          commentAutoComplete: [],
        });
        setCustomerData({
          customerId: "",
          addressId: "",
          mobileNo: "",
          customerName: "",
          address: "",
          locality: "",
          birthDate: "",
          aniversaryDate: "",
        });
        setBillData({
          subTotal: 0,
          discountType: "none",
          discountValue: 0,
          settledAmount: "",
          billPayType: "cash",
          billComment: "",
          billCommentAuto: [],
        });
        // const pickupKotPrint = renderToString(<KOT data={res.data} />);
        // const pickupBillPrint = renderToString(
        //   res && res.data && res.data.isOfficial ? (
        //     <RestaurantBill data={res.data} />
        //   ) : (
        //     <TokenBil data={res.data} />
        //   )
        // );
        // const printerDataKot = {
        //   printer: pickupkot,
        //   data: pickupKotPrint,
        // };
        // const printerDataBill = {
        //   printer: pickupbill,
        //   data: pickupBillPrint,
        // };
        // // const htmlString = renderToString(<RestaurantBill />)
        // if (res && res.data && res.data.printBill && res.data.printKot) {
        //   ipcRenderer.send("set-title", printerDataKot);
        //   ipcRenderer.send("set-title", printerDataBill);
        // } else if (res && res.data && res.data.printBill) {
        //   ipcRenderer.send("set-title", printerDataBill);
        // } else if (res && res.data && res.data.printKot) {
        //   ipcRenderer.send("set-title", printerDataKot);
        // }
      })
      .catch((error) => {
        setError(
          error.response && error.response.data
            ? error.response.data
            : "Network Error ...!!!"
        );
      });
  };

  const editBillDataFunction = async () => {
    setLoading(true);
    const customData = {
      ...editBillData,
      customerDetails: {
        ...customerData,
      },
      billType: "Pick Up",
      printBill: true,
      printKot: true,
      firmId: "A",
      billStatus: "Print",
      totalDiscount:
        billData.discountType == "none"
          ? 0
          : billData.subTotal - billData.settledAmount,
      ...billData,
      itemsData: items,
      billComment: billData.billCommentAuto?.join(", "),
      footerKot: "Thank You",
      footerBill: "Thank You",
    };
    await axios
      .post(
        `${BACKEND_BASE_URL}billingrouter/updatePickUpBillData`,
        customData,
        config
      )
      .then((res) => {
        setSuccess(true);
        setLoading(false);
        setItems([]);
        setIsEdit(false);
        setEditBillData();
        setFullFormData({
          inputCode: "",
          itemId: "",
          inputName: "",
          itemName: "",
          qty: 1,
          unit: "",
          comment: "",
          selectedItem: "",
          selectedUnit: "",
          itemPrice: 0,
          price: 0,
          commentAutoComplete: [],
        });
        setCustomerData({
          customerId: "",
          addressId: "",
          mobileNo: "",
          customerName: "",
          address: "",
          locality: "",
          birthDate: "",
          aniversaryDate: "",
        });
        setBillData({
          subTotal: 0,
          discountType: "none",
          discountValue: 0,
          settledAmount: "",
          billPayType: "cash",
          billComment: "",
          billCommentAuto: [],
        });
        try {
          const pickupKotPrint = renderToString(
            <KOT data={res.data} isEdit={true} />
          );
          const pickupBillPrint = renderToString(
            res && res.data && res.data.isOfficial ? (
              <RestaurantBill data={res.data} />
            ) : (
              <TokenBil data={res.data} />
            )
          );
          const printerDataKot = {
            printer: pickupkot[0],
            data: pickupKotPrint,
          };
          const printerDataBill = {
            printer: pickupbill[0],
            data: pickupBillPrint,
          };
          // const htmlString = renderToString(<RestaurantBill />)
          if (res && res.data && res.data.printBill && res.data.printKot) {
            console.log(">>>edit all");
            ipcRenderer.send("set-title", printerDataKot);
            ipcRenderer.send("set-title", printerDataBill);
          } else if (res && res.data && res.data.printBill) {
            console.log(">>>edit one");
            ipcRenderer.send("set-title", printerDataBill);
          } else if (res && res.data && res.data.printKot) {
            console.log(">>>edit two");
            ipcRenderer.send("set-title", printerDataKot);
          }
          console.log(">>>edit else", res.data.printBill, res.data.printKot);
        } catch (error) {
          console.log("try catch errror", error);
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
  const editBillDataFunctionDelivery = async () => {
    setLoading(true);
    const customData = {
      ...editBillData,
      customerDetails: {
        ...customerData,
      },
      billType: "Delivery",
      printBill: true,
      printKot: true,
      firmId: "A",
      billStatus: "Print",
      totalDiscount:
        billData.discountType == "none"
          ? 0
          : billData.subTotal - billData.settledAmount,
      ...billData,
      itemsData: items,
      billComment: billData.billCommentAuto?.join(", "),
      footerKot: "Thank You",
      footerBill: "Thank You",
    };
    await axios
      .post(
        `${BACKEND_BASE_URL}billingrouter/updateDeliveryBillData`,
        customData,
        config
      )
      .then((res) => {
        setSuccess(true);
        setLoading(false);
        setItems([]);
        setIsEdit(false);
        setEditBillData();
        setFullFormData({
          inputCode: "",
          itemId: "",
          inputName: "",
          itemName: "",
          qty: 1,
          unit: "",
          comment: "",
          selectedItem: "",
          selectedUnit: "",
          itemPrice: 0,
          price: 0,
          commentAutoComplete: [],
        });
        setCustomerData({
          customerId: "",
          addressId: "",
          mobileNo: "",
          customerName: "",
          address: "",
          locality: "",
          birthDate: "",
          aniversaryDate: "",
        });
        setBillData({
          subTotal: 0,
          discountType: "none",
          discountValue: 0,
          settledAmount: "",
          billPayType: "cash",
          billComment: "",
          billCommentAuto: [],
        });
        try {
          const pickupKotPrint = renderToString(
            <KOT data={res.data} isEdit={true} />
          );
          const pickupBillPrint = renderToString(
            res && res.data && res.data.isOfficial ? (
              <RestaurantBill data={res.data} />
            ) : (
              <TokenBil data={res.data} />
            )
          );
          const printerDataKot = {
            printer: pickupkot[0],
            data: pickupKotPrint,
          };
          const printerDataBill = {
            printer: pickupbill[0],
            data: pickupBillPrint,
          };
          // const htmlString = renderToString(<RestaurantBill />)
          if (res && res.data && res.data.printBill && res.data.printKot) {
            console.log(">>>edit all");
            ipcRenderer.send("set-title", printerDataKot);
            ipcRenderer.send("set-title", printerDataBill);
          } else if (res && res.data && res.data.printBill) {
            console.log(">>>edit one");
            ipcRenderer.send("set-title", printerDataBill);
          } else if (res && res.data && res.data.printKot) {
            console.log(">>>edit two");
            ipcRenderer.send("set-title", printerDataKot);
          }
          console.log(">>>edit else", res.data.printBill, res.data.printKot);
        } catch (error) {
          console.log("try catch errror", error);
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
  const justEditBillDataFunction = async () => {
    setLoading(true);
    const customData = {
      ...editBillData,
      customerDetails: {
        ...customerData,
      },
      billType: "Pick Up",
      printBill: false,
      printKot: false,
      firmId: "A",
      billStatus: "Print",
      totalDiscount:
        billData.discountType == "none"
          ? 0
          : billData.subTotal - billData.settledAmount,
      ...billData,
      itemsData: items,
      billComment: billData.billCommentAuto?.join(", "),
      footerKot: "Thank You",
      footerBill: "Thank You",
    };
    await axios
      .post(
        `${BACKEND_BASE_URL}billingrouter/updatePickUpBillData`,
        customData,
        config
      )
      .then((res) => {
        setSuccess(true);
        setLoading(false);
        setItems([]);
        setIsEdit(false);
        setEditBillData();
        setFullFormData({
          inputCode: "",
          itemId: "",
          inputName: "",
          itemName: "",
          qty: 1,
          unit: "",
          comment: "",
          selectedItem: "",
          selectedUnit: "",
          itemPrice: 0,
          price: 0,
          commentAutoComplete: [],
        });
        setCustomerData({
          customerId: "",
          addressId: "",
          mobileNo: "",
          customerName: "",
          address: "",
          locality: "",
          birthDate: "",
          aniversaryDate: "",
        });
        setBillData({
          subTotal: 0,
          discountType: "none",
          discountValue: 0,
          settledAmount: "",
          billPayType: "cash",
          billComment: "",
          billCommentAuto: [],
        });
      })
      .catch((error) => {
        setError(
          error.response && error.response.data
            ? error.response.data
            : "Network Error ...!!!"
        );
      });
  };
  const justEditBillDataFunctionDelivery = async () => {
    setLoading(true);
    const customData = {
      ...editBillData,
      customerDetails: {
        ...customerData,
      },
      billType: "Delivery",
      printBill: false,
      printKot: false,
      firmId: "A",
      billStatus: "Print",
      totalDiscount:
        billData.discountType == "none"
          ? 0
          : billData.subTotal - billData.settledAmount,
      ...billData,
      itemsData: items,
      billComment: billData.billCommentAuto?.join(", "),
      footerKot: "Thank You",
      footerBill: "Thank You",
    };
    await axios
      .post(
        `${BACKEND_BASE_URL}billingrouter/updateDeliveryBillData`,
        customData,
        config
      )
      .then((res) => {
        setSuccess(true);
        setLoading(false);
        setItems([]);
        setIsEdit(false);
        setEditBillData();
        setFullFormData({
          inputCode: "",
          itemId: "",
          inputName: "",
          itemName: "",
          qty: 1,
          unit: "",
          comment: "",
          selectedItem: "",
          selectedUnit: "",
          itemPrice: 0,
          price: 0,
          commentAutoComplete: [],
        });
        setCustomerData({
          customerId: "",
          addressId: "",
          mobileNo: "",
          customerName: "",
          address: "",
          locality: "",
          birthDate: "",
          aniversaryDate: "",
        });
        setBillData({
          subTotal: 0,
          discountType: "none",
          discountValue: 0,
          settledAmount: "",
          billPayType: "cash",
          billComment: "",
          billCommentAuto: [],
        });
      })
      .catch((error) => {
        setError(
          error.response && error.response.data
            ? error.response.data
            : "Network Error ...!!!"
        );
      });
  };

  const editBillPrintDataFunction = async () => {
    setLoading(true);
    const customData = {
      ...editBillData,
      customerDetails: {
        ...customerData,
      },
      billType: "Pick Up",
      printBill: true,
      printKot: false,
      firmId: "A",
      billStatus: "Print",
      totalDiscount:
        billData.discountType == "none"
          ? 0
          : billData.subTotal - billData.settledAmount,
      ...billData,
      itemsData: items,
      billComment: billData.billCommentAuto?.join(", "),
      footerKot: "Thank You",
      footerBill: "Thank You",
    };
    await axios
      .post(
        `${BACKEND_BASE_URL}billingrouter/updatePickUpBillData`,
        customData,
        config
      )
      .then((res) => {
        setSuccess(true);
        setLoading(false);
        setItems([]);
        setIsEdit(false);
        setEditBillData();
        setFullFormData({
          inputCode: "",
          itemId: "",
          inputName: "",
          itemName: "",
          qty: 1,
          unit: "",
          comment: "",
          selectedItem: "",
          selectedUnit: "",
          itemPrice: 0,
          price: 0,
          commentAutoComplete: [],
        });
        setCustomerData({
          customerId: "",
          addressId: "",
          mobileNo: "",
          customerName: "",
          address: "",
          locality: "",
          birthDate: "",
          aniversaryDate: "",
        });
        setBillData({
          subTotal: 0,
          discountType: "none",
          discountValue: 0,
          settledAmount: "",
          billPayType: "cash",
          billComment: "",
          billCommentAuto: [],
        });
        try {
          const pickupKotPrint = renderToString(
            <KOT data={res.data} isEdit={true} />
          );
          const pickupBillPrint = renderToString(
            res && res.data && res.data.isOfficial ? (
              <RestaurantBill data={res.data} />
            ) : (
              <TokenBil data={res.data} />
            )
          );
          const printerDataKot = {
            printer: pickupkot[0],
            data: pickupKotPrint,
          };
          const printerDataBill = {
            printer: pickupbill[0],
            data: pickupBillPrint,
          };
          // const htmlString = renderToString(<RestaurantBill />)
          if (res && res.data && res.data.printBill && res.data.printKot) {
            console.log(">>>edit all");
            ipcRenderer.send("set-title", printerDataKot);
            ipcRenderer.send("set-title", printerDataBill);
          } else if (res && res.data && res.data.printBill) {
            console.log(">>>edit one");
            ipcRenderer.send("set-title", printerDataBill);
          } else if (res && res.data && res.data.printKot) {
            console.log(">>>edit two");
            ipcRenderer.send("set-title", printerDataKot);
          }
          console.log(">>>edit else", res.data.printBill, res.data.printKot);
        } catch (error) {
          console.log("try catch errror", error);
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
  const editBillPrintDataFunctionDelivery = async () => {
    setLoading(true);
    const customData = {
      ...editBillData,
      customerDetails: {
        ...customerData,
      },
      billType: "Delivery",
      printBill: true,
      printKot: false,
      firmId: "A",
      billStatus: "Print",
      totalDiscount:
        billData.discountType == "none"
          ? 0
          : billData.subTotal - billData.settledAmount,
      ...billData,
      itemsData: items,
      billComment: billData.billCommentAuto?.join(", "),
      footerKot: "Thank You",
      footerBill: "Thank You",
    };
    await axios
      .post(
        `${BACKEND_BASE_URL}billingrouter/updateDeliveryBillData`,
        customData,
        config
      )
      .then((res) => {
        setSuccess(true);
        setLoading(false);
        setItems([]);
        setIsEdit(false);
        setEditBillData();
        setFullFormData({
          inputCode: "",
          itemId: "",
          inputName: "",
          itemName: "",
          qty: 1,
          unit: "",
          comment: "",
          selectedItem: "",
          selectedUnit: "",
          itemPrice: 0,
          price: 0,
          commentAutoComplete: [],
        });
        setCustomerData({
          customerId: "",
          addressId: "",
          mobileNo: "",
          customerName: "",
          address: "",
          locality: "",
          birthDate: "",
          aniversaryDate: "",
        });
        setBillData({
          subTotal: 0,
          discountType: "none",
          discountValue: 0,
          settledAmount: "",
          billPayType: "cash",
          billComment: "",
          billCommentAuto: [],
        });
        try {
          const pickupKotPrint = renderToString(
            <KOT data={res.data} isEdit={true} />
          );
          const pickupBillPrint = renderToString(
            res && res.data && res.data.isOfficial ? (
              <RestaurantBill data={res.data} />
            ) : (
              <TokenBil data={res.data} />
            )
          );
          const printerDataKot = {
            printer: pickupkot[0],
            data: pickupKotPrint,
          };
          const printerDataBill = {
            printer: pickupbill[0],
            data: pickupBillPrint,
          };
          // const htmlString = renderToString(<RestaurantBill />)
          if (res && res.data && res.data.printBill && res.data.printKot) {
            console.log(">>>edit all");
            ipcRenderer.send("set-title", printerDataKot);
            ipcRenderer.send("set-title", printerDataBill);
          } else if (res && res.data && res.data.printBill) {
            console.log(">>>edit one");
            ipcRenderer.send("set-title", printerDataBill);
          } else if (res && res.data && res.data.printKot) {
            console.log(">>>edit two");
            ipcRenderer.send("set-title", printerDataKot);
          }
          console.log(">>>edit else", res.data.printBill, res.data.printKot);
        } catch (error) {
          console.log("try catch errror", error);
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
  const editKotPrintDataFunction = async () => {
    setLoading(true);
    const customData = {
      ...editBillData,
      customerDetails: {
        ...customerData,
      },
      billType: "Pick Up",
      printBill: false,
      printKot: true,
      firmId: "A",
      billStatus: "Print",
      totalDiscount:
        billData.discountType == "none"
          ? 0
          : billData.subTotal - billData.settledAmount,
      ...billData,
      itemsData: items,
      billComment: billData.billCommentAuto?.join(", "),
      footerKot: "Thank You",
      footerBill: "Thank You",
    };
    await axios
      .post(
        `${BACKEND_BASE_URL}billingrouter/updatePickUpBillData`,
        customData,
        config
      )
      .then((res) => {
        setSuccess(true);
        setLoading(false);
        setItems([]);
        setEditBillData();
        setFullFormData({
          inputCode: "",
          itemId: "",
          inputName: "",
          itemName: "",
          qty: 1,
          unit: "",
          comment: "",
          selectedItem: "",
          selectedUnit: "",
          itemPrice: 0,
          price: 0,
          commentAutoComplete: [],
        });
        setCustomerData({
          customerId: "",
          addressId: "",
          mobileNo: "",
          customerName: "",
          address: "",
          locality: "",
          birthDate: "",
          aniversaryDate: "",
        });
        setBillData({
          subTotal: 0,
          discountType: "none",
          discountValue: 0,
          settledAmount: "",
          billPayType: "cash",
          billComment: "",
          billCommentAuto: [],
        });
        try {
          const pickupKotPrint = renderToString(
            <KOT data={res.data} isEdit={true} />
          );
          const pickupBillPrint = renderToString(
            res && res.data && res.data.isOfficial ? (
              <RestaurantBill data={res.data} />
            ) : (
              <TokenBil data={res.data} />
            )
          );
          const printerDataKot = {
            printer: pickupkot[0],
            data: pickupKotPrint,
          };
          const printerDataBill = {
            printer: pickupbill[0],
            data: pickupBillPrint,
          };
          // const htmlString = renderToString(<RestaurantBill />)
          if (res && res.data && res.data.printBill && res.data.printKot) {
            console.log(">>>edit all");
            ipcRenderer.send("set-title", printerDataKot);
            ipcRenderer.send("set-title", printerDataBill);
          } else if (res && res.data && res.data.printBill) {
            console.log(">>>edit one");
            ipcRenderer.send("set-title", printerDataBill);
          } else if (res && res.data && res.data.printKot) {
            console.log(">>>edit two");
            ipcRenderer.send("set-title", printerDataKot);
          }
          console.log(">>>edit else", res.data.printBill, res.data.printKot);
          setIsEdit(false);
        } catch (error) {
          console.log("try catch errror", error);
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
  const editKotPrintDataFunctionDelivery = async () => {
    setLoading(true);
    const customData = {
      ...editBillData,
      customerDetails: {
        ...customerData,
      },
      billType: "Delivery",
      printBill: false,
      printKot: true,
      firmId: "A",
      billStatus: "Print",
      totalDiscount:
        billData.discountType == "none"
          ? 0
          : billData.subTotal - billData.settledAmount,
      ...billData,
      itemsData: items,
      billComment: billData.billCommentAuto?.join(", "),
      footerKot: "Thank You",
      footerBill: "Thank You",
    };
    await axios
      .post(
        `${BACKEND_BASE_URL}billingrouter/updateDeliveryBillData`,
        customData,
        config
      )
      .then((res) => {
        setSuccess(true);
        setLoading(false);
        setItems([]);
        setEditBillData();
        setFullFormData({
          inputCode: "",
          itemId: "",
          inputName: "",
          itemName: "",
          qty: 1,
          unit: "",
          comment: "",
          selectedItem: "",
          selectedUnit: "",
          itemPrice: 0,
          price: 0,
          commentAutoComplete: [],
        });
        setCustomerData({
          customerId: "",
          addressId: "",
          mobileNo: "",
          customerName: "",
          address: "",
          locality: "",
          birthDate: "",
          aniversaryDate: "",
        });
        setBillData({
          subTotal: 0,
          discountType: "none",
          discountValue: 0,
          settledAmount: "",
          billPayType: "cash",
          billComment: "",
          billCommentAuto: [],
        });
        try {
          const pickupKotPrint = renderToString(
            <KOT data={res.data} isEdit={true} />
          );
          const pickupBillPrint = renderToString(
            res && res.data && res.data.isOfficial ? (
              <RestaurantBill data={res.data} />
            ) : (
              <TokenBil data={res.data} />
            )
          );
          const printerDataKot = {
            printer: deliverykot[0],
            data: pickupKotPrint,
          };
          const printerDataBill = {
            printer: deliverybill[0],
            data: pickupBillPrint,
          };
          // const htmlString = renderToString(<RestaurantBill />)
          if (res && res.data && res.data.printBill && res.data.printKot) {
            console.log(">>>edit all");
            ipcRenderer.send("set-title", printerDataKot);
            ipcRenderer.send("set-title", printerDataBill);
          } else if (res && res.data && res.data.printBill) {
            console.log(">>>edit one");
            ipcRenderer.send("set-title", printerDataBill);
          } else if (res && res.data && res.data.printKot) {
            console.log(">>>edit two");
            ipcRenderer.send("set-title", printerDataKot);
          }
          console.log(">>>edit else", res.data.printBill, res.data.printKot);
          setIsEdit(false);
        } catch (error) {
          console.log("try catch errror", error);
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

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 700);
    };
  };

  const handleSearch = () => {
    console.log(":::???:::", document.getElementById("searchWord").value);
    getSourceDDL(document.getElementById("searchWord").value);
  };

  const debounceFunction = React.useCallback(debounce(handleSearch), []);
  const getSourceDDL = async (data) => {
    await axios
      .get(
        `${BACKEND_BASE_URL}billingrouter/searchCustomerData?searchWord=${data}`,
        config
      )
      .then((res) => {
        setCustomerList(res.data);
      })
      .catch((error) => {
        setError(error.response ? error.response.data : "Network Error ...!!!");
      });
  };
  const getcustomerDDL = async () => {
    await axios
      .get(
        `${BACKEND_BASE_URL}billingrouter/searchCustomerData?searchWord=${""}`,
        config
      )
      .then((res) => {
        setCustomerList(res.data);
      })
      .catch((error) => {
        setError(error.response ? error.response.data : "Network Error ...!!!");
      });
  };
  const getComments = async () => {
    await axios
      .get(`${BACKEND_BASE_URL}billingrouter/getComment`, config)
      .then((res) => {
        setCommentList(res.data);
      })
      .catch((error) => {
        setError(error.response ? error.response.data : "Network Error ...!!!");
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
  const saveBillDelivery = () => {
    if (loading || success) {
    } else {
      if (
        !items ||
        items.length < 1 ||
        !billData ||
        !billData.subTotal ||
        !billData.settledAmount ||
        !billData.discountType ||
        (billData.discountType != "none" && !billData.discountValue) ||
        !customerData.mobileNo ||
        customerData.mobileNo.length != 10
      ) {
        if (!customerData.mobileNo || customerData.mobileNo.length != 10) {
          setBillError((perv) => ({
            ...perv,
            mobileNo: true,
          }));
        }
        setError("Please Fill All Field");
      } else if (billData.settledAmount <= 0) {
        setError("Sattle Amount can not be less than zero");
      } else {
        // console.log(">>", fullFormData, fullFormData.stockInDate, fullFormData.stockInDate != 'Invalid Date' ? 'ue' : 'false')
        addBillDataDelivery();
      }
    }
  };
  const justSaveBill = () => {
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
        justSaveBillData();
      }
    }
  };
  const justSaveBillDelivery = () => {
    if (loading || success) {
    } else {
      if (
        !items ||
        items.length < 1 ||
        !billData ||
        !billData.subTotal ||
        !billData.settledAmount ||
        !billData.discountType ||
        (billData.discountType != "none" && !billData.discountValue) ||
        !customerData.mobileNo ||
        customerData.mobileNo.length != 10
      ) {
        if (!customerData.mobileNo || customerData.mobileNo.length != 10) {
          setBillError((perv) => ({
            ...perv,
            mobileNo: true,
          }));
        }
        setError("Please Fill All Field");
      } else if (billData.settledAmount <= 0) {
        setError("Sattle Amount can not be less than zero");
      } else {
        // console.log(">>", fullFormData, fullFormData.stockInDate, fullFormData.stockInDate != 'Invalid Date' ? 'ue' : 'false')
        justSaveBillDataDelivery();
      }
    }
  };
  const justEditBill = () => {
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
        justEditBillDataFunction();
      }
    }
  };
  const justEditBillDelivery = () => {
    if (loading || success) {
    } else {
      if (
        !items ||
        items.length < 1 ||
        !billData ||
        !billData.subTotal ||
        !billData.settledAmount ||
        !billData.discountType ||
        (billData.discountType != "none" && !billData.discountValue) ||
        !customerData.mobileNo ||
        customerData.mobileNo.length != 10
      ) {
        if (!customerData.mobileNo || customerData.mobileNo.length != 10) {
          setBillError((perv) => ({
            ...perv,
            mobileNo: true,
          }));
        }
        setError("Please Fill All Field");
      } else if (billData.settledAmount <= 0) {
        setError("Sattle Amount can not be less than zero");
      } else {
        // console.log(">>", fullFormData, fullFormData.stockInDate, fullFormData.stockInDate != 'Invalid Date' ? 'ue' : 'false')
        justEditBillDataFunctionDelivery();
      }
    }
  };
  const holdBill = () => {
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
        holdBillData();
      }
    }
  };
  const holdBillDelivery = () => {
    if (loading || success) {
    } else {
      if (
        !items ||
        items.length < 1 ||
        !billData ||
        !billData.subTotal ||
        !billData.settledAmount ||
        !billData.discountType ||
        (billData.discountType != "none" && !billData.discountValue) ||
        !customerData.mobileNo ||
        customerData.mobileNo.length != 10
      ) {
        if (!customerData.mobileNo || customerData.mobileNo.length != 10) {
          setBillError((perv) => ({
            ...perv,
            mobileNo: true,
          }));
        }
        setError("Please Fill All Field");
      } else if (billData.settledAmount <= 0) {
        setError("Sattle Amount can not be less than zero");
      } else {
        // console.log(">>", fullFormData, fullFormData.stockInDate, fullFormData.stockInDate != 'Invalid Date' ? 'ue' : 'false')
        holdBillDataDelivery();
      }
    }
  };
  const cancleBill = () => {
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
        if (window.confirm("Are you sure you want to Cancel this bill?")) {
          cancleBillData();
        }
      }
    }
  };
  const cancleBillDelivery = () => {
    if (loading || success) {
    } else {
      if (
        !items ||
        items.length < 1 ||
        !billData ||
        !billData.subTotal ||
        !billData.settledAmount ||
        !billData.discountType ||
        (billData.discountType != "none" && !billData.discountValue) ||
        !customerData.mobileNo ||
        customerData.mobileNo.length != 10
      ) {
        if (!customerData.mobileNo || customerData.mobileNo.length != 10) {
          setBillError((perv) => ({
            ...perv,
            mobileNo: true,
          }));
        }
        setError("Please Fill All Field");
      } else if (billData.settledAmount <= 0) {
        setError("Sattle Amount can not be less than zero");
      } else {
        // console.log(">>", fullFormData, fullFormData.stockInDate, fullFormData.stockInDate != 'Invalid Date' ? 'ue' : 'false')
        if (window.confirm("Are you sure you want to Cancel this bill?")) {
          cancleBillDataDelivery();
        }
      }
    }
  };
  const editBillPrint = () => {
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
        editBillPrintDataFunction();
      }
    }
  };
  const editBillPrintDelivery = () => {
    if (loading || success) {
    } else {
      if (
        !items ||
        items.length < 1 ||
        !billData ||
        !billData.subTotal ||
        !billData.settledAmount ||
        !billData.discountType ||
        (billData.discountType != "none" && !billData.discountValue) ||
        !customerData.mobileNo ||
        customerData.mobileNo.length != 10
      ) {
        if (!customerData.mobileNo || customerData.mobileNo.length != 10) {
          setBillError((perv) => ({
            ...perv,
            mobileNo: true,
          }));
        }
        setError("Please Fill All Field");
      } else if (billData.settledAmount <= 0) {
        setError("Sattle Amount can not be less than zero");
      } else {
        // console.log(">>", fullFormData, fullFormData.stockInDate, fullFormData.stockInDate != 'Invalid Date' ? 'ue' : 'false')
        editBillPrintDataFunctionDelivery();
      }
    }
  };
  const editKotPrint = () => {
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
        editKotPrintDataFunction();
      }
    }
  };
  const editKotPrintDelivery = () => {
    if (loading || success) {
    } else {
      if (
        !items ||
        items.length < 1 ||
        !billData ||
        !billData.subTotal ||
        !billData.settledAmount ||
        !billData.discountType ||
        (billData.discountType != "none" && !billData.discountValue) ||
        !customerData.mobileNo ||
        customerData.mobileNo.length != 10
      ) {
        if (!customerData.mobileNo || customerData.mobileNo.length != 10) {
          setBillError((perv) => ({
            ...perv,
            mobileNo: true,
          }));
        }
        setError("Please Fill All Field");
      } else if (billData.settledAmount <= 0) {
        setError("Sattle Amount can not be less than zero");
      } else {
        // console.log(">>", fullFormData, fullFormData.stockInDate, fullFormData.stockInDate != 'Invalid Date' ? 'ue' : 'false')
        editKotPrintDataFunctionDelivery();
      }
    }
  };
  // const justEdi = () => {
  //   if (loading || success) {
  //   } else {
  //     if (
  //       !items ||
  //       items.length < 1 ||
  //       !billData ||
  //       !billData.subTotal ||
  //       !billData.settledAmount ||
  //       !billData.discountType ||
  //       (billData.discountType != "none" && !billData.discountValue)
  //     ) {
  //       setError("Please Fill All Field");
  //     } else if (billData.settledAmount <= 0) {
  //       setError("Sattle Amount can not be less than zero");
  //     } else {
  //       // console.log(">>", fullFormData, fullFormData.stockInDate, fullFormData.stockInDate != 'Invalid Date' ? 'ue' : 'false')
  //       editBillDataFunction();
  //     }
  //   }
  // };
  const editBill = () => {
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
        editBillDataFunction();
      }
    }
  };
  const editBillDelivery = () => {
    if (loading || success) {
    } else {
      if (
        !items ||
        items.length < 1 ||
        !billData ||
        !billData.subTotal ||
        !billData.settledAmount ||
        !billData.discountType ||
        (billData.discountType != "none" && !billData.discountValue) ||
        !customerData.mobileNo ||
        customerData.mobileNo.length != 10
      ) {
        if (!customerData.mobileNo || customerData.mobileNo.length != 10) {
          setBillError((perv) => ({
            ...perv,
            mobileNo: true,
          }));
        }
        setError("Please Fill All Field");
      } else if (billData.settledAmount <= 0) {
        setError("Sattle Amount can not be less than zero");
      } else {
        // console.log(">>", fullFormData, fullFormData.stockInDate, fullFormData.stockInDate != 'Invalid Date' ? 'ue' : 'false')
        editBillDataFunctionDelivery();
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
  // const datas = [
  //   {
  //     "customerId": "customer_1715343985009",
  //     "customerName": "Hello World",
  //     "mobileNo": "9898266144",
  //     "addressId": "12we",
  //     "address": "China",
  //     "locality": "Madars"
  //   },
  //   {
  //     "customerId": "customer_1715343985009",
  //     "customerName": "Hello World",
  //     "mobileNo": "9898266144",
  //     "addressId": "addressId_1715343985009",
  //     "address": "Shanti Palace",
  //     "locality": "Rajkot"
  //   },
  //   {
  //     "customerId": "customer_1715770029940",
  //     "customerName": "Krish Dhaduk",
  //     "mobileNo": "9645878456",
  //     "addressId": "addressId_1715770029940",
  //     "address": "North Korea Direct",
  //     "locality": "Rural"
  //   },
  //   {
  //     "customerId": "customer_1716203597407",
  //     "customerName": "adasdasd",
  //     "mobileNo": "982513222",
  //     "addressId": "addressId_1716203597407",
  //     "address": "અસદસદસ ",
  //     "locality": "અસદસડા "
  //   },
  //   {
  //     "customerId": "customer_1716203697858",
  //     "customerName": "asdasdas",
  //     "mobileNo": "9898989",
  //     "addressId": "addressId_1716203697858",
  //     "address": "અસદસડસડ ",
  //     "locality": "અસદસદસદિ "
  //   },
  //   {
  //     "customerId": "customer_1716203991510",
  //     "customerName": "અસદસદ ",
  //     "mobileNo": "9825112229",
  //     "addressId": "addressId_1716203991510",
  //     "address": "આઝાદ ",
  //     "locality": "અસદડ "
  //   },
  //   {
  //     "customerId": "customer_1716204493977",
  //     "customerName": "અસદસડ ",
  //     "mobileNo": "6456464654",
  //     "addressId": "addressId_1716204493977",
  //     "address": "ડસસદાસ્દ ",
  //     "locality": "અસદ્દસાદ "
  //   },
  //   {
  //     "customerId": "customer_1716211451870",
  //     "customerName": "રવિ ",
  //     "mobileNo": "9825118883",
  //     "addressId": "addressId_1716211451870",
  //     "address": "અસદસદ ",
  //     "locality": "અડદ "
  //   }
  // ];

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
      const matchingProduct = data
        ? data?.find(
            (item) =>
              item.itemCode.toString() === value ||
              item.itemShortKey.toString().toLocaleLowerCase() ===
                value.toString().toLocaleLowerCase()
          )
        : [];
      console.log("Search Item", matchingProduct);
      //    if (matchingProduct) {
      //   setFullFormData(prevState => ({
      //     ...prevState,
      //     inputName: matchingProduct
      //   }));
      // }
      if (matchingProduct?.periods?.length > 0) {
        alert(
          `Item is not Available From ${matchingProduct?.periods[0].displayStartTime} To ${matchingProduct?.periods[0].displayEndTime}`
        );
      } else {
        if (!matchingProduct || value === "") {
          setValidationError(true);
          second.current && second.current.focus();
          setFullFormData((prevState) => ({
            ...prevState,
            selectedItem: "",
            inputName: "",
            itemName: "",
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
            itemName:
              matchingProduct && matchingProduct.itemName
                ? matchingProduct.itemName
                : "",
            selectedItem: matchingProduct,
          }));
          quantityInputRef.current && quantityInputRef.current.focus();
        }
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
      setDisabledFeild({ ...disbledFeild, quantity: true, comment: true });
      if (fullFormData.inputName !== "") {
        const isExist = items.findIndex(
          (item) =>
            item.inputCode == fullFormData.inputCode &&
            item.unit == fullFormData.unit
        );
        console.log("<LKLLKK>", isExist, items[isExist]);
        if (isExist != -1) {
          // const newItem = {
          //   inputCode: fullFormData.inputCode,
          //   inputName: fullFormData.inputName,
          //   qty: fullFormData.qty,
          //   unit: fullFormData.unit,
          //   itemPrice: fullFormData.itemPrice,
          //   unit: fullFormData.unit,
          //   price: fullFormData.price,
          //   // comment: fullFormData.commentAutoComplete
          //   //   ? fullFormData.commentAutoComplete?.join(", ")
          //   //   : "",
          //   comment: fullFormData.comment,
          // };
          // console.log("<>LOG<>",fullFormData.price,fullFormData.itemPrice)
          setBillData((perv) => ({
            ...perv,
            subTotal: billData.subTotal + fullFormData.price,
            settledAmount: Math.ceil(billData.subTotal + fullFormData.price),
          }));
          setItems((prevItems) =>
            prevItems?.map((data, index) =>
              isExist == index
                ? {
                    ...data,
                    qty: parseFloat(data.qty) + parseFloat(fullFormData.qty),
                    comment: data.comment
                      ? data.comment + ", " + fullFormData.comment
                      : fullFormData.comment,
                    price:
                      data.price + fullFormData.qty * fullFormData.itemPrice,
                  }
                : data
            )
          );
          setFullFormData({
            inputCode: "",
            inputName: "",
            itemName: "",
            qty: 1,
            unit: "",
            comment: "",
            selectedItem: "",
            selectedUnit: "",
            itemPrice: "",
            commentAutoComplete: [],
          });
          setValidationError(false);
          first.current && first.current.focus();
          e.target.value = "";
        } else {
          const newItem = {
            inputCode: fullFormData.inputCode,
            inputName: fullFormData.inputName,
            itemName: fullFormData.itemName,
            qty: fullFormData.qty,
            unit: fullFormData.unit,
            itemPrice: fullFormData.itemPrice,
            unit: fullFormData.unit,
            price: fullFormData.price,
            // comment: fullFormData.commentAutoComplete
            //   ? fullFormData.commentAutoComplete?.join(", ")
            //   : "",
            itemId: fullFormData.itemId,
            comment: fullFormData.comment,
          };
          console.log("<>LOG<>", fullFormData.price, fullFormData.itemPrice);
          setBillData((perv) => ({
            ...perv,
            subTotal: billData.subTotal + fullFormData.price,
            settledAmount: Math.ceil(billData.subTotal + fullFormData.price),
          }));
          setItems((prevItems) => [...prevItems, newItem]);
          setFullFormData({
            inputCode: "",
            inputName: "",
            itemName: "",
            qty: 1,
            unit: "",
            comment: "",
            selectedItem: "",
            selectedUnit: "",
            itemPrice: "",
            commentAutoComplete: [],
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
      itemName: "",
      qty: 1,
      unit: "",
      comment: "",
      commentAutoComplete: [],
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
      settledAmount: Math.ceil(billData.subTotal - items[index].price),
    }));
  };
  const handleIncreaseQuantity = (index, currentQty) => {
    const newQty = parseFloat(currentQty) + 1;
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].qty = newQty;
      updatedItems[index].price = newQty * updatedItems[index].itemPrice;
      return updatedItems;
    });

    setBillData((prev) => {
      const newSubTotal = items.reduce(
        (sum, item, i) =>
          sum + (i === index ? newQty * item.itemPrice : item.price),
        0
      );
      return {
        ...prev,
        subTotal: newSubTotal,
        settledAmount: Math.ceil(
          newSubTotal -
            (prev.discountType === "fixed"
              ? prev.discountValue
              : prev.discountType === "percentage"
              ? newSubTotal * (prev.discountValue / 100)
              : 0)
        ),
      };
    });
  };

  const [text, setText] = useState("");
  const handleInputChange = (event, value) => {
    // if (event) {
    if ((regex.test(value) || value === "") && value.length < 11) {
      setCustomerData((perv) => ({
        ...perv,
        address: value && value.address ? value.address : "",
      }));
      setFreeSoloField(value && value.mobileNo ? value.mobileNo : "");
    }
    // } else {
    //   console.log("error>>");
    // }
  };
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
      settledAmount: Math.ceil(
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
                : 0)
      ),
    }));
  };
  const handleOnChangePrice = (index, value) => {
    const newQty = value;
    const isValidInput = /^\d*\.?\d{0,3}$/.test(value);
    if (!isNaN(newQty) && newQty >= -1 && isValidInput) {
      setItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems[index].qty = newQty;
        updatedItems[index].price = newQty * updatedItems[index].itemPrice;
        return updatedItems;
      });
      setBillData((prev) => {
        const newSubTotal = items.reduce(
          (sum, item, i) =>
            sum + (i === index ? newQty * item.itemPrice : item.price),
          0
        );
        return {
          ...prev,
          subTotal: newSubTotal,
          settledAmount: Math.ceil(
            newSubTotal -
              (prev.discountType === "fixed"
                ? prev.discountValue
                : prev.discountType === "percentage"
                ? newSubTotal * (prev.discountValue / 100)
                : 0
              ).toFixed(2)
          ),
        };
      });
    }
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
  const handleOpenSuggestion = (value) => {
    setopenSuggestions(true);
  };
  // const handleFilter = (suggestion) => {
  //   setInputValue(suggestion);
  //   if (suggestion === "") {
  //     setSuggestionData([]);
  //     return;
  //   }
  //   const filteredItem = datas.filter(val => val.mobileNo.includes(suggestion));
  //   setSuggestionData(filteredItem);
  //   setSuggestionIndex(0);
  // };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSuggestionIndex((prevIndex) =>
        prevIndex === customerList.length - 1 ? 0 : prevIndex + 1
      );
    } else if (e.key === "ArrowUp") {
      setSuggestionIndex((prevIndex) =>
        prevIndex === 0 ? customerList.length - 1 : prevIndex - 1
      );
    } else if (e.key === "Enter" && customerList.length > 0) {
      const selectedValue = customerList[suggestionIndex];
      setSuggestionSelectedValue(selectedValue);
      // setInputValue(`${val.mobileNo}`);
      setCustomerData((perv) => ({
        ...perv,
        mobileNo: selectedValue.mobileNo,
        address: selectedValue.address,
        locality: selectedValue.locality,
        customerId: selectedValue.customerId,
        addressId: selectedValue.addressId,
        customerName: selectedValue.customerName,
      }));
      setCustomerList([]);
    }
  };

  const handleSuggestionClick = (val) => {
    setSuggestionSelectedValue(val);
    // setInputValue(`${val.mobileNo}`);
    setCustomerData((perv) => ({
      ...perv,
      mobileNo: val.mobileNo,
      address: val.address,
      locality: val.locality,
      customerId: val.customerId,
      addressId: val.addressId,
      customerName: val.customerName,
    }));
    setCustomerList([]);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setCustomerList([]);
    }, 500);
  };

  useEffect(() => {
    if (suggestionListRef.current && customerList.length > 0) {
      const activeSuggestion =
        suggestionListRef.current.children[suggestionIndex];
      if (activeSuggestion) {
        activeSuggestion.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [suggestionIndex]);

  return (
    <div className="bg-gray-200 overfloe-hidden h-full">
      <Header
        setIsEdit={setIsEdit}
        setBillData={setBillData}
        setEditBillData={setEditBillData}
        setItems={setItems}
        setCustomerData={setCustomerData}
        setButtonCLicked={setButtonCLicked}
      />
      <section className="right_section ">
        <div className="right_top_header gap-6 p-2 flex paddinAnother">
          <div className="w-32">
            <TextField
              placeholder="Short Code"
              value={fullFormData.inputCode ? fullFormData.inputCode : ""}
              onChange={handleInputCodeChange}
              onKeyDown={handleEnterPressFirst}
              variant="outlined"
              inputRef={first}
              className="textBoxmUI"
              error={validationError ? true : false}
              helperText={validationError ? "Incorrect Code" : ""}
            />
          </div>
          <div className="w-80 autocompleteTxt">
            <Autocomplete
              options={data ? data : []}
              defaultValue={null}
              getOptionLabel={(options) =>
                options.itemName ? options.itemName : ""
              }
              // className={""}
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
              className="textBoxmUI"
              value={fullFormData.qty}
              onChange={(e) => {
                if (
                  isValidInput.test(e.target.value) ||
                  e.target.value === ""
                ) {
                  handleQuantityChange(e);
                }
              }}
              disabled={disbledFeild.quantity ? true : false}
              onKeyDown={handleEnterPressSecond}
              inputRef={quantityInputRef}
              variant="outlined"
              onFocus={(e) => {
                e.target.select();
              }}
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
            <TextField value={fullFormData.itemPrice} className="textBoxmUI" />
          </div>
          <div className="w-96 autocompleteTxt">
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
              disabled={disbledFeild.comment ? true : false}
              onKeyDown={handleAddItem}
              className="w-full textBoxmUI"
            />
            {/* <Autocomplete
              multiple
              id="tags-filled"
              options={commentList ? commentList : []}
              defaultValue={""}
              inputRef={commentInputRef}
              freeSolo
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <div>
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                    {console.log(value)}
                  </div>
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label="freeSolo"
                  placeholder="Favorites"
                  id="freeSolo"
                  inputRef={freeSoloValue}
                  onKeyDown={(e) => {
                    const data = freeSoloValue.current.value;
                    console.log(data);
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (data === "") {
                        handleAddItem(e);
                      }
                    }
                  }}
                />
              )}
            /> */}
            {/* <Autocomplete
              multiple
              id="multiple-limit-tags"
              limitTags={2}
              // inputRef={commentInputRef}
              options={commentList}
              onChange={handleCommentAutocomplete}
              value={
                fullFormData.commentAutoComplete
                  ? fullFormData.commentAutoComplete
                  : []
              }
              defaultValue={[]}
              freeSolo
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Comments"
                  inputRef={commentInputRef}
                  onKeyDown={(e) => {
                    const data = commentInputRef.current.value;
                    console.log(data);
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (data === "") {
                        commentInputRef.current.value = [];
                        handleAddItem(e);
                      }
                    }
                  }}
                />
              )}
            /> */}
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
      <section className="left_section h-full ">
        <div className=" w-full p-0 my-2 ">
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
                          <td className="autocompleteTxt">
                            <input
                              type="text"
                              className={`border-2 w-48 p-1 rounded-sm mobileNo relative ${
                                billError.mobileNo ? "mobileNoError" : ""
                              }`}
                              name="mobileNo"
                              // value={customerData.mobileNo}
                              // onChange={(e) => {
                              //   setCustomerData((perv) => ({
                              //     ...perv,
                              //     mobileNo: e.target.value,
                              //   }));
                              //   // handleOpenSuggestion(e.target.value);
                              // }}
                              // list="suggestion"
                              id="searchWord"
                              label="Outlined"
                              variant="outlined"
                              onChange={(e) => {
                                // handleFilter(e.target.value);
                                setBillError({ ...billError, mobileNo: false });
                                if (regex.test(e.target.value)) {
                                  setCustomerData((perv) => ({
                                    ...perv,
                                    mobileNo: e.target.value,
                                    customerId: "",
                                    addressId: "",
                                  }));
                                  setSuggestionIndex(0);
                                  debounceFunction();
                                }
                                // setInputValue(e.target.value)
                              }}
                              onBlur={handleBlur}
                              onKeyDown={handleKeyDown}
                              value={customerData.mobileNo}
                              autoComplete="off"

                              // onBlur={() => setopenSuggestions(false)}
                            />
                            {customerList.length > 0 && (
                              <div
                                className="suggestions"
                                style={{
                                  maxHeight: "165px",
                                  overflowY: "auto",
                                  width: "33%",
                                }}
                                ref={suggestionListRef}
                              >
                                {customerList.map((val, index) => (
                                  <div
                                    key={index}
                                    className="cursor-pointer suggestionBorder"
                                    onClick={() => handleSuggestionClick(val)}
                                  >
                                    <div
                                      className={`suggestionValue px-2 py-1 ${
                                        suggestionIndex === index
                                          ? "bg-gray-200"
                                          : ""
                                      }`}
                                    >
                                      {val.mobileNo} - {val.customerName} -{" "}
                                      {val.address}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
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
                                    addressId: "",
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
                                    addressId: "",
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
                            <td colSpan="2">
                              {/* <input
                                type="text"
                                className="border-2 w-full p-1 rounded-sm"
                                value={billData.billComment}
                                onChange={(e) =>
                                  setBillData((perv) => ({
                                    ...perv,
                                    billComment: e.target.value,
                                  }))
                                }
                              /> */}
                              <Autocomplete
                                multiple
                                id="tags-outlined"
                                options={commentList ? commentList : []}
                                // getOptionLabel={commentList ? commentList : []}
                                defaultValue={[]}
                                freeSolo
                                value={
                                  billData.billCommentAuto
                                    ? billData.billCommentAuto
                                    : []
                                }
                                onChange={handleCommentAutocomplete}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    placeholder="Order Comment"
                                  />
                                )}
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
                  {/* <div
                    // onClick={() =>
                    //   items.length <= 0 &&
                    //   isEdit == false &&
                    //   setButtonCLicked("tab1")
                    // }
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
                  </div> */}
                  <div
                    onClick={() =>
                      (items.length <= 0 || isEdit == false) &&
                      setButtonCLicked("tab2")
                    }
                    className={
                      buttonCLicked == "tab2"
                        ? "clicked col-3 p-0  col-span-6 text-center"
                        : "col-3 p-0 cursor-pointer  col-span-6 text-center"
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
                    onClick={() =>
                      (items.length <= 0 || isEdit == false) &&
                      setButtonCLicked("tab3")
                    }
                    className={
                      buttonCLicked == "tab3"
                        ? "clicked col-3 p-0  col-span-6 text-center"
                        : "col-3 p-0 cursor-pointer  col-span-6 text-center"
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
                  {/* <div
                    // onClick={() =>
                    //   items.length <= 0 &&
                    //   isEdit == false &&
                    //   setButtonCLicked("tab4")
                    // }
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
                  </div> */}
                </div>
              </div>
              <div className=" p-0 text-base ">
                <div className="bg-gray-200">
                  <div className="grid grid-cols-12 w-full p-2">
                    <div className="col-span-3 justify-self-center underline color-gray-700 pl-3">
                      ITEMS
                    </div>
                    <div className="col-span-3 justify-self-end">COMMENTS</div>
                    <div className="col-span-3 justify-self-center ml-16">
                      QTY.
                    </div>
                    <div className="col-span-1 justify-self-center">Unit</div>
                    <div className="col-span-1 justify-self-end ">Price</div>
                    <div className="col-span-1 justify-self-end ">Total</div>
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
                  {items?.map((item, index) => (
                    <div
                      key={index}
                      className=" billin_content itemBorder p-2 text-lg"
                    >
                      <div className="grid grid-cols-12 items-center content-center gap-2">
                        <div className="col-span-4 w-full flex  justify-self-start items-center ">
                          <MdCancel
                            onClick={() => handleDeleteRow(index)}
                            className="main_bill_icon text-red-700 mx-1  cursor-pointer"
                          />
                          <p
                            className="ml-2 w-9/12 itemName"
                            onClick={(e) => handleClick(e, index)}
                          >
                            {item.itemName}
                          </p>
                        </div>
                        <div className="col-span-3 justify-self-start commentsDefault">
                          {item.comment}
                        </div>
                        <div className="col-span-2 justify-self-start">
                          <div className="flex h-full align-star main_div">
                            <div className="plus_button">
                              <div
                                onClick={() =>
                                  handleDecreaseQuantity(index, item.qty)
                                }
                                className="border quantity_button cursor-pointer flex justify-center p-0 rounded-md border-black"
                              >
                                <RemoveIcon />
                              </div>
                            </div>
                            <input
                              type="text"
                              value={item.qty}
                              className="w-14 border border-black rounded-md text-center"
                              onChange={(e) =>
                                handleOnChangePrice(index, e.target.value)
                              }
                            />
                            <div className="plus_button">
                              <div
                                onClick={() =>
                                  handleIncreaseQuantity(index, item.qty)
                                }
                                className="border quantity_button  cursor-pointer flex justify-center text-md  items-center p-0 rounded-md border-black"
                              >
                                <AddOutlinedIcon />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-1 justify-self-center">
                          <p className="pl-2">{item.unit}</p>
                        </div>
                        <div className="col-span-1 justify-self-end">
                          <p className="pl-2">{item.itemPrice.toFixed(0)}</p>
                        </div>
                        <div className="col-span-1 justify-self-end">
                          <p className="pl-2">{item.price.toFixed(0)}</p>
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
                        discountValue: 0,
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
                      error={billData.discountValue <= 0}
                      onChange={(e) => {
                        if (
                          regex.test(e.target.value) ||
                          e.target.value === ""
                        ) {
                          setBillData((perv) => ({
                            ...perv,
                            discountValue: e.target.value,
                            settledAmount: Math.ceil(
                              billData.discountType == "fixed"
                                ? billData.subTotal - e.target.value
                                : billData.subTotal * (1 - e.target.value / 100)
                            ),
                          }));
                        }
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
                  className="discountPadding flex gap-3 w-4/12"
                  style={{ textAlign: "end" }}
                >
                  <div className="text-white text-xl mt-1 w-full">
                    {"Total Discount : " +
                      (billData.discountType == "none"
                        ? 0
                        : (billData.subTotal - billData.settledAmount).toFixed(
                            2
                          ))}
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
                    onChange={(e) => {
                      if (regex.test(e.target.value) || e.target.value === "") {
                        setBillData((perv) => ({
                          ...perv,
                          settledAmount: e.target.value,
                          discountType:
                            billData.subTotal - e.target.value == 0
                              ? "none"
                              : "fixed",
                          discountValue: billData.subTotal - e.target.value,
                        }));
                      }
                    }}
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
                    className="text-base button px-2 py-1 rounded-md text-white"
                    onClick={() =>
                      buttonCLicked == "tab2"
                        ? isEdit
                          ? justEditBillDelivery()
                          : justSaveBillDelivery()
                        : isEdit
                        ? justEditBill()
                        : justSaveBill()
                    }
                  >
                    Save
                  </button>
                </div>
                <div>
                  <button
                    className="text-base button save_button py-1 rounded-md text-white"
                    onClick={() => {
                      buttonCLicked == "tab2"
                        ? isEdit
                          ? editBillDelivery()
                          : saveBillDelivery()
                        : isEdit
                        ? editBill()
                        : saveBill();
                    }}
                  >
                    Save & Print
                  </button>
                </div>
                {isEdit ? (
                  <>
                    <div>
                      <button
                        className="another_1 button text-base px-2 py-1 rounded-md text-white"
                        onClick={() =>
                          buttonCLicked == "tab2"
                            ? editBillPrintDelivery()
                            : editBillPrint()
                        }
                      >
                        Save & Bill
                      </button>
                    </div>
                    <div>
                      <button
                        className="another_1 button text-base px-2 py-1 rounded-md text-white"
                        onClick={() =>
                          buttonCLicked == "tab2"
                            ? editKotPrintDelivery()
                            : editKotPrint()
                        }
                      >
                        Save & KOT
                      </button>
                    </div>
                    <div>
                      <button
                        className="another_2 button text-base px-2 py-1 rounded-md text-white"
                        onClick={() =>
                          buttonCLicked == "tab2"
                            ? cancleBillDelivery()
                            : cancleBill()
                        }
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <div>
                    <button
                      className="another_2 button text-base px-2 py-1 rounded-md text-white"
                      onClick={() =>
                        buttonCLicked == "tab2"
                          ? holdBillDelivery()
                          : holdBill()
                      }
                    >
                      HOLD
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="commentPopUp">
          <div className="commentHeader">Item Comment</div>
          <div className="mt-2">
            <Autocomplete
              multiple
              id="tags-outli"
              options={commentList ? commentList : []}
              // getOptionLabel={commentList ? commentList : []}
              defaultValue={[]}
              freeSolo
              value={itemComment.itemComment ? itemComment.itemComment : []}
              onChange={(e, value) => {
                setItemComment((perv) => ({
                  ...perv,
                  itemComment: value ? value : [],
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} placeholder="Item Comments" />
              )}
            />
          </div>
          <div className="w-full text-base flex justify-end gap-4 p-1 mt-1 ">
            <div>
              <button
                className="text-base button px-2 py-1 rounded-md text-white"
                onClick={() => saveItemComment()}
              >
                Save
              </button>
            </div>
            <div>
              <button
                className="another_2 button text-base px-2 py-1 rounded-md text-white"
                onClick={() => handleClose()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
      </Popover>
    </div>
  );
};

export default PickUp;
