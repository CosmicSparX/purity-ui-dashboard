import React, { useState, useMemo } from "react";
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
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import ProjectRow from "components/Common/ProjectRow";

const projectsData = [
  {
    id: 1,
    name: "Project Alpha",
    openIssues: 10,
    closedIssues: 50,
    criticalOpenIssues: 2,
    assignedTo: ["manager", "developer1", "tester1"],
  },
  {
    id: 2,
    name: "Project Beta",
    openIssues: 5,
    closedIssues: 25,
    criticalOpenIssues: 1,
    assignedTo: ["manager", "developer2", "tester2"],
  },
  {
    id: 3,
    name: "Project Gamma",
    openIssues: 2,
    closedIssues: 100,
    criticalOpenIssues: 0,
    assignedTo: ["manager", "developer1", "tester1"],
  },
  {
    id: 4,
    name: "Project Delta",
    openIssues: 15,
    closedIssues: 30,
    criticalOpenIssues: 3,
    assignedTo: ["manager", "developer2", "tester2"],
  },
  {
    id: 5,
    name: "Project Epsilon",
    openIssues: 0,
    closedIssues: 70,
    criticalOpenIssues: 0,
    assignedTo: ["manager", "developer1", "tester1"],
  },
];

function Projects() {
  const userRole = "developer"; // This will be dynamic based on logged-in user
  const userId = "developer1"; // This will be dynamic based on logged-in user
  const textColor = useColorModeValue("gray.700", "white");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCriticalOnly, setShowCriticalOnly] = useState(false);

  const filteredProjects = useMemo(() => {
    let tempProjects = projectsData;

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

    return tempProjects;
  }, [searchTerm, showCriticalOnly, userRole, userId]);

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
