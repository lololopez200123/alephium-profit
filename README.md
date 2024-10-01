# Alephium Profit and Loss (PNL)

![Alephium PNL](/apps/frontend-next/public/open-graph.jpg)

A profit and loss tracking application for Alephium, built with Next.js and NestJS.

## Official Documentation

[Access the Official Documentation](https://alephium-profit.gitbook.io/alephium-profit-docs) 📘

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

- `frontend-next`: Frontend built with Next.js
- `backend-nest`: Backend built with NestJS

## Features

- **Transaction Management**: Record and track Alephium transactions seamlessly.
- **Automated Calculations**: Automatically calculate profits and losses based on transactions.
- **Data Visualization**: Visualize financial data and trends with interactive charts.
- **Detailed Reports**: Generate comprehensive PNL (Profit and Loss) reports.
- **API Integration**: Integrate with Alephium price API for real-time data.

## Technologies

- **Frontend**:
  - [Next.js](https://nextjs.org/) 14+
  - [React](https://reactjs.org/)
  - [Material UI](https://mui.com/)
- **Backend**:
  - [NestJS](https://nestjs.com/) 10+
  - [TypeScript](https://www.typescriptlang.org/)
  - [Node.js](https://nodejs.org/)
- **Database**:
  - [MongoDB](https://www.mongodb.com/)
- **Charts**:
  - [Recharts](https://recharts.org/)

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- [Yarn](https://yarnpkg.com/) package manager
- [MongoDB](https://www.mongodb.com/) instance

### Backend

1. Navigate to the backend directory:

   ```bash
   cd apps/backend-nest
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Configure environment variables by creating a `.env` file based on `.env.example`.

4. Start the backend in production mode:

   ```bash
   yarn run start:prod
   ```

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd apps/frontend-next
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Configure environment variables by creating a `.env` file based on `.env.example`.

4. Start the development server:

   ```bash
   yarn run dev
   ```

## Usage

1. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`.

2. **Record Transactions**:

   - Add new Alephium transactions through the frontend interface.
   - Provide necessary details such as amount, date, and transaction type.

3. **View PNL Reports**:
   - Access detailed profit and loss reports.
   - Visualize trends and analyze financial data through interactive charts.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**:
   Click the fork button on the top right of the repository page.

2. **Clone Your Fork**:

   ```bash
   git clone https://github.com/your-username/alephium-pnl.git
   ```

3. **Create a Feature Branch**:

   ```bash
   git checkout -b feature/YourFeature
   ```

4. **Commit Your Changes**:

   ```bash
   git commit -m "Add your message"
   ```

5. **Push to Your Fork**:

   ```bash
   git push origin feature/YourFeature
   ```

6. **Create a Pull Request**:
   Go to the original repository and create a pull request from your fork.

## License

This project is licensed under the [MIT License](LICENSE).
