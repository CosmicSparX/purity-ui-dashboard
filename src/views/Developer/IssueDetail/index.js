import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Flex,
  Grid,
  Select,
  Button,
  Textarea,
  Text,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

import IssueInfo from "components/Common/IssueDetailComponents/IssueInfo";
import AssignedToSection from "components/Common/IssueDetailComponents/AssignedToSection";
import IssueHeader from "components/Common/IssueDetailComponents/IssueHeader";
import AttachedDocumentsSection from "components/Common/IssueDetailComponents/AttachedDocumentsSection";
import Comments from "components/Common/IssueDetailComponents/Comments";

import ProfileBgImage from "assets/img/ProfileBackground.png";

import {
  getIssueById,
  updateIssueStatus,
  updateIssuePlan,
} from "../../../services/issueApi";
import { developers } from "variables/issuesData"; // Mock data for now

function IssueDetail() {
  let { issueId } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [selectedDeveloper, setSelectedDeveloper] = useState("");
  const [isEditingPlan, setIsEditingPlan] = useState(false);
  const [editedImplementationPlan, setEditedImplementationPlan] = useState("");

  const history = useHistory();

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await getIssueById(issueId);
        setIssue({
          ...response.data.issue,
          attachedDocuments: Array.isArray(
            response.data.issue.attachedDocuments
          )
            ? response.data.issue.attachedDocuments
            : [],
        });
        setEditedImplementationPlan(
          response.data.issue.implementationPlan || ""
        );
      } catch (error) {
        setError("Error fetching issue details. Please try again later.");
      }
      setLoading(false);
    };

    fetchIssue();
  }, [issueId]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Alert status="error" mt="100px">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

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

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    try {
      await updateIssueStatus(issue.id, newStatus);
      setIssue((prevIssue) => ({
        ...prevIssue,
        status: newStatus,
      }));
    } catch (error) {
      setError("Error updating issue status. Please try again later.");
    }
  };

  const handleEditPlan = () => {
    setIsEditingPlan(true);
  };

  const handleSavePlan = async () => {
    try {
      await updateIssuePlan(issue.id, editedImplementationPlan);
      setIssue((prevIssue) => ({
        ...prevIssue,
        implementationPlan: editedImplementationPlan,
      }));
      setIsEditingPlan(false);
    } catch (error) {
      setError("Error updating implementation plan. Please try again later.");
    }
  };

  const handleCancelEditPlan = () => {
    setEditedImplementationPlan(issue.implementationPlan);
    setIsEditingPlan(false);
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
              {!isEditingPlan && (
                <Button onClick={handleEditPlan} size="sm">
                  Edit Plan
                </Button>
              )}
            </CardHeader>
            <CardBody pt="20px">
              {isEditingPlan ? (
                <Flex direction="column" width="100%">
                  <Textarea
                    value={editedImplementationPlan}
                    onChange={(e) =>
                      setEditedImplementationPlan(e.target.value)
                    }
                    placeholder="Enter implementation plan..."
                    mb="10px"
                    width="100%"
                  />
                  <Flex justifyContent="flex-end" mt="10px">
                    <Button onClick={handleSavePlan} colorScheme="blue">
                      Save Plan
                    </Button>
                    <Button
                      onClick={handleCancelEditPlan}
                      variant="ghost"
                      ml="10px"
                    >
                      Cancel
                    </Button>
                  </Flex>
                </Flex>
              ) : (
                <>
                  <Text fontSize="md" mb="10px">
                    {issue.implementationPlan || "No implementation plan yet."}
                  </Text>
                </>
              )}
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
          <Card>
            <CardHeader>
              <Text fontSize="lg" fontWeight="bold">
                Change Status
              </Text>
            </CardHeader>
            <CardBody pt="20px">
              <Select value={issue.status} onChange={handleStatusChange}>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </Select>
            </CardBody>
          </Card>
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
