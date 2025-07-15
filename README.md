# Lootopia Quest Hub

A modern web app for treasure hunt management and participation, featuring role-based authentication (JOUEUR, ORGANISATEUR, ADMINISTRATEUR).

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repo-url>
cd lootopia-quest-hub-03-main
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```

The app will be available at [http://localhost:8080](http://localhost:8080) (or the port shown in your terminal).

---

## 🔐 Authentication & Roles

The app uses a static user list for authentication. You can log in as any of the following users to test different roles:

| Role              | Email                | Password   |
|-------------------|---------------------|------------|
| JOUEUR            | joueur@example.com   | joueur123  |
| ORGANISATEUR      | orga@example.com     | orga123    |
| ADMINISTRATEUR    | admin@example.com    | admin123   |

- **JOUEUR**: Can join and play hunts, but cannot create hunts.
- **ORGANISATEUR**: Can create and manage their own hunts.
- **ADMINISTRATEUR**: Has access to admin pages.

---

## 🧭 Features
- Role-based navigation and page access
- Simulated login/logout with persistent session
- Responsive UI with modern design
- Toast notifications for feedback

---

## 🛠️ Tech Stack
- React + TypeScript
- React Router
- Tailwind CSS
- Lucide Icons
- [Other dependencies: see `package.json`]

---

## 📝 Notes
- No backend required: all authentication is simulated with static users.
- To test different roles, log out and log in with another user from the table above.

---

## 📂 Project Structure
- `src/pages/` — Main app pages (Login, Hunts, Admin, etc.)
- `src/components/` — UI and layout components
- `src/lib/staticUsers.ts` — Static user list
- `src/lib/authService.ts` — Auth logic
- `src/contexts/AuthContext.tsx` — Auth context provider

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License
[MIT](LICENSE)
