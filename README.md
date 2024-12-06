# Full-Stack Authentication System  
A complete authentication system built with **React**, **Next.js**, **Node.js**, and other modern tools, divided into two sections:  
- `/client` for the frontend  
- `/server` for the backend  

This project includes secure authentication, database integration, and modern UI using **ShadCN**, **Tailwind CSS**, **Bun**, **Prisma**, and **PostgreSQL**.  

---

## **Features**  
### **Client (/client)**  
- Built with **React** and **Next.js**  
- **ShadCN** components and **Tailwind CSS** for styling  
- **TypeScript** for type safety  
- JWT-based authentication with API integration  

### **Server (/server)**  
- **Node.js** with **Express.js** backend  
- **Bun** for faster server runtime  
- Database integration using **Prisma ORM** and **PostgreSQL**  
- Secure routes with role-based access control  
- Environment variables managed using `.env`  

---

## **Installation Guide**

### **Requirements**
- **Node.js** (LTS)  
- **Bun** (for backend runtime)  
- **PostgreSQL** (for database)  
- **pnpm** or **yarn** (preferred package managers)  

---

### **Setup Steps**  

#### **1. Clone the Repository**  
```bash
git clone https://github.com/awebcode/next-express-jwt-auth-role-authorization.git
cd next-express-jwt-auth-role-authorization
```

client/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable UI components
│   ├── hooks/       # Custom React hooks
│   ├── pages/       # Next.js pages
│   ├── styles/      # Global styles (Tailwind)
│   └── utils/       # Utility functions
├── .env.local       # Environment variables for client
└── tsconfig.json    # TypeScript configuration

# License
This project is licensed under the MIT License.