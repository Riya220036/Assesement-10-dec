# Backend (Project Overview and UI Reference)

Quick setup instructions to run the backend locally.

1. Install dependencies

```powershell
cd backend
npm install
```

2. Configure environment

Copy `.env.example` to `.env` and update `MONGODB_URI` if needed.

3. Run the server

```powershell
npm run dev
# or
npm start
```

API endpoints (basic)

- `GET /api/projects` - list projects
- `POST /api/projects` - create project
- `GET /api/projects/:id` - get project
- `PUT /api/projects/:id` - update project
- `DELETE /api/projects/:id` - delete project

- `GET /api/clients` - list clients
- `POST /api/clients` - create client

- `GET /api/contacts` - list contacts
- `POST /api/contacts` - create contact

- `GET /api/subscribers` - list subscribers
- `POST /api/subscribers` - add subscriber
