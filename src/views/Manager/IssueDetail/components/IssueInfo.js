import React from "react";
import { Heading, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

import PropTypes from "prop-types";

function IssueInfo({ issue }) {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card>
      <CardHeader>
        <Heading as="h3" size="md">
          Issue Information
        </Heading>
      </CardHeader>
      <CardBody>
        <Text fontSize="md" color={textColor}>
          <strong>Assigned To:</strong> {issue.assignedTo}
        </Text>
        <Text mt="4" fontSize="md" color={textColor}>
          {issue.description}
        </Text>
      </CardBody>
    </Card>
  );
}

IssueInfo.propTypes = {
  issue: PropTypes.shape({
    assignedTo: PropTypes.string,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default IssueInfo;
