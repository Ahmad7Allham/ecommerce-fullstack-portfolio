# E-Commerce Full-Stack Portfolio

A full-stack e-commerce application built as a portfolio project to demonstrate modern frontend development, backend integration, authentication, cart management, and payment processing.

## 🚀 Project Overview

This project is an e-commerce storefront where users can:

- Browse available products
- View detailed product information
- Add products to the cart
- Update and remove cart items
- Authenticate using Clerk
- Proceed through checkout
- Create a Stripe payment intent
- Complete test payments using Stripe Test Mode
- Receive an order confirmation email

The application uses **Next.js** for the frontend and **Strapi** as the backend API.

## 🛠️ Tech Stack

### Frontend

- Next.js 15
- React
- Tailwind CSS
- Clerk
- Axios
- Stripe
- Lucide React
- Cloudinary

### Backend

- Strapi
- REST API
- SQLite / configured Strapi database
- Cloudinary media storage

### Payment & Email

- Stripe Test Mode
- Email API

## 🏗️ Project Structure

```text
ecommerce-fullstack-portfolio/
│
├── README.md
│
├── front-end/
│   ├── app/
│   │   ├── _components/
│   │   ├── _context/
│   │   ├── _utils/
│   │   ├── api/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── payment-confirm/
│   │   ├── product-details/
│   │   └── page.js
│   │
│   ├── public/
│   ├── package.json
│   ├── next.config.mjs
│   └── ...
│
└── back-end-strapi/
    ├── src/
    ├── config/
    ├── database/
    ├── public/
    └── ...
```

## 🔄 Application Flow

The main product flow is:

```text
Home
  ↓
Product Section
  ↓
Product List
  ↓
Product Item
  ↓
Product Details
  ↓
Add to Cart
  ↓
Cart
  ↓
Checkout
  ↓
Stripe Payment
  ↓
Payment Confirmation
  ↓
Order Confirmation Email
```

### Frontend → Backend

The frontend communicates with Strapi through Axios.

For example:

```text
ProductSection
      ↓
ProductApis
      ↓
axiosClient
      ↓
Strapi REST API
      ↓
Products
```

This keeps API communication separated from UI components.

## 🛒 Cart Architecture

Cart state is managed using React Context.

```text
CartContext
     ↓
Shared cart state
     ↓
Header / Cart / Checkout
```

The application also uses dedicated API utilities to communicate with the Strapi cart endpoints.

This separates:

- Client-side cart state
- Backend persistence
- UI components

## 💳 Payment Flow

Stripe is configured in **Test Mode** for development.

The checkout flow is:

```text
Checkout Form
      ↓
Next.js API Route
      ↓
Stripe Payment Intent
      ↓
Stripe Test Payment
      ↓
Payment Confirmation
      ↓
Order Confirmation
```

No real payments are processed by this project during development.

## 🔐 Authentication

Authentication is handled using Clerk.

Protected functionality can use the authenticated user's identity while communicating with the backend.

Development Clerk keys are used locally. Production deployments should use the appropriate production credentials.

## ☁️ Media

Product images are managed through Cloudinary and served through the Strapi product data.

The frontend renders product images using Next.js Image.

## ⚙️ Environment Variables

Environment variables are required for local development.

### Frontend

Create:

```text
front-end/.env.local
```

Add the required variables for:

- Strapi API URL
- Clerk
- Stripe
- Email service
- Other frontend integrations

### Backend

Create:

```text
back-end-strapi/.env
```

Add the required Strapi configuration and service credentials.

> Never commit real API keys, secret keys, database credentials, or other sensitive values to GitHub.

Example environment files should contain variable names only, never real credentials.

## 💻 Local Development

### 1. Clone the repository

```bash
git clone https://github.com/Ahmad7Allham/ecommerce-fullstack-portfolio.git
```

### 2. Start the Strapi backend

```bash
cd back-end-strapi
npm install
npm run develop
```

### 3. Start the Next.js frontend

Open another terminal:

```bash
cd front-end
npm install
npm run dev
```

Then open the local frontend URL shown by Next.js.

## 🧪 Testing

The application has been manually tested through the main user journey:

- Product listing
- Product details
- Add to cart
- Cart editing and deletion
- Stripe test payment
- Payment confirmation
- Email confirmation
- TypeScript/editor checks
- Production build

The production build has also been verified with:

```bash
npm run build
```

## 📌 Current Status

The core e-commerce functionality is working locally, including:

- Product browsing
- Product details
- Cart management
- Checkout
- Stripe Test Mode
- Payment confirmation
- Email confirmation
- Clerk authentication

The next stage is deployment and production configuration.

## 🔮 Future Improvements

Possible future improvements include:

- Production deployment
- Improved product filtering and search
- Better loading skeletons
- Pagination
- Product reviews
- Wishlist functionality
- Improved checkout UX
- Additional payment methods
- Automated tests
- More comprehensive error handling

## 👨‍💻 Purpose

This project was built as a portfolio project to demonstrate practical full-stack development skills and to understand how a modern e-commerce application is structured from frontend UI through backend APIs and payment processing.