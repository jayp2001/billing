import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../url";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TableView = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [rows, setRows] = useState([]);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const getAllData = async () => {
    await axios
      .get(`${BACKEND_BASE_URL}billingrouter/getBillingStaticsData`, config)
      .then((res) => {
        setRows(res.data);
        console.log(">>>>rsdata", res.data);
      });
  };
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  // const rows = [
  //   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  //   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  //   createData("Eclair", 262, 16.0, 24, 6.0),
  //   createData("Cupcake", 305, 3.7, 67, 4.3),
  //   createData("Gingerbread", 356, 16.0, 49, 3.9),
  // ];
  useEffect(() => {
    getAllData();
  }, []);
  const data = {
    delivery: {
      cancleAmt: 0,
      cashAmt: 370,
      complimentaryAmt: 0,
      discountAmt: 0,
      dueAmt: 0,
      onlineAmt: 0,
    },
    dineIn: {
      cancleAmt: 0,
      cashAmt: 0,
      complimentaryAmt: 0,
      discountAmt: 0,
      dueAmt: 0,
      onlineAmt: 0,
    },
    hotel: {
      cancleAmt: 0,
      discountAmt: 0,
      hotelCash: 0,
      hotelDebit: 0,
    },
    pickUp: {
      cancleAmt: 0,
      cashAmt: 271112,
      complimentaryAmt: 0,
      discountAmt: 66.25,
      dueAmt: 0,
      onlineAmt: 0,
    },
  };

  return (
    <div className="bg-gray-200 overflow-hidden h-full">
      <Header />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Categories</TableCell>
              <TableCell align="right">Cash Amt</TableCell>
              <TableCell align="right">Due Amt</TableCell>
              <TableCell align="right">Online Amt</TableCell>
              <TableCell align="right">Complementy Amt</TableCell>
              <TableCell align="right">Discount Amt</TableCell>
              <TableCell align="right">Cancel Amt</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows?.map((row) => ( */}
            <TableRow
              key={"1"}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {"Pick Up"}
              </TableCell>
              <TableCell align="right">
                {rows["pickUp"] ? rows["pickUp"].cashAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0}
              </TableCell>
              <TableCell align="right">
                {rows["pickUp"] ? rows["pickUp"].dueAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0}
              </TableCell>
              <TableCell align="right">
                {rows["pickUp"] ? rows["pickUp"].onlineAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0}
              </TableCell>
              <TableCell align="right">
                {rows["pickUp"] ? rows["pickUp"].complimentaryAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0}
              </TableCell>
              <TableCell align="right">
                {rows["pickUp"] ? rows["pickUp"].discountAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0}
              </TableCell>
              <TableCell align="right">
                {rows["pickUp"] ? rows["pickUp"].cancleAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0}
              </TableCell>
              <TableCell align="right">
                {rows["pickUp"]
                  ? (rows["pickUp"].cashAmt +
                    rows["pickUp"].onlineAmt +
                    rows["pickUp"].dueAmt).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : 0}
              </TableCell>
            </TableRow>
            <TableRow
              key={"2"}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {"Delivery"}
              </TableCell>
              <TableCell align="right">
                {rows["delivery"] ? rows["delivery"].cashAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0}
              </TableCell>
              <TableCell align="right">
                {rows["delivery"] ? rows["delivery"].dueAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0}
              </TableCell>
              <TableCell align="right">
                {rows["delivery"] ? rows["delivery"].onlineAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0}
              </TableCell>
              <TableCell align="right">
                {rows["delivery"] ? rows["delivery"].complimentaryAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0}
              </TableCell>
              <TableCell align="right">
                {rows["delivery"] ? rows["delivery"].discountAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0}
              </TableCell>
              <TableCell align="right">
                {rows["delivery"] ? rows["delivery"].cancleAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0}
              </TableCell>
              <TableCell align="right">
                {rows["delivery"]
                  ? (rows["delivery"].cashAmt +
                    rows["delivery"].onlineAmt +
                    rows["delivery"].dueAmt).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : 0}
              </TableCell>
            </TableRow>
            <TableRow
              key={"2"}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {"Hotel"}
              </TableCell>
              <TableCell align="right">
                {rows["hotel"] ? rows["hotel"].cashAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : 0}
              </TableCell>
              <TableCell align="right">
                {rows["hotel"] ? rows["hotel"].dueAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0}
              </TableCell>
              <TableCell align="right">
                0.00
              </TableCell>
              <TableCell align="right">
                0.00
              </TableCell>
              <TableCell align="right">
                {rows["hotel"] ? rows["hotel"].discountAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0}
              </TableCell>
              <TableCell align="right">
                {rows["hotel"] ? rows["hotel"].cancleAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0}
              </TableCell>
              <TableCell align="right">
                {rows["hotel"]
                  ? (rows["hotel"].cashAmt +
                    rows["hotel"].dueAmt).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : 0}
              </TableCell>
            </TableRow>
            <TableRow
              key={"2"}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {"Dine In"}
              </TableCell>
              <TableCell align="right">
                {rows["dineIn"] ? rows["dineIn"].cashAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0}
              </TableCell>
              <TableCell align="right">
                {rows["dineIn"] ? rows["dineIn"].dueAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0}
              </TableCell>
              <TableCell align="right">
                {rows["dineIn"] ? rows["dineIn"].onlineAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0}
              </TableCell>
              <TableCell align="right">
                {rows["dineIn"] ? rows["dineIn"].complimentaryAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0}
              </TableCell>
              <TableCell align="right">
                {rows["dineIn"] ? rows["dineIn"].discountAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0}
              </TableCell>
              <TableCell align="right">
                {rows["dineIn"] ? rows["dineIn"].cancleAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0}
              </TableCell>
              <TableCell align="right">
                {rows["dineIn"]
                  ? (rows["dineIn"].cashAmt +
                    rows["dineIn"].onlineAmt +
                    rows["dineIn"].dueAmt).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : 0}
              </TableCell>
            </TableRow>
            <TableRow
              key={"3"}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {"Total"}
              </TableCell>
              <TableCell align="right">
                {rows["pickUp"]
                  ? (rows["pickUp"].cashAmt + rows["delivery"].cashAmt + rows["hotel"].cashAmt + rows["dineIn"].cashAmt).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : 0}
              </TableCell>
              <TableCell align="right">
                {rows["pickUp"]
                  ? (rows["pickUp"].dueAmt + rows["delivery"].dueAmt + rows["hotel"].dueAmt + rows["dineIn"].dueAmt).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : 0}
              </TableCell>
              <TableCell align="right">
                {rows["pickUp"]
                  ? (rows["pickUp"].onlineAmt + rows["delivery"].onlineAmt + rows["dineIn"].onlineAmt).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : 0}
              </TableCell>
              <TableCell align="right">
                {rows["pickUp"]
                  ? (rows["pickUp"].complimentaryAmt +
                    rows["delivery"].complimentaryAmt + rows["dineIn"].complimentaryAmt).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : 0}
              </TableCell>
              <TableCell align="right">
                {rows["pickUp"]
                  ? (rows["pickUp"].discountAmt + rows["delivery"].discountAmt + rows["hotel"].discountAmt + rows["dineIn"].discountAmt).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : 0}
              </TableCell>
              <TableCell align="right">
                {rows["pickUp"]
                  ? (rows["pickUp"].cancleAmt + rows["delivery"].cancleAmt + rows["hotel"].cancleAmt + rows["dineIn"].cancleAmt).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : 0}
              </TableCell>
              <TableCell align="right">
                {rows["pickUp"]
                  ? (rows["pickUp"].cashAmt +
                    rows["pickUp"].onlineAmt +
                    rows["pickUp"].dueAmt +
                    rows["delivery"].cashAmt +
                    rows["delivery"].onlineAmt +
                    rows["delivery"].dueAmt +
                    rows["dineIn"].cashAmt +
                    rows["dineIn"].onlineAmt +
                    rows["dineIn"].dueAmt +
                    rows["hotel"].cashAmt +
                    rows["hotel"].dueAmt).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : 0}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableView;
