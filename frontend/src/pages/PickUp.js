/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
import React, { useState, useRef } from 'react';
import { TextField, Button, Input, RadioGroup, FormControlLabel, Radio, InputLabel, NativeSelect } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import './css/pickUp.css';
import Header from '../components/Header/Header';
import { IoIosRestaurant } from "react-icons/io";
import Button1 from '../components/Button/Button1';
import { MdCancel } from "react-icons/md";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";
import { FormControl } from '@mui/material';


const PickUp = () => {
  const data = [
    {
      "shortName": "BT",
      "shortCode": 22,
      "Name": "Butter Tika - BT",
      "unitOptions": ["kg", "g", "lb", "oz"]
    },
    {
      "shortName": "CG",
      "shortCode": 33,
      "Name": "Cheese Garlic Bread",
      "unitOptions": ["kg", "g", "piece"]
    },
    {
      "shortName": "FP",
      "shortCode": 44,
      "Name": "French Pizza",
    }
  ];

  const [fullFormData, setFullFormData] = useState({
    inputCode: '',
    inputName: '',
    inputQuantity: 1,
    inputUnit: '',
    comment: ''
  });

  const [items, setItems] = useState([]);
  const [validationError, setValidationError] = useState(false);
  const [buttonCLicked, setButtonCLicked] = useState('tab1')
  const quantityInputRef = useRef(null);
  const unitInputRef = useRef(null);
  const commentInputRef = useRef(null);
  const first = useRef(null);
  const second = useRef(null)
  const handleInputCodeChange = (e) => {
    const value = e.target.value;
    
    setFullFormData(prevState => ({
      ...prevState,
      inputCode: value
    }));
    const matchingProduct = data.find(item => item.shortCode.toString() === value);

    if (e.key === 'Enter') {
      e.preventDefault();
      quantityInputRef.current && quantityInputRef.current.focus();
    }
    console.log('value' , matchingProduct)

    if(matchingProduct === value){
      setValidationError(false)
    }

    if (matchingProduct) {
      setFullFormData(prevState => ({
        ...prevState,
        inputName: matchingProduct.Name
      }));
    }
  };
  const handleInputNameChange = (e, value) => {
    const filtered = value ? data.filter(item =>
      (item.shortName && item.shortName.toLowerCase().includes(value.toLowerCase())) ||
      (item.Name && item.Name.toLowerCase().includes(value.toLowerCase()))
    ) : [];

    setFullFormData(prevState => ({
      ...prevState,
      inputName: value
    }));

    if (filtered.length === 1) {
      setFullFormData(prevState => ({
        ...prevState,
        inputCode: filtered[0].shortCode.toString()
      }));
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    setFullFormData(prevState => ({
      ...prevState,
      inputQuantity: value
    }));

    if (e.key === 'Enter') {
      e.preventDefault();
      if (unitOptionsExist(fullFormData.inputName)) {
        unitInputRef.current && unitInputRef.current.focus();
      } else {
        commentInputRef.current && commentInputRef.current.focus();
      }
    }
  };
  const handleUnitChange = (e) => {
    const value = e.target.value;
    const options = unitOptionsExist(fullFormData.inputName) ? data.find(item => item.Name === fullFormData.inputName).unitOptions : [];

    if (!isNaN(value)) {
      const index = parseInt(value) - 1;
      if (index >= 0 && index < options.length) {
        setFullFormData(prevState => ({
          ...prevState,
          inputUnit: options[index]
        }));
      }
    } else {
      const optionIndex = options.findIndex(option => option.toLowerCase() === value.toLowerCase());
      if (optionIndex !== -1) {
        setFullFormData(prevState => ({
          ...prevState,
          inputUnit: options[optionIndex]
        }));
      } else {
        setFullFormData(prevState => ({
          ...prevState,
          inputUnit: ''
        }));
      }
    }
  };

  const handleAutofill = (name, code) => {
    setFullFormData(prevState => ({
      ...prevState,
      inputCode: code.toString(),
      inputName: name
    }));

    commentInputRef.current && commentInputRef.current.focus();
  };

  const handleEnterPressFirst = (e) => {
    const value = e.target.value;
    if (e.key === 'Enter') {
      e.preventDefault();
      const matchingProduct = data.find(item => item.shortCode.toString() === value);
      if (!matchingProduct || value === '') {
        setValidationError(true)
        second.current && second.current.focus();
      } else if (value === matchingProduct.shortCode.toString()) {
        if (e.key === 'Enter') {
          e.preventDefault();
          quantityInputRef.current && quantityInputRef.current.focus();
        }
      }
    }
  };
  const handleEnterPressName = (e) => {
    const value = e.target.value;
    if (e.key === 'Enter') {
      if (!e.target.value === '') {
        e.preventDefault();
        quantityInputRef.current && quantityInputRef.current.focus();
      }
    }
  }

  const handleEnterPressThird = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      commentInputRef.current && commentInputRef.current.focus();
    }
  };

  const handleEnterPressSecond = (e) => {
    if (e.key === 'Enter') {
      // unitInputRef.current && unitInputRef.current.focus();
      e.preventDefault();
      if (unitOptionsExist(fullFormData.inputName)) {
        unitInputRef.current && unitInputRef.current.focus();
      } else {
        commentInputRef.current && commentInputRef.current.focus();
      }
    }
  };

  const handleAddItem = (e) => {
    if (e.key === 'Enter') {
      if (fullFormData.inputName !== '') {

        const newItem = {
          inputCode: fullFormData.inputCode,
          inputName: fullFormData.inputName,
          inputQuantity: fullFormData.inputQuantity,
          comment: fullFormData.comment
        };

        setItems(prevItems => [...prevItems, newItem]);

        setFullFormData({
          inputCode: '',
          inputName: '',
          inputQuantity: 1,
          inputUnit: '',
          comment: ''
        });

        if (unitOptionsExist(fullFormData.inputName)) {
          unitInputRef.current && unitInputRef.current.focus();
        } else {
          commentInputRef.current && commentInputRef.current.focus();
        }

        first.current && first.current.focus();
        e.target.value = ''
      }
      else {

      }
    }
  };
  const handleReset = (e) => {
    setFullFormData({
      inputCode: '',
      inputName: '',
      inputQuantity: 1,
      inputUnit: '',
      comment: ''
    });

    if (unitOptionsExist(fullFormData.inputName)) {
      unitInputRef.current && unitInputRef.current.focus();
    } else {
      commentInputRef.current && commentInputRef.current.focus();
    }

    first.current && first.current.focus();
    e.target.value = ''
  }

  const unitOptionsExist = (Name) => {
    const product = data.find(item => item.Name === Name);
    return product && product.unitOptions && product.unitOptions.length > 0;
  }
  const handleDeleteRow = (index) => {
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };
  const handleIncreaseQuantity = (index) => {
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[index].inputQuantity += 1;
      return updatedItems;
    });
  };
  const [text, setText] = useState("");

  const handleDecreaseQuantity = (index) => {
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      if (updatedItems[index].inputQuantity > 1) {
        updatedItems[index].inputQuantity -= 1;
      }
      return updatedItems;
    });
  };
  return (
    <div className=''>
      <Header />
      <section className='right_section '>
        <div className="right_top_header gap-6 p-2 flex">
          <div className='w-32'>
            <TextField
              placeholder='Short Code'
              value={fullFormData.inputCode}
              onChange={handleInputCodeChange}
              onKeyDown={handleEnterPressFirst}
              variant="outlined"
              inputRef={first}
              error={validationError ? true : false}
              helperText={validationError ? 'Incorrect Code' : ''}
            />
          </div>
          <div className="w-80">
            <Autocomplete
              options={data.map((option) => option.Name)}
              value={fullFormData.inputName}
              onChange={handleInputNameChange}
              inputRef={second}
              onKeyDown={handleEnterPressName}
              renderInput={(params) => <TextField {...params} inputRef={second} placeholder="Auto fill the name only" variant="outlined" />}
            />
          </div>
          <div className="w-28">
            <TextField
              placeholder="Quantity"
              value={fullFormData.inputQuantity}
              onChange={handleQuantityChange}
              onKeyDown={handleEnterPressSecond}
              inputRef={quantityInputRef}
              variant="outlined"
            />
          </div>
          <div className="w-28">
            <Autocomplete
              options={unitOptionsExist(fullFormData.inputName) ? data.find(item => item.Name === fullFormData.inputName).unitOptions : []}
              value={fullFormData.inputUnit}
              inputRef={unitInputRef}
              onFocus={() => {
                if (!unitOptionsExist(fullFormData.inputName)) {
                  handleUnitChange({ target: { value: '1' } });
                }
              }}
              onKeyDown={handleEnterPressThird}
              renderInput={(params) => <TextField {...params} inputRef={unitInputRef} onChange={handleUnitChange} placeholder="Unit" variant="outlined" />}
            />
          </div>
          <div className="w-28">
            <TextField
              value='20'
            />
          </div>
          <div className="w-96">
            <TextField
              placeholder="Comment"
              variant="outlined"
              inputRef={commentInputRef}
              onChange={(e) => setFullFormData(prevState => ({
                ...prevState,
                comment: e.target.value
              }))}
              onKeyDown={handleAddItem}
              className='w-full'
            />
          </div>
          <div className="w-12">
            <button onClick={handleReset} className="button text-sm px-2 py-1 rounded-sm text-white">RESET</button>
          </div>
        </div>
      </section>
      <section className='left_section '>
        <div className=" w-full p-0 my-2">
          <div className="flex justify-between h-full">
            <div className="Righ_bill_menu w-2/5">
              <div className="w-full right_meun rounded-md">
                {
                  buttonCLicked === 'tab1' && (
                    <div className="w-full text-base h-full overflow-auto  table_no p-4">
                      <div className="shadow-md my-4 p-2">
                        <p className="w-20">Table No </p>
                        <hr />
                        <div className="py-2 flex justify-between main_div ">
                          <div>
                            <span className='w-3'>Enter No &nbsp;</span> <input type="text" name="" id="" className="w-20 p-1 border-2 rounded-sm" />
                          </div>
                          <div>
                            <Button1>Assign Captain</Button1>
                          </div>
                        </div>
                      </div>
                      <div className="shadow-md my-2 p-2">
                        <p className="w-32 mb-2">Customer Details</p>
                        <hr />
                        <table className="my-2 h-44 w-full">
                          <tbody>
                            <tr className='mb-3'>
                              <td className="w-5">Mobile&nbsp;</td>
                              <td><input type="number" className="border-2 w-48 p-1 rounded-sm" name="" id="" /></td>
                            </tr>
                            <tr className='mb-3'>
                              <td className="w-5">Name&nbsp;</td>
                              <td><input type="text" className="border-2 w-full p-1 rounded-sm" name="" id="" /></td>
                            </tr>
                            <tr className='mb-3'>
                              <td className="w-5">Add&nbsp;</td>
                              <td>
                                <ReactTransliterate
                                  value={text}
                                  className="border-2 w-full p-1 rounded-sm"
                                  onChangeText={(text) => {
                                    setText(text);
                                  }}
                                  lang="gu"
                                />
                              </td>
                            </tr>
                            <tr className='mb-3'>
                              <td className="w-5">Locality&nbsp;</td>
                              <td><input type="text" className="border-2 w-full p-1 rounded-sm" name="" id="" /></td>
                            </tr>
                          </tbody>
                        </table>

                      </div>
                      <div className="shadow-md my-2 p-2">
                        <div className="w-full py-2 my-2">
                          <table className=" w-full">
                            <tbody>
                              <tr className='mb-3'>
                                <td className="w-28">Order Comment&nbsp;</td>
                                <td><input type="number" className="border-2 w-full p-1 rounded-sm" /></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )
                }
                {
                  (buttonCLicked === 'tab3' || buttonCLicked === 'tab2') && (
                    <div className="w-full text-base table_no p-2">
                      <div className="shadow-md my-2 p-2">
                        <p className="w-32 mb-2">Customer Details</p>
                        <hr />
                        <table className="my-2 h-44 w-full">
                          <tbody>
                            <tr className='mb-3'>
                              <td className="w-5">Mobile&nbsp;</td>
                              <td><input type="number" className="border-2 w-48 p-1 rounded-sm" name="" id="" /></td>
                            </tr>
                            <tr className='mb-3'>
                              <td className="w-5">Name&nbsp;</td>
                              <td><input type="text" className="border-2 w-full p-1 rounded-sm" name="" id="" /></td>
                            </tr>
                            <tr className='mb-3'>
                              <td className="w-5">Add&nbsp;</td>
                              <td><input type="text" className="border-2 w-full p-1 rounded-sm" name="" id="" /></td>
                            </tr>
                            <tr className='mb-3'>
                              <td className="w-5">Locality&nbsp;</td>
                              <td><input type="text" className="border-2 w-full p-1 rounded-sm" name="" id="" /></td>
                            </tr>
                          </tbody>
                        </table>

                      </div>
                      <div className="shadow-md my-2 p-2">
                        <div className="w-full py-2 my-2">
                          <span className="w-3">Order Comment&nbsp;</span> <input type="text" name="" id="" className="w-80 p-1 border-2 rounded-sm" />
                        </div>
                      </div>
                    </div>
                  )
                }
                {
                  buttonCLicked === 'tab4' && (
                    <div>
                      <div className="shadow-md text-base my-4 p-2">
                        <p className="w-full">Hotel Information </p>
                        <hr />
                        <div className="py-2 flex justify-between main_div ">
                          <div className='w-80'>
                            <Autocomplete
                              className='hotel_autocomplete'
                              options={unitOptionsExist(fullFormData.inputName) ? data.find(item => item.Name === fullFormData.inputName).unitOptions : []}
                              value={fullFormData.inputUnit}
                              renderInput={(params) => <TextField {...params} inputRef={unitInputRef} onChange={handleUnitChange} className='hotel_input' placeholder="Hotel Name" variant="outlined" />}
                            />
                          </div>
                          <div>
                            <span className='w-3'>Room No &nbsp;</span> <input type="text" name="" id="" className="w-20 p-1 border-2 rounded-sm" />
                          </div>
                        </div>
                      </div>
                      <div className="shadow-md text-base my-4 p-2">
                        <table className="my-2 h-44 w-full">
                          <tbody>
                            <tr className='mb-3'>
                              <td className="w-5">Mobile&nbsp;</td>
                              <td><input type="number" className="border-2 w-48 p-1 rounded-sm" name="" id="" /></td>
                            </tr>
                            <tr className='mb-3'>
                              <td className="w-5">Name&nbsp;</td>
                              <td><input type="text" className="border-2 w-full p-1 rounded-sm" name="" id="" /></td>
                            </tr>
                          </tbody>
                        </table>

                      </div>
                    </div>
                  )
                }
              </div>
            </div>
            <div className="left_bill_menu text-base w-full h-full">
              <div className="w-full  p-0 text-white">
                <div className="grid w-full grid-flow-row grid-cols-12 mr-2  bg-gray-700">
                  <div onClick={() => setButtonCLicked('tab1')} className={buttonCLicked == 'tab1' ? "clicked col-3 p-0 col-span-3 text-center" : 'col-3 p-0 cursor-pointer  col-span-3 text-center'}>
                    <Button variant='plain' color='danger' className="w-100 col-auto text-center p-2 px-0">Dine In</Button>
                  </div>
                  <div onClick={() => setButtonCLicked('tab2')} className={buttonCLicked == 'tab2' ? "clicked col-3 p-0  col-span-3 text-center" : 'col-3 p-0 cursor-pointer  col-span-3 text-center'}>
                    <Button variant='plain' color='danger' className="w-100 col-auto text-center p-2 px-0">Delivery</Button>
                  </div>
                  <div onClick={() => setButtonCLicked('tab3')} className={buttonCLicked == 'tab3' ? "clicked col-3 p-0  col-span-3 text-center" : 'col-3 p-0 cursor-pointer  col-span-3 text-center'}>
                    <Button variant='plain' color='danger' className="w-100 col-auto text-center p-2 px-0">Pick Up</Button>
                  </div>
                  <div onClick={() => setButtonCLicked('tab4')} className={buttonCLicked == 'tab4' ? "clicked col-3 p-0  col-span-3 text-center" : "col-3 p-0 cursor-pointer  col-span-3 text-center"}>
                    <Button variant='plain' color='danger' className="w-100 col-auto text-center p-2 px-0">Hotel</Button>
                  </div>
                </div>
              </div>
              <div className=" p-0 text-base ">
                <div className="bg-gray-200">
                  <div className="grid grid-cols-12 w-full p-2">
                    <div className="col-span-3 justify-self-center underline color-gray-700 pl-3">ITEMS</div>
                    <div className="col-span-3 justify-self-end">COMMENTS</div>
                    <div className="col-span-3 justify-self-center">QTY.</div>
                    <div className="col-span-3 justify-self-end pr-3">PRICE</div>
                  </div>
                </div>
                <div className="main_bill1 ">
                  {
                    items.length === 0 && (
                      <div className='text-center bill_tag h-full'>
                        <div>
                          <p className='text-lg text-gray-600'>No items Added</p>
                          <p>Please add the item First</p>
                          <IoIosRestaurant className='Billing_icon text-center ms-7' />
                        </div>
                      </div>
                    )
                  }
                  {items.map((item, index) => (
                    <div key={index} className="bg-amber-50 billin_content p-2 text-lg">
                      <div className="grid grid-cols-12 content-center gap-4">
                        <div className="col-auto underline">
                          <MdCancel onClick={() => handleDeleteRow(index)} className='main_bill_icon text-red-700 ml-1 mt-1 cursor-pointer' />
                        </div>
                        <div className="col-span-4 justify-self-start">{item.inputName}</div>
                        <div className="col-span-2 justify-self-center">{item.comment}</div>
                        <div className="col-span-2 justify-self-start">
                          <div className="flex h-full align-star main_div">
                            <div className="plus_button">
                              <button onClick={() => handleDecreaseQuantity(index)} className='border quantity_button p-0'>-</button>
                            </div>
                            <input type="text" value={item.inputQuantity} className='w-8 text-center' readOnly />
                            <div className="plus_button">
                              <button onClick={() => handleIncreaseQuantity(index)} className='quantity_button p-0'>+</button>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-3 justify-self-end">
                          <p className="pl-2">123</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='text-base'>
                <div className="w-full p-2 h-full bg-gray-700 text-white">
                  <div className="flex w-full justify-around gap-4 main_div">
                    <div>
                      <button className='text-base button px-2 py-1 rounded-sm text-white'>Split</button>
                    </div>
                    <div>
                      <div className="flex gap-2 text-base">
                        <div>
                          <input type="checkbox" name="" id="" />
                        </div>
                        <p>Complementary</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex gap-2 main_div">
                        <div className='bg-red-600 p-1'>
                          <MdOutlineCurrencyExchange className='text-white text-lg' />
                        </div>
                        <p>Total:-</p>
                        <p>329</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <RadioGroup
                  className='radio_buttons text-base'
                >
                  <div>
                    <FormControlLabel value="Cash" control={<Radio name='radio' />} label="Cash" />
                  </div>
                  <div>
                    <FormControlLabel value="Due" control={<Radio name='radio' />} label="Due" />
                  </div>
                  <div>
                    <FormControlLabel value="Other" control={<Radio name='radio' />} label="Other" />
                  </div>
                  <div>
                    <FormControlLabel value="Complementary" control={<Radio name='radio' />} label="Complementary" />
                  </div>
                </RadioGroup>
              </div>

              <div className="w-full text-base flex p-2 justify-center gap-4 bg-gray-500">
                <div><input type="checkbox" /></div>
                <div>It's Paid</div>
              </div>
              <div className="w-full text-base flex justify-center gap-4 p-1 mt-1 ">
                <div><button className='text-base button save_button py-1 rounded-md text-white'>Save</button></div>
                <div><button className='text-base button px-2 py-1 rounded-md text-white'>Print & Bill</button></div>
                <div><button className='another_1 button text-base px-2 py-1 rounded-md text-white'>KOT</button></div>
                <div><button className='another_1 button text-base px-2 py-1 rounded-md text-white'>KOT & PRINT</button></div>
                <div><button className='another_2 button text-base px-2 py-1 rounded-md text-white'>HOLD</button></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PickUp