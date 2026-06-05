# Lead Management CRM

A Full Stack CRM application built using MERN Stack.

## Features

- Add Leads
- View Leads
- Delete Leads
- Search Leads
- Filter Leads
- Update Lead Status
- Lead Statistics Dashboard
- Responsive Layout

## Tech Stack

Frontend:
- React.js

Backend:
- Node.js
- Express.js

Database:
- MongoDB Atlas

## Installation

Backend

```bash
cd server
npm install
npm run dev

Frontend

cd client
npm install
npm run dev
Environment Variables

Create .env inside server folder

MONGO_URI=your_mongodb_uri
PORT=5001
API Endpoints

POST /api/leads

GET /api/leads

PUT /api/leads/:id

DELETE /api/leads/:id

GET /api/leads/search?q=value

Author

Dasari Sai Teja


---