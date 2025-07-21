import React from "react";
import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import IssueRow from "./components/IssueRow";

const issuesData = [
  { id: 1, name: "Issue A", project: "Project Alpha", status: "Open" },
  { id: 2, name: "Issue B", project: "Project Beta", status: "Closed" },
  { id: 3, name: "Issue C", project: "Project Alpha", status: "In Progress" },
];

function Issues() {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Card>
        <CardHeader>
          <h2>Issues</h2>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr>
                <Th>Issue Name</Th>
                <Th>Project</Th>
                <Th>Status</Th>
                <Th>Details</Th>
              </Tr>
            </Thead>
            <Tbody>
              {issuesData.map((issue) => (
                <IssueRow key={issue.id} issue={issue} />
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Issues;
