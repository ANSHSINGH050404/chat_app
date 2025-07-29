# CHAT_APP

*COMPANY*:CODTECH IT SOLUTION

*NAME*:ANSH KUMAR SINGH

*INTERN ID*:CTO4DH1361

*DOMAIN*:FRONT END DEVELOPMENT

*DURATION*:4 WEEKS

*MENTOR*:NEELA SANTOSH

###

This is a feature-rich, fully responsive chat application built using React and Tailwind CSS. The app mimics real-time functionality using a mock WebSocket implementation, enabling you to simulate multi-user interaction, real-time messaging, and connection behavior—all without requiring a backend server.

Ideal for demos, prototyping, and testing, this project offers a great starting point for building real-time chat interfaces or integrating with real WebSocket servers in the future.
💡 Key Features
🧑‍💻 Real-Time Messaging Interface

Users can send and receive messages instantly in a seamless chat UI. Each message includes the sender’s name, a timestamp, and is styled differently depending on whether it was sent by the current user or others. Messages auto-scroll to the latest entry, providing a smooth and intuitive user experience.
🔗 Connection Status Indicator

The app provides live feedback on connection status—connecting, connected, disconnected, or error—through a prominent status bar. Users are prompted to reconnect if the mock WebSocket is closed or fails, simulating real-world conditions of WebSocket communication.
👤 Online Users Panel

A dynamic sidebar displays the list of online users, including an indicator showing which user is “You.” This list updates in real time as new users "join" or "leave" (simulated through the mock server). Each user is represented with an online status icon and styled appropriately.
📝 Username Entry Modal

Before entering the chat room, users are prompted to enter a username via a modal dialog. This simulates user identification and ensures each session is distinct. The modal is styled for clarity and prevents proceeding without a valid username.
🧪 Mock WebSocket Backend

Instead of connecting to an actual server, the app uses a MockWebSocket class that mimics the behavior of a real WebSocket. It simulates:

    New users joining the chat

    Existing users sending messages at intervals

    Dynamic user lists

    Connection states and errors

This allows full demonstration and testing of frontend features in a local environment, without any backend dependency.
🚀 Getting Started

To run the chat app locally:

git clone https://github.com/your-username/react-chat-mock.git
cd react-chat-mock
npm install
npm run dev

Then navigate to http://localhost:3000 in your browser.
🛠 Customization and Extension

This app is modular and designed with scalability in mind. Each part of the interface—messages, user list, input field, connection bar, and modal—is implemented as a separate component. You can:

    Replace MockWebSocket with a real WebSocket instance (new WebSocket(url))

    Add authentication or persistent user identities

    Extend to support rooms or private chats

    Integrate with databases or backends like Firebase, Socket.IO, or Supabase

📁 Tech Stack

    React – for component-based architecture and state management

    Tailwind CSS – for rapid UI styling

    Lucide Icons – for consistent, modern UI icons

    Mock WebSocket – custom class to simulate WebSocket behavior

✅ Use Cases

    Prototyping real-time UI flows

    Building and testing UI before backend is ready

    Teaching or demonstrating chat functionality in React

    Creating offline-first demo apps

📌 Notes

This app is frontend-only and meant for demonstration or development purposes. For production use, integrate it with a secure, real-time backend.


###

