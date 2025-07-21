import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Flex, Grid } from "@chakra-ui/react";

import Comments from "./components/Comments";
import IssueInfo from "./components/IssueInfo";
import Header from "./components/Header";
import AssignedToSection from "./components/AssignedToSection";

import ProfileBgImage from "assets/img/ProfileBackground.png";

const issuesData = {
  1: {
    name: "Issue A: Bug in login module",
    project: "Project Alpha",
    status: "Open",
    priority: "High",
    type: "Bug",
    assignedTo: "Developer 1",
    description:
      "Users are unable to log in after the recent update. The login button is unresponsive, and no error messages are displayed. This is a critical bug affecting all users.",
    comments: [
      {
        id: 1,
        author: "User 1",
        text: "I am also experiencing this issue. It started yesterday.",
      },
      {
        id: 2,
        author: "User 2",
        text: "Confirmed. Affects both Chrome and Firefox.",
      },
    ],
  },
  2: {
    name: "Issue B: Database connection error",
    project: "Project Beta",
    status: "Closed",
    priority: "Medium",
    type: "Bug",
    assignedTo: "Developer 2",
    description:
      "The application occasionally loses connection to the database, resulting in data retrieval failures. This was resolved by restarting the database server.",
    comments: [
      {
        id: 3,
        author: "User 3",
        text: "This happened to me last week as well.",
      },
    ],
  },
  3: {
    name: "Issue C: Performance degradation on dashboard",
    project: "Project Alpha",
    status: "In Progress",
    priority: "High",
    type: "Performance",
    assignedTo: "Developer 3",
    description:
      "The dashboard loading time has significantly increased, especially for users with a large amount of data. Investigation is ongoing to identify the bottleneck.",
    comments: [],
  },
};

const developers = [
  { id: 1, name: "Developer 1" },
  { id: 2, name: "Developer 2" },
  { id: 3, name: "Developer 3" },
];

function IssueDetail() {
  let { issueId } = useParams();
  const [issue, setIssue] = useState(issuesData[issueId]);
  const [newComment, setNewComment] = useState("");
  const [selectedDeveloper, setSelectedDeveloper] = useState("");

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

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }} gap="22px">
      <Header
        backgroundHeader={ProfileBgImage}
        issueName={issue.name}
        status={issue.status}
        priority={issue.priority}
        type={issue.type}
      />

      <Grid templateColumns={{ sm: "1fr", lg: "2fr 1fr" }} gap="22px" mt="80px">
        <IssueInfo description={issue.description} />
        <Flex direction="column" gap="22px">
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
