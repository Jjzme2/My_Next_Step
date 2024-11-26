# My Next Step

My Next Step is a web application designed to help users manage their tasks and goals efficiently. The application follows the MVC (Model-View-Controller) architecture and adheres to the principles of SOC (Separation of Concerns) and DRY (Don't Repeat Yourself).

## Installation

To install and run the application locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/Jjzme2/My_Next_Step.git
   cd My_Next_Step
   ```

2. Install server dependencies:
   ```sh
   cd application/server
   npm install
   ```

3. Install client dependencies:
   ```sh
   cd ../client
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the `application/server` directory and add the following variables:
     ```
     JWT_SECRET_KEY=your_secret_key
     NODE_ENV=development
     ```

5. Start the server:
   ```sh
   cd ../server
   npm run dev
   ```

6. Start the client:
   ```sh
   cd ../client
   npm run dev
   ```

## Usage

Once the application is running, you can access it in your web browser at `http://localhost:3000`. The following features are available:

- User registration and login
- Task management (create, read, update, delete tasks)
- Role-based access control
- JWT-based authentication
- Note management (create, read, update, delete notes)
- Resource management

## Contribution Guidelines

We welcome contributions to improve My Next Step. To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```sh
   git checkout -b feature-name
   ```
3. Make your changes and commit them with a descriptive message:
   ```sh
   git commit -m "Add feature-name"
   ```
4. Push your changes to your forked repository:
   ```sh
   git push origin feature-name
   ```
5. Create a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
