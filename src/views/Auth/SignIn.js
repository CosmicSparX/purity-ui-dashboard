import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import signInImage from "assets/img/signInImage.png";

function SignIn() {
  const history = useHistory();
  const [identifier, setIdentifier] = useState(""); // Can be email or username
  const [password, setPassword] = useState("");

  // More robust email validation regex
  const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;

  const handleLogin = async (e) => {
    e.preventDefault();

    // --- Dummy Credentials for UI Testing ---
    if (identifier === "admin@example.com" && password === "password") {
      console.log("Dummy Admin Login");
      history.push("/admin/dashboard");
      return;
    }
    if (identifier === "manager@example.com" && password === "password") {
      console.log("Dummy Manager Login");
      history.push("/manager/dashboard");
      return;
    }
    if (identifier === "tester@example.com" && password === "password") {
      console.log("Dummy Tester Login");
      history.push("/tester/dashboard");
      return;
    }
    if (identifier === "developer@example.com" && password === "password") {
      console.log("Dummy Developer Login");
      history.push("/developer/dashboard");
      return;
    }
    // --- End Dummy Credentials ---

    const isEmail = emailRegex.test(identifier); // Use the improved regex
    let loginEndpoint = "";
    let requestBody = {};

    if (isEmail) {
      loginEndpoint = "YOUR_LOGIN_WITH_EMAIL_API_ENDPOINT"; // Replace with your actual email login endpoint
      requestBody = { email: identifier, password };
    } else {
      loginEndpoint = "YOUR_LOGIN_WITH_USERNAME_API_ENDPOINT"; // Replace with your actual username login endpoint
      requestBody = { username: identifier, password };
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
        const userRole = data.role; // Assuming your API returns a 'role' field

        // Store user data or token (e.g., in localStorage or context)
        // localStorage.setItem("token", data.token);
        // localStorage.setItem("userRole", userRole);

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
    }
  };

  // Chakra color mode
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  return (
    <Flex position="relative" mb="40px">
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: "100px", md: "0px" }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="48px"
            mt={{ md: "150px", lg: "80px" }}
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
              <FormControl display="flex" alignItems="center">
                <Switch id="remember-login" colorScheme="teal" me="10px" />
                <FormLabel
                  htmlFor="remember-login"
                  mb="0"
                  ms="1"
                  fontWeight="normal"
                >
                  Remember me
                </FormLabel>
              </FormControl>
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
              >
                SIGN IN
              </Button>
            </FormControl>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX="hidden"
          h="100%"
          w="40vw"
          position="absolute"
          right="0px"
        >
          <Box
            bgImage={signInImage}
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius="20px"
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
