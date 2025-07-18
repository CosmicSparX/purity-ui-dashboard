// chakra imports
import { Avatar, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { ClockIcon } from "components/Icons/Icons";
import React from "react";
import PropTypes from "prop-types";

export function ItemContent(props) {
  const navbarIcon = useColorModeValue("gray.500", "gray.200");
  const notificationColor = useColorModeValue("gray.700", "white");
  const spacing = " ";
  return (
    <>
      <Avatar
        name={props.aName}
        src={props.aSrc}
        borderRadius="12px"
        me="16px"
      />
      <Flex flexDirection="column">
        <Text fontSize="14px" mb="5px" color={notificationColor}>
          <Text fontWeight="bold" fontSize="14px" as="span">
            {props.boldInfo}
            {spacing}
          </Text>
          {props.info}
        </Text>
        <Flex alignItems="center">
          <ClockIcon color={navbarIcon} w="13px" h="13px" me="3px" />
          <Text fontSize="xs" lineHeight="100%" color={navbarIcon}>
            {props.time}
          </Text>
        </Flex>
      </Flex>
    </>
  );
}

ItemContent.propTypes = {
  aName: PropTypes.string.isRequired,
  aSrc: PropTypes.string.isRequired,
  boldInfo: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};
