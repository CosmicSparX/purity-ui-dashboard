import { Flex, Progress, Text, useColorModeValue } from "@chakra-ui/react";
import IconBox from "components/Icons/IconBox";
import React from "react";
import PropTypes from "prop-types";

const ChartStatistics = ({ title, amount, icon, percentage }) => {
  const iconTeal = useColorModeValue("teal.300", "teal.300");
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Flex direction="column">
      <Flex alignItems="center">
        <IconBox as="box" h={"30px"} w={"30px"} bg={iconTeal} me="6px">
          {icon}
        </IconBox>
        <Text fontSize="sm" color="gray.400" fontWeight="semibold">
          {title}
        </Text>
      </Flex>
      <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px" my="6px">
        {amount}
      </Text>
      <Progress
        colorScheme="teal"
        borderRadius="12px"
        h="5px"
        value={percentage}
      />
    </Flex>
  );
};

ChartStatistics.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
  percentage: PropTypes.number.isRequired,
};

export default ChartStatistics;
