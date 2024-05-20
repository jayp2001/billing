import React, { useEffect, useState } from "react";
import "./css/PrinterSelectingPage.css";
import Header from "../components/Header/Header";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const { ipcRenderer } = window.require("electron");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PrintSelectingPage = () => {
  const [categoryList, setCategoryList] = useState([
    {
      categoryId: "pickupkot",
      categoryName: "PickUp KOT",
      printerName: "",
      footer: "Thanks",
    },
    {
      categoryId: "pickupbill",
      categoryName: "PickUp BILL",
      printerName: "",
      footer: "Thanks",
    },
  ]);
  const [assignPrinterPopUp, setAssignPrinterPopUp] = useState(false);
  const [selectPrinter, setSelectPrinter] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const printers = JSON.parse(localStorage.getItem("printers"));
  const handleAssigningPopup = (index, data) => {
    setSelectPrinter({
      ...data,
      index: index,
    });
    setAssignPrinterPopUp(true);
  };

  const handleSetPrinter = () => {
    const updatedData = categoryList?.map((data, index) => {
      return selectPrinter?.index == index
        ? {
            ...data,
            printerName: selectPrinter.printerName,
            footer: selectPrinter.footer,
          }
        : data;
    });
    localStorage.setItem("printerPreference", JSON.stringify(updatedData));
    setCategoryList(updatedData);
    handleClose();
  };
  // useEffect(() => {
  //   const fetchPrinters = async () => {
  //     try {
  //       const devices = await navigator.mediaDevices.enumerateDevices();
  //       const printerNames = devices
  //         .filter((device) => device.kind === "printer")
  //         .map((printer) => printer.label);
  //       // setPrinters(printerNames);
  //     } catch (error) {
  //       console.error("Error fetching printers:", error);
  //     }
  //   };

  //   fetchPrinters();
  // }, []);

  const handleClose = () => {
    setSelectPrinter();
    setAssignPrinterPopUp(false);
  };

  return (
    <div>
      <Header />
      <div className="tableContainerWrapper">
        <Table sx={{ "& tr > *:not(:first-child)": { textAlign: "right" } }}>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Printer Name</TableCell>
              <TableCell>Footer</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryList?.map((data, index) => (
              <TableRow>
                <TableCell component="th" scope="row" className="table_row">
                  {index}
                </TableCell>
                <TableCell component="th" scope="row" className="table_row">
                  {data.categoryName}
                </TableCell>
                <TableCell component="th" scope="row" className="table_row">
                  {data.printerName}
                </TableCell>
                <TableCell component="th" scope="row" className="table_row">
                  {data.footer}
                </TableCell>
                <TableCell component="th" scope="row" className="table_row">
                  <div className="flex w-100">
                    {/* <div className="rounded-lg bg-gray-100 p-2 ml-4 cursor-pointer table_Actions_icon2 hover:bg-green-600">
                      <CheckCircleOutline className="text-gray-600 table_icon2" />
                    </div> */}
                    <div
                      onClick={() => {
                        handleAssigningPopup(index, data);
                      }}
                      className="rounded-lg bg-gray-100 ml-4 cursor-pointer table_Actions_icon2 hover:bg-blue-600"
                    >
                      <Tooltip title="Assign Printer">
                        <IconButton>
                          <BorderColorIcon className="text-gray-600 table_icon2" />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <div className="rounded-lg bg-gray-100 p-2 ml-4 cursor-pointer table_Actions_icon2 hover:bg-red-600">
                      <DeleteOutlineOutlinedIcon className="text-gray-600 table_icon2" />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
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
            <div
              style={{
                fontSize: "18px",
                marginBottom: "20px",
              }}
            >
              Select Printer for{" "}
              {selectPrinter && selectPrinter.categoryName
                ? selectPrinter.categoryName
                : ""}
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Printers
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={
                      selectPrinter && selectPrinter.printerName
                        ? selectPrinter.printerName
                        : ""
                    }
                    label="Printers"
                    onChange={(e) => {
                      setSelectPrinter((perv) => ({
                        ...perv,
                        printerName: e.target.value,
                      }));
                    }}
                  >
                    {printers?.map((data) => (
                      <MenuItem key={data} value={data}>
                        {data}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-span-4 textFields">
                <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Footer
                  </InputLabel>
                  <OutlinedInput
                    name="footer"
                    autoComplete="off"
                    label="Footer"
                    value={
                      selectPrinter && selectPrinter.footer
                        ? selectPrinter.footer
                        : ""
                    }
                    onChange={(e) =>
                      setSelectPrinter((perv) => ({
                        ...perv,
                        footer: e.target.value,
                      }))
                    }
                    // InputProps={{ style: { fontSize: 18 } }}
                    // InputLabelProps={{ style: { fontSize: 18 } }}
                    fullWidth
                    id="outlined-adornment-password"
                    type={"text"}
                  />
                </FormControl>
              </div>
              <div className="col-span-2">
                <button
                  className="addCategorySaveBtn"
                  onClick={() => handleSetPrinter()}
                >
                  Set
                </button>
              </div>
              <div className="col-span-2">
                <button
                  className="addCategoryCancleBtn"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Cancle
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PrintSelectingPage;
