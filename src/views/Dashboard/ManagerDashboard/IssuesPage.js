import React from "react";
import { Box, Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
import Issues from "./Issues"; // Import the Issues component

const IssuesPage = ({ allIssues, onIssueClick, onBack }) => {
  return (
    <Box pt={{ base: "120px", md: "75px" }}>
      <Issues
        title="All Issues"
        captions={["Issue", "Project", "Status", "Priority", "Assigned To", ""]}
        data={allIssues}
        onAssignClick={onIssueClick} // Reusing onAssignClick for issue click
      />
      <Button onClick={onBack} mt="20px">
        Back to Projects
      </Button>
    </Box>
  );
};

IssuesPage.propTypes = {
  allIssues: PropTypes.arrayOf(PropTypes.object).isRequired,
  onIssueClick: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default IssuesPage;
