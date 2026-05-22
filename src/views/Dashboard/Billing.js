import React, { useState } from "react";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Spacer,
  Text,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Progress,
  Badge,
  SimpleGrid,
  useToast,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  HStack,
  VStack,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import IconBox from "components/Icons/IconBox";
import { data1, dataCredit, dataequity, dataetf, datamutualfund } from "Mock_Data/mockdata1";
import { FaWallet, FaHandHoldingUsd, FaUserCheck, FaCoins, FaCheckCircle, FaPercent } from "react-icons/fa";

// Calculate SHAURYA Credit Score dynamically (mirroring Dashboard logic)
const bal = parseFloat(data1.summary.currentBalance) || 0;
const asset = bal + (parseFloat(datamutualfund.summary.currentValue) || 0) + (parseFloat(dataequity.summary.currentValue) || 0) + (parseFloat(dataetf.summary.currentValue) || 0);
const loan = 124320;
const liabilities = (parseFloat(dataCredit.summary.currentDue) || 0) + loan;
const debtRatio = liabilities / (asset || 1);
const age = 30;

let s1 = 150;
if (age > 30 && age <= 40) s1 = 165;
else if (age > 40 && age <= 50) s1 = 185;
else if (age > 50 && age <= 60) s1 = 200;
else if (age > 60 && age <= 70) s1 = 210;
else if (age > 70) s1 = 220;

let s2 = 110;
if (debtRatio <= 0.2) s2 = 200;
else if (debtRatio <= 0.4) s2 = 225;
else if (debtRatio <= 0.8) s2 = 175;
else if (debtRatio <= 1.0) s2 = 150;
else if (debtRatio <= 1.2) s2 = 135;
else if (debtRatio <= 1.4) s2 = 110;
else if (debtRatio <= 1.6) s2 = 120;

let s3 = 120;
if (bal > 10000 && bal <= 17000) s3 = 140;
else if (bal > 17000 && bal <= 25000) s3 = 150;
else if (bal > 25000 && bal <= 38000) s3 = 200;
else if (bal > 38000 && bal <= 50000) s3 = 225;
else if (bal > 50000 && bal <= 63000) s3 = 230;
else if (bal > 63000) s3 = 250;

const userScore = s1 + s2 + s3;

