import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

function UserFormModal({ isOpen, onClose, user, onSubmit }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "", // Initialize with empty string
    password: "", // Add password field
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        role:
          user.roles && user.roles.length > 0 ? user.roles[0].role_name : "",
        password: "", // Password should not be pre-filled for security
      });
    } else {
      setFormData({ username: "", email: "", role: "User", password: "" }); // Default role for new user
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{user ? "Edit User" : "Add User"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="username" mb="15px">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="email" mb="15px">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="password" mb="15px">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={user ? "Leave blank to keep current password" : ""}
            />
          </FormControl>
          <FormControl id="role" mb="15px">
            <FormLabel>Role</FormLabel>
            <Select name="role" value={formData.role} onChange={handleChange}>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Tester">Tester</option>
              <option value="Developer">Developer</option>
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="teal" onClick={handleSubmit}>
            {user ? "Update" : "Add"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

UserFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default UserFormModal;
