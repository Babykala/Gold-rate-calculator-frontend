import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [priceList,setPriceList]=useState('')
  const [output,setOutput]=useState({
    rate:"",
    date:""
  });
  const [input,setInput]=useState({
    metal:"",
    weight:"1",
    purity:"",
    city:""
  })
  useEffect(() => {
    const res = async () => {
        let {data}=await axios.get("https://goldratecalculator.herokuapp.com/get");
        // console.log(data)
        setPriceList(data)
        };
    res();
}, []);

useEffect(() => {
  let values = handleFilter(input);
  setOutput(values);
}, [input])

const handleFilter = (input) => {
  let filteredValues = {};
  if(input.city && input.metal && input.purity && input.weight){
    filteredValues = priceList.filter(value => value.city === input.city).map((value) => {
      return {
        rate: value.price * (input.purity/24)*input.weight,
        date:value.dateTime
      }
    })[0]
  }
  return filteredValues;
}
  const handleChange=async(e)=>{
    const { name, value } = e.target;
    if(name === 'weight'){
      if(value > 0 && value < 9){
        setInput({...input,[name]:value})
      }
    }else{
      await setInput({...input,[name]:value})
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
      <form className='form' type='submit'>
        <div className="gold-calc" style={{ height: "auto !important" }}>
          <div className="input-data">
            <div className="form-group">
              <label className="mb-0" htmlFor="name">Metal</label>
              <select id="name" className="form-control" name="metal" size="1" onChange={(e)=>handleChange(e)}>
              <option value="">select a metal</option>
                <option value="gold">Gold</option>
              </select>
            </div>
            <div className="form-group">
              <label className="mb-0" htmlFor='weight'>Weight (in gms)</label>
             <input className="form-control" size="8" type="number" name="weight" id="weight" value={input.weight}  onKeyPress={(e)=>handleChange(e)} onChange={(e)=>handleChange(e)}></input>
              </div>
            <div className="form-group">
              <label className="mb-0" htmlFor="purity">Carat</label>
              <select name="purity" size="1" className="purity form-control" default="24" id="purity" onChange={(e)=>handleChange(e)}>
              <option value="">select karat</option>
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
              <select className="form-control" size="1"  name="city" default="mumbai" id="select" onChange={(e)=>handleChange(e)}>
              <option value="">select a city</option>
                <option value="mumbai">Mumbai</option>
                <option value="chennai">Chennai</option>
                <option value="delhi">Delhi</option>
                <option value="hyderabad">Hyderabad</option>
                <option value="bangalore">Bangalore</option>
                <option value="goa">Goa</option>
                <option value="kerala">Kerala</option>
                <option value="kolkatta">Kolkata</option>
              </select>
              <br/>
            </div>
            
          </div>
          <br/><br/>
          
          <div className="output-data" style={{ height: "auto !important" }}>
            <p name="result" cols="10" className="result">Price: {output.rate ? Math.floor(output.rate/10) : 0} INR <br/>({output.rate ? (output.rate/793.7).toFixed(2):0} US Dollar)* </p>
            <p style={{ fontSize:"12px"}}>*This is based on Dollar to Rupee exchange rate of 1 USD= 79.37 INR</p>
            <p className="date">Updated at: {output.date}</p>
          </div>
    </div>
      </form >

    </div >
  )
}

export default App;