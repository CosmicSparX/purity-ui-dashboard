import {
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";

function TablesTableRow(props) {
  const {
    name,
    description,
    status,
    dueDate,
    totalIssues,
    openIssues,
    criticalIssues,
    onRowClick,
    onEditClick,
    // Props for issues
    projectName,
    priority,
    assignedTo,
  } = props;
  const textColor = useColorModeValue("gray.700", "white");

  // Determine if it's a project row or an issue row based on props
  const isProjectRow = description !== undefined;

  return (
    <Tr onClick={onRowClick} cursor="pointer">
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          {/* <Avatar src={logo} w="50px" borderRadius="12px" me="18px" /> */}
          <Flex direction="column">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {name}
            </Text>
            {isProjectRow ? (
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                {description}
              </Text>
            ) : (
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                {projectName}
              </Text>
            )}
          </Flex>
        </Flex>
      </Td>

      <Td>
        {isProjectRow ? (
          <Flex direction="column">
            <Text fontSize="md" color={textColor} fontWeight="bold">
              {status}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {dueDate}
            </Text>
          </Flex>
        ) : (
          <Badge
            bg={status === "Open" ? "red.400" : "green.400"}
            color="white"
            fontSize="16px"
            p="3px 10px"
            borderRadius="8px"
          >
            {status}
          </Badge>
        )}
      </Td>
      <Td>
        {isProjectRow ? (
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {totalIssues}
          </Text>
        ) : (
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {priority}
          </Text>
        )}
      </Td>
      <Td>
        {isProjectRow ? (
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {openIssues}
          </Text>
        ) : (
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {assignedTo || "Unassigned"}
          </Text>
        )}
      </Td>
      {isProjectRow && (
        <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {criticalIssues}
          </Text>
        </Td>
      )}
      <Td>
        <Button
          p="0px"
          bg="transparent"
          variant="no-hover"
          onClick={onEditClick ? onEditClick : null}
        >
          <Text
            fontSize="md"
            color="gray.400"
            fontWeight="bold"
            cursor="pointer"
          >
            Edit
          </Text>
        </Button>
      </Td>
    </Tr>
  );
}

TablesTableRow.propTypes = {
  name: PropTypes.string.isRequired,
  onRowClick: PropTypes.func,
  onEditClick: PropTypes.func,
  // Project specific props
  description: PropTypes.string,
  status: PropTypes.string,
  dueDate: PropTypes.string,
  totalIssues: PropTypes.number,
  openIssues: PropTypes.number,
  criticalIssues: PropTypes.number,
  // Issue specific props
  projectName: PropTypes.string,
  priority: PropTypes.string,
  assignedTo: PropTypes.string,
};

export default TablesTableRow;
