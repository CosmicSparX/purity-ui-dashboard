import React from "react";
import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import ProjectRow from "./components/ProjectRow";

const projectsData = [
  {
    id: 1,
    name: "Project Alpha",
    openIssues: 10,
    closedIssues: 50,
    criticalOpenIssues: 2,
  },
  {
    id: 2,
    name: "Project Beta",
    openIssues: 5,
    closedIssues: 25,
    criticalOpenIssues: 1,
  },
  {
    id: 3,
    name: "Project Gamma",
    openIssues: 2,
    closedIssues: 100,
    criticalOpenIssues: 0,
  },
];

function Projects() {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Card>
        <CardHeader>
          <h2>Projects</h2>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr>
                <Th>Project Name</Th>
                <Th>Open Issues</Th>
                <Th>Closed Issues</Th>
                <Th>Critical Open Issues</Th>
                <Th>Details</Th>
              </Tr>
            </Thead>
            <Tbody>
              {projectsData.map((project) => (
                <ProjectRow key={project.id} project={project} />
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Projects;
