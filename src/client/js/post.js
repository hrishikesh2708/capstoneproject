import {UI} from '../js/update'

function calculation1(inputDate, returnDate) {
    let timeStamp = Math.abs(new Date() - new Date(inputDate));
    let daysLeft = Math.ceil(timeStamp/(1000*60*60*24));
    return daysLeft
}
function calculation2 (inputDate, returnDate){
    let trip = Math.abs(new Date(returnDate) - new Date(inputDate));
    let duration = Math.ceil(trip/(1000*60*60*24));
    return duration
}


const postData = async ( url = '', data = {})=>{
    const response = await fetch(url,
    {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),       
  });
    try {
      const data = await fetch('http://localhost:3000/items')
      const newData = await data.json();
      UI();
    }catch(error) {
    console.log("error 1", error);
    }
  };

  
  export function postFunction(){
  postData('http://localhost:3000/submit', {
    tripStart: sessionStorage.getItem("start"), 
    remaining: calculation1(sessionStorage.getItem("start"), sessionStorage.getItem("end")),
    duration: calculation2(sessionStorage.getItem("start"), sessionStorage.getItem("end")),
    place: sessionStorage.getItem("destination")
  });}