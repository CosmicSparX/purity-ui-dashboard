import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import AddIssueModal from "components/AddIssue/AddIssueModal";
import {
  Flex,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  useColorModeValue,
  Grid,
  Button,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import ProjectIssueRow from "components/Common/ProjectIssueRow";
import { getProjectById, createIssue } from "../../../services/issueApi";
import Header from "components/Common/Header";
import ProfileBgImage from "assets/img/ProfileBackground.png";

function ProjectDetail() {
  let { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getProjectById(projectId);
        setProject({
          ...response.data.project,
          issues: Array.isArray(response.data.project.issues)
            ? response.data.project.issues.map((issue) => ({
                ...issue,
                id: issue.ID,
              }))
            : [],
        });
      } catch (error) {
        setError("Error fetching project details. Please try again later.");
      }
      setLoading(false);
    };

    fetchProject();
  }, [projectId]);

  const handleAddIssue = async (newIssue) => {
    try {
      const response = await createIssue(newIssue);
      setProject((prevProject) => ({
        ...prevProject,
        issues: [...prevProject.issues, response.data],
      }));
    } catch (error) {
      setError("Error creating issue. Please try again later.");
    }
  };

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

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <>
      <AddIssueModal
        isOpen={isOpen}
        onClose={onClose}
        onAddIssue={handleAddIssue}
        defaultProjectId={projectId} // Pass the current projectId
      />
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Header
          backgroundHeader={ProfileBgImage}
          name={project.name}
          totalIssues={project.totalIssues}
          openIssues={project.openIssues}
          closedIssues={project.closedIssues}
          layout="/tester"
        />
        <Grid
          templateColumns={{ sm: "1fr", xl: "1fr 2fr" }}
          gap="22px"
          mt="20px"
        >
          <Card>
            <CardHeader>
              <Heading as="h3" size="md">
                Project Information
              </Heading>
            </CardHeader>
            <CardBody pt="20px">
              <Text fontSize="md" color={textColor}>
                {project.description}
              </Text>
            </CardBody>
          </Card>

          <Card>
            <CardHeader p="6">
              <Heading as="h3" size="md">
                Issues for this Project
              </Heading>
              <Button
                colorScheme="blue"
                onClick={onOpen}
                position="absolute"
                top="22px" // Adjust as needed for vertical alignment
                right="22px" // Adjust as needed for horizontal alignment
              >
                Report New Issue
              </Button>
            </CardHeader>
            <CardBody pt="20px">
              <Table variant="simple" color={textColor}>
                <Thead>
                  <Tr>
                    <Th>Issue Name</Th>
                    <Th>Status</Th>
                    <Th>Details</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {project.issues.map((issue) => (
                    <ProjectIssueRow
                      key={issue.id}
                      issue={issue}
                      layout="/tester"
                    />
                  ))}
                </Tbody>
              </Table>
            </CardBody>
          </Card>
        </Grid>
      </Flex>
    </>
  );
}

export default ProjectDetail;
