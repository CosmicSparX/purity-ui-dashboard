import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Select,
  Text,
  useColorModeValue,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import PropTypes from "prop-types";

const developers = ["Alex", "Sam", "Riley", "Casey", "Jordan"];

const IssueDetail = ({ issue, onAssignIssue, onBack }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const [isAssigning, setIsAssigning] = useState(false);
  const [selectedDeveloper, setSelectedDeveloper] = useState("");

  if (!issue) {
    return null; // Or a loading/error state
  }

  const handleAssignClick = () => {
    setIsAssigning(true);
  };

  const handleCancelAssign = () => {
    setIsAssigning(false);
    setSelectedDeveloper("");
  };

  const handleConfirmAssign = () => {
    onAssignIssue(issue.id, selectedDeveloper);
    setIsAssigning(false);
    setSelectedDeveloper("");
  };

  return (
    <Card>
      <CardHeader>
        <Flex direction="row" justify="space-between" align="center">
          <Heading as="h3" size="lg" color={textColor}>
            {issue.title}
          </Heading>
          <Button onClick={onBack}>Back to Project</Button>
        </Flex>
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Box>
            <Heading as="h4" size="md" mb={4}>
              Details
            </Heading>
            <Text fontSize="md">{issue.description}</Text>
          </Box>
          <Box>
            <Heading as="h4" size="md" mb={4}>
              Properties
            </Heading>
            <Flex align="center" mb={2}>
              <Text fontWeight="bold" mr={2}>
                Status:
              </Text>
              <Badge colorScheme={issue.status === "Open" ? "red" : "green"}>
                {issue.status}
              </Badge>
            </Flex>
            <Flex align="center" mb={2}>
              <Text fontWeight="bold" mr={2}>
                Priority:
              </Text>
              <Text>{issue.priority}</Text>
            </Flex>
            <Flex align="center" mb={2}>
              <Text fontWeight="bold" mr={2}>
                Assigned To:
              </Text>
              <Text>{issue.assignedTo || "Unassigned"}</Text>
            </Flex>
            <Box mt={6}>
              {!isAssigning ? (
                <Button colorScheme="teal" onClick={handleAssignClick}>
                  Assign Developer
                </Button>
              ) : (
                <Flex align="center">
                  <Select
                    placeholder="Select Developer"
                    value={selectedDeveloper}
                    onChange={(e) => setSelectedDeveloper(e.target.value)}
                    mr="10px"
                  >
                    {developers.map((dev) => (
                      <option key={dev} value={dev}>
                        {dev}
                      </option>
                    ))}
                  </Select>
                  <Button
                    colorScheme="green"
                    onClick={handleConfirmAssign}
                    mr="10px"
                  >
                    Confirm
                  </Button>
                  <Button onClick={handleCancelAssign}>Cancel</Button>
                </Flex>
              )}
            </Box>
          </Box>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

IssueDetail.propTypes = {
  issue: PropTypes.object.isRequired,
  onAssignIssue: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default IssueDetail;
