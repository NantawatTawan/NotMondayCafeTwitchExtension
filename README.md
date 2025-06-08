# NotMondayCafeTwitchExtension

A modern Twitch Extension frontend built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**.

> ✅ Completely rewritten from scratch to improve code clarity, modularity, and responsive behavior.

---

## 🚀 Tech Stack

- 🧠 **React + TypeScript** – Strongly typed, component-based UI
- 🎨 **Tailwind CSS** – Utility-first responsive design
- ⚡ **Vite** – Fast dev server and build
- 🌐 **Twitch Extension API + WebSocket** – Live interaction with streamer/server

---

## 🧩 Project Structure Overview

### 🔷 `MainPage.tsx`
The entry point of the Twitch Extension UI. Handles:
- Twitch identity auth
- Real-time game state updates via WebSocket
- Navigation between each frame (`Join`, `Order`, `Review`, `Queue`)
- Dynamic buttons + hover behavior for switching screens

---

## 📖 Application Flow

```
[MainPage] 
   └── JoinFrame  →  OrderFrame  →  ReviewFrame  →  QueueFrame
```

| Frame | Description |
|-------|-------------|
| **JoinFrame** | Viewers choose a character (Skin) |
| **OrderFrame** | Choose food/menu from gameState |
| **ReviewFrame** | Rate order and submit review |
| **QueueFrame** | View current queue & cafe status |

> All frames are displayed as modal overlays on top of `MainPage`.

---

## 📦 Features

- ✅ Fully responsive with auto-scaling via `useResponsiveScale`
- ♻️ Reusable components: `CloseButton`, `StatusProgress`, `CustomerButton`, etc.
- 🧩 Modular and easy to maintain
- 💬 Real-time game state syncing from server via WebSocket
- 🔒 Twitch identity verification using `requestIdShare`

---

## 🛠 Development

### 🔧 Install dependencies:
```bash
npm install
```

### 🚀 Start dev server:
```bash
npm run dev
```

### 🌐 Twitch Auth Notes:
- Local dev uses mock game state (`mock_game_state.json`)
- When deployed, Twitch Extension will:
  - Request identity via `requestIdShare`
  - Fetch user info from backend `/extension/login`
  - Open WebSocket to subscribe to `game-state`

---

## 🗂 File Structure (short)

```
src/
├── components/        # UI components (buttons, wrappers)
├── pages/            # Main UI screens (MainPage,Join, Order, etc.)
├── hooks/             # Custom hooks (e.g. responsive scale)
├── types/             # Type definitions for GameState etc.
├── mock_game_state.json
     
```

---

## 👤 Author

This extension frontend was developed and refactored by [NantawatTawan](https://github.com/NantawatTawan) with love and focus on Twitch UX.
