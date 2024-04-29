import React, { useEffect, useState } from 'react';
import './css/PrinterSelectingPage.css';
import Header from '../components/Header/Header';
import { Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const PrintSelectingPage = () => {
    const [assignPrinterPopUp, setAssignPrinterPopUp] = useState(false);
    const [printers, setPrinters] = useState([]);

    const handleAssigningPopup = () => {
        setAssignPrinterPopUp(true);
    };

    useEffect(() => {
        const fetchPrinters = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const printerNames = devices
                    .filter(device => device.kind === 'printer')
                    .map(printer => printer.label);
                setPrinters(printerNames);
            } catch (error) {
                console.error('Error fetching printers:', error);
            }
        };

        fetchPrinters();
    }, []);

    const handleClose = () => {
        setAssignPrinterPopUp(false);
    };

    return (
        <div>
            <Header />
            <div className="tableContainerWrapper">
                <Table sx={{ '& tr > *:not(:first-child)': { textAlign: 'right' } }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Printer Name</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row" className='table_row'>
                                Pick Up
                            </TableCell>
                            <TableCell component="th" scope="row" className='table_row'>
                                EPSON TM-T82
                            </TableCell>
                            <TableCell component="th" scope="row" className='table_row'>
                                <div className="flex w-100">
                                    <div className='rounded-lg bg-gray-100 p-2 ml-4 cursor-pointer table_Actions_icon2 hover:bg-green-600'>
                                        <CheckCircleOutline className='text-gray-600 table_icon2' />
                                    </div>
                                    <div onClick={handleAssigningPopup} className='rounded-lg bg-gray-100 ml-4 cursor-pointer table_Actions_icon2 hover:bg-blue-600'>
                                        <Tooltip title="Assign Printer">
                                            <IconButton>
                                                <BorderColorIcon className='text-gray-600 table_icon2' />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    <div className='rounded-lg bg-gray-100 p-2 ml-4 cursor-pointer table_Actions_icon2 hover:bg-red-600'>
                                        <DeleteOutlineOutlinedIcon className='text-gray-600 table_icon2' />
                                    </div>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <Modal
                open={assignPrinterPopUp}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div>
                        <h2>Available Printers:</h2>
                        <ul>
                            {printers.map((printer, index) => (
                                <li key={index}>{printer}</li>
                            ))}
                        </ul>
                    </div>

                </Box>
            </Modal>
        </div>
    );
};

export default PrintSelectingPage;
