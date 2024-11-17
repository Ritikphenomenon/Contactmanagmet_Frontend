import { useState, useEffect } from "react";
import { TextField, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const ContactFormModal = ({ open, onClose, onSubmit, initialData, title = "Add Contact" }) => {
  // Initialize formData state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    jobTitle: "",
  });

  // Prefill form data when initialData changes (for editing)
  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
        phoneNumber: initialData.phoneNumber || "",
        company: initialData.company || "",
        jobTitle: initialData.jobTitle || "",
      });
    }
  }, [initialData]); // Run when initialData changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      company: "",
      jobTitle: "",
    });
    onClose(); // Close the modal after submitting
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle style={{ textAlign: "center", fontWeight: "bold" }}>{title}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            {[
              { name: "firstName", label: "First Name" },
              { name: "lastName", label: "Last Name" },
              { name: "email", label: "Email" },
              { name: "phoneNumber", label: "Phone Number" },
              { name: "company", label: "Company" },
              { name: "jobTitle", label: "Job Title" },
            ].map(({ name, label }) => (
              <Grid item xs={12} sm={6} key={name}>
                <TextField
                  fullWidth
                  label={label}
                  name={name}
                  value={formData[name]} // Prefill value
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions style={{ padding: "16px", justifyContent: "center" }}>
          <Button onClick={onClose} variant="outlined" color="secondary" style={{ marginRight: "8px" }}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {initialData ? "Update Contact" : "Add Contact"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ContactFormModal;
