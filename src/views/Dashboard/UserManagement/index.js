import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  useDisclosure,
  Spinner, // Added Spinner for loading state
  Alert, // Added Alert for error messages
  AlertIcon,
} from "@chakra-ui/react";
import UserFormModal from "./components/UserFormModal";
import { useAuth } from "../../../contexts/AuthContext"; // Import useAuth

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function UserManagement() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { verifyAndRefreshTokens } = useAuth(); // Get verifyAndRefreshTokens from useAuth

  // Custom fetch wrapper for authenticated requests
  const protectedFetch = useCallback(
    async (url, options = {}) => {
      const currentToken = await verifyAndRefreshTokens();
      if (!currentToken) {
        // If token refresh failed or no refresh token, user is logged out by verifyAndRefreshTokens
        return;
      }

      const headers = {
        ...options.headers,
        Authorization: `Bearer ${currentToken}`, // Use the potentially new accessToken
      };

      const response = await fetch(url, { ...options, headers });
      return response;
    },
    [verifyAndRefreshTokens]
  );

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await protectedFetch(`${API_BASE_URL}/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [protectedFetch, API_BASE_URL]);

  useEffect(() => {
    fetchUsers();
  }, []); // Fetch users on component mount

  const handleEdit = (userId) => {
    const userToEdit = users.find((user) => user.ID === userId);
    setSelectedUser(userToEdit);
    onOpen();
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await protectedFetch(`${API_BASE_URL}/${userId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setUsers(users.filter((user) => user.ID !== userId));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    onOpen();
  };

  const handleFormSubmit = async (formData) => {
    try {
      let response;
      const payload = {
        username: formData.username,
        email: formData.email,
        roles: [{ role_name: formData.role }],
      };

      if (formData.password) {
        payload.password = formData.password;
      }

      if (formData.ID) {
        // Use formData.ID
        // Update existing user
        response = await protectedFetch(`${API_BASE_URL}/${formData.ID}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } else {
        // Add new user
        response = await protectedFetch(`${API_BASE_URL}/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchUsers();
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <Flex justify="center" mt="100px" align="center" height="200px">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Alert status="error" mt="100px">
        <AlertIcon />
        Error: {error}
      </Alert>
    );
  }

  return (
    <Box mt="100px">
      <Flex justify="space-between" align="center" mb="20px">
        <Text fontSize="xl" fontWeight="bold">
          User Management
        </Text>
        <Button colorScheme="teal" onClick={handleAddUser}>
          Add User
        </Button>
      </Flex>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Username</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.ID}>
              <Td>{user.ID}</Td>
              <Td>{user.username}</Td>
              <Td>{user.email}</Td>
              <Td>
                {user.roles && user.roles.length > 0
                  ? user.roles[0].role_name
                  : "N/A"}
              </Td>
              <Td>
                <Button
                  colorScheme="blue"
                  size="sm"
                  mr="10px"
                  onClick={() => handleEdit(user.ID)}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDelete(user.ID)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <UserFormModal
        isOpen={isOpen}
        onClose={onClose}
        user={selectedUser}
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
}

export default UserManagement;
