import React, { useState } from "react";
import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Button,
  Input,
  useToast,
  Box,
} from "@chakra-ui/react";

import minebg from '../../../assets/img/process/mining.png';
import StyledContainer from "../components/StyledContainer";

export default function Mining() {
  const [diamondNumber, setDiamondNumber] = useState('');
  const [companyNumber, setCompanyNumber] = useState('');
  const toast = useToast();

  const handleMine = () => {
    // 发送数据到后端
    fetch("/api/mine-diamond", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ diamondNumber, companyNumber }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast({
            title: "Mining Successful",
            description: "Data has been sent to the backend.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        console.error("Mining failed:", error);
      });
  };

  return (
    <StyledContainer backgroundImage={minebg} pt="10%">
      <FormControl>
        <FormLabel>Diamond Number</FormLabel>
        <Input
          placeholder="Enter Diamond Number"
          value={diamondNumber}
          onChange={(e) => setDiamondNumber(e.target.value)}
          _hover={{ borderColor: "teal" }} // 添加输入框悬停效果
        />

        <FormLabel mt={6}>Company Number</FormLabel>
        <Input
          placeholder="Enter Company Number"
          value={companyNumber}
          onChange={(e) => setCompanyNumber(e.target.value)}
          _hover={{ borderColor: "teal" }}
        />
        <Flex justify="center" align="center" mt="20px">
          <Button
            type='submit'
            bg='linear-gradient(45deg, rgba(7, 177, 77, 0.6), rgba(0, 128, 128, 0.6))'
            w='54%'
            h='45'
            color='white'
            mt='20px'
            colorScheme="teal"
            size="md"
            style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', transition: 'all 0.2s ease-in-out' }}
            _hover={{ transform: 'scale(1.05)' }}
            _active={{ transform: 'scale(0.95)' }}
          >
            ⚒️  Mine  ⚒️
          </Button>
        </Flex>
      </FormControl>
    </StyledContainer>

  );
}
