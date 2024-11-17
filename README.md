
```markdown
# 🚀 Contacts Management App

## Project Description

This project is a Contacts Management App built with React.js, Material-UI, and Node.js. It allows users to manage their contacts, including adding, editing, deleting, and searching for contacts. The app interacts with a backend API built using Node.js, which handles CRUD operations for the contacts stored in a MongoDB database.

### Features:
- Add new contacts
- Edit existing contacts
- Delete contacts
- Search contacts
- Paginate through contacts


## Technical Decisions
- **React.js**: Chosen for the frontend as it's a fast, declarative, and flexible JavaScript library for building user interfaces.
- **Material-UI**: Used for the UI components, providing a clean and modern design system.
- **Node.js & Express.js**: Used for the backend to handle API requests.
- **MongoDB**: Chosen for the database due to its flexibility and scalability in handling document-based data.
- **Pagination**: Implemented pagination to improve performance when handling large sets of data.
- **Search Functionality**: A search bar was added to filter contacts based on name, email, or phone number.

---

## Setup Instructions

### Prerequisites:
1. **Node.js**: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org).
2. **MongoDB**: Set up a MongoDB instance locally or use a cloud-based MongoDB service like MongoDB Atlas.

### Installation Steps:

1. **Clone the Repository:**

   ```bash
   git clone 
   ```

2. **Install Dependencies:**

   Navigate to the project directory and install the required dependencies.

   ```bash
   cd ContactsManagementApp
   npm install
   ```

3. **Setup the Database:**

   - Create a MongoDB database (either locally or on MongoDB Atlas).
   - If using a local MongoDB instance, make sure MongoDB is running on your machine.
   - Create a `.env` file in the root directory and add the following configuration for your MongoDB connection:


     Replace the URI with your MongoDB connection string if you're using MongoDB Atlas.

4. **Run the Backend Server:**

   In the backend directory, run the following command to start the server:

   ```bash
   node index.js
   ```

   This will start the Node.js server on `http://localhost:3000`.

5. **Run the Frontend Application:**

   In the frontend directory, run the following command:

   ```bash
   npm run dev
   ```

   The React app will run on `http://localhost:5173`.

---


## How the App Works

1. **Frontend (React.js)**:
   - The React app renders a table of contacts, displaying information such as the first name, last name, email, and more.
   - Users can add new contacts via a form, which opens in a modal when the "Add New Contact" button is clicked.
   - Users can edit or delete existing contacts.
   - The table supports pagination and searching for contacts.

2. **Backend (Node.js/Express.js)**:
   - The backend exposes several API routes to interact with the contacts:
     - `GET /contacts`: Fetches all contacts.
     - `POST /contacts`: Creates a new contact.
     - `PUT /contacts/:id`: Updates an existing contact.
     - `DELETE /contacts/:id`: Deletes a contact.
   - The data is stored in a MongoDB database.

---

## Challenges and Solutions

### 1. **Handling CORS Issues**:
   - **Challenge**: During development, the frontend (React) and backend (Node.js) were running on different ports, causing CORS issues.
   - **Solution**: I resolved this by installing and configuring the `cors` package in the Node.js backend to allow cross-origin requests from the React frontend.

   ```bash
   npm install cors
   ```

   Then, in the `server.js` file:

   ```js
   const cors = require('cors');
   app.use(cors());
   ```

### 2. **Pagination**:
   - **Challenge**: Implementing pagination was a bit tricky because of how data is fetched and displayed in the table.
   - **Solution**: I used `TablePagination` from Material-UI to paginate through the contacts. The backend API was updated to support pagination by passing `limit` and `skip` query parameters.

### 3. **Search Functionality**:
   - **Challenge**: Filtering contacts by multiple fields (e.g., name, email) in real-time required dynamic querying.
   - **Solution**: I added a search bar component that updates the displayed contacts based on the search query. The search is performed in the frontend by filtering the contacts array.

---

## Screenshots

1. **Home Page - Contacts List**:

   ![Contacts List](./src/assets/contact-list.png)

2. **Add/Edit Contact Form**:

   ![Add/Edit Contact Form](./src/assets/add-contact-form.png)

3. **Search Bar in Action**:

   ![Search Bar](./src/assets/search-bar.png)

---

## Contributing

Feel free to fork this repository and create pull requests for any improvements or features you'd like to add. Make sure to follow the standard Git workflow, including creating a feature branch and writing descriptive commit messages.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
