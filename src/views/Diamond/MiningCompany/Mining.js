import React, { useState } from "react";
import { useUser } from "../../../UserContext";
import {
  Flex,
  FormControl,
  FormLabel,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";

import minebg from '../../../assets/img/process/mining.png';
import StyledContainer from "../components/StyledContainer";

export default function Mining() {
  const [diamondNumber, setDiamondNumber] = useState('');
  const [companyNumber, setCompanyNumber] = useState('');
  const toast = useToast();

  // get usr info from UserContext
  const { user } = useUser();
  const { address } = user;

  const handleMine = () => {
    // change the type of diamondNumber and companyNumber from string to int
    const diamondNumberInt = parseInt(diamondNumber, 10);
    const companyNumberInt = parseInt(companyNumber, 10);

    // check if the input is valid
    if (isNaN(diamondNumberInt) || isNaN(companyNumberInt)) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return; // stop executing the function
    }
    
    const response = fetch(`http://127.0.0.1:8000/mine/mineDiamonds/${diamondNumberInt}/${companyNumberInt}/${address}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ diamondID: diamondNumberInt, companyNum: companyNumberInt }),
    })
      .then((response) => {
        if (response.ok) {
          toast({
            // mining successful
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
        // show error message
        toast({
          title: "Mining Failed",
          description: "Unable to connect to the server.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
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
          _hover={{ borderColor: "teal" }} 
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
            onClick={handleMine}
          >
            ⚒️  Mine  ⚒️
          </Button>
        </Flex>
      </FormControl>
    </StyledContainer>

  );
}
