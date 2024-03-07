import React, { useState, useEffect } from "react";
import { useUser } from "../../../UserContext";
import {
  Flex,
  Heading,
  Text,
  Image,
  Button,
  SimpleGrid,
  Box,
  AspectRatio,
  useToast,
} from "@chakra-ui/react";

// assets
import diamondImage from "assets/img/diamond.png";
import designbg from "assets/img/process/design.png"

export default function Jewelrymaker_shop() {
  const [diamonds, setDiamonds] = useState([]);
  const { user } = useUser();
  const { address, usernum, username } = user;
  const toast = useToast();


  //get carved diamond from server 
  useEffect(() => {
    const response = fetch(`http://127.0.0.1:8000/collect/view`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    })
      .then(response => response.json()) // parse JSON from request
      .then(data => {
        // parse data because data is in JSON format
        const parsedData = JSON.parse(data);
        if (parsedData.length !== 0) {
          setDiamonds(parsedData);
        } else if (parsedData.length === 0) {
          toast({
            title: "No Diamond",
            description: "There is no diamond can be collect.",
            status: "info",
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        console.error("Failed to show diamond in diamond shop:", error);
        toast({
          title: "Show Failed",
          description: "Unable to connect to the server.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }, []);


  // 处理购买钻石的函数
  function handleBuy(ProductId) {
    fetch(`http://127.0.0.1:8000/collect/collectDiamonds/${ProductId}/${address}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // If you need to send a body, you can add it here
      // body: JSON.stringify({ key: 'value' }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle the response data
        console.log(data);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  };

  return (
    <Flex
      borderRadius="lg"
      backgroundImage={designbg}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      flexDirection="column"
      minHeight="100vh"
      pt="10%"
      align="center"
      justify="center"
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
      marginLeft="15px"
    >
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="20px">
        {diamonds.map((diamond) => (
          <ProductCard
            key={diamond.identification}
            image={diamondImage}
            ProductId={diamond.identification}
            price={5}
            onBuy={handleBuy}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
}


// diamond product card
function ProductCard({ name, ProductId, image, onBuy , price }) {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <Box
      bg={isHovered ? 'gray.300' : 'gray.200'}
      borderRadius="lg"
      p={4}
      boxShadow={isHovered ? 'xl' : 'lg'}
      my={4}
      mx={2}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}

    >
      <AspectRatio ratio={1}>
        <Image src={image} alt={name} borderRadius="lg" />
      </AspectRatio>
      <Box p={4}>
        <Heading as="h3" size="md" mt={4}>
          Carved Diamond
        </Heading>
        <Text mt={2} mb={4}>
          ProductId: {ProductId}
        </Text>
        <Text  mt={2} mb={4}>
          Price: {price} ETH
        </Text>
          <Button
            colorScheme="teal"
            size="sm"
            w="100%"
            onClick={() => onBuy(ProductId)}
            transition="all 0.3s"
            _hover={{ transform: 'scale(1.1)' }}
          >
            Buy
          </Button>
      </Box>
    </Box>
  );
}

