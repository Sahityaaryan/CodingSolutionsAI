// import bot from './assets/bot.svg';
// import user from './assets/user.svg';

// const form = document.querySelector('form')// this is wrong but it still work because it is the only written piece in our html
// const chatContainer = document.querySelector('#chat_container');

// let loadInterval;// this is nothing but the three dots of loading which are going to increase after 300 ms
// function loader(element){
//     element.textContent = ' '
    
//     loadInterval = setInterval(()=>{
//         element.textContent+='.';
        
//         if(element.textContent === '....'){
//             element.textContent = ' ';
            
//         }
//     },300)
// }
// // it writes the text word by word 
// function typeText(element,text){
//     let index = 0;
    
//     let interval = setInterval(()=>{
//         if(index < text.length){
//             element.innerHTML += text.charAt(index);
//             index++;
//         }else{
//             clearInterval(interval);
//         }
//     },20)
// }
// // generating a unque id of the user by date and time and the Math.random function
// function generateUniqueId() {
//     const timestamp = Date.now();
//     const randomNumber = Math.random();
//     const hexadecimalString = randomNumber.toString(16);

//     return `id- ${timestamp}-${hexadecimalString}`
    
// }

// function chatStripe (isAi,value, uniqueId){
//     return (
//         `
//         <div class="wrapper ${isAi && 'ai'}">
//         <div class="chat">
//         <div class= "profile">
//         <img 
//             src= "${isAi ? bot: user}"
//             alt= "${isAi ? 'bot': 'user'}"
             
//             />
//         </div>
//         <div class = "message" id=${uniqueId}>${value}></div>
//         </div>
//         </div>
//         `

//     )
// }

// const handleSubmit = async (e) => {
//     e.preventDefault();// it prevent the default behaviour of the browser but what is that behaviour

//     const data = new FormData(form);

//     //user's chatstripe
//     chatContainer.innerHTML += chatStripe(false, data.get('prompt'));// "false" isliye kyunki AI nahi ham likh rahe hai

//     form.reset();// ?

//     //bot's chatstripe
//     const uniqueId = generateUniqueId();
//     chatContainer.innerHTML += chatStripe(true," ",uniqueId);// yaha "true" is liye because wo AI likh raha hoga ," " islliye 
// //because loading ke time wo khud hi isme fill out kar lega letters ko , unqueId us question pe
 
//     chatContainer.scrollTop = chatContainer.scrollHeight;// ? (let the generated message for us to see)

//     const messageDiv = document.getElementById(uniqueId)
    
//     loader(messageDiv);

//     //fetch data from server -> bot's response

//     const response = await fetch('https://codex-im0y.onrender.com/',{
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             prompt: data.get('prompt')
//         })
//     })
//     clearInterval(loadInterval);
//         messageDiv.innerHTML = " "

//         if(response.ok){
//             const data = await response.json();
//             const parsedData = data.bot.trim();

//             typeText(messageDiv, parsedData);
//         }else{
//             const err = await response.text();

//             messageDiv.innerHTML = "Something went wrong";

//             alert(err);
//         }
// }

// form.addEventListener('submit',handleSubmit);   
// form.addEventListener('keyup',(e) => {
//     if(e.keyCode === 13) {//?
//         handleSubmit(e);
//     }
// })


import bot from './assets/goodbot.png'
import user from './assets/user1.webp'

const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')

let loadInterval

function loader(element) {
    element.textContent = ''

    loadInterval = setInterval(() => {
        // Update the text content of the loading indicator
        element.textContent += '.';

        // If the loading indicator has reached three dots, reset it
        if (element.textContent === '....') {
            element.textContent = '';
        }
    }, 300);
}

function typeText(element, text) {
    let index = 0

    let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index)
            index++
        } else {
            clearInterval(interval)
        }
    }, 20)
}

// generate unique ID for each message div of bot
// necessary for typing text effect for that specific reply
// without unique ID, typing text will work on every element
function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
    return (
        `
        <div class="wrapper ${isAi && 'ai'}">
            <div class="chat">
                <div class="profile">
                    <img 
                      src=${isAi ? bot : user} 
                      alt="${isAi ? 'bot' : 'user'}" 
                    />
                </div>
                <div class="message" id=${uniqueId}>${value}</div>
            </div>
        </div>
    `
    )
}

const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData(form)

    // user's chatstripe
    chatContainer.innerHTML += chatStripe(false, data.get('prompt'))

    // to clear the textarea input 
    form.reset()

    // bot's chatstripe
    const uniqueId = generateUniqueId()
    chatContainer.innerHTML += chatStripe(true, " ", uniqueId)

    // to focus scroll to the bottom 
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // specific message div 
    const messageDiv = document.getElementById(uniqueId)

    // messageDiv.innerHTML = "..."
    loader(messageDiv)

    const response = await fetch('https://codesolution-ai.onrender.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: data.get('prompt')
        })
    })

    clearInterval(loadInterval)
    messageDiv.innerHTML = " "

    if (response.ok) {
        const data = await response.json();
        const parsedData = data.bot.trim() // trims any trailing spaces/'\n' 

        typeText(messageDiv, parsedData)
    } else {
        const err = await response.text()

        messageDiv.innerHTML = "Something went wrong"
        alert(err)
    }
}

form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        handleSubmit(e)
    }
})