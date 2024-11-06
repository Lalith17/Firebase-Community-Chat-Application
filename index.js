const firebaseApp = firebase.initializeApp({
//firebase credentials
});
const database = firebaseApp.database();
const username = localStorage.getItem("username");

function sendMessage() {
    const message = document.getElementById("user-input").value.trim();

    // Check if the message is not empty
    if (message!== "") {
        // Get the selected community name
        const selectedCommunity = document.getElementById("community-name").innerText;
        

        // Save the message in the Firebase Realtime Database
        database.ref("chatMessages/" + selectedCommunity).push().set({
            "sender": localStorage.getItem("username"),
            "message": message
        });

        // Clear the user input field
        document.getElementById("user-input").value=" ";

        // Display the messages for the selected community
        displayMessages(selectedCommunity);
    }
}

function displayMessages(communityName) {
    const chatMessagesKey = "chatMessages_" + communityName;

    // Load the chat messages from the Firebase Realtime Database
    database.ref("chatMessages/" + communityName).on("value", function (snapshot) {
        const chatMessages = snapshot.val();
        if (chatMessages) {
            var chatMessagesHTML = "";
            Object.keys(chatMessages).forEach(function (key) {
                const message = chatMessages[key];
                chatMessagesHTML += "<div><strong>" + message.sender + ": </strong>" + message.message + "</div>";
            });
            document.getElementById("chat-messages").innerHTML = chatMessagesHTML;
        } else {
            document.getElementById("chat-messages").innerHTML = "";
        }
    });
}

window.onload = function() {
    displayMessages(document.getElementById("community-name").innerText);
};
function selectCommunity(communityName) {

    document.getElementById("community-name").innerText = communityName;


    var buttons = document.querySelectorAll("#community-selection button");
    buttons.forEach(function(button) {
        button.classList.remove("active");
        if (button.innerText === communityName) {
            button.classList.add("active");
        }
    });


    var userInput = document.getElementById("user-input");
    userInput.disabled = communityName === "Click on a community to open it";

    if (communityName!== "Click on a community to open it") {

        displayMessages(communityName);
    } else {

        document.getElementById("chat-messages").innerHTML = "";
    }
}
var communityButtons = document.querySelectorAll("#community-selection button");
    communityButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            var communityName = button.innerText;
            selectCommunity(communityName);
        });
    });
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

document.getElementById("user-input").addEventListener("keypress", handleKeyPress);
document.addEventListener("DOMContentLoaded", function() {
    selectCommunity("Click on a community to open it");
    //...
});