function Billing() {
  const textColor = useColorModeValue("gray.700", "white");
  const cardBg = useColorModeValue("white", "gray.700");
  const toast = useToast();

  // Borrow States
  const [loanAmount, setLoanAmount] = useState(150000);
  const [tenure, setTenure] = useState(12);
  const [loanPurpose, setLoanPurpose] = useState("Business Expansion");
  const [applied, setApplied] = useState(false);

  // Lend States
  const [lendersBalance, setLendersBalance] = useState(450000);
  const [marketBorrowers, setMarketBorrowers] = useState([
    {
      id: 1,
      name: "Rohan Sharma",
      score: 780,
      amount: 250000,
      funded: 150000,
      roi: 11.5,
      purpose: "Business Expansion",
      status: "Active"
    },
    {
      id: 2,
      name: "Priyanka Patel",
      score: 690,
      amount: 120000,
      funded: 102000,
      roi: 13.0,
      purpose: "Medical Expenses",
      status: "Active"
    },
    {
      id: 3,
      name: "Amit Kumar",
      score: 520,
      amount: 80000,
      funded: 32000,
      roi: 16.5,
      purpose: "Debt Consolidation",
      status: "Active"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      score: 720,
      amount: 400000,
      funded: 368000,
      roi: 12.0,
      purpose: "Higher Education",
      status: "Active"
    }
  ]);
  const [fundInput, setFundInput] = useState({});

  // Dynamic Interest Rate based on Credit Score (Premium score = lower rate)
  const interestRate = userScore > 700 ? 8.99 : userScore > 600 ? 11.49 : userScore > 500 ? 14.25 : 17.50;

  // EMI calculation: EMI = [P x R x (1+R)^N]/[((1+R)^N)-1]
  const monthlyRate = (interestRate / 12) / 100;
  const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
  const totalRepayment = emi * tenure;
  const totalInterest = totalRepayment - loanAmount;

  const handleApplyLoan = (e) => {
    e.preventDefault();
    setApplied(true);
    toast({
      title: "Application Submitted Successfully",
      description: `Your P2P loan request of ₹${loanAmount.toLocaleString("en-IN")} is listed on SHAURYA.`,
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  const handleFundBorrower = (id, amountToFund) => {
    const amt = parseFloat(amountToFund);
    if (isNaN(amt) || amt <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid investment amount.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (amt > lendersBalance) {
      toast({
        title: "Insufficient Wallet Balance",
        description: "Top up your lending account to fund this request.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const borrower = marketBorrowers.find(b => b.id === id);
    const remainingToFund = borrower.amount - borrower.funded;
    const finalFundAmount = Math.min(amt, remainingToFund);

    setMarketBorrowers(prev =>
      prev.map(b => {
        if (b.id === id) {
          const updatedFunded = b.funded + finalFundAmount;
          return {
            ...b,
            funded: updatedFunded,
            status: updatedFunded >= b.amount ? "Fully Funded" : "Active"
          };
        }
        return b;
      })
    );

    setLendersBalance(prev => prev - finalFundAmount);
    setFundInput(prev => ({ ...prev, [id]: "" }));

    toast({
      title: "Investment Active",
      description: `Funded ₹${finalFundAmount.toLocaleString("en-IN")} towards ${borrower.name}'s loan.`,
      status: "success",
      duration: 4000,
      isClosable: true,
      position: "top",
    });
  };

  const getScoreColor = (score) => {
    if (score > 700) return "green.400";
    if (score >= 600) return "orange.400";
    return "red.400";
  };

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }} gap="24px">
      {/* Title block */}
      <Card p="20px">
        <Flex direction="column">
          <Text fontSize="2xl" color={textColor} fontWeight="bold">
            SHAURYA P2P Lending Hub
          </Text>
          <Text fontSize="sm" color="gray.400" mt="2px">
            Decentralized borrowing and high-yield lending driven by alternative risk intelligence.
          </Text>
        </Flex>
      </Card>

      {/* Tabs */}
      <Tabs variant="solid-rounded" colorScheme="purple">
        <TabList px="6px" gap="10px">
          <Tab _selected={{ bg: "#6C63FF", color: "white" }} fontWeight="bold">
            Apply (Borrow)
          </Tab>
          <Tab _selected={{ bg: "#00D4AA", color: "black" }} fontWeight="bold">
            Invest (Lend Marketplace)
          </Tab>
        </TabList>

        <TabPanels mt="16px">
          {/* BORROW HUB PANEL */}
          <TabPanel p="0px">
            <SimpleGrid columns={{ base: 1, lg: 3 }} gap="24px">
              {/* Form Input Section */}
              <Grid colSpan={{ base: 1, lg: 2 }} gap="24px">
                <Card borderLeft="4px solid #6C63FF" p="20px">
                  <CardHeader p="0px 0px 16px 0px">
                    <Text fontSize="lg" color={textColor} fontWeight="bold">
                      Customize Your Loan Request
                    </Text>
                  </CardHeader>
                  <CardBody>
                    <form onSubmit={handleApplyLoan}>
                      <VStack spacing="24px" align="stretch" w="100%">
                        <FormControl>
                          <Flex justify="space-between" mb="8px">
                            <FormLabel fontSize="sm" color="gray.400" fontWeight="bold" mb="0">
                              Loan Amount Required
                            </FormLabel>
                            <Text fontSize="md" color="#00D4AA" fontWeight="bold">
                              ₹{loanAmount.toLocaleString("en-IN")}
                            </Text>
                          </Flex>
                          <Slider
                            min={10000}
                            max={500000}
                            step={5000}
                            value={loanAmount}
                            onChange={(val) => setLoanAmount(val)}
                            focusThumbOnChange={false}
                          >
                            <SliderTrack bg="gray.700">
                              <SliderFilledTrack bg="#6C63FF" />
                            </SliderTrack>
                            <SliderThumb boxSize={6} bg="#FFFFFF" border="2px solid #6C63FF" />
                          </Slider>
                        </FormControl>

                        <FormControl>
                          <Flex justify="space-between" mb="8px">
                            <FormLabel fontSize="sm" color="gray.400" fontWeight="bold" mb="0">
                              Repayment Tenure
                            </FormLabel>
                            <Text fontSize="md" color="#6C63FF" fontWeight="bold">
                              {tenure} Months
                            </Text>
                          </Flex>
                          <Slider
                            min={3}
                            max={36}
                            step={3}
                            value={tenure}
                            onChange={(val) => setTenure(val)}
                            focusThumbOnChange={false}
                          >
                            <SliderTrack bg="gray.700">
                              <SliderFilledTrack bg="#6C63FF" />
                            </SliderTrack>
                            <SliderThumb boxSize={6} bg="#FFFFFF" border="2px solid #6C63FF" />
                          </Slider>
                        </FormControl>

                        <FormControl>
                          <FormLabel fontSize="sm" color="gray.400" fontWeight="bold">
                            Purpose of Loan
                          </FormLabel>
                          <Select
                            value={loanPurpose}
                            onChange={(e) => setLoanPurpose(e.target.value)}
                            bg="gray.800"
                            borderColor="gray.700"
                            color="white"
                            _hover={{ borderColor: "#6C63FF" }}
                          >
                            <option value="Business Expansion" style={{ background: "#13131A" }}>Business Expansion</option>
                            <option value="Medical Expenses" style={{ background: "#13131A" }}>Medical Expenses</option>
                            <option value="Higher Education" style={{ background: "#13131A" }}>Higher Education</option>
                            <option value="Debt Consolidation" style={{ background: "#13131A" }}>Debt Consolidation</option>
                            <option value="Emergency Purchase" style={{ background: "#13131A" }}>Emergency Purchase</option>
                          </Select>
                        </FormControl>

                        <Button
                          type="submit"
                          bg="#6C63FF"
                          color="white"
                          fontWeight="bold"
                          size="lg"
                          _hover={{ bg: "#574feb" }}
                          _active={{ bg: "#463ed1" }}
                          isDisabled={applied}
                          w="100%"
                        >
                          {applied ? "Loan Request Pending Match" : "Launch Loan Request"}
                        </Button>
                      </VStack>
                    </form>
                  </CardBody>
                </Card>
              </Grid>

              {/* Calculator Summary panel */}
              <VStack spacing="24px" align="stretch">
                {/* Dynamic Offer Details */}
                <Card borderLeft="4px solid #00D4AA" p="20px">
                  <CardHeader p="0px 0px 12px 0px">
                    <Text fontSize="md" color="gray.400" fontWeight="bold" textTransform="uppercase">
                      Your Risk Assessment
                    </Text>
                  </CardHeader>
                  <CardBody>
                    <VStack align="stretch" spacing="16px" w="100%">
                      <Flex justify="space-between" align="center">
                        <Text color="gray.400" fontSize="sm">SHAURYA Credit Score</Text>
                        <Badge colorScheme="purple" fontSize="md" py="2px" px="8px" borderRadius="4px">
                          {userScore}
                        </Badge>
                      </Flex>
                      <Flex justify="space-between" align="center">
                        <Text color="gray.400" fontSize="sm">Offered ROI (p.a.)</Text>
                        <HStack spacing="2px">
                          <Icon as={FaPercent} color="#00D4AA" w={3.5} h={3.5} />
                          <Text color="#00D4AA" fontSize="lg" fontWeight="bold">{interestRate}%</Text>
                        </HStack>
                      </Flex>
                    </VStack>
                  </CardBody>
                </Card>

                {/* Instant Calculation Output */}
                <Card p="20px" bg="rgba(255, 255, 255, 0.02)">
                  <CardHeader p="0px 0px 16px 0px">
                    <Text fontSize="md" color={textColor} fontWeight="bold">
                      Loan Estimate Details
                    </Text>
                  </CardHeader>
                  <CardBody>
                    <VStack align="stretch" spacing="12px" w="100%">
                      <Flex justify="space-between">
                        <Text color="gray.400" fontSize="sm">Monthly EMI</Text>
                        <Text color="white" fontWeight="bold">₹{Math.round(emi).toLocaleString("en-IN")}</Text>
                      </Flex>
                      <Flex justify="space-between">
                        <Text color="gray.400" fontSize="sm">Principal Amount</Text>
                        <Text color="white">₹{loanAmount.toLocaleString("en-IN")}</Text>
                      </Flex>
                      <Flex justify="space-between">
                        <Text color="gray.400" fontSize="sm">Total Interest Payable</Text>
                        <Text color="white">₹{Math.round(totalInterest).toLocaleString("en-IN")}</Text>
                      </Flex>
                      <Box h="1px" bg="gray.800" my="6px" />
                      <Flex justify="space-between">
                        <Text color="gray.400" fontSize="sm" fontWeight="bold">Total Repayment</Text>
                        <Text color="#00D4AA" fontWeight="bold">₹{Math.round(totalRepayment).toLocaleString("en-IN")}</Text>
                      </Flex>
                    </VStack>
                  </CardBody>
                </Card>
              </VStack>
            </SimpleGrid>

            {/* Application Success tracker */}
            {applied && (
              <Card mt="24px" p="20px" border="1px dashed #6C63FF">
                <CardBody>
                  <Flex align="center" gap="16px" w="100%">
                    <Icon as={FaCheckCircle} color="#00D4AA" w={10} h={10} />
                    <Box>
                      <Text color="white" fontWeight="bold" fontSize="md">
                        P2P Request Broadcasted
                      </Text>
                      <Text color="gray.400" fontSize="xs" mt="2px">
                        We are verifying your Account Aggregator flow assets to match you with suitable lenders. Your loan has been listed on the marketplace.
                      </Text>
                    </Box>
                  </Flex>
                </CardBody>
              </Card>
            )}
          </TabPanel>

          {/* LEND MARKETPLACE PANEL */}
          <TabPanel p="0px">
            {/* Lenders Status Summary */}
            <Card p="20px" borderLeft="4px solid #00D4AA" mb="24px">
              <CardBody>
                <Flex align="center" justify="space-between" wrap="wrap" gap="16px" w="100%">
                  <HStack spacing="14px">
                    <IconBox h="45px" w="45px" bg="#00D4AA">
                      <FaWallet color="black" size="20" />
                    </IconBox>
                    <Box>
                      <Text fontSize="xs" color="gray.400" fontWeight="bold">Lender Wallet Balance</Text>
                      <Text fontSize="xl" color="white" fontWeight="bold">₹{lendersBalance.toLocaleString("en-IN")}</Text>
                    </Box>
                  </HStack>
                  <Button
                    bg="transparent"
                    border="1px solid #00D4AA"
                    color="#00D4AA"
                    fontWeight="bold"
                    _hover={{ bg: "#00D4AA", color: "black" }}
                    onClick={() => {
                      setLendersBalance(prev => prev + 100000);
                      toast({
                        title: "Wallet Topped Up",
                        description: "Added ₹1,00,000 virtual capital to your wallet.",
                        status: "info",
                        duration: 3000,
                        isClosable: true,
                      });
                    }}
                  >
                    Add Lending Funds
                  </Button>
                </Flex>
              </CardBody>
            </Card>

            {/* Active Requests Grid */}
            <Text fontSize="lg" color={textColor} fontWeight="bold" mb="16px" pl="4px">
              Lend in High Yield P2P Pools
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap="24px">
              {marketBorrowers.map((borrower) => {
                const percentFunded = Math.round((borrower.funded / borrower.amount) * 100);
                const isCompleted = percentFunded >= 100;
                const valueInvestInput = fundInput[borrower.id] || "";

                return (
                  <Card key={borrower.id} p="20px" borderLeft={`4px solid ${borrower.score > 700 ? "#00D4AA" : borrower.score >= 600 ? "#FFD166" : "#FF4D6D"}`}>
                    <CardHeader p="0px 0px 12px 0px">
                      <Flex justify="space-between" align="center">
                        <Box>
                          <Text fontSize="md" color="white" fontWeight="bold">{borrower.name}</Text>
                          <Text fontSize="xs" color="gray.400">{borrower.purpose}</Text>
                        </Box>
                        <HStack spacing="8px">
                          <Badge colorScheme="purple">ROI: {borrower.roi}%</Badge>
                          <Badge colorScheme={borrower.score > 700 ? "green" : borrower.score >= 600 ? "yellow" : "red"}>
                            Score: {borrower.score}
                          </Badge>
                        </HStack>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <VStack align="stretch" spacing="12px" w="100%">
                        {/* Funding Progress */}
                        <Box>
                          <Flex justify="space-between" fontSize="xs" mb="4px">
                            <Text color="gray.400">Funding Progress</Text>
                            <Text color="#00D4AA" fontWeight="bold">{percentFunded}% Filled</Text>
                          </Flex>
                          <Progress colorScheme="teal" size="xs" value={percentFunded} borderRadius="8px" />
                          <Flex justify="space-between" fontSize="11px" color="gray.500" mt="4px">
                            <Text>Raised: ₹{borrower.funded.toLocaleString("en-IN")}</Text>
                            <Text>Goal: ₹{borrower.amount.toLocaleString("en-IN")}</Text>
                          </Flex>
                        </Box>

                        {/* Interactive Contribution Form */}
                        {!isCompleted ? (
                          <HStack spacing="12px" pt="8px">
                            <InputGroup size="sm">
                              <InputLeftElement children="₹" color="gray.400" />
                              <Input
                                placeholder="Amount"
                                type="number"
                                bg="gray.850"
                                borderColor="gray.700"
                                color="white"
                                fontSize="xs"
                                value={valueInvestInput}
                                onChange={(e) => setFundInput({ ...fundInput, [borrower.id]: e.target.value })}
                              />
                              <InputRightAddon
                                children="Lend"
                                bg="#00D4AA"
                                color="black"
                                cursor="pointer"
                                fontSize="xs"
                                fontWeight="bold"
                                _hover={{ bg: "#00b28f" }}
                                onClick={() => handleFundBorrower(borrower.id, valueInvestInput)}
                              />
                            </InputGroup>
                          </HStack>
                        ) : (
                          <Badge colorScheme="green" alignSelf="center" w="100%" textAlign="center" py="4px" mt="8px">
                            Fully Funded & Active
                          </Badge>
                        )}
                      </VStack>
                    </CardBody>
                  </Card>
                );
              })}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default Billing;
