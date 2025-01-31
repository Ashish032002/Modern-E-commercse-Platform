# 🛍️ ShopVista - Modern E-commerce Platform

🌟 A cutting-edge e-commerce platform built with the MERN stack, featuring real-time inventory tracking, secure payments, and a stunning UI! 🚀
</div>

## ✨ Features

- 🔐 Secure JWT Authentication & Authorization
- 💳 Stripe Payment Integration
- 🛒 Real-time Cart Management
- 📦 Dynamic Product Catalog
- 📱 Responsive Mobile-First Design
- 🌐 Multi-language Support
- 📊 Admin Dashboard & Analytics
- 🔍 Advanced Search & Filtering
- ⭐ Product Reviews & Ratings
- 📨 Email Notifications

## 🚀 Tech Stack

- 🎯 **Frontend**: React.js, Material-UI, Redux Toolkit
- 🛠️ **Backend**: Node.js, Express.js
- 🗄️ **Database**: MongoDB
- 📡 **Real-time**: Socket.io
- 💳 **Payments**: Stripe
- 🔐 **Authentication**: JWT
- 📦 **State Management**: Redux + Zustand
- 🎨 **Styling**: Tailwind CSS + Material-UI

## 🛠️ Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB
- npm or yarn
- Git

### 🔧 Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/shopvista.git
cd shopvista
```

2. **Install Dependencies**
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. **Environment Variables**

Create `.env` files in both client and server directories:

```env
# Server .env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
PORT=5000

# Client .env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

4. **Start Development Servers**
```bash
# Start backend server
cd server
npm run dev

# Start frontend server
cd ../client
npm start
```

## 📱 Screenshots

<div align="center">
  <img src="docs/screenshot1.png" alt="Home Page" width="400"/>
  <img src="docs/screenshot2.png" alt="Product Page" width="400"/>
</div>

## 🌟 Key Features Explained

### 🛒 Shopping Cart
- Real-time updates using Zustand
- Persistent cart data
- Dynamic price calculations

### 💳 Payment Processing
- Secure Stripe integration
- Multiple payment methods
- Order tracking system

### 👤 User Authentication
- JWT-based auth
- Social login options
- Password reset functionality

## 📊 API Documentation

### 🔐 Authentication Endpoints
```
POST /api/auth/register - Register new user
POST /api/auth/login    - User login
POST /api/auth/refresh  - Refresh token
```

### 🛍️ Product Endpoints
```
GET    /api/products     - Get all products
POST   /api/products     - Create product
PUT    /api/products/:id - Update product
DELETE /api/products/:id - Delete product
```

## 🤝 Contributing

We love your input! Check out our [Contributing Guidelines](CONTRIBUTING.md) to get started.

1. 🍴 Fork the repository
2. 🌿 Create your feature branch (`git checkout -b feature/amazing`)
3. 💫 Commit changes (`git commit -m 'Add amazing feature'`)
4. 🚀 Push to branch (`git push origin feature/amazing`)
5. 🔄 Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Authors

- **Your Name** - *Initial work* - [GitHub Profile](https://github.com/yourusername)

## 🙏 Acknowledgments

- Hat tip to anyone whose code was used
- Material-UI for the amazing component library
- The MERN stack community

## 📞 Support

Got questions? We're here to help!

- 📧 Email: support@shopvista.com
- 💬 Discord: [Join our server](https://discord.gg/shopvista)
- 🐦 Twitter: [@shopvista](https://twitter.com/shopvista)

---

<div align="center">
  Made with ❤️ by the ShopVista team
  
  ⭐ Star us on GitHub — it helps!
</div>
