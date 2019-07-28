let message1 = document.querySelector('#msg-1');
let message2 = document.querySelector('#msg-2');
const search = document.querySelector('input')
const enter = document.querySelector('form').addEventListener('submit', (e)=>{
    e.preventDefault();
   message1.textContent="Weather Forecast Loading..."
   message2.textContent="";
    const location = search.value;
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
        if(data.error){
            message1.textContent='';
            message2.textContent=`${data.error} 
            - please try again`;
    } else {
        message1.textContent=`${data.location}, ${data.forecast}`
        message2.textContent='';
    }
})
})


})




