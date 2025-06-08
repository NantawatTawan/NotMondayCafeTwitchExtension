# NotMondayCafeTwitchExtension

A modern Twitch Extension UI built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**.

> ✅ This is a complete UI refactor and responsive redesign of the original project.

---

## 🚀 Tech Stack

- **React** + **TypeScript**
- **Tailwind CSS** for styling
- **Vite** for fast dev build
- Custom logic with `useResponsiveScale()` and reusable components

---

## 🧩 Pages & Components

### ✅ `JoinFrame`
- Allows viewers to select a character (Skin)
- Responsive grid of characters
- Sends selected character to the host

### ✅ `QueueFrame`
- Shows who is in queue or in cafe
- Dynamically updated from game state
- Responsive layout with custom queue item components

### ✅ `OrderFrame`
- Viewers choose their food (menu item) to order
- List of available foods shown in a responsive grid
- Validates selection before proceeding

### ✅ `ReviewFrame`
- Review the character & food chosen
- Add star rating (1–5) and comment
- Supports mobile textarea expand view (`FullTextEditor`)

---

## 📦 Features

- ♻️ Reusable components: `CloseButton`, `NextButton`, `BackButton`, `StatusProgress`, etc.
- 📱 Mobile-first responsive layout with scaling fallback
- 🧠 Clean state & props management
- 🧪 Ready for extension integration with Twitch backend

---

## 🛠 How to Run Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
