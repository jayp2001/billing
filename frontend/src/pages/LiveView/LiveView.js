import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Cards from "./Cards";
import axios from "axios";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { BACKEND_BASE_URL } from "../../url";
import "./css/LiveView.css";

const LiveView = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_BASE_URL}billingrouter/getLiveViewByCategoryId`,
        config
      );
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
      setFilteredData([]);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearchChange = (event) => {
    const uppercaseTerm = event.target.value.toUpperCase();
    setSearchTerm(uppercaseTerm);
    filterData(uppercaseTerm);
  };

  const filterData = (term) => {
    if (term.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.tokenNo && item.tokenNo.toString().includes(term)
      );
      console.log(data)
      setFilteredData(filtered);
    }
  };

  return (
    <div className="CustomLiveViewHeight">
      <Header className="" />
      <div className="iconHeader">
        <div className="m-2 flex items-center justify-between bg-gray-200 p-2 rounded-md">
          <div className="bg-white px-2 pt-2 w-fit">
            <div className="tab">
              <div className="text-center w-fit px-4 border-b-4 border-red-600 rounded-sm">
                <div>
                  <RestaurantMenuIcon />
                </div>
                <p>Dine In</p>
              </div>
            </div>
          </div>
          <div>
            <div className="searchBar">
              <div className="header_search flex ml-2 gap-2 items-center">
                <input
                  type="search"
                  placeholder="Search…"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="popoverSearch"
                />
                {/* <div className="button rounded-md cursor-pointer">
                  <p className="text-white">Search</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 w-full items-center px-6 py-6 gap-6 h-full">
        {filteredData.map((item, index) => (
          <div key={index} className="col-span-4 w-full h-full">
            <Cards data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveView;
