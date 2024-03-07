import React, { useState, useContext } from 'react';
import UserContext from '../../UserContext.js'; // 导入UserContext
import { useHistory } from "react-router-dom";
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
  Select,
  Link as ChakraLink, 
} from "@chakra-ui/react";
import 'animate.css';

// Assets
import signInImage from "assets/img/diamond.gif";

function SignIn() {
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);
  
  const history = useHistory();

    const handleSignIn = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("http://127.0.0.1:8000/login/", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: email, password: password }),
      });
        const data = await response.json();
        if (response.ok) {
          // using UserContext to update the state of user
          setUser(data);
          console.log("your current user is :",data);
          // redirect to dashboard
          switch ((data.role).toString()) {
            case "mining":
              history.push("/admin/mining/dashboard");
              break;
            case "jewelrymaker":
              history.push("/admin/jewelrymaker/dashboard");
              break;
            case "customer":
              history.push("/admin/customer/dashboard");
              break;
            case "cutting":
              history.push("/admin/cutting/dashboard");
              break;
            case "grading":
              history.push("/admin/grading/dashboard");
              break;
            default:
              history.push("/");
          }
        } else {
          throw new Error('Invalid credentials');
        }
      } catch (err) {
        setError("Login failed: " + err.message);
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <Flex position='relative' mb='40px'>
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w='100%'
        maxW='1044px'
        mx='auto'
        justifyContent='space-between'
        mb='30px'
        pt={{ sm: "100px", md: "0px" }}>
        <Flex
          alignItems='center'
          justifyContent='start'
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}>
          <Flex
            direction='column'
            w='100%'
            background='transparent'
            p='48px'
            mt={{ md: "150px", lg: "80px" }}>
            <Heading 
            color={titleColor} fontSize='32px' mb='10px'
            >
              <div class="animate__animated animate__bounce animate__repeat-2">
              💎Welcome Back!!💎
              </div>
            </Heading>
            <Text
              mb='36px'
              ms='4px'
              color={textColor}
              fontWeight='bold'
              fontSize='14px'>
              Enter your username and password to sign in

            </Text>
            <FormControl>
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                📮Username
              </FormLabel>
              <Input
                borderRadius='15px'
                mb='24px'
                fontSize='sm'
                type='text'
                placeholder='Your username address'
                size='lg'
                borderColor="teal.300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                🔑Password
              </FormLabel>
              <Input
                borderRadius='15px'
                mb='36px'
                fontSize='sm'
                type='password'
                placeholder='Your password'
                size='lg'
                borderColor="teal.300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                fontSize='15px'
                type='submit'
                bg='teal.300'
                w='100%'
                h='45'
                mb='20px'
                color='white'
                mt='20px'
                _hover={{
                  bg: "teal.200",
                }}
                _active={{
                  bg: "teal.400",
                }}
                onClick={handleSignIn}
                isLoading={isLoading}
              >
                SIGN IN
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
                Don't have an account?
                <ChakraLink
                  color={titleColor}
                  as={ReactRouterLink}
                  to="/auth/signup"
                  ms='5px'
                  fontWeight='bold'>
                  Sign Up
                </ChakraLink>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX='hidden'
          h='115%'
          w='50vw'
          position='absolute'
          right='0'>
          <Box
            bgImage={signInImage}
            w='100%'
            h='100%'
            bgSize='cover'
            bgPosition="center"
            position="absolute"
            borderBottomLeftRadius="20px"
            filter="brightness(70%)"
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
