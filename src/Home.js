import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const floatOrb1 = keyframes`
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(40px, -60px) scale(1.1); }
  66% { transform: translate(-20px, 40px) scale(0.95); }
  100% { transform: translate(0px, 0px) scale(1); }
`;

const floatOrb2 = keyframes`
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(-50px, 50px) scale(0.9); }
  66% { transform: translate(40px, -40px) scale(1.15); }
  100% { transform: translate(0px, 0px) scale(1); }
`;

function Profile() {
  const [number, setNumber] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  if (!number) return;
  setLoading(true);
  // Backend server deprecated - redirect directly to dashboard
  setTimeout(() => {
    window.location.replace("/#/admin/dashboard");
    setLoading(false);
  }, 800);
};

  const secondaryTextColor = "#8B8FA8";

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bg="#0A0A0F"
      position="relative"
      overflow="hidden"
      p="24px"
    >
      {/* Background Animated Orbs */}
      <Box
        position="absolute"
        top="10%"
        left="5%"
        w={{ base: "250px", md: "450px" }}
        h={{ base: "250px", md: "450px" }}
        borderRadius="full"
        bg="radial-gradient(circle, rgba(108,99,255,0.18) 0%, rgba(108,99,255,0) 70%)"
        filter="blur(60px)"
        animation={`${floatOrb1} 15s infinite ease-in-out`}
        zIndex={0}
      />
      <Box
        position="absolute"
        bottom="10%"
        right="5%"
        w={{ base: "280px", md: "500px" }}
        h={{ base: "280px", md: "500px" }}
        borderRadius="full"
        bg="radial-gradient(circle, rgba(0,212,170,0.15) 0%, rgba(0,212,170,0) 70%)"
        filter="blur(65px)"
        animation={`${floatOrb2} 18s infinite ease-in-out`}
        zIndex={0}
      />

      {/* Main Glassmorphism Container */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        maxW="800px"
        w="100%"
        backdropFilter="blur(20px) saturate(180%)"
        bg="rgba(19, 19, 26, 0.65)"
        border="1px solid rgba(255, 255, 255, 0.08)"
        borderRadius="24px"
        boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.37)"
        p={{ base: "32px 24px", md: "64px 48px" }}
        zIndex={1}
        textAlign="center"
      >
        {/* Brand Logo */}
        <Flex align="center" mb="32px">
          <Text fontSize="2xl" fontWeight="bold" color="white" letterSpacing="-0.03em">
            ⚡ SHAURYA
          </Text>
        </Flex>

        {/* Hero Heading — gradient via inline style */}
        <Text
          fontSize={{ base: "36px", md: "64px" }}
          fontWeight="bold"
          lineHeight="1.1"
          letterSpacing="-0.02em"
          mb="24px"
          style={{
            background: "linear-gradient(to right, #6C63FF, #00D4AA)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Your Money. Your Intelligence.
        </Text>

        <Text
          fontSize={{ base: "md", md: "xl" }}
          color={secondaryTextColor}
          maxW="600px"
          lineHeight="1.6"
          mb="40px"
        >
          SHAURYA brings your entire financial life into one intelligent dashboard — powered by UPI data, Account Aggregator & AI credit scoring.
        </Text>

        {/* Input Panel */}
        <Flex direction="column" w="100%" maxW="400px" align="center">
          <Text
            fontSize="sm"
            color="white"
            fontWeight="600"
            mb="12px"
            letterSpacing="0.05em"
            textTransform="uppercase"
          >
            Enter Mobile Number
          </Text>
          <Input
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            size="lg"
            bg="#1E1E2E"
            border="1px solid rgba(108, 99, 255, 0.3)"
            borderRadius="10px"
            color="white"
            h="54px"
            fontSize="md"
            textAlign="center"
            mb="20px"
            _hover={{ borderColor: "#6C63FF" }}
            _focus={{
              borderColor: "#6C63FF",
              boxShadow: "0 0 0 1px #6C63FF",
            }}
          />
          <Button
            onClick={handleSubmit}
            isLoading={isLoading}
            color="white"
            borderRadius="10px"
            fontWeight="600"
            w="100%"
            h="54px"
            fontSize="md"
            style={{
              background: "linear-gradient(135deg, #6C63FF, #8B5CF6)",
            }}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "0 6px 20px rgba(108, 99, 255, 0.4)",
            }}
            _active={{
              opacity: 0.9,
            }}
          >
            Get Started →
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Profile;