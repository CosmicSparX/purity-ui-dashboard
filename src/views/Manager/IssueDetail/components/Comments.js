import React from "react";
import { Heading, Textarea, Button, VStack } from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Comment from "./Comment";

import PropTypes from "prop-types";

function Comments({ comments, newComment, onCommentChange, onCommentSubmit }) {
  return (
    <Card>
      <CardHeader>
        <Heading as="h3" size="md">
          Comments
        </Heading>
      </CardHeader>
      <CardBody pt="20px">
        <VStack spacing={4} align="stretch">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
          <Textarea
            value={newComment}
            onChange={onCommentChange}
            placeholder="Add a comment..."
            mb="10px"
          />
          <Button onClick={onCommentSubmit}>Submit</Button>
        </VStack>
      </CardBody>
    </Card>
  );
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  newComment: PropTypes.string.isRequired,
  onCommentChange: PropTypes.func.isRequired,
  onCommentSubmit: PropTypes.func.isRequired,
};

export default Comments;
