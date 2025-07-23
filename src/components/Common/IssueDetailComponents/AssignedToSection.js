import React from "react";
import {
  Text,
  Button,
  useColorModeValue,
  Flex,
  Select,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

function AssignedToSection({
  assignedTo,
  status,
  onAssignClick,
  onDeveloperSelect,
  developers,
  selectedDeveloper,
}) {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card>
      <CardHeader>
        <Text fontSize="lg" color={textColor} fontWeight="bold">
          Assigned To
        </Text>
      </CardHeader>
      <CardBody>
        <Text fontSize="md" color={textColor}>
          {assignedTo || "Unassigned"}
        </Text>
        {status === "Open" && !assignedTo && (
          <Flex mt="4" direction="column">
            <Select
              placeholder="Select developer"
              onChange={onDeveloperSelect}
              value={selectedDeveloper}
            >
              {developers.map((dev) => (
                <option key={dev.id} value={dev.name}>
                  {dev.name}
                </option>
              ))}
            </Select>
            <Button mt="2" colorScheme="blue" onClick={onAssignClick}>
              Assign
            </Button>
          </Flex>
        )}
      </CardBody>
    </Card>
  );
}

AssignedToSection.propTypes = {
  assignedTo: PropTypes.string,
  status: PropTypes.string.isRequired,
  onAssignClick: PropTypes.func.isRequired,
  onDeveloperSelect: PropTypes.func.isRequired,
  developers: PropTypes.array.isRequired,
  selectedDeveloper: PropTypes.string,
};

export default AssignedToSection;
