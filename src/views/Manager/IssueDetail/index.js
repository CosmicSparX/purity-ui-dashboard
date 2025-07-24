import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { Flex, Grid, Text } from "@chakra-ui/react";

import Comments from "components/Common/IssueDetailComponents/Comments";
import IssueInfo from "components/Common/IssueDetailComponents/IssueInfo";
import AssignedToSection from "components/Common/IssueDetailComponents/AssignedToSection";
import IssueHeader from "components/Common/IssueDetailComponents/IssueHeader";
import AttachedDocumentsSection from "components/Common/IssueDetailComponents/AttachedDocumentsSection";

import ProfileBgImage from "assets/img/ProfileBackground.png";

import { issuesData, developers } from "variables/issuesData";

function IssueDetail() {
  let { issueId } = useParams();

  const [issue, setIssue] = useState(issuesData[issueId]);
  const [newComment, setNewComment] = useState("");
  const [selectedDeveloper, setSelectedDeveloper] = useState("");

  const history = useHistory();

  if (!issue) {
    return <div>Issue not found</div>;
  }

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    // Here you would typically send the new comment to the server
    console.log("New comment submitted:", newComment);
    setNewComment("");
  };

  const handleDeveloperSelect = (event) => {
    setSelectedDeveloper(event.target.value);
  };

  const handleAssignClick = () => {
    if (selectedDeveloper) {
      setIssue((prevIssue) => ({
        ...prevIssue,
        assignedTo: selectedDeveloper,
        status: "In Progress",
      }));
      setSelectedDeveloper("");
      console.log(`Issue ${issue.name} assigned to ${selectedDeveloper}`);
    }
  };

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }} gap="22px">
      <IssueHeader
        backgroundHeader={ProfileBgImage}
        issueName={issue.name}
        status={issue.status}
        priority={issue.priority}
        handleGoBack={handleGoBack}
        projectId={issue.projectId}
        issueId={issue.id}
      />

      <Grid templateColumns={{ sm: "1fr", lg: "2fr 1fr" }} gap="22px">
        <Flex direction="column" gap="22px">
          <Grid templateColumns={{ sm: "1fr", md: "1fr 1fr" }} gap="22px">
            <IssueInfo description={issue.description} />
            <AttachedDocumentsSection
              attachedDocuments={issue.attachedDocuments}
            />
          </Grid>
          <Card>
            <CardHeader
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize="lg" fontWeight="bold">
                Implementation Plan
              </Text>
            </CardHeader>
            <CardBody pt="20px">
              <Text fontSize="md" mb="10px">
                {issue.implementationPlan || "No implementation plan yet."}
              </Text>
            </CardBody>
          </Card>
        </Flex>
        <Flex direction="column" gap="22px">
          <Card>
            <CardHeader>
              <Text fontSize="lg" fontWeight="bold">
                Reported By
              </Text>
            </CardHeader>
            <CardBody pt="20px">
              <Text fontSize="md">{issue.reportedBy}</Text>
            </CardBody>
          </Card>
          <AssignedToSection
            assignedTo={issue.assignedTo}
            status={issue.status}
            onAssignClick={handleAssignClick}
            onDeveloperSelect={handleDeveloperSelect}
            developers={developers}
            selectedDeveloper={selectedDeveloper}
          />
          <Comments
            comments={issue.comments}
            newComment={newComment}
            onCommentChange={handleCommentChange}
            onCommentSubmit={handleCommentSubmit}
          />
        </Flex>
      </Grid>
    </Flex>
  );
}

export default IssueDetail;
