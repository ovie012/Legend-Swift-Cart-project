# 🛒 Legend Cart

A modern, production-grade mini e-commerce frontend built with React and designed to mirror real-world 2026 e-commerce experiences.

Legend Cart demonstrates scalable frontend architecture, state management with Zustand, animated UI with Framer Motion, and form validation using React Hook Form + Zod ... all without a backend.

---

## Live Demo

🔗 https://legend-swift-cart-project.vercel.app/

---

## Project Overview

Legend Cart is a portfolio-focused e-commerce application built to reflect modern frontend best practices and real-world architecture patterns.

It includes:

- Product listing with pagination  
- Category filtering  
- Debounced search  
- Product detail view  
- Cart management with persistence  
- Checkout flow (UI only)  
- Authentication pages (UI only)  
- Route protection  
- Responsive layout  
- Smooth micro-interactions  

This project emphasizes clean architecture, performance, and user experience.

---

## 🛠 Tech Stack

### Core
- React (JavaScript)
- Vite
- React Router DOM

### Styling
- Tailwind CSS
- Styled Components

### State Management
- Zustand (with persist middleware)

### Animations
- Framer Motion

### Forms & Validation
- React Hook Form
- Zod

### API & Data
- Axios
- DummyJSON API

---

## Features

### Home Page
- Hero section  
- Featured products  
- Category preview  
- Animated entrances  

### Products Page
- Paginated product listing  
- Category filtering  
- Debounced search  
- Loading skeleton  
- Error handling  
- Animated product cards  

### Product Details
- Individual product fetch  
- Rating display  
- Image preview  
- Add to cart interaction  

### Cart System
- Add / remove items  
- Increase / decrease quantity  
- Real-time total calculation  
- Persisted cart (localStorage)  
- Empty cart state  

### Checkout
- Shipping & billing form  
- Zod validation  
- Order summary  
- Fake processing state  
- Route protection  

### Authentication (UI Only)
- Login  
- Signup  
- Forgot Password  
- Form validation  
- Disabled submit state  
- Mock authentication state  

---

## State Management

Zustand is used for:

- Cart state  
- Auth state  
- Persist middleware for cart  

### Why Zustand?

- Minimal boilerplate  
- Clean API  
- Scalable  
- Avoids Redux complexity  

---

## Animations

Framer Motion is used for:

- Page transitions  
- Hover interactions  
- Cart interactions  
- Button tap effects  
- Subtle fade-in animations  

All animations are minimal and performance-friendly.

---

## API Integration

Data is fetched from:

https://dummyjson.com

---

## Performance Considerations

- Route-based code splitting (React.lazy)  
- Suspense fallback loaders  
- Memoization where necessary  
- Avoided unnecessary re-renders  
- Proper key usage in lists  
- Debounced search  
- Centralized API configuration  

---

## Responsive Design

Mobile-first approach using Tailwind CSS.

Breakpoints optimized for:

- Mobile  
- Tablet  
- Desktop  

---

## Future Improvements

- Dark mode toggle  
- Cart drawer instead of full page  
- Toast notifications  
- Real authentication backend  
- Payment integration  
- Wishlist functionality  

---

## What This Project Demonstrates

- Scalable React architecture  
- State management with Zustand  
- Clean separation of concerns  
- Modern UI/UX principles  
- Form validation best practices  
- Production-ready frontend setup  
- API abstraction discipline  

---

## Author

**Ovie Emonefe**  
Frontend Developer
