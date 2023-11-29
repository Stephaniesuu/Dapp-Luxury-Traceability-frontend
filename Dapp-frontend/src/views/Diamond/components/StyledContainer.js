import React from 'react';
import { Flex, Box } from '@chakra-ui/react';

function StyledContainer({ children, backgroundImage, pt }) {
  return (
    <Flex
      borderRadius="lg"
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      flexDirection="column"
      minHeight="100vh"
      pt={pt}
      align="center"
      justify="center"
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
      marginLeft =  "15px" // 这里设置 margin-left
    >
      <Flex
        mx="auto" // 水平居中
        pt={{ base: "200px", md: "2px" }}
      >
        <Box
          w="full"
          p={50}
          borderRadius="lg"
          bg="rgba(255, 255, 255, 0.5)"
          boxShadow="0 4px 10px rgba(0, 0, 0, 0.15)"
          backdropFilter="blur(7px)"
          _hover={{ boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)" }}
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}

export default StyledContainer;
