import React, { useState, useEffect } from "react";
import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  useColorModeValue,
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
  const textColor = useColorModeValue("gray.700", "white");
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
          </Flex>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" ps="0px">
                <Th color="gray.400" ps="0px">
                  Issue Name
                </Th>
                <Th color="gray.400">Project ID</Th>
                <Th color="gray.400">Status</Th>
                <Th color="gray.400"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {issues.map((issue) => (
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
