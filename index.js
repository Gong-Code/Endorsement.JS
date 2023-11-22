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
const endorsementContainer = document.querySelector('#endorsement-container');

// Render endorsements
onValue(endorsementListInDB, (snapshot) => {
    if(snapshot.exists()) {
        let endorsementArray = Object.entries(snapshot.val());

        clearTextareaList()

        for(let i = 0; i < endorsementArray.length; i++) {
            let currentEndorsementText = endorsementArray[i];
            let currentEndorsementTextID = currentEndorsementText[0];
            let currentEndorsementTextValue = currentEndorsementText[1];

            appendEndorsementItemList(currentEndorsementText);
        }   
    }
    else {
        endorsementContainer.innerHTML = "No endorsements yet...";
    }

});

// Event listeners
publishBtn.addEventListener('click', () => {
    let textareaValue = textArea.value;

    push(endorsementListInDB, textareaValue);

    clearTextarea();

});

textArea.addEventListener('input', () => {
    let text = textArea.value;
    text = text.replace(/:happy:/g, '😀');
    text = text.replace(/:sad:/g, '😢');
    text = text.replace(/:clap:/g, '👏');
    text = text.replace(/:love:/g, '😍');
    text = text.replace(/:cool:/g, '😎');
    text = text.replace(/:fire:/g, '🔥');
    // Add more replacements as needed
    textArea.value = text;
});

// Functions
function appendEndorsementItemList(EndorsementText) {

    let endorsementID = EndorsementText[0];
    let endorsementTextValue = EndorsementText[1];

    let newEl = document.createElement('li');
    newEl.textContent = endorsementTextValue;
    newEl.classList.add('endorsement-list');

    newEl.addEventListener('click', () => {
        let exactLocationOfEndorsementInDB = ref(database, `endorsementList/${endorsementID}`);

        remove(exactLocationOfEndorsementInDB);
    });

    endorsementContainer.append(newEl);
    
}

function clearTextarea() {
    textArea.value = '';
}

function clearTextareaList() {
    endorsementContainer.innerHTML = "";
}

