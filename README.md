# Next.js Authentication Project

This project is a full-featured authentication system built with **Next.js**, **Neon DB**, **Prisma ORM**, and **Auth.js**. It includes user authentication, admin testing, and user settings management.

## Features

- **User Authentication**: Sign up and log in using Auth.js.
- **Dashboard**: Displays user information using both server and client components.
- **Admin Testing**: A dedicated page to test admin credentials.
- **User Settings**: Allows users to update their settings.
- **Database**: Uses Neon DB with Prisma ORM for efficient data storage and retrieval.

## Technologies Used

- **Next.js** – React-based framework for server-side rendering and API handling.
- **Neon DB** – Cloud-based PostgreSQL database.
- **Prisma ORM** – Database ORM for type-safe and scalable queries.
- **Auth.js** – Secure authentication provider.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (Latest LTS recommended)
- **PostgreSQL** (Using Neon DB)
- **Prisma** (Installed via npm)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```
2. Install dependencies:

```sh
    npm install
```

3. Set up environment variables:
   Create a .env file in teh root directory and add the following

```sh
DATABASE_URL="your_neon_db_url"
NEXTAUTH_SECRET="your_auth_secret"
NEXTAUTH_URL="http://localhost:3000"
```

4. Run Prisma migrations:

```sh
npx prisma migrate dev
```

5. Start the development server:

```sh
npm run dev
```

## License

This project is licensed under the MIT License.
