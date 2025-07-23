import React from "react";
import { Text, Flex } from "@chakra-ui/react";

function DeveloperDashboard() {
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Text fontSize="xl" fontWeight="bold">
        Developer Dashboard
      </Text>
      <Text>
        Welcome to your Developer Dashboard! Here you can see projects and
        issues assigned to you.
      </Text>
    </Flex>
  );
}

export default DeveloperDashboard;
