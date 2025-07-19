import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import React from "react";
import Issues from "../Issues"; // Reusing the Issues component
import PropTypes from "prop-types";

const ProjectDetail = ({ project, issues, onIssueClick }) => {
  const textColor = useColorModeValue("gray.700", "white");

  if (!project) {
    return <Text>Select a project to view details.</Text>;
  }

  return (
    <Card>
      <CardHeader p="22px 0px 35px 14px">
        <Flex direction="column">
          <Heading as="h3" size="lg" color={textColor}>
            {project.name}
          </Heading>
          <Text fontSize="md" color="gray.500" mt="10px">
            {project.description}
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Box mt="20px">
          <Heading as="h4" size="md" color={textColor} mb="10px">
            Issues for this Project
          </Heading>
          {issues && issues.length > 0 ? (
            <Issues
              title=""
              captions={["Issue", "Status", "Priority", "Assigned To", ""]}
              data={issues}
              onAssignClick={onIssueClick} // Reusing onAssignClick for this purpose
            />
          ) : (
            <Text>No issues found for this project.</Text>
          )}
        </Box>
      </CardBody>
    </Card>
  );
};

ProjectDetail.propTypes = {
  project: PropTypes.object,
  issues: PropTypes.arrayOf(PropTypes.object),
  onIssueClick: PropTypes.func.isRequired,
};

export default ProjectDetail;
