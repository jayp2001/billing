import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "../Button/Button1";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import "./css/Header.css";
import { Switch, Tab } from "@mui/material";
import WatchLaterTwoToneIcon from "@mui/icons-material/WatchLaterTwoTone";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import GridViewIcon from "@mui/icons-material/GridView";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useDispatch, useSelector } from "react-redux";
import { toggleSwitch } from "../../pages/app/toggleSlice";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import { Navigate, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = (props) => {
  const dispatch = useDispatch();
  const isSwitchOn = useSelector((state) => state.toggle.isSwitchOn);
  const naviagate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const handleToggle = () => {
    dispatch(toggleSwitch());
  };
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const getBbill = async (id) => {
    await axios
      .get(
        `${BACKEND_BASE_URL}billingrouter/getBillDataById?billId=${id}`,
        config
      )
      .then((res) => {
        props.setItems(res.data.itemData);
        props.setBillData(
          {
            subTotal: res.data.totalAmount,
            discountType: res.data.discountType,
            discountValue: res.data.discountValue,
            settledAmount: res.data.settledAmount,
            totalDiscount: res.data.totalDiscount,
            billPayType: res.data.billPayType,
            billComment: res.data.billComment,
            billCommentAuto: res.data.billComment ? res.data.billComment.split(', ') : [],
          }
        );
        props.setCustomerData(res.data.customerDetails)
        props.setEditBillData(res.data)
        props.setIsEdit(true);
        props.setButtonCLicked(activeTab == 'Delivery' ? 'tab2' : 'tab3');
      })
      .catch((error) => {
        setError(error.response ? error.response.data : "Network Error ...!!!");
      });
  }
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
  const getRecentToken = async (tab) => {
    await axios
      .get(
        `${BACKEND_BASE_URL}billingrouter/getRecentBillData?billType=${tab}`,
        config
      )
      .then((res) => {
        setRecentBill(res.data);
      })
      .catch((error) => {
        // setError(error.response ? error.response.data : "Network Error ...!!!");
      });
  };
  const getHoldBills = async () => {
    await axios
      .get(
        `${BACKEND_BASE_URL}billingrouter/getHoldBillData`,
        config
      )
      .then((res) => {
        setHoldBills(res.data);
      })
      .catch((error) => {
        // setError(error.response ? error.response.data : "Network Error ...!!!");
      });
  };

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
  const [state, setState] = useState({
    right: false,
  });
  const [openHold, setOpenHold] = useState(false);
  const [activeTab, setActiveTab] = useState('Pick Up');
  const [recentBill, setRecentBill] = useState([]);
  const [holdBills, setHoldBills] = useState([]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    getRecentToken('Pick Up');
    setActiveTab('Pick Up')
    setState({ ...state, [anchor]: open });
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
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 400 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="p-2 my-1  text-base">Recent</div>
      <hr className="mb-2"></hr>
      <div className="flex p-2 my-1">
        <div
          // onClick={
          //   (event) => {
          //   event.stopPropagation();
          //   setActiveTab("Dine In");
          //   getRecentToken("Dine In");
          // }}
          className={`tabButton py-2 w-full text-center cursor-pointer ${activeTab === "Dine In" ? "active" : ""
            }`}
        >
          Dine In
        </div>
        <div
          onClick={(event) => {
            event.stopPropagation();
            setActiveTab("Pick Up");
            getRecentToken("Pick Up");
          }}
          className={`tabButton py-2 w-full text-center cursor-pointer ${activeTab === "Pick Up" ? "active" : ""
            }`}
        >
          Pick Up
        </div>
        <div
          onClick={(event) => {
            event.stopPropagation();
            setActiveTab("Delivery");
            getRecentToken("Delivery");
          }}
          className={`tabButton py-2 w-full text-center cursor-pointer ${activeTab === "Delivery" ? "active" : ""
            }`}
        >
          Delivery
        </div>
        {/* <div
          onClick={(event) => {
            event.stopPropagation();
            setActiveTab("KOT");
            getRecentToken("KOT");
          }}
          className={`tabButton py-2 w-full text-center cursor-pointer ${
            activeTab === "KOT" ? "active" : ""
          }`}
        >
          KOT
        </div> */}
      </div>
      <div className="flex pl-6 pr-6 mt-1 justify-between recentBillHeader">
        <div>Token No</div>
        <div>Rs.</div>
      </div>
      <div className="recentBillContainer ">
        {recentBill?.map((data, index) => (
          <div className="recentBillRow pb-2 pt-2 flex justify-between" key={index} onClick={() => {
            getBbill(data.billId);
          }}>
            <div className="pl-6">{data.tokenNo}</div>
            <div className="pr-4">{data.totalAmount}</div>
          </div>
        ))}
      </div>
    </Box>
  );
  const listHold = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 400 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="p-2 my-1  text-base">Hold Bills</div>
      <hr className="mb-2"></hr>
      {/* <div className="flex p-2 my-1">
        <div
          // onClick={
          //   (event) => {
          //   event.stopPropagation();
          //   setActiveTab("Dine In");
          //   getRecentToken("Dine In");
          // }}
          className={`tabButton py-2 w-full text-center cursor-pointer ${activeTab === "Dine In" ? "active" : ""
            }`}
        >
          Dine In
        </div>
        <div
          onClick={(event) => {
            event.stopPropagation();
            setActiveTab("Pick Up");
            getRecentToken("Pick Up");
          }}
          className={`tabButton py-2 w-full text-center cursor-pointer ${activeTab === "Pick Up" ? "active" : ""
            }`}
        >
          Pick Up
        </div>
        <div
          // onClick={(event) => {
          //   event.stopPropagation();
          //   setActiveTab("Delivery");
          //   getRecentToken("Delivery");
          // }}
          className={`tabButton py-2 w-full text-center cursor-pointer ${activeTab === "Delivery" ? "active" : ""
            }`}
        >
          Delivery
        </div>
        {/* <div
          onClick={(event) => {
            event.stopPropagation();
            setActiveTab("KOT");
            getRecentToken("KOT");
          }}
          className={`tabButton py-2 w-full text-center cursor-pointer ${
            activeTab === "KOT" ? "active" : ""
          }`}
        >
          KOT
        </div> */}
      {/* </div> */}
      <div className="flex pl-6 pr-6 mt-1 justify-between recentBillHeader">
        <div>Token No</div>
        <div>Type</div>
        <div>Rs.</div>
      </div>
      <div className="recentBillContainer ">
        {holdBills?.map((data, index) => (
          <div className="recentBillRow pb-2 pt-2 flex justify-between" key={index} onClick={() => {
            getBbill(data.billId);
          }}>
            <div className="pl-6">{data.tokenNo}</div>
            <div className="pl-6">{data.billType}</div>
            <div className="pr-4">{data.totalAmount}</div>
          </div>
        ))}
      </div>
    </Box>
  );
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-gray-100 px-2 h-12">
        <div className="flex justify-between h-full">
          <div className="flex h-full  ">
            <div className="header_Bars grid content-center">
              <MenuIcon />
            </div>
            <div className="header_logo ml-2 grid content-center">
              BHAGAWATI
            </div>
            <div className="header_button ml-2 grid content-center">
              <button
                className="button text-sm px-2 py-1 rounded-sm text-white"
                onClick={() => {
                  navigate("/main");
                  window.location.reload();
                }}
              >
                New Order
              </button>
            </div>
            <div className="header_search ml-2 grid content-center">
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </div>
            <div className="header_toggle ml-2 grid content-center ">
              <div>
                OFF <Switch checked={isSwitchOn} onChange={handleToggle} /> ON
              </div>
            </div>
          </div>
          <div className="flex h-full align-middle gap-6 mr-3">
            <div
              onClick={() => {
                naviagate("/printSlectingPage");
              }}
              className="header_icon cursor-pointer  grid content-center"
            >
              <LocalPrintshopOutlinedIcon />
            </div>
            <div className="header_icon cursor-pointer grid content-center">
              <WatchLaterTwoToneIcon onClick={() => {
                setOpenHold(true);
                getHoldBills();
              }} />
            </div>
            <div className="header_icon cursor-pointer grid content-center">
              <PendingActionsIcon onClick={toggleDrawer("right", true)} />
            </div>
            <div className="header_icon cursor-pointer grid content-center">
              <GridViewIcon
                onClick={() => {
                  naviagate("/LiveView");
                }}
              />
            </div>
            <div className="header_icon cursor-pointer grid content-center">
              <NotificationsIcon />
            </div>
            <div className="header_icon cursor-pointer  grid content-center">
              <PowerSettingsNewIcon />
            </div>
          </div>
        </div>
        <React.Fragment key={"right"}>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
          >
            {list("right")}
          </Drawer>
        </React.Fragment>
        <React.Fragment key={"rightHold"}>
          <Drawer
            anchor={"right"}
            open={openHold}
            onClose={() => setOpenHold(!openHold)}
          >
            {listHold("right")}
          </Drawer>
        </React.Fragment>
      </div>
    </>
  );
};

export default Header;
