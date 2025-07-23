import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
// Chakra imports
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
  Spinner, // Import Spinner
} from "@chakra-ui/react";

function SignIn() {
  const history = useHistory();
  const { login } = useAuth(); // Get login function, not loading state
  const [identifier, setIdentifier] = useState(""); // Can be email or username
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Local loading state for the button

  // More robust email validation regex
  const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set local loading to true

    // --- Dummy Credentials for UI Testing ---
    if (identifier === "admin@example.com" && password === "password") {
      console.log("Dummy Admin Login");
      history.push("/admin/dashboard");
      setIsLoading(false); // Set local loading to false
      return;
    }
    if (identifier === "manager@example.com" && password === "password") {
      console.log("Dummy Manager Login");
      history.push("/manager/dashboard");
      setIsLoading(false); // Set local loading to false
      return;
    }
    if (identifier === "tester@example.com" && password === "password") {
      console.log("Dummy Tester Login");
      history.push("/tester/dashboard");
      setIsLoading(false); // Set local loading to false
      return;
    }
    if (identifier === "developer@example.com" && password === "password") {
      console.log("Dummy Developer Login");
      history.push("/developer/dashboard");
      setIsLoading(false); // Set local loading to false
      return;
    }
    // --- End Dummy Credentials ---

    const isEmail = emailRegex.test(identifier); // Use the improved regex
    let loginEndpoint = "";
    let requestBody = {};

    if (isEmail) {
      loginEndpoint = "/api/auth/login";
    } else {
      loginEndpoint = "/api/auth/login";
      requestBody = { username: identifier, password: password };
    }

    try {
      const response = await fetch(loginEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        const userRole = login(data.access_token); // Use the login function from AuthContext

        // Redirect based on role
        switch (userRole) {
          case "Admin":
            history.push("/admin/dashboard");
            break;
          case "Manager":
            history.push("/manager/dashboard");
            break;
          case "Tester":
            history.push("/tester/dashboard");
            break;
          case "Developer":
            history.push("/developer/dashboard");
            break;
          default:
            history.push("/default/dashboard"); // Fallback for unknown roles
        }
      } else {
        console.error("Login failed:", data.message || "Unknown error");
        alert(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Network error or API call failed:", error);
      alert("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false); // Set local loading to false in finally block
    }
  };

  // Chakra color mode
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="100vh" // Set height to full viewport height
    >
      <Flex
        direction="column"
        w="100%"
        maxW="500px" // Increased width
        mx="auto" // Center the form container horizontally
        background="transparent"
        p="48px"
      >
        <Heading color={titleColor} fontSize="32px" mb="10px">
          Welcome Back
        </Heading>
        <Text
          mb="36px"
          ms="4px"
          color={textColor}
          fontWeight="bold"
          fontSize="14px"
        >
          Enter your email or username and password to sign in
        </Text>
        <FormControl as="form" onSubmit={handleLogin}>
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            Email or Username
          </FormLabel>
          <Input
            borderRadius="15px"
            mb="24px"
            fontSize="sm"
            type="text"
            placeholder="Your email or username"
            size="lg"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            Password
          </FormLabel>
          <Input
            borderRadius="15px"
            mb="36px"
            fontSize="sm"
            type="password"
            placeholder="Your password"
            size="lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fontSize="10px"
            type="submit"
            bg="teal.300"
            w="100%"
            h="45"
            mb="20px"
            color="white"
            mt="20px"
            _hover={{
              bg: "teal.200",
            }}
            _active={{
              bg: "teal.400",
            }}
            isLoading={isLoading} // Use local isLoading state
            spinner={<Spinner size="sm" color="white" />} // Add custom spinner
          >
            SIGN IN
          </Button>
        </FormControl>
      </Flex>
    </Flex>
  );
}

export default SignIn;
