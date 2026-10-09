# 🛍️ FOREVER E-Commerce Platform

A full-featured e-commerce platform that enables users to browse products, filter by categories, manage carts, and place orders with integrated payment options. Includes an integrated Admin Portal for product and order management.

---

## 🌐 Live Demos

- **User Frontend:** [forever-ecommerce-user-frontend.vercel.app](https://forever-ecommerce-user-frontend.vercel.app/)
- **Admin Dashboard:** [forever-ecommerce-admin-dusky.vercel.app](https://forever-ecommerce-admin-dusky.vercel.app/)

---

## ✨ Key Features

- **Product Discovery:** Search and filter products by categories and subcategories.
- **Cart Management:** Dynamic cart updating with product size selection.
- **Checkout & Address Details:** Seamless order placement and delivery detail entry.
- **Multiple Payment Gateways:** Support for Cash on Delivery (COD), Stripe, and eSewa.
- **Admin Panel:** Add/remove products, manage listed inventory, and update live order statuses.

---

## 📖 User Guide & Test Credentials

### 🛒 How to Use as a Customer

1. **Access Account:** Click the **User** icon on the navigation bar to register or log in.
2. **Browse Products:** Head to the **Collection** page to search or apply category filters.
3. **Select Options:** Click on any product, choose your desired size, and click **Add to Cart**.
4. **Checkout:** Proceed to your cart, review items, and click **Place Order**.
5. **Payment:** Enter delivery details and select your preferred payment method:

#### 💳 Stripe Test Credentials
- **Card Numbers:** `4242 4242 4242 4242`, `4000 0566 5566 5556`, or `5555 5555 5555 4444`
- **Expiry Date:** Any future date (e.g., `12/30`)
- **CVC:** Any 3 digits (e.g., `123`)

#### 🇳🇵 eSewa Test Credentials
- **eSewa ID:** `9711111111` / `9711111112` / `9711111113` / `9711111114`
- **Password:** `Nepal@123`
- **MPIN:** `1122`
- **Token:** `123456`

---

### 🛡️ How to Use as an Admin

1. Open the [Admin Panel Link](https://forever-ecommerce-admin-dusky.vercel.app/).
2. Log in using admin credentials.
3. Use the sidebar menu to:
   - **Add Items:** Upload new products with sizes, prices, and categories.
   - **List Items:** View and manage existing products.
   - **Orders:** View order item details, payment status, customer info, and update order fulfillment statuses.

---

## 💻 Tech Stack

- **Frontend:** React, React Router, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Payment Processing:** Stripe API, eSewa Gateway Integration
- **Hosting:** Vercel

---

## 🛠️ Local Development Setup

### Prerequisites
- Node.js (`>= 18.x`)
- npm or yarn

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/forever-ecommerce.git](https://github.com/your-username/forever-ecommerce.git)
   cd forever-ecommerce
