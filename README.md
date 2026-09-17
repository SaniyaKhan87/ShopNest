# ShopNest

**Everything You Need, All in One Place.**

A modern, responsive mini e-commerce web application built with React, Vite, and React Router. Designed as a B.Sc. IT DevOps & Kubernetes mini project — simple to run, Dockerize, and deploy.

## Tech Stack

- React.js
- Vite
- JavaScript / JSX
- React Router
- CSS
- LocalStorage for cart and order persistence

## Features

- Home page with hero, featured products, categories, and promo banner
- Products page with search, category filter, and sorting
- Product details with quantity selector, Add to Cart, and Buy Now
- Shopping cart with automatic subtotal, delivery, and grand total
- Checkout with form validation and order confirmation
- Orders page with order history and status tracking
- ShopNest Smart Assistant — local recommendation widget
- Fully responsive design (desktop, tablet, mobile)
- LocalStorage persistence for cart and orders

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── CartItem.jsx
│   ├── CategoryCard.jsx
│   └── SmartAssistant.jsx
├── pages/
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── ProductDetails.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   └── Orders.jsx
├── data/
│   └── products.js
├── context/
│   └── CartContext.jsx
├── App.jsx
└── main.jsx
```

## DevOps Roadmap

This project is structured for:

GitHub → Docker → Minikube → Kubernetes → Amazon ECR → Amazon EKS → AWS Fargate

The app is stateless on the server side and uses only client-side LocalStorage, making it easy to containerize and deploy.
