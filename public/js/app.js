const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const result = document.querySelector('#result');
const note = document.querySelector('#note');

weatherForm.addEventListener('submit', (e) => {
        
    messageOne.textContent = 'Loading...';
    result.innerHTML = "";
    note.innerHTML = "";
    const location = search.value;
    
    // to prevent default behavior on submit event (load page when no address is enterted)
    e.preventDefault();
    fetch('/weather?address='+location).then((response) => {
            response.json().then( (data) => {
                    if (data.error)
                    {
                        messageOne.textContent = data.error;
                        result.innerHTML = "";
                        note.innerHTML = "";
                    }                        
                    else 
                    {
                        messageOne.textContent = "Weather Details";

                        //Display ony when location is specified
                        if(!location)  {
                            messageOne.textContent = "";
                       }    
                        result.innerHTML = "<table>"  +
                                                "<tbody>" +
                                                    "<tr>" +
                                                        "<th> Place Name </th>" +
                                                        "<td>" + data.location + "</td>" +
                                                    "</tr>"+
                                                    "<tr>" +
                                                        "<th> Current Temp </th>" +
                                                        "<td>" + data.weatherDetails.currentTemp + "</td>" +
                                                     "</tr>"+
                                                     "<tr>" +
                                                        "<th> Temp High </th>" +
                                                        "<td>" + data.weatherDetails.highTemp + "</td>" +
                                                     "</tr>"+
                                                     "<tr>" +
                                                        "<th> Temp Low </th>" +
                                                        "<td>" + data.weatherDetails.lowTemp + "</td>" +
                                                     "</tr>"+
                                                     "<tr>" +
                                                        "<th> Summary </th>" +
                                                        "<td>" + data.weatherDetails.summary+ "</td>" +
                                                     "</tr>"+
                                                     "<tr>" +
                                                        "<th> Longitude </th>" +
                                                        "<td>" + data.weatherDetails.longitude + "</td>" +
                                                     "</tr>"+
                                                     "<tr>" +
                                                        "<th> Latitude </th>" +
                                                        "<td>" + data.weatherDetails.latitude + "</td>" +
                                                     "</tr>"+
                                                "</body>"+
                                            "</table>"  ; 
                        note.innerHTML = "Note: If you didn't find the desired results, please enter full location";                  
                    }
            })
    })  
})