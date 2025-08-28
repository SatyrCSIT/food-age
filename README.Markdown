# 🍽️ Age → Food Recommender

A modern web application that recommends healthy food options based on the user's age.  
Built with **Next.js 15**, **Prisma**, **PostgreSQL**, and **TailwindCSS**.  

---

## ✨ Features

- 👤 **Age-based recommendations**  
  Enter your age and instantly get recommended food categories with explanations.  

- 📊 **Nutritional reasoning**  
  Each suggestion comes with a short reason (e.g., protein, calcium, heart health).  

- ⚡ **Modern UI/UX**  
  Clean design with TailwindCSS, Google Fonts (Inter + Noto Sans Thai), and subtle animations.  

- 💾 **Database powered**  
  Uses Prisma ORM + PostgreSQL with structured models (Food, Tags, AgeBand).  

---

## 🛠️ Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)  
- [TypeScript](https://www.typescriptlang.org/)  
- [TailwindCSS](https://tailwindcss.com/) for styling  
- [Prisma](https://www.prisma.io/) ORM  
- [PostgreSQL](https://www.postgresql.org/) via Railway/Neon  

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/age-food-app.git
cd age-food-app
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

> ⚠️ Do not commit `.env` files. They contain sensitive information.

---

## 🗄️ Database Setup

Run Prisma migrations to create the database schema:

```bash
npx prisma migrate dev --name init
```

(Optional) Seed the database with default food recommendations:

```bash
npx prisma db seed
```

Explore data visually with Prisma Studio:

```bash
npx prisma studio
```

---

## 🚀 Development

Start the local development server:

```bash
npm run dev
```

Your app will be available at [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Structure

```
src/
 ├─ app/              # Next.js App Router pages & API routes
 │   ├─ api/          # Backend API (recommendations, etc.)
 │   ├─ layout.tsx    # Root layout with header/footer
 │   └─ page.tsx      # Main page
 ├─ components/       # UI components (AgeForm, Filters, Results)
 ├─ lib/              # Prisma client, utilities
 └─ styles/           # Global CSS, Tailwind config
prisma/
 ├─ schema.prisma     # Database schema
 └─ seed.ts           # Seed script with food data
```

---

## ⚖️ Disclaimer

This project provides **general nutritional guidance only**.  
It is **not medical advice**. For specific health conditions, please consult a doctor or nutritionist.

---

## 👨‍💻 Author

**Dev by Satyr**  
Project maintained and built with ❤️ using Next.js & Prisma.
