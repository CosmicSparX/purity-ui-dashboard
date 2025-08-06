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
import ProjectRow from "components/Common/ProjectRow";
import { getProjects } from "../../../services/issueApi";

function Projects() {
  const textColor = useColorModeValue("gray.700", "white");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(
          Array.isArray(response.data.projects)
            ? response.data.projects.map((project) => {
                const issues = Array.isArray(project.issues)
                  ? project.issues.map((issue) => ({
                      ...issue,
                      id: issue.ID,
                    }))
                  : [];

                const openIssues = issues.filter(
                  (issue) => issue.status !== "Closed"
                ).length;
                const closedIssues = issues.length - openIssues;
                const criticalOpenIssues = issues.filter(
                  (issue) =>
                    issue.status !== "Closed" && issue.priority === "High"
                ).length;

                return {
                  ...project,
                  id: project.ID,
                  issues,
                  openIssues,
                  closedIssues,
                  criticalOpenIssues,
                };
              })
            : []
        );
      } catch (error) {
        setError("Error fetching projects. Please try again later.");
      }
      setLoading(false);
    };

    fetchProjects();
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
              Projects
            </Text>
          </Flex>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" ps="0px">
                <Th color="gray.400" ps="0px">
                  Project Name
                </Th>
                <Th color="gray.400">Open Issues</Th>
                <Th color="gray.400">Closed Issues</Th>
                <Th color="gray.400">Critical Open Issues</Th>
                <Th color="gray.400"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {projects.map((project) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  layout="/tester"
                />
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Projects;
