# Profile API Manager

A Node.js + Express + Sequelize project for managing developer profiles
with MySQL (JSON fields).

------------------------------------------------------------------------

##  Resume

You can view my resume here: [My
Resume](https://drive.google.com/file/d/1UHLPfYOyQpG_dUkfLxAIDGaJeocyykne/view?usp=drive_link)

------------------------------------------------------------------------


##  Features
- **CRUD APIs** for managing profiles.
- **Pagination** for listing profiles (`limit & page`).
- **Search** profiles by text and skills.
- **Rate limiting** to prevent abuse.
- **Health check** endpoint (`/health`).
- **Frontend HTML client** using Axios with buttons for all API actions.

---

##  Tech Stack
- **Node.js + Express**
- **MySQL + Sequelize ORM**
- **Axios (frontend API calls)**
- **express-rate-limit** (rate limiter)
- **dotenv** for environment variables

---

##  Installation

```bash
git clone https://github.com/your-username/ME-API-PLAYGROUND.git
cd ME-API-PLAYGROUND
npm install
```

Create a `.env` file:
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=profiles_db
DB_DIALECT=mysql
PORT=3000
```



Start server:
```bash
npm start
```

---

##  Rate Limiting
Implemented with [express-rate-limit](https://www.npmjs.com/package/express-rate-limit).

- **Global limiter:** 100 requests per 15 minutes per IP.
- **Write limiter (optional):** Stricter (e.g., 5 writes per minute).

Error response if exceeded:
```json
{ "error": "Too many requests, please try again later." }
```

---

##  API Endpoints

### Profiles
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/profile?page=1&limit=10` | Get paginated profiles |
| GET    | `/api/profile/:id` | Get profile by ID |
| POST   | `/api/profile` | Create new profile |
| PUT    | `/api/profile/:id` | Update profile |
| DELETE | `/api/profile/:id` | Delete profile |

### Search
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/search?q=ankit` | Search profiles |
| GET    | `/api/projects?skill=node.js` | Find projects by skill |

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/health` | Returns `{ "status": "ok" }` |

---

##  Frontend (HTML Client)
A simple `index.html` file (in `/public`) provides:
- Buttons to call each API (`Get Profiles`, `Search`, `Edit`, `Delete`, etc.`).
- Right-side panel to display JSON response.
- Modal form to **create/edit profiles** with all fields.




##  Test Cases

### 1. Create Profile

**Request**

``` http
POST /api/profile
Content-Type: application/json

{
  "name": "Ankit Gupta",
  "email": "ankit@example.com",
  "education": "MCA",
  "skills": ["Node.js", "Express", "MySQL"],
  "projects": [
    {
      "title": "Wow-tour",
      "description": "A travel booking app with JWT auth & CRUD APIs",
      "skills": ["Node.js", "Express", "MongoDB"],
      "link": "https://github.com/johndoe/wow-tour"
    }
  ],
  "links": { "github": "https://github.com/ankit" }
}
```

**Expected Response**

``` json
{ "insertedId": 1 }
```

------------------------------------------------------------------------

### 2. Get All Profiles

**Request**

``` http
GET /api/profile?page=1&limit=2
```

**Expected Response**

``` json
{
  "page": 1,
  "totalPages": 1,
  "totalProfiles": 1,
  "data": [
    {
      "id": 1,
      "name": "Ankit Gupta",
      "email": "ankit@example.com",
      "education": "MCA",
      "skills": ["Node.js", "Express", "MySQL"],
      "projects": [ ... ],
      "links": { "github": "https://github.com/ankit" }
    }
  ]
}
```

------------------------------------------------------------------------

### 3. Search by Skill

**Request**

``` http
GET /api/projects?skill=node.js
```

**Expected Response**

``` json
[
  {
    "profileId": 1,
    "project": {
      "title": "Wow-tour",
      "description": "A travel booking app with JWT auth & CRUD APIs",
      "skills": ["Node.js", "Express", "MongoDB"],
      "link": "https://github.com/johndoe/wow-tour"
    }
  }
]
```

------------------------------------------------------------------------

### 4. Delete Profile

**Request**

``` http
DELETE /api/profile/1
```

**Expected Response**

``` json
{ "deleted": 1 }
```

------------------------------------------------------------------------

##  Health Check

**Request**

``` http
GET /health
```

**Expected Response**

``` json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2025-09-08T19:47:29.475Z"
}
```
