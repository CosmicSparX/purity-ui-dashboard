import React from "react";
import { useParams } from "react-router-dom";
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
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import ProjectIssueRow from "components/Common/ProjectIssueRow";

const projectsData = {
  1: {
    name: "Project Alpha",
    description:
      "This is the description for Project Alpha. It involves developing a new feature for the main application, focusing on improving user experience and performance. The project is currently in its testing phase.",
    totalIssues: 60,
    openIssues: 10,
    closedIssues: 50,
    criticalOpenIssues: 2,
    assignedTo: ["manager", "developer1", "tester1"],
    issues: [
      {
        id: 1,
        name: "Issue A: Bug in login module",
        status: "Open",
        assignedTo: "developer1",
        reportedBy: "tester1",
      },
      {
        id: 3,
        name: "Issue C: Performance degradation on dashboard",
        status: "In Progress",
        assignedTo: "developer1",
        reportedBy: "tester1",
      },
      {
        id: 4,
        name: "Issue D: UI alignment issue",
        status: "Open",
        assignedTo: "developer1",
        reportedBy: "tester1",
      },
    ],
  },
  2: {
    name: "Project Beta",
    description:
      "Project Beta is focused on backend infrastructure improvements, including database optimization and API refactoring. This project aims to enhance scalability and reliability.",
    totalIssues: 30,
    openIssues: 5,
    closedIssues: 25,
    criticalOpenIssues: 1,
    assignedTo: ["manager", "developer2", "tester2"],
    issues: [
      {
        id: 2,
        name: "Issue B: Database connection error",
        status: "Closed",
        assignedTo: "developer2",
        reportedBy: "tester2",
      },
      {
        id: 5,
        name: "Issue E: API response time slow",
        status: "Open",
        assignedTo: "developer2",
        reportedBy: "tester2",
      },
    ],
  },
  3: {
    name: "Project Gamma",
    description:
      "Project Gamma is a new initiative to explore integrating AI capabilities into our existing product line. This is a research and development heavy project.",
    totalIssues: 5,
    openIssues: 5,
    closedIssues: 0,
    criticalOpenIssues: 0,
    assignedTo: ["manager", "developer1", "tester1"],
    issues: [
      {
        id: 6,
        name: "Issue F: AI model training data collection",
        status: "Open",
        assignedTo: "developer1",
        reportedBy: "tester1",
      },
    ],
  },
};

import Header from "components/Common/Header";
import ProfileBgImage from "assets/img/ProfileBackground.png";

function ProjectDetail() {
  let { projectId } = useParams();

  // const userRole = "developer"; // This will be dynamic based on logged-in user
  // const userId = "developer1"; // This will be dynamic based on logged-in user
  const project = projectsData[projectId];
  const textColor = useColorModeValue("gray.700", "white");

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Header
        backgroundHeader={ProfileBgImage}
        name={project.name}
        totalIssues={project.totalIssues}
        openIssues={project.openIssues}
        closedIssues={project.closedIssues}
        layout="/developer"
      />
      <Grid templateColumns={{ sm: "1fr", xl: "1fr 2fr" }} gap="22px" mt="20px">
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
          <CardHeader>
            <Heading as="h3" size="md">
              Issues for this Project
            </Heading>
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
                    layout="/developer"
                  />
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  );
}

export default ProjectDetail;
