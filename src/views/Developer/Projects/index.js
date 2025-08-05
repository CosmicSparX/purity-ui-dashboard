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
  Checkbox,
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
  const userRole = "developer"; // This will be dynamic based on logged-in user
  const userId = "developer1"; // This will be dynamic based on logged-in user
  const textColor = useColorModeValue("gray.700", "white");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCriticalOnly, setShowCriticalOnly] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(
          Array.isArray(response.data.projects)
            ? response.data.projects.map((project) => ({
                ...project,
                id: project.ID,
              }))
            : []
        );
      } catch (error) {
        setError("Error fetching projects. Please try again later.");
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    let tempProjects = projects;

    if (searchTerm) {
      tempProjects = tempProjects.filter((project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (showCriticalOnly) {
      tempProjects = tempProjects.filter(
        (project) => project.criticalOpenIssues > 0
      );
    }

    if (userRole === "developer") {
      tempProjects = tempProjects.filter((project) =>
        project.assignedTo.includes(userId)
      );
    }

    return tempProjects;
  }, [searchTerm, showCriticalOnly, userRole, userId, projects]);

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
            <Flex mb="20px" wrap="wrap" alignItems="center">
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                width={{ base: "100%", md: "250px" }}
                mr={{ base: "0", md: "20px" }}
                mb={{ base: "10px", md: "0" }}
              />
              <Checkbox
                isChecked={showCriticalOnly}
                onChange={(e) => setShowCriticalOnly(e.target.checked)}
                colorScheme="red"
              >
                Show Critical Only
              </Checkbox>
            </Flex>
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
              {filteredProjects.map((project) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  layout="/developer"
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
