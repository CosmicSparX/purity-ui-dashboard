import React from "react";
import { Box, Text, Flex, Avatar, useColorModeValue } from "@chakra-ui/react";
import PropTypes from "prop-types";

function Comment({ comment }) {
  const bg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box bg={bg} p="4" borderRadius="20px">
      <Flex align="center">
        <Avatar size="sm" name={comment.author} mr="3" />
        <Box>
          <Text fontWeight="bold">{comment.author}</Text>
          <Text>{comment.text}</Text>
        </Box>
      </Flex>
    </Box>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
