Overview:
This is a full-stack real-time SSH Login Activity Monitor Application 
Technologies and frameworks:
Backend: Monolith application created using Node.js, Express, MongoDB, Socket.IO, file tailing for SSH login logs, rate-limiter, expres-async-handler and graceful-shutdown functionality.
Frontend: React (Vite + TypeScript) app with a live-updating Material-UI DataGrid, possibilities of filtering, sorting, pagination.
Deployment: Easily deployable using Docker Compose yaml file.


System Overview:
SSH Login Activity Monitor collects, stores, and visualizes SSH login events from a Linux-style log file.
Features:
Real-time monitoring: New SSH logins are instantly displayed in the UI Grid.
Historical records: All past logins are loaded from MongoDB.
UI: Responsive Material-UI DataGrid.
In purpose to run: One command with Docker Compose for a complete stack.

Architecture & Components
┌──────────┐      REST + WebSockets     ┌──────────────┐
│          │  <---------------------->  │              │
│ Frontend │      (Socket.IO + API)     │   Backend    │
│  (Vite   │  <---------------------->  │ (Express,    │
│  React)  │                            │  MongoDB,    │
└──────────┘                            │  Tail logs)  │
                                        └─────┬────────┘
                                              │
                                        tails ssh-auth.log
                                              │
                                          MongoDB

Frontend: Vite+React+TypeScript app, Socket.IO client, REST API for history, MUI DataGrid.
Backend: Node.js, Express API, Socket.IO server, MongoDB integration, tails a log file (ssh-auth.log).
MongoDB: Stores all login events.
Log file (ssh-auth.log): Simulated SSH log; append lines to test.


Prerequisites
Docker Desktop (for macOS/Windows/Linux)
Git (optional, for cloning repo)


Quickstart (with Docker Compose)
1. Clone the repository:
git clone https://github.com/Joebye/ssh-activity-backend
(repo above includes both frontend and backend)
cd ssh-activity

2. Start all services:
docker compose up --build
Frontend: http://localhost:5173
Backend API: http://localhost:3501
MongoDB: localhost:27017 (internal to Docker network)

3. Testing the System
Simulating SSH Logins:
Append fake SSH login lines to the log file to see real-time updates:
Inside the running backend container please run (example):

echo "Jul 20 22:22:01 my-mac sshd[12350]: Accepted password for Bro from 10.22.0.11 port 50139 ssh2" >> ssh-auth.log

Once you push this data your web-application receive real-time updated data. All previious logins are stored as well for viewing them. 