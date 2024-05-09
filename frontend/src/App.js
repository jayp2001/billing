/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './pages/app/store';
import PickUp from './pages/PickUp';
import PickUp1 from './pages/PickUp1';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSwitch } from './pages/app/toggleSlice';
import HotelBill from './pages/HotelBill';
import RestaurantBill from './pages/RestaurantBill';
import KOT from './pages/KOT';
import TokenBill from './pages/TokenBill';
// import Test from './pages/Test';
import PrintSlectingPage from './pages/PrintSlectingPage';
import LiveView from './pages/LiveView';
import LoginPage from './pages/login/login';
// import Test from './pages/Test';
import Test from './pages/Test';

const App = () => {
  useEffect(() => {
    if (store.getState().toggle.isSwitchOn) {
      localStorage.setItem('isSwitchOn', 'true');
    } else {
      localStorage.setItem('isSwitchOn', 'false');
    }
  }, []);

  return (
    <Provider store={store}>
      <Routes>
        {/* <Route path="/main" element={<MainComponent />} /> */}
        {/* <Route path="/" element={<LoginPage />} /> */}
        {/* <Route path="/" element={<HotelBill />} /> */}
        {/* <Route path="/" element={<Test />} /> */}
        <Route path="/printSlectingPage" element={<PrintSlectingPage />} />
        <Route path="/LiveView" element={<LiveView />} />
        <Route path="/" element={<Test />} />
      </Routes>
    </Provider>
  );
};

const MainComponent = () => {
  const dispatch = useDispatch();
  const isSwitchOn = useSelector((state) => state.toggle.isSwitchOn);

  useEffect(() => {
    const storedSwitchState = localStorage.getItem('isSwitchOn') === 'true';
    if (isSwitchOn !== storedSwitchState) {
      dispatch(toggleSwitch());
    }
  }, [dispatch, isSwitchOn]);

  return isSwitchOn ? <PickUp1 /> : <PickUp />;
};

export default App;