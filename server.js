const express = require('express');
const bodyParser = require('body-parser');
const axios  = require('axios');

const app = express();

app.set("view engine","ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// axios --> agar aapke pas api ka link hai aur uska aapko data chiye then we use axios

app.get("/",(req,resp)=>{

    resp.render('index')
})
app.post("/users", async(req,resp)=>{

let city =  req.body.city;
const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=271d1234d3f497eed5b1d80a07b3fcd1&units=metric`;

await axios.get(url)
.then((val)=> {

  let data = val.data ;
  if(val.data){

    const temperature = data.main.temp;
         resp.send(`<h1> The temperature in ${city} is ${temperature}°C </h1>`);
       } else {
         resp.send('Temperature data not available for the specified city.');
       }


  }
)

  //  try {

  //   const response = await axios.get(url);
  //   const data =  response.data;

  //   if (data.main && data.main.temp) {
  //     const temperature = data.main.temp;
  //     resp.send(`<h1> The temperature in ${city} is ${temperature}°C </h1>`);
  //   } else {
  //     resp.send('Temperature data not available for the specified city.');
  //   }
  // }
   
  //  .catch (error){

  //   console.log(error);
  //   resp.send("<h1> u made an error </h1>")


  //  }

  .catch((err)=>{

    console.log(" u made an error",err)
  })

    
})

app.listen(3000,()=>{
    console.log("server is running")
})