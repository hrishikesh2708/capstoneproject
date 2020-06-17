
import {postFunction} from '../js/post'

export function initial(){
  let frm =document.getElementById('formSubmit');
  frm.onsubmit = function(event) {
    event.preventDefault();
    console.log("::form submitted::");
    document.getElementById('preview').style.display="block";
    sessionStorage.setItem("start",frm.arrivalDate.value);
    sessionStorage.setItem("end",frm.last.value);
    sessionStorage.setItem("destination",frm.city.value);
    postFunction();
  }
}
