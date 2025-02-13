# React + TypeScript + Vite

# HandDripper ☕

HandDripper is a platform designed for pour-over coffee enthusiasts to record and analyze the impact of various brewing variables on coffee flavor.

## 🚀 Key Features

- 🔒 **User Authentication**: Implemented with Supabase Auth for user registration, login, and email verification.
- 🌐 **Responsive Design**: Optimized for both desktop and mobile use, enabling users to log their brewing process anytime, anywhere.
- 🌐 **Iced/Hot Coffee Option**: Users can select iced or hot coffee. For iced coffee, the form shows fields for ice ratio and weight.
- 📌 **Brewing Variables Tracking**: Record essential variables such as coffee-to-water ratio, water temperature, grind size, and pouring technique.
- 📌 **Dynamic Coffee-to-Water Ratio**: The required water amount is automatically calculated based on the coffee weight and ratio.
- 📊 **History Preview**: Preview past brewing records on brewing page(form page)to quickly find the past recipe while dripping.
- 📊 **Brewing Timer**: Timer provided on brewing page(form page) to track the brewing time. Also supports manual input of the timing results.
- 📊 **History Page**: Sort or filter records by date, coffee bean name, and other criteria, allow user to quickly find their favorite recipes. Each record also provides options to "Pin" (mark recipe) and "Edit."

## 🛠 Technical Stack

| Technology           | Description                                               |
| -------------------- | --------------------------------------------------------- |
| **Frontend**         | React + React Router (SPA)                                |
| **Styling**          | Tailwind CSS + Headless UI                                |
| **State Management** | TanStack Query (React Query) for API requests and caching |
| **Backend**          | Supabase (PostgreSQL Database)                            |
| **Authentication**   | Supabase Auth (Email verification)                        |
| **Deployment**       | Vercel                                                    |

## 📦 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/shanwu712/HandDripper.git
cd HandDripper
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env` file based on `.env.example` and fill in your Supabase API keys.

### 4️⃣ Start the development server

```bash
npm run dev
```

The application will run at `http://localhost:5173/`

## 📸 Screenshots

![Demo Screenshot on brewing page(form page)](https://i.imgur.com/5Dt5G9j.png)
![Demo Screenshot on histories page](https://i.imgur.com/rpC82vP.png)

## 🌍 Live Demo

### 3️⃣ Test Account

**Email Address**: testdripping@example.com
**Email Address**: startdripping!
🔗 [HandDripper Live](https://hand-dripper.vercel.app/)
