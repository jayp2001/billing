/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./pages/app/store";
import PickUp from "./pages/PickUp";
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
// import TestPage from "./testPage";
// import Test from './pages/Test';
// import Test from './pages/Test';

const App = () => {
  useEffect(() => {
    if (store.getState().toggle.isSwitchOn) {
      localStorage.setItem("isSwitchOn", "true");
    } else {
      localStorage.setItem("isSwitchOn", "false");
    }
  }, []);

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/main/:tab" element={<MainComponent />} />
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
