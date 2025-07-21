import React from "react";
import { Box, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

function Comment({ comment }) {
  return (
    <Box borderBottomWidth="1px" p="4">
      <Text fontWeight="bold">{comment.author}</Text>
      <Text>{comment.text}</Text>
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
