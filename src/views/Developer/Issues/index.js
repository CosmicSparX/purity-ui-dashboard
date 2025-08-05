import React, { useState, useEffect, useMemo } from "react";
import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  useColorModeValue,
  Input,
  Select,
  Checkbox,
  Text,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import IssueRow from "components/Common/IssueRow";
import { getIssues } from "../../../services/issueApi";

function Issues() {
  const userRole = "developer"; // This will be dynamic based on logged-in user
  const userId = "developer1"; // This will be dynamic based on logged-in user
  const textColor = useColorModeValue("gray.700", "white");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showCriticalOnly, setShowCriticalOnly] = useState(false);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await getIssues();
        setIssues(
          Array.isArray(response.data.issues)
            ? response.data.issues.map((issue) => ({
                ...issue,
                id: issue.ID,
              }))
            : []
        );
      } catch (error) {
        setError("Error fetching issues. Please try again later.");
      }
      setLoading(false);
    };

    fetchIssues();
  }, []);

  const filteredIssues = useMemo(() => {
    let tempIssues = issues;

    if (searchTerm) {
      tempIssues = tempIssues.filter(
        (issue) =>
          issue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          issue.project.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      tempIssues = tempIssues.filter((issue) => issue.status === statusFilter);
    }

    if (showCriticalOnly) {
      tempIssues = tempIssues.filter((issue) => issue.priority === "High");
    }

    if (userRole === "developer") {
      tempIssues = tempIssues.filter((issue) =>
        issue.assignedTo.includes(userId)
      );
    }

    return tempIssues;
  }, [searchTerm, statusFilter, showCriticalOnly, userRole, userId, issues]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Alert status="error" mt="100px">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
          <Flex direction="column">
            <Text fontSize="xl" color={textColor} fontWeight="bold" mb="10px">
              Issues
            </Text>
            <Flex mb="20px" wrap="wrap" alignItems="center">
              <Input
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                width={{ base: "100%", md: "250px" }}
                mr={{ base: "0", md: "20px" }}
                mb={{ base: "10px", md: "0" }}
              />
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                width={{ base: "100%", md: "150px" }}
                mr={{ base: "0", md: "20px" }}
                mb={{ base: "10px", md: "0" }}
              >
                <option value="All">All Statuses</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="In Progress">In Progress</option>
              </Select>
              <Checkbox
                isChecked={showCriticalOnly}
                onChange={(e) => setShowCriticalOnly(e.target.checked)}
                colorScheme="red"
              >
                Show Critical Only (High Priority)
              </Checkbox>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" ps="0px">
                <Th color="gray.400" ps="0px">
                  Issue Name
                </Th>
                <Th color="gray.400">Project</Th>
                <Th color="gray.400">Status</Th>
                <Th color="gray.400"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredIssues.map((issue) => (
                <IssueRow key={issue.id} issue={issue} layout="/developer" />
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Issues;
