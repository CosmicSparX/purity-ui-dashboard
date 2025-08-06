import React from "react";
import {
  Text,
  useColorModeValue,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

import PropTypes from "prop-types";

function AttachedDocumentsSection({ attachedDocuments }) {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card>
      <CardHeader>
        <Text fontSize="lg" color={textColor} fontWeight="bold">
          Attached Documents
        </Text>
      </CardHeader>
      <CardBody pt="20px">
        {attachedDocuments.length > 0 ? (
          <UnorderedList>
            {attachedDocuments.map((doc, index) => (
              <ListItem key={index} display="flex" alignItems="center" mb="5px">
                <AttachmentIcon mr="10px" color={textColor} />
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

AttachedDocumentsSection.propTypes = {
  attachedDocuments: PropTypes.array.isRequired,
};

export default AttachedDocumentsSection;
