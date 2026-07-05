# 🍱 Food Saver

Food Saver is a full-stack web application developed to reduce food waste by connecting food providers with users who can purchase surplus food at affordable prices.

The application allows providers to upload available food items, while users can browse, order, and collect food before it is wasted.

---

## 🚀 Features

### 👤 User
- User Registration & Login
- Browse available food items
- View food details
- Place food orders
- View order history

### 🏪 Provider
- Provider Registration & Login
- Add food items
- Update food details
- Delete food items
- Manage food availability
- View received orders

### 📦 Order Management
- Place orders
- Quantity validation
- Automatic stock update
- Order history
- Provider order tracking

---

## 🛠️ Tech Stack

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- REST API

### Database
- MySQL

### Frontend
- HTML
- CSS
- JavaScript

### Tools
- IntelliJ IDEA
- Visual Studio Code
- MySQL Workbench
- Postman
- Git
- GitHub

---

## 📂 Project Structure

```
FoodSaver/
│
├── backend/
│   ├── controller
│   ├── service
│   ├── repository
│   ├── model
│   ├── config
│   └── FoodSaverApplication.java
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── images/
│
└── database/
    └── foodsaver.sql
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/FoodSaver.git
```

### Backend

1. Open the backend project in IntelliJ IDEA.
2. Configure MySQL database.
3. Update `application.properties`.
4. Run the Spring Boot application.

### Frontend

1. Open the frontend folder in Visual Studio Code.
2. Run `index.html` using Live Server.

---

## Database Configuration

Update your `application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/foodsaver
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
```

---

## API Modules

- User API
- Provider API
- Food API
- Order API

---

## Future Enhancements

- AI-based food recommendation
- Google Maps integration
- Online payment gateway
- Email notifications
- Admin dashboard
- Food expiry reminders
- Mobile application

---


## License

This project is developed for educational purposes.
