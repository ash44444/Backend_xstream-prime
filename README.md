

# 🎬 XStream-Prime Backend

XStream-Prime is a backend clone of Prime Video built with Node.js, Express, and MongoDB. It includes multi-profile support, video streaming, watch history tracking, and admin-only video upload features.

---

✅ XStream-Prime – Completed Backend Features (Production-Ready)
🔐 1. Authentication System (JWT-based)

    Register: /api/auth/register

        Includes isAdmin role flag

    Login: /api/auth/login

    Middleware: Auth protection & role-based access

    Logout: Sessionless JWT; logout by removing token client-side

👥 2. Multi-Profile Support (like Netflix/Prime)

    One user account → Multiple profiles

    Endpoints:

        POST /api/profiles — create profile

        GET /api/profiles — list all profiles

        DELETE /api/profiles/:id — delete profile

    Each profile has own watch history/feed

📽️ 3. Video Upload & Streaming (Self-Made Video Player)

    Admin-only uploads

    Supports:

        Video file (.mp4)

        Thumbnail file (.jpg/.png)

        Genre/category tags

    Endpoints:

        POST /api/videos/upload — admin uploads

        GET /api/videos/stream/:id — stream video with range headers

🧠 4. Watch History Tracking

    Resume & continue watching logic

    Endpoints:

        POST /api/watch-history/update — update progress

        GET /api/watch-history — list watched videos per profile

        Built-in pagination & "Continue Watching" logic

🏠 5. Feed System

    Personalized home feed API

    Continue watching + Latest videos

    Supports ?genre=Comedy filtering

    Endpoint: GET /api/feed

🗑️ 6. Admin-only Delete API

    Delete a video by ID

    Endpoint: DELETE /api/videos/:id

📚 7. Movie Catalog API

    Optional separate Movie model (if not using Video model directly)

    Endpoint: GET /api/movies?genre=Action&search=spiderman

📂 8. File Handling

    Multer-based middleware

    Uploads are separated:

        /uploads/videos

        /uploads/thumbnails

🎭 9. Profile Switching System

    Profile context stored in JWT (or middleware memory)

    Blocks content access unless active profile is selected

    ✅ Throws error like:

    {
      "message": "Please select a profile to continue"
    }

✅ BONUS: Admin Tools

    Directly set isAdmin: true during registration or by:

    db.users.updateOne({ email: "admin@example.com" }, { $set: { isAdmin: true } })

✅ Tech Stack (Backend)

    Node.js + Express

    MongoDB + Mongoose

    JWT Auth

    Multer for file uploads

    Custom middleware for auth/admin/profile checks

    Postman tested endpoints
