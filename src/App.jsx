
import { useState, useEffect } from "react";
import { fetchContacts, createContact, updateContact, deleteContact } from "./api/contactApi";
import ContactFormModal from "./components/ContactForm";
import { Button } from "@mui/material";
import ContactsTable from "./components/ContactsTable";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5; // Fixed number of rows per page

  // Load Contacts on Mount
  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const { data } = await fetchContacts();
      setContacts(data);
    } catch (error) {
      console.error("Failed to fetch contacts:", error.message);
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingContact(null); // Reset editing contact
    setModalOpen(false);
  };

  const handleAddOrEditContact = async (data) => {
    try {
      if (editingContact) {
        await updateContact(editingContact._id, data);
      } else {
        await createContact(data);
      }
      loadContacts();
      handleCloseModal(); // Close the modal after operation
    } catch (error) {
      console.error("Failed to save contact:", error.message);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await deleteContact(id);
      loadContacts();
    } catch (error) {
      console.error("Failed to delete contact:", error.message);
    }
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact); // Set contact to edit
    handleOpenModal(); // Open the modal
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
    

<Button 
  variant="contained" 
  color="secondary" 
  onClick={handleOpenModal} 
  style={{
    backgroundColor: "#4CAF50",
    color: "#fff",
    textTransform: "none",
    marginTop:30,
    marginLeft:30 // Remove uppercase
  }}
>
  Add New Contact
</Button>

      <ContactFormModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddOrEditContact}
        initialData={editingContact} // Pass the editing contact data
      />
      <ContactsTable
        contacts={contacts}
        onEdit={handleEditContact}
        onDelete={handleDeleteContact}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
      />
    </div>
  );
};

export default App;
