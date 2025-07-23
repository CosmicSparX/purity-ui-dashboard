import React from "react";
import {
  Text,
  useColorModeValue,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

import PropTypes from "prop-types";

function IssueInfo({ description, attachedDocuments }) {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card>
      <CardHeader>
        <Text fontSize="lg" color={textColor} fontWeight="bold">
          Description
        </Text>
      </CardHeader>
      <CardBody pt="20px">
        <Text fontSize="md" color={textColor}>
          {description}
        </Text>
        <Text fontSize="md" color={textColor} fontWeight="bold" mt="20px">
          Attached Documents:
        </Text>
        {attachedDocuments.length > 0 ? (
          <UnorderedList>
            {attachedDocuments.map((doc, index) => (
              <ListItem key={index}>
                <Text fontSize="md" color={textColor}>
                  {doc}
                </Text>
              </ListItem>
            ))}
          </UnorderedList>
        ) : (
          <Text fontSize="md" color={textColor}>
            None
          </Text>
        )}
      </CardBody>
    </Card>
  );
}

IssueInfo.propTypes = {
  description: PropTypes.string.isRequired,
  attachedDocuments: PropTypes.array.isRequired,
};

export default IssueInfo;
