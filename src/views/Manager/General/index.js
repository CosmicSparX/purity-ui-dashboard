import React from "react";
import { Flex, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import MiniStatistics from "views/Dashboard/Dashboard/components/MiniStatistics";
import { DocumentIcon, HelpIcon } from "components/Icons/Icons.js";

function ManagerDashboard() {
  const iconBoxInside = useColorModeValue("white", "white");

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
        <MiniStatistics
          title={"Open Issues"}
          amount={"1,234"}
          percentage={10}
          icon={<HelpIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Closed Issues"}
          amount={"5,678"}
          percentage={-5}
          icon={<HelpIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Critical Open Issues"}
          amount={"52"}
          percentage={20}
          icon={<HelpIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Total Projects"}
          amount={"12"}
          percentage={0}
          icon={<DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
      </SimpleGrid>
      <Card mt="24px">
        <CardHeader>
          <h2>Quick Links</h2>
        </CardHeader>
        <CardBody>
          <p>Links to important pages will go here.</p>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default ManagerDashboard;
