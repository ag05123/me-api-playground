# Me-API Playground (Node.js + MySQL)

Minimal implementation for the "Me-API Playground" assignment.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` from `.env.example` and set DB credentials.

3. Create database and table:
   - Use a MySQL client and run `schema.sql` and optionally `seed.sql`.

4. Start server:
   ```bash
   npm start
   ```

API:
- `GET /health` - returns 200 JSON status
- `POST /api/profile` - create profile (send JSON body)
- `GET /api/profile` - get first profile
- `GET /api/profile/:id` - get profile by id
- `DELETE /api/profile/:id` - delete profile
- `GET /api/search?q=term` - basic search
- `GET /api/projects?skill=python` - query projects by skill

Notes:
- `skills`, `projects`, `links` are stored as JSON strings in DB.
- This is intentionally minimal to meet the assignment requirements.
