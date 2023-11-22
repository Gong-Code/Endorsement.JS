import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// app config 
const appSettings = {
    databaseURL: "https://endorsement-datatext-default-rtdb.europe-west1.firebasedatabase.app/",
}

// Initialize Firebase
const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementListInDB = ref(database, 'endorsementList');

// Dom elements
const textArea = document.querySelector('#text-area');
const publishBtn = document.querySelector('#publish-btn');
const endorsementContainer = document.querySelector('#endorsementContainer');

// Event listeners

publishBtn.addEventListener('click', () => {
    let textareaValue = textArea.value;

    push(endorsementListInDB, textareaValue);


    console.log(textareaValue);
});



// Functions
function appendEndorsementItemList() {
    let newEl = document.createElement('li');
    newEl.textContent = textarea.value;

    endorsementContainer.appendChild(newEl);
    
}

function clearTextarea() {
    textarea.value = '';
}

