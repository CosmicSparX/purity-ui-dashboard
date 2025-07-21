import React from "react";
import { Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

import PropTypes from "prop-types";

function IssueInfo({ description }) {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card>
      <CardHeader>
        <Text fontSize="lg" color={textColor} fontWeight="bold">
          Description
        </Text>
      </CardHeader>
      <CardBody>
        <Text fontSize="md" color={textColor}>
          {description}
        </Text>
      </CardBody>
    </Card>
  );
}

IssueInfo.propTypes = {
  description: PropTypes.string.isRequired,
};

export default IssueInfo;
