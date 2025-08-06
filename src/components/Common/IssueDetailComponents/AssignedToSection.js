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
  assigneeId,
  status,
  onAssignClick,
  onDeveloperSelect,
  developers,
  selectedDeveloper,
}) {
  const textColor = useColorModeValue("gray.700", "white");

  const assignedDeveloper = developers.find((dev) => dev.id === assigneeId);

  return (
    <Card>
      <CardHeader>
        <Text fontSize="lg" color={textColor} fontWeight="bold">
          Assigned To
        </Text>
      </CardHeader>
      <CardBody>
        <Text fontSize="md" color={textColor}>
          {assignedDeveloper ? assignedDeveloper.name : "Unassigned"}
        </Text>
        {status === "Open" && !assignedDeveloper && (
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
  assigneeId: PropTypes.number,
  status: PropTypes.string.isRequired,
  onAssignClick: PropTypes.func.isRequired,
  onDeveloperSelect: PropTypes.func.isRequired,
  developers: PropTypes.array.isRequired,
  selectedDeveloper: PropTypes.string,
};

export default AssignedToSection;
