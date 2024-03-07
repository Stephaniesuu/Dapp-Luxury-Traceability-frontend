// Chakra imports
import { Link as ReactRouterLink,Redirect } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Link as ChakraLink, 
  Switch,
  Text,
  useColorModeValue,
  Select,
  useToast,
} from '@chakra-ui/react';

// Assets
import React, { useState } from "react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";

function SignUp() {
  const toast = useToast();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [companyNum, setCompanyNum] = useState('');
  const [companyType, setCompanyType] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent the default form submit behavior
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://127.0.0.1:8000/register/${username}/${password}/${address}/${companyNum}/${companyType}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password, address, companyNum, companyType }),
        });
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Register success",
          description: "you have registered successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        return <Redirect to="auth/signin"/>;
      }
      else {
        // Server-end error: for failed response.
        setError(data.message);
        toast({
          title: "Register failed",
          description: data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      // Front-end error:for network error or cannot handle the json data from response.
      setError("Register failed: " + error.message);
      toast({
        title: "register failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }}


    const titleColor = useColorModeValue("teal.300", "teal.200");
    const textColor = useColorModeValue("gray.700", "white");
    const bgColor = useColorModeValue("white", "gray.700");
    const bgIcons = useColorModeValue("teal.200", "rgba(255, 255, 255, 0.5)");
    return (
      <Flex
        direction='column'
        alignSelf='center'
        justifySelf='center'
        overflow='hidden'>
        <Box
          position='absolute'
          minH={{ base: "70vh", md: "50vh" }}
          w={{ md: "calc(100vw - 50px)" }}
          borderRadius={{ md: "15px" }}
          left='0'
          right='0'
          bgRepeat='no-repeat'
          overflow='hidden'
          zIndex='-1'
          top='0'
          bgSize='cover'
          mx={{ md: "auto" }}
          mt={{ md: "14px" }}>
        </Box>

        <Flex alignItems='center' justifyContent='center' mb='60px' mt='20px'>
          <Flex
            direction='column'
            w='445px'
            background='transparent'
            borderRadius='15px'
            p='40px'
            mx={{ base: "100px" }}
            bg={bgColor}
            boxShadow='0 20px 27px 0 rgb(0 0 0 / 5%)'>
            <Text
              fontSize='xl'
              color={textColor}
              fontWeight='bold'
              textAlign='center'
              mb='22px'>
              Register With
            </Text>
            <HStack spacing='15px' justify='center' mb='22px'>
              <Flex
                justify='center'
                align='center'
                w='75px'
                h='75px'
                borderRadius='15px'
                border='1px solid lightgray'
                cursor='pointer'
                transition='all .25s ease'
                _hover={{ filter: "brightness(120%)", bg: bgIcons }}>
                <ChakraLink href='#'>
                  <Icon
                    as={FaFacebook}
                    w='30px'
                    h='30px'
                    _hover={{ filter: "brightness(120%)" }}
                  />
                </ChakraLink>
              </Flex>
              <Flex
                justify='center'
                align='center'
                w='75px'
                h='75px'
                borderRadius='15px'
                border='1px solid lightgray'
                cursor='pointer'
                transition='all .25s ease'
                _hover={{ filter: "brightness(120%)", bg: bgIcons }}>
                <ChakraLink href='#'>
                  <Icon
                    as={FaApple}
                    w='30px'
                    h='30px'
                    _hover={{ filter: "brightness(120%)" }}
                  />
                </ChakraLink>
              </Flex>
              <Flex
                justify='center'
                align='center'
                w='75px'
                h='75px'
                borderRadius='15px'
                border='1px solid lightgray'
                cursor='pointer'
                transition='all .25s ease'
                _hover={{ filter: "brightness(120%)", bg: bgIcons }}>
                <ChakraLink href='#'>
                  <Icon
                    as={FaGoogle}
                    w='30px'
                    h='30px'
                    _hover={{ filter: "brightness(120%)" }}
                  />
                </ChakraLink>
              </Flex>
            </HStack>
            <Text
              fontSize='lg'
              color='gray.400'
              fontWeight='bold'
              textAlign='center'
              mb='22px'>
              or
            </Text>
            <FormControl>
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                User Name
              </FormLabel>
              <Input
                fontSize='sm'
                ms='4px'
                borderRadius='15px'
                type='User Name'
                placeholder='Your full User Name'
                mb='24px'
                size='lg'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Password
              </FormLabel>
              <Input
                fontSize='sm'
                ms='4px'
                borderRadius='15px'
                type='password'
                placeholder='Your password'
                mb='24px'
                size='lg'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Address
              </FormLabel>
              <Input
                fontSize='sm'
                ms='4px'
                borderRadius='15px'
                type='Address'
                placeholder='Your Address'
                mb='24px'
                size='lg'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Company Number
              </FormLabel>
              <Input
                fontSize='sm'
                ms='4px'
                borderRadius='15px'
                type='Company Number'
                placeholder='Your Company Number'
                mb='24px'
                size='lg'
                value={companyNum}
                onChange={(e) => setCompanyNum(e.target.value)}
              />

              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Company Type
              </FormLabel>
              <Select
                fontSize='sm'
                ms='4px'
                borderRadius='15px'
                placeholder='Your Company Type'
                mb='24px'
                size='lg'
                value={companyType}
                onChange={(e) => setCompanyType(e.target.value)}
              >
                <option value="mining">Mine Company</option>
                <option value="cutting">Cutting Company</option>
                <option value="grading">Grading Lab</option>
                <option value="jewelrymaker">Jewelry Maker</option>
                <option value="customer">Customer</option>
              </Select>
              <Button
                type='submit'
                bg='teal.300'
                fontSize='10px'
                color='white'
                fontWeight='bold'
                w='100%'
                h='45'
                mb='24px'
                _hover={{
                  bg: "teal.200",
                }}
                _active={{
                  bg: "teal.400",
                }}
                onClick={handleSubmit}
                isLoading={isLoading}
              >
                SIGN UP
              </Button>
              {error && <Text color="red.500">{error}</Text>}
            </FormControl>
            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              maxW='100%'
              mt='0px'>
              <Text color={textColor} fontWeight='medium'>
                Already have an account?
                <ChakraLink
                  color={titleColor} 
                  as={ReactRouterLink} 
                  ms='5px'
                  to="/auth/signin"
                  fontWeight='bold'>
                  Sign In
                </ChakraLink>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  }

  export default SignUp;
