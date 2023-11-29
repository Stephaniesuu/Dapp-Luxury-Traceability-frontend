import React, { useState, useEffect } from "react";
import {
  Flex,
  Heading,
  Text,
  Image,
  Button,
  SimpleGrid,
  Box, AspectRatio, Slide 
} from "@chakra-ui/react";

// 导入钻石图片
import StyledContainer from "../components/StyledContainer";
import diamondImage from "assets/img/diamond.png";
import designbg from "assets/img/process/design.png"

export default function Jewelrymaker_shop() {

  const [diamonds, setDiamonds] = useState([]);

  useEffect(() => {
    // 模拟从本地 JSON 文件获取数据
    fetch("/diamond.json")
      .then((response) => response.json())
      .then((data) => {
        // 过滤状态为 "engraved" 的钻石
        const engravedDiamonds = data.filter((diamond) => diamond.status === "engraved");
        setDiamonds(engravedDiamonds);
      })
      .catch((error) => {
        console.error("获取数据时出错:", error);
      });
  }, []);

  // 处理购买钻石的函数
  const handleBuy = (diamondId) => {

    // 在此模拟更新后端数据（这部分代码在连接到后端后应修改为实际后端请求）

    // 根据钻石的唯一ID 将状态更改为 "collected"
    setDiamonds((prevDiamonds) =>
      prevDiamonds.map((diamond) =>
        diamond.UniqueId === diamondId
          ? { ...diamond, status: "collected" }
          : diamond
      ));

    // 模拟更新前端状态以移除已购买的钻石
    setDiamonds((prevDiamonds) => prevDiamonds.filter((diamond) => diamond.status === "engraved")
    );

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
    pt= "10%"
    align="center"
    justify="center"
    boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
    marginLeft =  "15px"
  >
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="20px">
        {diamonds.map((diamond) => (
          <ProductCard
            key={diamond.UniqueId}
            image={diamondImage}
            name={diamond.name}
            UniqueId={diamond.UniqueId}
            ProductId={diamond.ProductId}
            status={diamond.status}
            onBuy={handleBuy}
          />
        ))}
      </SimpleGrid>
   </Flex>
  );
}

// 商品卡片组件


function ProductCard({ name, UniqueId, ProductId, status, image, onBuy }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    // <Slide in={true} direction="left" transition={{ enter: { duration: 0.5 } }}>
      <Box
        bg={isHovered ? 'gray.300' : 'gray.200'}
        borderRadius="lg"
        p={4}
        boxShadow={isHovered ? 'xl' : 'lg'}
        my={4}
        mx={2} // Add horizontal margin
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        
      >
        <AspectRatio ratio={1}>
          <Image src={image} alt={name} borderRadius="lg" />
        </AspectRatio>
        <Box p={4}>
          <Heading as="h3" size="md" mt={4}>
            {name}
          </Heading>
          <Text mt={2} mb={4}>
            UniqueId: {UniqueId}
          </Text>
          <Text mt={2} mb={4}>
            ProductId: {ProductId}
          </Text>
          {status === "engraved" ? (
            <Button
              colorScheme="teal"
              size="sm"
              w="100%"
              onClick={() => onBuy(UniqueId)}
              transition="all 0.3s"
              _hover={{ transform: 'scale(1.1)' }}
            >
              Buy
            </Button>
          ) : (
            <Text>Status: {status}</Text>
          )}
        </Box>
      </Box>
    // {/* </Slide> */}
  );
}

