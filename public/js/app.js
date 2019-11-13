console.log("Client side js file loaded");

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (e) => {
        
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    const location = search.value;

    e.preventDefault();
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
            response.json().then( (data) => {
                    if (data.error)
                    {
                        messageOne.textContent = data.error;
                        messageTwo.textContent = '';
                    }                        
                    else 
                    {
                        messageOne.textContent = data.location;
                        messageTwo.textContent = data.forecast;                 
                    }
                       })
    })
    
    
})