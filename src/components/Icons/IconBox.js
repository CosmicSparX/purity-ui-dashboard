import React from "react";
import { Flex } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function IconBox(props) {
  const { children, ...rest } = props;

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={"12px"}
      {...rest}
    >
      {children}
    </Flex>
  );
}

IconBox.propTypes = {
  children: PropTypes.node.isRequired,
};
