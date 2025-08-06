import React from "react";
import { Text, Flex } from "@chakra-ui/react";

function TesterDashboard() {
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Text fontSize="xl" fontWeight="bold">
        Tester Dashboard
      </Text>
      <Text>
        Welcome to your Tester Dashboard! Here you can see issues assigned to
        you and report new ones.
      </Text>
    </Flex>
  );
}

export default TesterDashboard;
