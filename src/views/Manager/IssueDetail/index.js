import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Grid,
  useColorModeValue,
  Box,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import IssueInfo from "./components/IssueInfo";
import Comments from "./components/Comments";

import ProfileBgImage from "assets/img/ProfileBackground.png";

const issuesData = {
  1: {
    name: "Issue A: Bug in login module",
    project: "Project Alpha",
    status: "Open",
    priority: "High",
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
    assignedTo: "Developer 3",
    description:
      "The dashboard loading time has significantly increased, especially for users with a large amount of data. Investigation is ongoing to identify the bottleneck.",
    comments: [],
  },
};

function IssueDetail() {
  let { issueId } = useParams();
  const issue = issuesData[issueId];
  const [newComment, setNewComment] = useState("");
  const textColor = useColorModeValue("gray.700", "white");
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );

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

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }} gap="22px">
      <Box
        borderRadius="15px"
        px="30px"
        mx={{ base: "auto", lg: "0px" }}
        bgImage={ProfileBgImage}
        bgSize="cover"
        maxW="100%"
        w="100%"
        h={{ sm: "200px", md: "200px" }}
        position="relative"
      >
        <Flex
          direction={{ sm: "column", md: "row" }}
          mx="auto"
          w={{ sm: "90%", lg: "100%" }}
          justifyContent={{ sm: "center", md: "space-between" }}
          align="center"
          position="absolute"
          bottom="-20px"
          left="0"
          right="0"
          bg={bgProfile}
          boxShadow="0px 18px 40px rgba(112, 144, 176, 0.12)"
          borderRadius="20px"
          p="20px"
        >
          <Flex direction="column">
            <Heading as="h2" size="lg" color={textColor}>
              {issue.name}
            </Heading>
            <Text fontSize="md" color="gray.400">
              Issue ID: {issueId}
            </Text>
          </Flex>
          <SimpleGrid columns={{ sm: 1, md: 3 }} spacing="20px">
            <Stat textAlign="center">
              <StatLabel fontSize="sm" color="gray.400">
                Project
              </StatLabel>
              <StatNumber fontSize="lg" color={textColor}>
                {issue.project}
              </StatNumber>
            </Stat>
            <Stat textAlign="center">
              <StatLabel fontSize="sm" color="gray.400">
                Status
              </StatLabel>
              <StatNumber fontSize="lg" color={textColor}>
                {issue.status}
              </StatNumber>
            </Stat>
            <Stat textAlign="center">
              <StatLabel fontSize="sm" color="gray.400">
                Priority
              </StatLabel>
              <StatNumber fontSize="lg" color={textColor}>
                {issue.priority}
              </StatNumber>
            </Stat>
          </SimpleGrid>
        </Flex>
      </Box>

      <Grid templateColumns={{ sm: "1fr", lg: "2fr 1fr" }} gap="22px" mt="80px">
        <IssueInfo issue={issue} />
        <Comments
          comments={issue.comments}
          newComment={newComment}
          onCommentChange={handleCommentChange}
          onCommentSubmit={handleCommentSubmit}
        />
      </Grid>
    </Flex>
  );
}

export default IssueDetail;
