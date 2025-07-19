import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TablesTableRow from "components/Tables/TablesTableRow.js";
import React, { useState } from "react";
import PropTypes from "prop-types";

const Issues = ({ title, captions, data = [], onAssignClick }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("latest");
  const [groupBy, setGroupBy] = useState("none");

  const filteredData = data.filter((issue) => {
    if (filterStatus === "All") return true;
    return issue.status === filterStatus;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOrder === "latest") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOrder === "project") {
      return a.projectName.localeCompare(b.projectName);
    }
    return 0;
  });

  const groupedData = () => {
    if (groupBy === "none") {
      return { "All Issues": sortedData };
    } else if (groupBy === "project") {
      return sortedData.reduce((acc, issue) => {
        (acc[issue.projectName] = acc[issue.projectName] || []).push(issue);
        return acc;
      }, {});
    } else if (groupBy === "status") {
      return sortedData.reduce((acc, issue) => {
        (acc[issue.status] = acc[issue.status] || []).push(issue);
        return acc;
      }, {});
    }
    return { "All Issues": sortedData };
  };

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p="6px 0px 22px 0px">
        <Flex direction="column">
          <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
            {title}
          </Text>
          <Flex mt="10px">
            <FormControl mr="10px">
              <FormLabel>Filter by Status</FormLabel>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </Select>
            </FormControl>
            <FormControl mr="10px">
              <FormLabel>Sort by</FormLabel>
              <Select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="latest">Latest Change</option>
                <option value="project">Project</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Group by</FormLabel>
              <Select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
              >
                <option value="none">None</option>
                <option value="project">Project</option>
                <option value="status">Status</option>
              </Select>
            </FormControl>
          </Flex>
        </Flex>
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
            {Object.entries(groupedData()).map(([groupName, issuesInGroup]) => (
              <React.Fragment key={groupName}>
                {groupBy !== "none" && (
                  <Tr>
                    <Th
                      colSpan={captions.length}
                      textAlign="left"
                      fontSize="md"
                      color={textColor}
                    >
                      {groupName}
                    </Th>
                  </Tr>
                )}
                {issuesInGroup.map((row) => (
                  <TablesTableRow
                    key={`${row.id}`}
                    name={row.title}
                    email={row.projectName}
                    status={row.status}
                    date={row.priority}
                    domain={row.assignedTo || "Unassigned"}
                    onRowClick={() => onAssignClick(row)}
                  />
                ))}
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

Issues.propTypes = {
  title: PropTypes.string.isRequired,
  captions: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAssignClick: PropTypes.func.isRequired,
};

export default Issues;
