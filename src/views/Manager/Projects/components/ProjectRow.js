import React from "react";
import { Tr, Td, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

function ProjectRow({ project }) {
  const history = useHistory();

  const handleProjectClick = () => {
    history.push(`/manager/projects/${project.id}`);
  };

  return (
    <Tr>
      <Td>{project.name}</Td>
      <Td>{project.openIssues}</Td>
      <Td>{project.closedIssues}</Td>
      <Td>{project.criticalOpenIssues}</Td>
      <Td>
        <Button onClick={handleProjectClick}>View</Button>
      </Td>
    </Tr>
  );
}

ProjectRow.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    openIssues: PropTypes.number.isRequired,
    closedIssues: PropTypes.number.isRequired,
    criticalOpenIssues: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProjectRow;
