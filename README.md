# AI Form Builder
![AI Form Builder Screenshot](https://raw.githubusercontent.com/jayesh-2404/formai/main/public/homepage.png)
![AI Form Builder Screenshot](https://raw.githubusercontent.com/jayesh-2404/formai/main/public/preview.png)
Create intelligent forms in seconds, not hours! AI Form Builder is a Next.js application that leverages the power of Google's Gemini AI to generate form structures based on your descriptions. Users can then customize these forms, share them, and collect responses seamlessly.

## ✨ Features

*   **🤖 AI-Powered Form Generation:** Simply describe the form you need, and AI will draft it for you.
*   **🔒 User Authentication:** Secure sign-up and sign-in functionality powered by Clerk.
*   **📊 Dashboard:** A dedicated space to manage all your created forms and view responses.
*   **✏️ Form Customization:** Easily edit form fields, labels, placeholders, and types.
*   **🎨 Theming & Styling:** Personalize your forms with various themes, background gradients, and UI styles.
*   **👁️ Live Preview:** Instantly see how your form will look to users as you edit.
*   **🔗 Share Forms:** Generate unique, shareable links for your forms.
*   **📥 Collect Responses:** Store and manage submissions for each form.
*   **ექს Export Responses:** Download form responses as Excel (.xlsx) files.
*   **📱 Responsive Design:** User-friendly experience across desktops, tablets, and mobile devices.
*   **🚀 Upgrade Options:** Tiered plans for access to more features and unlimited form creation.

## 🛠️ Tech Stack

*   **Framework:** Next.js 15 (App Router)
*   **Language:** JavaScript (with JSX)
*   **Database:** PostgreSQL (Neon)
*   **ORM:** Drizzle ORM
*   **Authentication:** Clerk
*   **AI Model:** Google Generative AI (Gemini Pro)
*   **Styling:** Tailwind CSS
*   **UI Components:** Shadcn UI, DaisyUI
*   **Icons:** Lucide React
*   **Notifications/Toasts:** Sonner
*   **API:** Next.js API Routes

##  Prerequisites

Before you begin, ensure you have the following installed:

*   Node.js (v18.x or later recommended)
*   npm, yarn, pnpm, or bun (this guide will use npm)
*   Access to a PostgreSQL database (Neon is used in this project and recommended for easy setup)
*   A Clerk account (for API keys)
*   A Google Cloud Platform project with the Generative AI API enabled (for the Gemini API key)

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/jayesh-2404-formai.git
    cd jayesh-2404-formai
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    # or
    # pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of your project and add the following environment variables. Obtain these keys from their respective services (Clerk, Google Cloud, Neon DB).

    ```env
    # Clerk Keys
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY
    CLERK_SECRET_KEY=sk_test_YOUR_SECRET_KEY
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

    # Google Gemini API Key
    NEXT_PUBLIC_GEMINI_API_KEY=YOUR_GEMINI_API_KEY

    # Neon Database Connection URL (for Drizzle ORM in the application)
    NEXT_PUBLIC_DATABASE_URL_CONFIG=postgresql://user:password@host:port/dbname?sslmode=require

    # Neon Database Connection URL (for Drizzle Kit - migrations, studio)
    # This can be the same as NEXT_PUBLIC_DATABASE_URL_CONFIG
    # Note: drizzle.config.js currently has a hardcoded URL. It's highly recommended to
    # modify drizzle.config.js to use an environment variable like this one.
    # Example modification for drizzle.config.js:
    # require('dotenv').config({ path: '.env.local' }); // Add this at the top
    # ...
    # url: process.env.DATABASE_URL_DRIZZLE_KIT,
    DATABASE_URL_DRIZZLE_KIT=postgresql://user:password@host:port/dbname?sslmode=require

    # Base URL of your application (for share links)
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    ```

    **Important Security Note:** The `drizzle.config.js` file in this project currently contains a hardcoded database URL. This is a security risk. You should modify `drizzle.config.js` to load this URL from an environment variable (e.g., `DATABASE_URL_DRIZZLE_KIT` as shown above). You can use the `dotenv` package for this:
    Install `dotenv`: `npm install dotenv --save-dev`
    Then, at the top of `drizzle.config.js`: `import 'dotenv/config';` (if using ES modules) or `require('dotenv').config({ path: '.env.local' });` (if using CommonJS style imports).
    Then replace the hardcoded URL with `process.env.DATABASE_URL_DRIZZLE_KIT`.

4.  **Database Setup (Drizzle ORM):**
    Once your database connection URL is correctly set up (especially for `drizzle.config.js`), push the schema to your database:
    ```bash
    npm run db:push
    ```
    This command uses Drizzle Kit to synchronize your schema (`configs/schema.js`) with your database.

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Available Scripts

In the project directory, you can run:

*   `npm run dev`: Runs the app in development mode.
*   `npm run build`: Builds the app for production.
*   `npm run start`: Starts the production server.
*   `npm run lint`: Lints the codebase using Next.js's built-in ESLint configuration.
*   `npm run db:push`: Pushes schema changes from `configs/schema.js` to your database using Drizzle Kit.
*   `npm run db:studio`: Opens Drizzle Studio, a local GUI to browse your database.

## 📁 Project Structure

Here's a brief overview of the key directories:

*   `app/`: Contains all the routes, UI components, and logic for the application (using Next.js App Router).
    *   `(auth)/`: Authentication pages (sign-in, sign-up).
    *   `_components/`: Global components like Header and Hero for the landing page.
    *   `_data/`: Static data files (e.g., themes, pricing plans).
    *   `aiform/[formid]/`: Page for displaying and submitting live forms.
    *   `dashboard/`: User dashboard for managing forms, viewing responses, and upgrading plans.
        *   `_components/`: Components specific to the dashboard (e.g., `CreateForm`, `FormList`, `SideNav`).
    *   `edit_form/[formId]/`: Interface for editing and customizing forms.
        *   `_components/`: Components specific to form editing (e.g., `Controller`, `FormUi`).
*   `components/ui/`: Reusable UI components from Shadcn UI.
*   `configs/`: Configuration files, including Drizzle schema (`schema.js`) and AI model setup (`AiModal.js`).
*   `drizzle/`: (Auto-generated by Drizzle Kit) Contains migration files.
*   `lib/`: Utility functions (e.g., `cn` for class names).
*   `public/`: Static assets like images and logos.

## 🌍 How It Works (User Flow)

1.  **Sign Up / Sign In:** Users create an account or log in using Clerk.
2.  **Dashboard:** After logging in, users are redirected to their dashboard.
3.  **Create Form:**
    *   Users click on "+ Create Form".
    *   They provide a textual description of the form they want (e.g., "A contact form with name, email, and message fields").
    *   The AI (Google Gemini) processes this description and generates a JSON structure for the form.
4.  **Edit Form:**
    *   The newly created form appears in the "Edit Form" interface.
    *   Users can modify field labels, placeholders, and types.
    *   They can customize the form's theme, background, and overall style using the controller panel.
    *   A live preview updates in real-time.
5.  **Share Form:**
    *   Once satisfied, users can get a shareable link for their form.
    *   Optionally, they can enable a "Sign-in required" setting for submissions.
6.  **Collect Responses:**
    *   Anyone with the link can access and fill out the form.
    *   Responses are saved to the database.
7.  **View Responses:**
    *   Back in the dashboard, users can navigate to the "Responses" section.
    *   They can see a list of their forms and export responses for any form as an Excel file.
8.  **Upgrade (Optional):** Users can upgrade their plan to create more forms or access other premium features.

## 🖼️ Screenshots


## ☁️ Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Ensure all your environment variables (especially production keys for Clerk, Gemini, and your database) are set up in your Vercel project settings.
