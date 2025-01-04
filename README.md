🌍 Traveling Website

A web application designed to simplify travel planning, offering features like user authentication, trip management, and file uploads for images or documents. The project leverages modern web technologies and integrates powerful third-party services to enhance functionality.

🚀 Installation

To run this project locally, follow these steps:

Install dependencies:

npm install

Set up environment variables:

Create a .env file in the root directory.

Add the required environment variables (refer to the .env.example file if available).

Start the application:

npm start

🛠 Technologies Used

This project utilizes the following technologies and libraries:

Frontend:

🎨 EJS (^3.1.10): Embedded JavaScript templates for server-side rendering.

📜 EJS-Mate (^4.0.0): Layout engine for creating reusable templates with EJS.

Backend:

🖥 Express (^4.19.2): Web framework for building the server and handling routes.

🛡 Express-Session (^1.18.0): Middleware for managing user sessions.

🔄 Method-Override (^3.0.0): Enables HTTP verbs like PUT or DELETE in forms.

Database:

🗂 Mongoose (^8.5.3): Object data modeling (ODM) library for MongoDB.

🔗 Connect-Mongo (^5.1.0): MongoDB session store for Express.

Authentication:

🔒 Passport (^0.7.0): Authentication middleware for Node.js.

🔑 Passport-Local (^1.0.0): Local strategy for Passport authentication.

🗝 Passport-Local-Mongoose (^8.0.0): Simplifies user authentication with Mongoose.

File Uploads:

📤 Multer (^1.4.5-lts.1): Middleware for handling multipart/form-data.

☁️ Multer-Storage-Cloudinary (^4.0.0): Integration of Multer and Cloudinary for uploading files to the cloud.

📸 Cloudinary (^1.41.0): Cloud-based image and video management service.

Validation:

✔️ Joi (^17.13.3): Schema validation for user inputs.

Environment Configuration:

⚙️ Dotenv (^16.4.5): Loads environment variables from a .env file.

Utilities:

⚡️ Connect-Flash (^0.1.1): Middleware for flash messages (e.g., success or error notifications).

🔧 I (^0.3.7): Utility library for object manipulation.

🌟 Features

🔐 User registration and login with session management.

🗂 Secure storage of user credentials and data.

📤 File uploads for travel-related media (images, documents).

💬 Flash notifications for user feedback.

📄 Dynamic content rendering using EJS templates.

🌐 Visit the Website https://travelling-site-7lgm.onrender.com/listings

You can explore the live version of the website here: Traveling Website
