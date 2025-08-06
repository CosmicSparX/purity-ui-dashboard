import React from "react";
import { Tr, Td, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

function ProjectIssueRow({ issue, layout }) {
  const history = useHistory();

  const handleIssueClick = () => {
    history.push(`${layout}/issues/${issue.id}`);
  };

  return (
    <Tr>
      <Td>{issue.title}</Td>
      <Td>{issue.status}</Td>
      <Td>
        <Button onClick={handleIssueClick}>View</Button>
      </Td>
    </Tr>
  );
}

ProjectIssueRow.propTypes = {
  issue: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  layout: PropTypes.string.isRequired,
};

export default ProjectIssueRow;
