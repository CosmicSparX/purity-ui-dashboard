import React from "react";
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";

function IssueHeader({
  backgroundHeader,
  issueName,
  status,
  priority,
  handleGoBack,
  projectId,
  issueId,
}) {
  const textColor = useColorModeValue("gray.700", "white");
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );
  const borderProfileColor = useColorModeValue(
    "white",
    "rgba(255, 255, 255, 0.31)"
  );

  return (
    <Box
      mb={{ sm: "205px", md: "75px", xl: "70px" }}
      borderRadius="15px"
      px="0px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      align="center"
    >
      <Box
        bgImage={backgroundHeader}
        w="100%"
        h="300px"
        borderRadius="25px"
        bgPosition="50%"
        bgRepeat="no-repeat"
        position="relative"
        display="flex"
        justifyContent="center"
      >
        <Flex
          onClick={handleGoBack}
          position="absolute"
          top="20px"
          left="20px"
          zIndex="1"
          align="center"
          w={{ sm: "100%", lg: "135px" }}
          bg="hsla(0,0%,100%,.3)"
          borderRadius="15px"
          justifyContent="center"
          py="10px"
          pl="10px"
          boxShadow="inset 0 0 1px 1px hsl(0deg 0% 100% / 90%), 0 20px 27px 0 rgb(0 0 0 / 5%)"
          border="1px solid gray.200"
          cursor="pointer"
          _hover={{ bg: "hsla(0,0%,100%,.4)" }}
          _active={{ bg: "hsla(0,0%,100%,.5)" }}
        >
          <ArrowBackIcon color={textColor} position="absolute" left="15px" />
          <Text fontSize="sm" color={textColor} fontWeight="bold">
            Go Back
          </Text>
        </Flex>
        <Flex
          direction={{ sm: "column", md: "row" }}
          mx="1.5rem"
          maxH="330px"
          w="100%"
          justifyContent={{ sm: "center", md: "space-between" }}
          align="center"
          backdropFilter="saturate(200%) blur(50px)"
          position="absolute"
          boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
          border="2px solid"
          borderColor={borderProfileColor}
          bg={bgProfile}
          p="24px"
          borderRadius="20px"
          transform={{
            sm: "translateY(45%)",
            md: "translateY(110%)",
            lg: "translateY(200%)",
          }}
        >
          <Flex
            align="center"
            mb={{ sm: "10px", md: "0px" }}
            direction={{ sm: "column", md: "row" }}
            w={{ sm: "100%" }}
            textAlign={{ sm: "center", md: "start" }}
          >
            <Flex direction="column" maxWidth="100%" my={{ sm: "14px" }}>
              <Heading
                as="h2"
                size="lg"
                color={textColor}
                ms={{ sm: "8px", md: "0px" }}
              >
                {issueName}
              </Heading>
            </Flex>
          </Flex>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing="20px">
            <Flex
              align="center"
              mr="100px"
              w={{ base: "100%", md: "135px" }}
              bg="hsla(0,0%,100%,.3)"
              borderRadius="15px"
              justifyContent="center"
              py="10px"
              boxShadow="inset 0 0 1px 1px hsl(0deg 0% 100% / 90%), 0 20px 27px 0 rgb(0 0 0 / 5%)"
              border="1px solid gray.200"
              cursor="pointer"
            >
              <Text fontSize="xs" color={textColor} fontWeight="bold" ms="6px">
                Status: {status}
              </Text>
            </Flex>
            <Flex
              align="center"
              mr="100px"
              w={{ base: "100%", md: "135px" }}
              bg="hsla(0,0%,100%,.3)"
              borderRadius="15px"
              justifyContent="center"
              py="10px"
              boxShadow="inset 0 0 1px 1px hsl(0deg 0% 100% / 90%), 0 20px 27px 0 rgb(0 0 0 / 5%)"
              border="1px solid gray.200"
              cursor="pointer"
            >
              <Text fontSize="xs" color={textColor} fontWeight="bold" ms="6px">
                Priority: {priority}
              </Text>
            </Flex>

            <Flex
              align="center"
              mr="100px"
              w={{ base: "100%", md: "135px" }}
              bg="hsla(0,0%,100%,.3)"
              borderRadius="15px"
              justifyContent="center"
              py="10px"
              boxShadow="inset 0 0 1px 1px hsl(0deg 0% 100% / 90%), 0 20px 27px 0 rgb(0 0 0 / 5%)"
              border="1px solid gray.200"
              cursor="pointer"
            >
              <Text fontSize="xs" color={textColor} fontWeight="bold" ms="6px">
                Project ID: {projectId}
              </Text>
            </Flex>
            <Flex
              align="center"
              mr="100px"
              w={{ base: "100%", md: "135px" }}
              bg="hsla(0,0%,100%,.3)"
              borderRadius="15px"
              justifyContent="center"
              py="10px"
              boxShadow="inset 0 0 1px 1px hsl(0deg 0% 100% / 90%), 0 20px 27px 0 rgb(0 0 0 / 5%)"
              border="1px solid gray.200"
              cursor="pointer"
            >
              <Text fontSize="xs" color={textColor} fontWeight="bold" ms="6px">
                Issue ID: {issueId}
              </Text>
            </Flex>
          </SimpleGrid>
        </Flex>
      </Box>
    </Box>
  );
}

IssueHeader.propTypes = {
  backgroundHeader: PropTypes.string.isRequired,
  issueName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  handleGoBack: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
  issueId: PropTypes.number.isRequired,
};

export default IssueHeader;
