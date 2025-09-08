# Profile API Manager

A simple Node.js + Express + MySQL (Sequelize) backend with a frontend HTML/JS client for managing user profiles.  
Includes **pagination**, **search**, **rate limiting**, and **health check**.

---

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

