# DCOODE Careers API

## Local setup

1. Create `backend/.env` by copying `.env.example`.
2. Set `MONGODB_URI` to your MongoDB Atlas connection URL (or local MongoDB URL). Replace `JWT_SECRET` with a long random secret. Set an admin password in `ADMIN_PASSWORD`.
3. From this folder, run `npm run seed:admin` once to create the admin account.
4. Start the API with `npm start` (or `npm run dev` while developing).
5. Keep the frontend's `VITE_API_URL` set to `http://localhost:5000` for local development.

The API will not start until MongoDB is configured. `.env` contains secrets and should never be committed.
