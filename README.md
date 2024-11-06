# Firebase Community Chat Application

This project is a simple community-based chat application built using Firebase Realtime Database. It allows users to send and view messages in real time within specific community channels.

## Prerequisites

Ensure you have:

- **Firebase project** set up with Realtime Database enabled.
- **Firebase Configuration**: Replace Firebase configuration details in `firebase.initializeApp({...})` with your project’s configuration.

## Setup and Installation

1. **Clone the repository**:

2. **Install Firebase**:
   Add Firebase to your project by including the Firebase library in your HTML:
   ```html
   <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js"></script>
   <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js"></script>
   ```

3. **Firebase Initialization**:
   - Add your Firebase configuration to initialize the app:
     ```javascript
     const firebaseApp = firebase.initializeApp({
         apiKey: "your-api-key",
         authDomain: "your-auth-domain",
         projectId: "your-project-id",
         storageBucket: "your-storage-bucket",
         messagingSenderId: "your-messaging-sender-id",
         appId: "your-app-id"
     });
     const database = firebaseApp.database();
     ```

## Usage

1. **Set Up User and Community Selection**:
   - Ensure a `username` is stored in `localStorage` (or set this up manually if required).
   - Add community selection buttons in the HTML (e.g., `#community-selection`).

2. **Send a Message**:
   - Type a message in the input field and press **Enter** or click **Send**.
   - The message will be saved to the selected community in Firebase Realtime Database.

3. **View Messages**:
   - Messages are displayed in real time. When a community is selected, messages specific to that community are fetched and displayed in the chat area.

### Example Input and Output

- **Input**:
  - **Username**: Stored in `localStorage`.
  - **Message**: Text input field.

- **Output**:
  - **Chat Display**: Messages from the selected community with the sender's name.

## Code Structure

- **Firebase Initialization**:
  - Initializes the Firebase application and connects to Realtime Database.

- **JavaScript Functions**:
  - `sendMessage()`: Validates input, pushes the message to Firebase, and displays messages.
  - `displayMessages()`: Fetches messages from the selected community and updates the HTML with real-time data.
  - `selectCommunity()`: Updates the UI to reflect the selected community and loads its chat messages.

- **HTML Elements**:
  - `#user-input`: Text input for typing messages.
  - `#chat-messages`: Div for displaying chat messages.
  - `#community-selection`: Buttons for selecting a community.

## Event Handling

- `window.onload`: Automatically loads the default community's messages when the page loads.
- `handleKeyPress`: Sends the message when the Enter key is pressed.
