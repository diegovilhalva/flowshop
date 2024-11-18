

# Flow Shop

**Flow Shop** is a modern e-commerce platform built with cutting-edge technologies, delivering a seamless shopping experience for users. The store features a variety of products, ranging from clothing to accessories, with an emphasis on performance and design.

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
- [API Integration](#api-integration)
- [License](#license)

## Project Overview
Flow Shop is built to be a scalable and efficient e-commerce application that utilizes a modern tech stack to provide an optimized user experience. The project incorporates dynamic data management, smooth client-server communication, and a highly responsive design to adapt across devices.

## Technologies Used

- **[Next.js 15](https://nextjs.org/)** - React framework for server-side rendering, static generation, and edge functions.
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for responsive and customizable design.
- **[ShadCN/UI](https://shadcn.dev/)** - Styled component library for customizable UI components.
- **[React Query](https://react-query.tanstack.com/)** - Data-fetching library for managing and synchronizing server data.
- **[Wix Studio](https://www.wix.com/studio)** - Backend integration with Wix API for managing product data and collections.

## Features

- **Product Browsing:** Browse collections and product details with smooth transitions.
- **Dynamic Cart & Checkout:** Add items to cart and proceed through a dynamic checkout experience.
- **Search & Filters:** Refine search results with tailored filters for categories, prices, and more.
- **Responsive Design:** Optimized for mobile, tablet, and desktop screens.
- **API-Driven Content:** All product information and categories are dynamically fetched from Wix Studio.

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/diegovilhalva/flowshop.git
   cd flowshop
   ```

2. **Install Dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the required API keys and configuration settings.
   ```bash 
    NEXT_PUBLIC_BASE_URL="http://localhost:3000"
    NEXT_PUBLIC_WIX_CLIENT_ID=your_wix_client_id
    WIX_API_KEY=your_wix_client
    NEXT_PUBLIC_WIX_SITE_ID=your_wix_site_id
   ```

4. **Run the Application:**
   ```bash
   npm run dev
   ```

5. **Access the Application:**  
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the Flow Shop in action.

## API Integration

Flow Shop integrates with the **Wix Stores API** to dynamically fetch product collections and manage data. Ensure your environment variables include the appropriate Wix API keys for data access. 


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE)  file for more details.

