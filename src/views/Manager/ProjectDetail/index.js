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
  Box,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  SimpleGrid,
  Grid,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import ProjectIssueRow from "./components/ProjectIssueRow";

import ProfileBgImage from "assets/img/ProfileBackground.png";
import avatar from "assets/img/avatars/avatar1.png"; // Using a generic avatar

const projectsData = {
  1: {
    name: "Project Alpha",
    description:
      "This is the description for Project Alpha. It involves developing a new feature for the main application, focusing on improving user experience and performance. The project is currently in its testing phase.",
    totalIssues: 60,
    openIssues: 10,
    closedIssues: 50,
    criticalOpenIssues: 2,
    issues: [
      { id: 1, name: "Issue A: Bug in login module", status: "Open" },
      {
        id: 3,
        name: "Issue C: Performance degradation on dashboard",
        status: "In Progress",
      },
      { id: 4, name: "Issue D: UI alignment issue", status: "Open" },
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
    issues: [
      { id: 2, name: "Issue B: Database connection error", status: "Closed" },
      { id: 5, name: "Issue E: API response time slow", status: "Open" },
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
    issues: [
      {
        id: 6,
        name: "Issue F: AI model training data collection",
        status: "Open",
      },
    ],
  },
};

function ProjectDetail() {
  let { projectId } = useParams();
  const project = projectsData[projectId];
  const textColor = useColorModeValue("gray.700", "white");
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Box
        mb={{ sm: "20px", md: "50px", lg: "20px" }}
        borderRadius="15px"
        px="30px"
        mx={{ base: "auto", lg: "0px" }}
        pt={{ base: "100px", md: "100px" }}
        bgImage={ProfileBgImage}
        bgSize="cover"
        maxW="100%"
        w={{ sm: "100%", md: "100%" }}
        h={{ sm: "200px", md: "200px" }}
        position="relative"
      >
        <Flex
          direction={{ sm: "column", md: "row" }}
          mx="auto"
          w={{ sm: "90%", lg: "100%" }}
          justifyContent={{ sm: "center", md: "space-between" }}
          align="center"
          position="absolute"
          bottom="-20px"
          left="0"
          right="0"
          bg={bgProfile}
          boxShadow="0px 18px 40px rgba(112, 144, 176, 0.12)"
          borderRadius="20px"
          p="20px"
        >
          <Flex align="center" mb={{ sm: "10px", md: "0px" }}>
            <Image
              src={avatar}
              boxSize="80px"
              borderRadius="15px"
              me={{ sm: "0px", md: "22px" }}
            />
            <Flex direction="column">
              <Heading as="h2" size="lg" color={textColor}>
                {project.name}
              </Heading>
              <Text fontSize="md" color="gray.400">
                Project ID: {projectId}
              </Text>
            </Flex>
          </Flex>
          <SimpleGrid columns={{ sm: 1, md: 3 }} spacing="20px">
            <Stat textAlign="center">
              <StatLabel fontSize="sm" color="gray.400">
                Total Issues
              </StatLabel>
              <StatNumber fontSize="lg" color={textColor}>
                {project.totalIssues}
              </StatNumber>
            </Stat>
            <Stat textAlign="center">
              <StatLabel fontSize="sm" color="gray.400">
                Open Issues
              </StatLabel>
              <StatNumber fontSize="lg" color={textColor}>
                {project.openIssues}
              </StatNumber>
            </Stat>
            <Stat textAlign="center">
              <StatLabel fontSize="sm" color="gray.400">
                Closed Issues
              </StatLabel>
              <StatNumber fontSize="lg" color={textColor}>
                {project.closedIssues}
              </StatNumber>
            </Stat>
          </SimpleGrid>
        </Flex>
      </Box>

      <Grid templateColumns={{ sm: "1fr", xl: "1fr 2fr" }} gap="22px" mt="80px">
        <Card>
          <CardHeader>
            <Heading as="h3" size="md">
              Project Information
            </Heading>
          </CardHeader>
          <CardBody>
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
          <CardBody>
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
                  <ProjectIssueRow key={issue.id} issue={issue} />
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
