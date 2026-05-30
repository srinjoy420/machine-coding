# Notes App

A full-stack notes application for creating, viewing, filtering, searching, editing, and deleting notes. The frontend is a React SPA; the backend is an Express API backed by MongoDB.

## Features

- Create, edit, and delete notes
- Filter notes by status: **All**, **In Progress**, **Done**, **Pending**
- Search notes by title or description
- Status badges on each note card
- Modal form for new and existing notes (`NoteFormDialog`)
- Toast notifications for API success and errors

## Tech Stack

| Layer    | Technologies                                      |
| -------- | ------------------------------------------------- |
| Frontend | React 19, Vite, Tailwind CSS, shadcn/ui, Zustand, Axios |
| Backend  | Node.js, Express 5, Mongoose, MongoDB             |

## Project Structure

```
notes/
├── backend/
│   └── src/
│       ├── server.js           # Express app entry
│       ├── DB/db.js            # MongoDB connection
│       ├── Routes/notes.routes.js
│       ├── controller/Todo.controller.js
│       └── model/Notes.model.js
├── frontend/
│   └── src/
│       ├── Pages/NotesPage.jsx
│       ├── components/         # NoteGrid, NoteCard, NoteFormDialog, Topbar, etc.
│       ├── store/Todostore.js  # Zustand state + API calls
│       └── lib/axios.js        # API client
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))

## Getting Started

### 1. Clone and install dependencies

```bash
# Backend
cd backend
npm install

# Frontend (new terminal)
cd frontend
npm install
```

### 2. Backend environment variables

Create `backend/.env`:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/notes
```

Replace `MONGO_URI` with your MongoDB connection string if using Atlas or a different host.

### 3. Run the backend

```bash
cd backend
npm run dev
```

The API runs at `http://localhost:3000` (or the port set in `.env`).

### 4. Run the frontend

```bash
cd frontend
npm run dev
```

Open `http://localhost:5173` in your browser.

> The frontend is configured to call `http://localhost:3000/api/v1/todo`. CORS allows `http://localhost:5173` with credentials.

## API Reference

Base URL: `http://localhost:3000/api/v1/todo`

| Method | Endpoint           | Description                    |
| ------ | ------------------ | ------------------------------ |
| POST   | `/create`          | Create a note                  |
| GET    | `/getall`          | Get all notes                  |
| GET    | `/status?status=`  | Get notes by status            |
| PUT    | `/update/:id`      | Update a note (title, description) |
| DELETE | `/delete/:id`      | Delete a note                  |

### Note model

| Field         | Type   | Description                                      |
| ------------- | ------ | ------------------------------------------------ |
| `title`       | String | Required, unique (stored lowercase on create)    |
| `description` | String | Required on create/update                        |
| `status`      | String | `InProgress`, `Done`, or `Pending` (default: `InProgress`) |

### Example: create a note

```bash
curl -X POST http://localhost:3000/api/v1/todo/create \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"My Note\",\"description\":\"Some text\",\"status\":\"InProgress\"}"
```

## Frontend Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start Vite dev server    |
| `npm run build`   | Production build         |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## Backend Scripts

| Command         | Description                    |
| --------------- | ------------------------------ |
| `npm run dev`   | Start server with nodemon      |

## How the UI fits together

1. **NotesPage** loads notes on mount via `getAllNotes()` from the Zustand store.
2. **Filter tabs** and **search** narrow the list client-side.
3. **New Note** or clicking a card sets `currentNote` in the store and opens **NoteFormDialog**.
4. **Save** calls `createNote` or `updateNote`; the dialog closes only when the API succeeds.
5. **Delete** removes the note from the store and clears `currentNote` if that note was open.

## Troubleshooting

| Issue | What to check |
| ----- | ------------- |
| `cant connect with mongDb` | MongoDB is running; `MONGO_URI` in `.env` is correct |
| CORS errors | Backend `origin` in `server.js` matches the Vite URL (`http://localhost:5173`) |
| Notes not loading | Backend is running on port 3000; check browser network tab for `/getall` |
| Empty list after fetch | API returns 404 when no notes exist — the app treats that as an empty list |

## License

ISC
