import React from "react";
import { Tr, Td, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

function IssueRow({ issue }) {
  const history = useHistory();

  const handleIssueClick = () => {
    history.push(`/manager/issues/${issue.id}`);
  };

  return (
    <Tr>
      <Td>{issue.name}</Td>
      <Td>{issue.project}</Td>
      <Td>{issue.status}</Td>
      <Td>
        <Button onClick={handleIssueClick}>View</Button>
      </Td>
    </Tr>
  );
}

IssueRow.propTypes = {
  issue: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    project: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default IssueRow;
