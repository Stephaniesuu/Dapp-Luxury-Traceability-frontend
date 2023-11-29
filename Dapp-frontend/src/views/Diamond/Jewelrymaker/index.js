import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box, // 新添加
  useToast,
  Image
} from "@chakra-ui/react";

//asset
import StyledContainer from "../components/StyledContainer";
import diamondImage from "assets/img/diamond.png";
import designbg from "assets/img/process/design.png"

export default function JewelryMaker() {
  const [diamonds, setDiamonds] = useState([]);
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
  const toast = useToast();

  useEffect(() => {

    // fetch("YOUR_SPRING_BOOT_URL/diamonds")
    fetch("/diamond.json")
      .then((response) => response.json())
      .then((data) => {
        const engravedDiamonds = data.filter((diamond) => diamond.status === "collected");
        setDiamonds(engravedDiamonds);
      })
      .catch((error) => console.error("获取数据时出错:", error));
  }, []);

  const handleDesignClick = (diamond) => {
    setSelectedDiamond(diamond);
    setIsModalOpen(true);
  };

  const handleSignDiamond = () => {
    // 模拟签名成功的过程
    // 直接更新状态，不调用后端接口
    updateDiamondStatus(selectedDiamond.UniqueId, "designed");
    setIsModalOpen(false);
    toast({
      title: "Signing Successful",
      description: "The diamond status has been updated to designed.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };
  // const handleSignDiamond = () => {
  //   //假设后端会返回一个包含 success 字段的 JSON 对象来指示操作是否成功
  //   // 发送私钥到后端
  //   fetch('/store-private-key', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ privateKey, uniqueId: selectedDiamond.UniqueId }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.success) {
  //         updateDiamondStatus(selectedDiamond.UniqueId, "designed");
  //         setIsModalOpen(false);
  //         toast({
  //           title: "Signing Successful",
  //           description: "The diamond status has been updated and the private key stored.",
  //           status: "success",
  //           duration: 5000,
  //           isClosable: true,
  //         });
  //       } else {
  //         // 处理后端返回的错误
  //         toast({
  //           title: "Signing Failed",
  //           description: "There was an issue with storing the private key.",
  //           status: "error",
  //           duration: 5000,
  //           isClosable: true,
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("在储存私钥时出错:", error);
  //       toast({
  //         title: "Signing Failed",
  //         description: "An error occurred while storing the private key.",
  //         status: "error",
  //         duration: 5000,
  //         isClosable: true,
  //       });
  //     });
  // };

  // const updateDiamondStatus = (uniqueId, newStatus) => {
  //   // 发送请求到后端以更新状态
  //   fetch('/update-diamond-status', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ uniqueId, newStatus }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.success) {
  //         setDiamonds((prevDiamonds) =>
  //           prevDiamonds.filter((d) => d.UniqueId !== uniqueId)
  //         );
  //         toast({
  //           title: "Signing Successful",
  //           description: "The diamond status has been updated to designed.",
  //           status: "success",
  //           duration: 5000,
  //           isClosable: true,
  //         });
  //       } else {

  //         // 处理后端返回的错误
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("更新状态时出错:", error);

  //     });
  // };
  const updateDiamondStatus = (uniqueId, newStatus) => {
    // 直接更新钻石的状态
    setDiamonds((prevDiamonds) =>
      prevDiamonds.filter((d) => d.UniqueId !== uniqueId)
    );
  };

  return (
    <StyledContainer backgroundImage={designbg} pt="10%">

        <Table variant="simple" >
          <Thead>
            <Tr>
              <Th>Encarved DIAMOND</Th>
              <Th>Product ID</Th>
              <Th>Unique ID</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {diamonds.map((diamond) => (
              <Tr key={diamond.UniqueId}>
                <Td>
                  <Image src={diamondImage} boxSize="100px" objectFit="cover" />
                </Td>
                <Td style={{ textAlign: 'center' }}>{diamond.ProductId}</Td>
                <Td style={{ textAlign: 'center' }}>{diamond.UniqueId}</Td>
                <Td>
                  <Button
                    colorScheme="teal"
                    size="sm"
                    onClick={() => handleDesignClick(diamond)}
                  >
                    Design
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

      {/* 私钥输入和确认模态框 */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Diamond</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Enter Private Key"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleSignDiamond}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </StyledContainer>
  );
}
