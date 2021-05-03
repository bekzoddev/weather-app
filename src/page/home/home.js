import React, { useEffect, useState } from "react"
import ContainedButtons from "../btn/btn";

import {
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
  purple
} from '@material-ui/core/colors';

import  "./main.css";
import weatherCodeParse from '../../container/helpers/weatherCodeParse';

const Home = () => {
  const [city,setCity] = useState("London")
  const [data,setData] = useState({arr: false,data:{}})
  const [input,setInput] = useState("")
  function some(e) {
    setInput(e.target.value)
  }

  useEffect(()=> {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a6747edfd9a1625a402525f54f17fd49`)
    .then(log => log.json()).then(item =>

    setData({
    arr: true,
    data: item

    }))



  },[city])
  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[500],
      '&:hover': {
        backgroundColor: purple[700],
      },
    },
  }))(Button);
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));


  const classes = useStyles();
  return (

    <div className="header container">

      <div className="search">

        <input type="text"  onChange={some} placeholder="search city" />

         <ColorButton variant = "contained"
         color = "primary"className = {classes.margin}
           disabled = {
             input === "" ?true : false
           }

           onClick = {
             () => setCity(input)
           } >
            search </ColorButton>
        </div>
        <nav className="nav">
          <ContainedButtons a="Parij" onclick={(e) => setCity(e.target.textContent)}/>
          <ContainedButtons a="Dubai" onclick={(e) => setCity(e.target.textContent)}/>
          <ContainedButtons a="Tashkent" onclick={(e) => setCity(e.target.textContent)}/>
          <ContainedButtons a="Moscow" onclick={(e) => setCity(e.target.textContent)}/>
          <ContainedButtons a="Madrid" onclick={(e) => setCity(e.target.textContent)}/>
           <ContainedButtons a="Istanbul" onclick={(e) => setCity(e.target.textContent)}/>

      </nav>
      {
        data.arr ? (

           data.data.name ? (
             <div className="weather">
               <h1 className="title">{data.data.name}</h1>
               <p className="temp">Temperature {data.data.main.temp}°C</p>
               <p className="wind">Wind {data.data.wind.speed}</p>
               {data.data.weather.map((item, i) => (
                 <div className="cloud" key={i}>
                   <span className="span">{item.main}</span>
                   <span className="span">{item.description}</span>
                   <img className="icon" src={weatherCodeParse(data.data.weather[0].id)} alt="icon" />
                 </div>
               ))}
             </div>
           ): (
             <div className="found">Nothing found</div>
           )

        ): (
          <h1 className="load">..loading</h1>
        )
      }
    </div>
  )
}
export default Home;