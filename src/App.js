import {useState,useEffect, useRef} from 'react';
import axios from "axios";
import WeatherCard from './weatherCard';
import './App.css';

function App() {
  const [city,setCity]=useState("London");
  const nameref=useRef();
  const [isLoading, setIsLoading]=useState(false);
  const [data,setData]=useState([]);
  const [isError,setIsError]=useState(false);
  const API_key="1635890035cbba097fd5c26c8ea672a1";
  useEffect(()=>{
    async function fetchGeoData(){
      setIsLoading(true);
      const res= await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_key}`);
      if(res.data.length==0){
        setIsError(true);
        setIsLoading(false);
      }else{
        setIsError(false);
        const {lat,lon}=res.data[0];
        return [lat,lon];
      } 
    }
    async function fetchData(lat,lon){
      const resp=await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`);
      const dates_set=new Set();
      const data=resp.data.list.filter((list)=>{
        const date= list.dt_txt.split(" ")[0];
        if(! dates_set.has(date)){
          dates_set.add(date);
          return true;
        }
      }).splice(0,5);
      setData(data);
      setTimeout(()=>{setIsLoading(false)},1000);
    }
    fetchGeoData().then(res=> {
      !isError && fetchData(...res);
    }).catch(err=>console.error(err));
  },[city]);

  const searchHandler=(e)=>{
    setCity(nameref.current.value);
  }
  return (
    <div>
    <div className="header-section">
        <h4>Weather in Your City</h4>
        <div class="search-bar">
            <input type="text" placeholder="Visakhapatnam" ref={nameref}/>
            <div className='button-container'>
              <button onClick={searchHandler}>Search</button>
              {isLoading ? <div className='spinner'></div> : <></>}
              {isError ? <p className='errorText'>Enter correct Location</p>:<></>}
            </div>
        </div>
    </div>

    <div class="card-container">
      {
        data.map((ele)=> <WeatherCard key={ele.dt} 
                                      date={ele.dt}
                                      temp_min={ele.main.temp_min}
                                      temp_max={ele.main.temp_max}
                                      press={ele.main.pressure}
                                      humi={ele.main.humidity}/>)
      }
    </div>
    </div>
  );
}

export default App;
