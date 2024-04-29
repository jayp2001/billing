import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import Button from '../Button/Button1';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import './css/Header.css'
import { Switch } from '@mui/material';
import WatchLaterTwoToneIcon from '@mui/icons-material/WatchLaterTwoTone';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import GridViewIcon from '@mui/icons-material/GridView';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSwitch } from '../../pages/app/toggleSlice';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import { Navigate, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';


const Header = () => {
  const dispatch = useDispatch();
  const isSwitchOn = useSelector((state) => state.toggle.isSwitchOn);
  const naviagate = useNavigate();

  const handleToggle = () => {
    dispatch(toggleSwitch());
  };
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  const [state, setState] = useState({
    right: false,
  });
  const [activeTab, setActiveTab] = useState('Dine In');


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="p-2 my-1  text-base">Recent</div>
      <hr className="mb-2"></hr>
      <div className="flex p-2 my-1">
        <div onClick={(event) => { event.stopPropagation(); setActiveTab('Dine In') }} className={`tabButton py-2 w-full text-center cursor-pointer ${activeTab === 'Dine In' ? 'active' : ''}`}>Dine In</div>
        <div onClick={(event) => { event.stopPropagation(); setActiveTab('Pick Up') }} className={`tabButton py-2 w-full text-center cursor-pointer ${activeTab === 'Pick Up' ? 'active' : ''}`}>Pick Up</div>
        <div onClick={(event) => { event.stopPropagation(); setActiveTab('Delivery') }} className={`tabButton py-2 w-full text-center cursor-pointer ${activeTab === 'Delivery' ? 'active' : ''}`}>Delivery</div>
        <div onClick={(event) => { event.stopPropagation(); setActiveTab('KOT') }} className={`tabButton py-2 w-full text-center cursor-pointer ${activeTab === 'KOT' ? 'active' : ''}`}>KOT</div>
      </div>
    </Box>
  );
  return (
    <>
      <div className="bg-gray-100 px-2 h-12">
        <div className="flex justify-between h-full">
          <div className='flex h-full  '>
            <div className="header_Bars grid content-center">
              <MenuIcon />
            </div>
            <div className="header_logo ml-2 grid content-center">
              BHAGAWATI
            </div>
            <div className="header_button ml-2 grid content-center">
              <Button>New Order</Button>
            </div>
            <div className="header_search ml-2 grid content-center">
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </div>
            <div className="header_toggle ml-2 grid content-center ">
              <div>
                OFF <Switch checked={isSwitchOn} onChange={handleToggle} /> ON
              </div>
            </div>
          </div>
          <div className='flex h-full align-middle gap-6 mr-3'>
            <div onClick={() => { naviagate('/printSlectingPage') }} className="header_icon cursor-pointer  grid content-center">
              <LocalPrintshopOutlinedIcon />
            </div>
            <div className="header_icon cursor-pointer grid content-center">
              <WatchLaterTwoToneIcon onClick={toggleDrawer('right', true)} />
            </div>
            <div className="header_icon cursor-pointer grid content-center">
              <PendingActionsIcon />
            </div>
            <div className="header_icon cursor-pointer grid content-center">
              <GridViewIcon onClick={() => { naviagate('/LiveView') }} />
            </div>
            <div className="header_icon cursor-pointer grid content-center">
              <NotificationsIcon />
            </div>
            <div className="header_icon cursor-pointer  grid content-center">
              <PowerSettingsNewIcon />
            </div>
          </div>
        </div>
        <React.Fragment key={'right'}>
          <Drawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
          >
            {list('right')}
          </Drawer>
        </React.Fragment>
      </div>
    </>
  )
}

export default Header