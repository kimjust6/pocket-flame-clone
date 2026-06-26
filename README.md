# Flame Startpage Clone

**Flame Startpage Clone** is a self-hosted, lightweight, and customizable startpage and bookmarks manager designed for your home server. Inspired by Flame, it lets you organize your daily applications and bookmarked links in one gorgeous dashboard.

## Features

-   **Clean Dashboard**: Centered search bar with quick keyboard filtering for instant access to your apps and bookmarks.
-   **Applications Grid**: Display cards for your self-hosted services, complete with custom title descriptions and inline SVGs.
-   **Grouped Bookmarks**: Categorize links (e.g. documents, repositories, news) with custom icons.
-   **Weather Widget**: Integrated weather checking powered by the free Open-Meteo API.
-   **Settings Management**: A comprehensive admin dashboard to configure theme colors (Primary, Accent, Background), weather latitude/longitude, add/edit/delete applications, categories, and bookmarks.
-   **Secure & Private**: Optional authentication to secure settings management.
-   **Modern Design**: Sleek layout, custom variables for custom color branding, responsive layout.

## Tech Stack

This project is built on a highly performant and simple stack:

-   **Backend**: [PocketBase](https://pocketbase.io/) (Golang + SQLite embedded DB) - Handles Authentication, database storage, and API.
-   **Frontend**: [PocketPages](https://github.com/pocketpages/pocketpages) - Server-side rendering using **EJS**.
-   **Interactivity**: [Alpine.js](https://alpinejs.dev/) - For lightweight, reactive UI components (Modals, Search, Forms).
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/).

## Getting Started

Follow these steps to get your own instance running locally.

### Prerequisites

-   **Node.js** (LTS version recommended)
-   **PocketBase**: PocketBase is embedded and managed via npm commands.

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/kimjust6/pocket-flame-clone.git
    cd pocket-flame-clone
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the App**:
    This command starts the Tailwind watcher and the PocketBase server in dev mode.
    ```bash
    npm run dev
    ```
    If you are running in a WSL environment:
    ```bash
    npm run wsl
    ```

4.  **Visit the App**:
    Open [http://localhost:8090](http://localhost:8090) in your browser.

## Project Structure

-   `pb_hooks/` - Server-side logic and templates.
-   `pb_migrations/` - PocketBase database schema definition and seeding.
-   `pb_public/` - Static assets (compiled CSS, client JS).
-   `pb_data/` - Local database and storage (created after first run).

## License

This project is open-source and available under the [MIT License](LICENSE).
