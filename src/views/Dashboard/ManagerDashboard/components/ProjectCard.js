import React from "react";
import {
  Box,
  Flex,
  Text,
  Progress,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import PropTypes from "prop-types";

const ProjectCard = ({ project, onProjectClick }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const openIssues = project.issues.filter((issue) => issue.status === "Open")
    .length;
  const progress =
    project.issues.length > 0
      ? ((project.issues.length - openIssues) / project.issues.length) * 100
      : 0;

  return (
    <Card
      onClick={() => onProjectClick(project)}
      cursor="pointer"
      _hover={{ transform: "scale(1.02)", transition: "transform 0.2s" }}
    >
      <CardHeader>
        <Flex direction="column">
          <Text fontSize="lg" color={textColor} fontWeight="bold">
            {project.name}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Due: {project.dueDate}
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text fontSize="md" mb="10px">
          {project.description}
        </Text>
        <Flex justify="space-between" mb="10px">
          <Badge colorScheme={project.status === "Active" ? "green" : "red"}>
            {project.status}
          </Badge>
          <Text fontSize="sm">{project.issues.length} issues</Text>
        </Flex>
        <Box>
          <Text fontSize="sm" mb="5px">
            Progress
          </Text>
          <Progress
            value={progress}
            size="sm"
            colorScheme="green"
            borderRadius="md"
          />
          <Flex justify="space-between">
            <Text fontSize="xs">{Math.round(progress)}%</Text>
            <Text fontSize="xs">{openIssues} open</Text>
          </Flex>
        </Box>
      </CardBody>
    </Card>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  onProjectClick: PropTypes.func.isRequired,
};

export default ProjectCard;
