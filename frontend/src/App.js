/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./pages/app/store";
import PickUp from "./pages/PickUp";
import { renderToString } from "react-dom/server";
import PickUp1 from "./pages/PickUp1";
import { useDispatch, useSelector } from "react-redux";
import { toggleSwitch } from "./pages/app/toggleSlice";
import HotelBill from "./pages/HotelBill";
import RestaurantBill from "./pages/RestaurantBill";
import KOT from "./pages/KOT";
import TokenBill from "./pages/TokenBill";
// import Test from './pages/Test';
import PrintSlectingPage from "./pages/PrintSelectingPage";
import LoginPage from "./pages/login/login";
import TableView from "./pages/tableview/tableView";
import Dashboard from "./pages/tempDashboard/dashboard";
import LiveView from "./pages/LiveView/LiveView"
import { SOCKET_URL } from "./url";
import io from "socket.io-client";
const { ipcRenderer } = window.require("electron");
// import TestPage from "./testPage";
// import Test from './pages/Test';
// import Test from './pages/Test';

const App = () => {
  const systemPrinter = JSON.parse(localStorage.getItem("printerPreference"));
  const macAddress = localStorage.getItem("macAddress");
  const pickupkot = systemPrinter?.filter(
    (printer) => printer.categoryId == "pickupKot"
  );
  const pickupbill = systemPrinter?.filter(
    (printer) => printer.categoryId == "pickupBill"
  );
  const deliverykot = systemPrinter?.filter(
    (printer) => printer.categoryId == "deliveryKot"
  );
  const deliverybill = systemPrinter?.filter(
    (printer) => printer.categoryId == "deliveryBill"
  );
  const hotelbill = systemPrinter?.filter(
    (printer) => printer.categoryId == "hotelBill"
  );
  const hotelkot = systemPrinter?.filter(
    (printer) => printer.categoryId == "hotelKot"
  );
  const getPrinter = (data) => {
    switch (data.billType) {
      case 'Pick Up':
        return pickupbill[0];
      case 'Delivery':
        return deliverybill[0];
      case 'Hotel':
        return hotelbill[0];
      // case 'Dine In':
      //   return hotelbill;
      default:
        return pickupbill[0];
      // return <CurrencyExchangeIcon fontSize='large' />;
    }
  }
  const getPrintData = (data) => {
    switch (data.billType) {
      case 'Pick Up':
        return renderToString(<RestaurantBill data={data} />);
      case 'Delivery':
        return renderToString(<RestaurantBill data={data} />);
      case 'Hotel':
        return renderToString(<HotelBill data={data} />);
      default:
        return renderToString(<RestaurantBill data={data} />);
      // return <CurrencyExchangeIcon fontSize='large' />;
    }
  }
  useEffect(() => {
    if (store.getState().toggle.isSwitchOn) {
      localStorage.setItem("isSwitchOn", "true");
    } else {
      localStorage.setItem("isSwitchOn", "false");
    }
  }, []);

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socket.on("connect", () => {
      console.log("Connected to server>>>>><<<<", macAddress);
    });
    socket.on(`print_Bill_${macAddress}`, (message) => {
      // setHoldCount(message);
      console.log('Socket test', message);
      // alert('hello')
      const printerBill = {
        printer: getPrinter(message),
        data: getPrintData(message),
      };
      ipcRenderer.send("set-title", printerBill);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/main/:tab/:billId" element={<MainComponent />} />
        {/* <Route path="/" element={<TestPage />} /> */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/" element={<RestaurantBill />} />
        {/* <Route path="/" element={<Test />} /> */}
        <Route path="/printSlectingPage" element={<PrintSlectingPage />} />
        <Route path="/LiveView" element={<LiveView />} />
        <Route path="/tableView" element={<TableView />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/" element={<Test />} /> */}
      </Routes>
    </Provider>
  );
};

const MainComponent = () => {
  const dispatch = useDispatch();
  const isSwitchOn = useSelector((state) => state.toggle.isSwitchOn);

  useEffect(() => {
    const storedSwitchState = localStorage.getItem("isSwitchOn") === "true";
    if (isSwitchOn !== storedSwitchState) {
      dispatch(toggleSwitch());
    }
  }, [dispatch, isSwitchOn]);

  return isSwitchOn ? <PickUp1 /> : <PickUp />;
};

export default App;
