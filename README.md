# 🌐 Language Learning Platform

A real-time, interactive **language learning platform** built with the **MERN Stack**.  
This app supports **live chat** and **video calling**, enabling users to practice languages through direct communication.

---

## 🚀 Features

- 💬 Real-time Chat with WebSockets
- 📹 Video Calls using WebRTC
- 🔐 Secure Authentication (JWT)
- 🌍 Scalable API with Express.js
- 🧠 MongoDB for NoSQL data storage
- 📦 RESTful API structure
- 📁 Clean and modular folder structure
- 🧪 Prototype-ready architecture

---

## 🛠️ Built With

| Technology | Description                  |
|------------|------------------------------|
| MongoDB    | NoSQL database                |
| Express.js | Backend framework (Node.js)  |
| React.js   | Frontend library              |
| Node.js    | Server environment            |
| Socket.io  | Real-time communication       |
| WebRTC     | Peer-to-peer video calls      |
| JWT        | Secure authentication         |

---

## 📂 Project Structure

```bash
language-learning-platform/
├── client/             # React Frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── ...
├── server/             # Express + MongoDB Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── ...
└── README.md

⚙️ Installation
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/language-learning-platform.git
cd language-learning-platform

2. Install Backend Dependencies
bash
Copy
Edit
cd server
npm install

3. Install Frontend Dependencies
bash
Copy
Edit
cd ../client
npm install

🚦 Running the Application
1. Start the Backend Server
bash
Copy
Edit
cd server
npm run dev

2. Start the Frontend React App
bash
Copy
Edit
cd client
npm run dev
🔐 Environment Variables
Create .env files in both client/ and server/ folders:

Example .env for Server
env
Copy
Edit
PORT=5000
MONGO_URI=mongodb://localhost:27017/language_platform
JWT_SECRET=your_jwt_secret
Example .env for Client
env
Copy
Edit
VITE_API_URL=http://localhost:5000

📦 Available Commands
Backend (in server/ folder):
Command	Description
npm run dev	Start backend with nodemon
npm start	Start backend normally

Frontend (in client/ folder):
Command	Description
npm run dev	Start Vite dev server
npm run build	Build production bundle

📌 Future Improvements
✅ Language proficiency scoring

✅ AI-based tutor suggestion

✅ File sharing and voice messages

✅ Scheduling and reminders

🤝 Contributing
Fork the repo

Create your feature branch (git checkout -b feature/FeatureName)

Commit your changes (git commit -m 'Add some feature')

Push to the branch (git push origin feature/FeatureName)

Open a Pull Request
