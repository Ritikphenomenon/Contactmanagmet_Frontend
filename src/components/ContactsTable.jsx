
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Button, 
  TableFooter, 
  TablePagination, 
  Paper, 
  TableSortLabel, 
  TextField 
} from "@mui/material";
import { useState, useMemo } from "react";

const ContactsTable = ({ contacts, onEdit, onDelete, currentPage, onPageChange, rowsPerPage }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("firstName"); // Default sorting by "firstName"
  const [searchQuery, setSearchQuery] = useState("");

  // Sort contacts by the current column and order
  const sortedContacts = useMemo(() => {
    const sorted = [...contacts].sort((a, b) => {
      if (orderBy === "firstName") {
        return order === "asc"
          ? a.firstName.localeCompare(b.firstName)
          : b.firstName.localeCompare(a.firstName);
      }
      // Add sorting for other columns here (e.g., lastName, email, etc.)
      if (orderBy === "lastName") {
        return order === "asc"
          ? a.lastName.localeCompare(b.lastName)
          : b.lastName.localeCompare(a.lastName);
      }
      return 0;
    });
    return sorted;
  }, [contacts, order, orderBy]);

  // Filter contacts based on search query
  const filteredContacts = useMemo(() => {
    return sortedContacts.filter((contact) => {
      return (
        contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [sortedContacts, searchQuery]);

  const startIdx = currentPage * rowsPerPage;
  const paginatedContacts = filteredContacts.slice(startIdx, startIdx + rowsPerPage);

  const emptyRows = rowsPerPage - paginatedContacts.length;

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div >
      {/* Search Field */}

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
  <TextField
    label="Search Contacts"
    variant="outlined"
    value={searchQuery}
    onChange={handleSearchChange}
    fullWidth
    style={{
      maxWidth: "350px", // Set a reasonable max-width for the input field
    }}
  />
</div>

      
      <TableContainer
        component={Paper}
        style={{
          margin: "70px", // Center table with spacing
          height: `${rowsPerPage * 90}px`, // Fixed height for 6 rows (adjust as needed)
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {[
                { id: "firstName", label: "First Name" },
                { id: "lastName", label: "Last Name" },
                { id: "email", label: "Email" },
                { id: "phoneNumber", label: "Phone" },
                { id: "company", label: "Company" },
                { id: "jobTitle", label: "Job Title" },
                { id: "actions", label: "Actions" },
              ].map(({ id, label }) => (
                <TableCell key={id}>
                  {id !== "actions" ? (
                    <TableSortLabel
                      active={orderBy === id}
                      direction={orderBy === id ? order : "asc"}
                      onClick={() => handleRequestSort(id)}
                    >
                      {label}
                    </TableSortLabel>
                  ) : (
                    label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedContacts.map((contact) => (
              <TableRow key={contact._id} hover>
                {["firstName", "lastName", "email", "phoneNumber", "company", "jobTitle"].map((field) => (
                  <TableCell key={field} style={{ fontSize: "14px" }}>
                    {contact[field]}
                  </TableCell>
                ))}
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => onEdit(contact)}
                    style={{ marginRight: "8px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => onDelete(contact._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 &&
              Array.from({ length: emptyRows }).map((_, index) => (
                <TableRow key={`empty-${index}`} style={{ height: "60px" }}>
                  <TableCell colSpan={7} />
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPage={rowsPerPage}
                count={filteredContacts.length}
                page={currentPage}
                onPageChange={(event, newPage) => onPageChange(newPage)}
                rowsPerPageOptions={[rowsPerPage]} // Fixed to a single option for rows per page
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ContactsTable;
