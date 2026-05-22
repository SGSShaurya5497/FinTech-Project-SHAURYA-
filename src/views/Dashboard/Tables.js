import React, { useState } from "react";
// Chakra imports
import {
  Flex,
  Text,
  Badge,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { mutualfunds, lesson0, etfs, insurance, equity, debtRatio } from "education";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

const topics = [
  {
    title: "Benefits of Financial Literacy",
    content: lesson0.data,
    tag: "Introduction",
    tagColor: "gray",
    borderColor: "#A0AEC0",
    desc: "Get started with the basics of financial education and security."
  },
  {
    title: "Mutual Funds",
    content: mutualfunds.Content,
    tag: "Investing",
    tagColor: "teal",
    borderColor: "#6C63FF",
    desc: "Understand how pooled investments from multiple investors build diversified portfolios."
  },
  {
    title: "Exchange Traded Funds",
    content: etfs.Content,
    tag: "Investing",
    tagColor: "teal",
    borderColor: "#00D4AA",
    desc: "Learn about basket-of-assets securities traded in real-time on stock exchanges."
  },
  {
    title: "Equity Shares",
    content: equity.Content,
    tag: "Growth",
    tagColor: "purple",
    borderColor: "#FFD166",
    desc: "Explore fractional ownership in public companies and wealth creation models."
  },
  {
    title: "Debt Ratio",
    content: debtRatio.Content,
    tag: "Risk Analysis",
    tagColor: "red",
    borderColor: "#FF4D6D",
    desc: "Measure the proportion of assets financed through debt to inspect financial leverage."
  },
  {
    title: "Insurance Policy",
    content: insurance.Content,
    tag: "Protection",
    tagColor: "blue",
    borderColor: "#3182CE",
    desc: "Explore waiver of premium riders and security nets for protecting personal wealth."
  }
];

function Tables() {
  const [title, setTitle] = useState("Benefits of Financial Literacy");
  const [lesson, setLesson] = useState(lesson0.data);

  const textColor = useColorModeValue("gray.700", "white");
  const cardBg = useColorModeValue("white", "gray.700");

  const activeTopic = topics.find((t) => t.title === title) || topics[0];
  const activeColor = activeTopic.borderColor;

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }} gap="24px">
      {/* Topics Header */}
      <Card p="16px">
        <CardHeader p="6px 0px 12px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            SHAURYA Financial Academy
          </Text>
          <Text fontSize="sm" color="gray.400" mt="2px">
            Select a topic to accelerate your financial intelligence.
          </Text>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="20px" w="100%">
            {topics.map((topic, index) => {
              const isActive = title === topic.title;
              return (
                <Card
                  key={index}
                  bg={isActive ? "rgba(108, 99, 255, 0.08)" : cardBg}
                  borderLeft={`4px solid ${topic.borderColor}`}
                  borderColor={isActive ? topic.borderColor : "inherit"}
                  cursor="pointer"
                  transition="all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
                  onClick={() => {
                    setTitle(topic.title);
                    setLesson(topic.content);
                  }}
                  p="16px"
                  _hover={{
                    transform: "translateY(-4px)",
                    shadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                    bg: isActive ? "rgba(108, 99, 255, 0.12)" : "rgba(255, 255, 255, 0.02)"
                  }}
                >
                  <CardBody p="0px">
                    <Flex direction="column" h="100%" justify="space-between" align="flex-start">
                      <Flex direction="column" w="100%">
                        <Badge
                          colorScheme={topic.tagColor}
                          fontSize="10px"
                          px="8px"
                          py="2px"
                          borderRadius="4px"
                          alignSelf="flex-start"
                          mb="8px"
                        >
                          {topic.tag}
                        </Badge>
                        <Text fontSize="md" color={textColor} fontWeight="bold" mb="4px">
                          {topic.title}
                        </Text>
                        <Text fontSize="xs" color="gray.400" noOfLines={2}>
                          {topic.desc}
                        </Text>
                      </Flex>
                    </Flex>
                  </CardBody>
                </Card>
              );
            })}
          </SimpleGrid>
        </CardBody>
      </Card>

      {/* Lesson Details Card */}
      <Card borderLeft={`4px solid ${activeColor}`} p="24px">
        <CardHeader p="0px 0px 16px 0px">
          <Flex align="center" justify="space-between">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              {title}
            </Text>
            <Badge colorScheme={activeTopic.tagColor} fontSize="xs" px="8px" py="2px" borderRadius="4px">
              {activeTopic.tag}
            </Badge>
          </Flex>
        </CardHeader>
        <CardBody>
          <Text color="gray.300" fontSize="md" lineHeight="1.8" fontWeight="normal">
            {lesson}
          </Text>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Tables;
