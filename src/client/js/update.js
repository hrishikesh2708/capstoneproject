export const UI = async()=>{
    const request = await fetch('http://localhost:3000/items')
    const response = await request.json();
    const dataRecieved = response[response.length-1];
    const place = document.getElementById('city').value;

    document.getElementById('destination').innerHTML = `Your next trip is to ${place} in ${dataRecieved.destination}`;
    document.getElementById('date').innerHTML = `Arrival date: ${dataRecieved.tripStart}`;
    document.getElementById('tripTime').innerHTML = `Your trip is ${dataRecieved.duration} days long.`;
    document.getElementById('daysLeft').innerHTML = `Days remaining: ${dataRecieved.remaining} days`;
    document.getElementById('temperature').innerHTML = `Temperature: ${dataRecieved.temperature} &deg;C`;
    if (dataRecieved.image !== undefined ){
      document.getElementById('pixabay').innerHTML = `<img src= ${dataRecieved.img}>`;
    } else {
      document.getElementById('pixabay').innerHTML = `<img src= ${dataRecieved.ImgC}>`;
    }
    document.getElementById('fname').innerHTML=`You have booked "${document.getElementById('aname').value}" airlines`;
    document.getElementById('fnumber').innerHTML=`Flight no: ${document.getElementById('flight').value}`;
    document.getElementById('ftime').innerHTML=`Departure time: ${document.getElementById('time').value}`;
    document.getElementById('fdepart').innerHTML=`From: ${document.getElementById('departure').value} <i class="fa fa-plane"></i> ${place}`;
  }
  