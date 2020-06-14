function form(){
  document.getElementById('generate').addEventListener('click', performAction);

  function performAction(e){
    let inputDate = document.getElementById('arrivalDate').value;
    let city = document.getElementById('city').value;
    let returnDate = document.getElementById('last').value;
    let date1 = new Date(inputDate);
    let date2 = new Date();
    let timeStamp = Math.abs(date2-date1);
    let daysLeft = Math.ceil(timeStamp/(1000*60*60*24));
    let trip = Math.abs(new Date(returnDate) - new Date(inputDate));
    let duration = Math.ceil(trip/(1000*60*60*24));

    postData('http://localhost:8081/submit', {
      arrival: inputDate, 
      daysLeft: daysLeft,
      duration: duration,
      city: city
    });

  };

  //-----------------------------------------POST request to add the API data------------------------------------------------------------
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
      const data = await fetch('http://localhost:8081/items')
      const newData = await data.json();
      updateUI();
    }catch(error) {
    console.log("error 1", error);
    }
  };
  //---------------------------------------------------------------------------------------------------------------------------

  //------------------------------------------------------Update UI------------------------------------------------------------
  const updateUI = async()=>{
    const request = await fetch('http://localhost:8081/items')
    const response = await request.json();
    const dataRecieved = response[response.length-1];
    const place = document.getElementById('city').value;
    document.getElementById('destination').innerHTML = `Your next trip is to ${place} in ${dataRecieved.country}`;
    document.getElementById('date').innerHTML = `Arrival date: ${dataRecieved.arrival}`;
    document.getElementById('tripTime').innerHTML = `Your trip is ${dataRecieved.duration} days long.`;
    document.getElementById('daysLeft').innerHTML = `Days remaining: ${dataRecieved.daysLeft} days`;
    document.getElementById('temperature').innerHTML = `Temperature: ${dataRecieved.temp} &deg;C`;
    if (dataRecieved.image !== undefined ){
      document.getElementById('pixabay').innerHTML = `<img src= ${dataRecieved.image}>`;
    } else {
      document.getElementById('pixabay').innerHTML = `<img src= ${dataRecieved.countryImage}>`;
    }
    document.getElementById('fname').innerHTML=`You have booked "${document.getElementById('aname').value}" airlines`;
    document.getElementById('fnumber').innerHTML=`Flight no: ${document.getElementById('flight').value}`;
    document.getElementById('ftime').innerHTML=`Departure time: ${document.getElementById('time').value}`;
    document.getElementById('fdepart').innerHTML=`From: ${document.getElementById('departure').value} <i class="fa fa-plane"></i> ${place}`;
  }
  // -------------------------------------------------------------------------------------------------------------------------
  document.getElementById('generate').addEventListener('click', () => document.getElementById('preview').style.display="block")
}

export { form };


