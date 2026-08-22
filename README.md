# React + TypeScript + Vite

# HandDripper ☕

[HandDripper](https://hand-dripper.vercel.app/) is a platform designed for pour-over coffee enthusiasts to record and analyze the impact of various brewing variables on coffee flavor.

## 🚀 Key Features

- 🔒 **User Authentication**: Implemented with Supabase Auth for user registration, login, and email verification.
- 📱 **Responsive Design**: Optimized for both desktop and mobile use, enabling users to log their brewing process anytime, anywhere.
- 🧊 **dynamic datalist**: Fetch the four most recent unique entries for coffee beans, drippers, roasting shops, and grinders from the database, enhancing input efficiency and avoiding duplicate suggestions.
- 🧊 **Iced/Hot Coffee Option**: Users can select iced or hot coffee. For iced coffee, the form shows fields for ice ratio and weight.
- 📝 **Brewing Variables Tracking**: Record essential variables such as coffee-to-water ratio, water temperature, grind size, and pouring technique.
- 💧 **Dynamic Coffee-to-Water Ratio**: The required water amount is automatically calculated based on the coffee weight and ratio.
- 🔄 **History Preview**: Preview past brewing records on the brewing page (form page) to quickly find the past recipe while dripping.
- ⏲️ **Brewing Timer**: Timer provided on the brewing page (form page) to track the brewing time. Also supports manual input of the timing results.
- 📜 **History Page**: Sort or filter records by date, coffee bean name, and other criteria, allowing users to quickly find their favorite recipes. Each record also provides options to "Pin" (mark recipe) and "Edit."

## 🛠 Technical Stack

| Technology           | Description                                               |
| -------------------- | --------------------------------------------------------- |
| **Frontend**         | React + React Router (SPA)                                |
| **Styling**          | Tailwind CSS + Headless UI                                |
| **State Management** | TanStack Query (React Query) for API requests and caching |
| **Backend**          | Supabase (PostgreSQL Database)                            |
| **Authentication**   | Supabase Auth (Email verification)                        |
| **Deployment**       | Vercel                                                    |


## 📸 Screenshots

<img width="800" height="500" alt="image" src="https://github.com/user-attachments/assets/2c9ef5fb-c662-4bc2-98a8-3b0484cbd486" />
<img width="800" height="500" alt="image" src="https://github.com/user-attachments/assets/728954e1-c30d-488c-95d2-12cc8162ab89" />

## 🌍 Live Demo

### ☕ Try HandDripper right now!

🔗 [HandDripper](https://hand-dripper.vercel.app/)

### 🔐 Test Account

**Email Address**: testdripping@example.com
**Email Address**: startdripping!
