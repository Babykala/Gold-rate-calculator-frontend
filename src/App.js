import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [priceList,setPriceList]=useState('')
  const [input,setInput]=useState({
    originalRate:"",
    rate:"",
    date:""
  });
  useEffect(() => {
    const res = async () => {
        let {data}=await axios.get("http://localhost:3001/get");
        // console.log(data)
        setPriceList(data)
        };
    res();
}, []);

  const calculateValue=async(e)=>{
    var city=document.getElementById("select").value;
    var purity=document.getElementById("purity").value;
    var weight=document.getElementById("weight").value;
   
    try {
        for(let i=0;i<priceList.length;i++){
          if(priceList[i].city===city)
            await setInput({rate:priceList[i].price*(purity/24)*weight,originalRate:priceList[i].price,date:priceList[i].dateTime})
        }
        } catch (error) {
            console.log(error)
        }
  
  }

  return (
    <div className='main'>
      <h1>Gold Rate Calculator</h1>
      <hr />
      <p style={{fontSize:"18px"}}>This is the gold and silver price calculator in indian cities. Select the metal (gold),
        carat (purity), enter the weight and select the city to get the total gold price in Indian Rupees
        in addition to the price in United States dollar according to the latest USD/INR exchange rates.
      </p>
      <br/><br/>
      <form className='form'>
        <input name="gold" value="24" type="hidden"/>
        <input name="gold" value="22" type="hidden"/>
        <input name="goldmumbai" value="5139" type="hidden"/>
        <input name="goldmumbai22" value="5139" type="hidden"/>
        <div className="gold-calc" style={{ height: "auto !important" }}>
          <div className="input-data">
            <div className="form-group">
              <label className="mb-0" htmlFor="bullionName">Metal</label>
              <select id="bullionName" className="form-control" name="bullionName" size="1">
                <option value="gold">Gold</option>
              </select>
            </div>
            <div className="form-group">
              <label className="mb-0" htmlFor='weight'>Weight (in gms)</label>
             <input className="form-control" size="8" type="number" name="weight" id="weight" onKeyPress={(e)=>calculateValue(e)} onChange={(e)=>calculateValue(e)}></input>
              </div>
            <div className="form-group">
              <label className="mb-0" htmlFor="purity">Carat</label>
              <select name="purity" size="1" className="purity form-control" default="24" id="purity" onChange={(e)=>calculateValue(e)}>
                <option value="24">24</option>
                <option value="22">22</option>
                <option value="20">20</option>
                <option value="18">18</option>
                <option value="16">16</option>
                <option value="14">14</option>
                <option value="12">12</option>
                <option value="10">10</option>
                <option value="8">8</option>
                <option value="6">6</option>
                <option value="4">4</option>
                <option value="2">2</option>
                <option value="1">1</option>
                
              </select>
            </div>
            <div className="form-group">
              <label className="mb-0" htmlFor="city">City</label>
              <select className="form-control" size="1"  name="city" default="mumbai" id="select" onChange={(e)=>calculateValue(e)}>
                <option value="mumbai">Mumbai</option>
                <option value="chennai">Chennai</option>
                <option value="delhi">Delhi</option>
                <option value="hyderabad">Hyderabad</option>
                <option value="bangalore">Bangalore</option>
                <option value="goa">Goa</option>
                <option value="kerala">Kerala</option>
                <option value="kolkatta">Kolkata</option>
              </select>
            </div>
          </div>
          <div className="output-data" style={{ height: "auto !important" }}>
            <p name="result" cols="10" className="result">Price: {Math.floor(input.rate/10)} INR <br/>({(input.rate/789.5).toFixed(2)} US Dollar)* </p>
            <p style={{ fontSize:"12px"}}>*This is based on Dollar to Rupee exchange rate of 1 USD= 78.95 INR</p>
            <p className="date">Updated at: {input.date}</p>
        </div>
    </div>
      </form >

    </div >
  )
}

export default App;