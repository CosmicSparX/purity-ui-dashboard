import {
  Button,
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TablesTableRow from "components/Tables/TablesTableRow.js";
import React from "react";
import PropTypes from "prop-types";

const Projects = ({
  title,
  captions,
  data,
  onProjectClick,
  onAddProject,
  onEditProject,
}) => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p="6px 0px 22px 0px">
        <Flex direction="column">
          <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
            {title}
          </Text>
        </Flex>
        <Button
          colorScheme="teal"
          variant="solid"
          size="sm"
          position="absolute"
          top="1rem"
          right="1rem"
          onClick={onAddProject}
        >
          Add Project
        </Button>
      </CardHeader>
      <CardBody>
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              {captions.map((caption, idx) => {
                return (
                  <Th color="gray.400" key={idx} ps={idx === 0 ? "0px" : null}>
                    {caption}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row) => {
              return (
                <TablesTableRow
                  key={`${row.id}`}
                  name={row.name}
                  description={row.description}
                  status={row.status}
                  dueDate={row.dueDate}
                  totalIssues={row.totalIssues}
                  openIssues={row.openIssues}
                  criticalIssues={row.criticalIssues}
                  onRowClick={() => onProjectClick(row)}
                  onEditClick={() => onEditProject(row)}
                />
              );
            })}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

Projects.propTypes = {
  title: PropTypes.string.isRequired,
  captions: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onProjectClick: PropTypes.func.isRequired,
  onAddProject: PropTypes.func.isRequired,
  onEditProject: PropTypes.func.isRequired,
};

export default Projects;
