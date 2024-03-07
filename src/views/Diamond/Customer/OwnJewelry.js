import React, { useState, useEffect } from "react";
import {
  Flex,
  Image,
  useToast,
  Table,
  Button,
  Input,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

// assets
import diamondImage from "assets/img/DiamondType/jewelry.png";
import StyledContainer from "../components/StyledContainer";
import transferbg from "assets/img/process/transfer.png"

export default function CustomerOwnership() {
  const [diamonds, setDiamonds] = useState([]);
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [transferAddress, setTransferAddress] = useState("");
  const toast = useToast();

  //get your jewelries from server 
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/collect/view`, {
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
        if (Array.isArray(parsedData)) {
          setDiamonds(parsedData);
        } else {
          setDiamonds([
          ]);
        }
      })
      .then(() => {
        if (diamonds.length === 0) {
          toast({
            title: "No Diamond",
            description: "There is no diamond to be designed.",
            status: "info",
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        console.error("Failed to show your collected diamond :", error);
        toast({
          title: "Show Failed",
          description: "Unable to connect to the server.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }, []);

  const handleTransferClick = (diamond) => {
    setSelectedDiamond(diamond);
    setIsTransferModalOpen(true);
  };

  const handleVerifyClick = (diamond) => {
    setSelectedDiamond(diamond);
    setIsVerifyModalOpen(true);
    // 这里可以添加验证钻石真实性的逻辑
  };

  const confirmTransfer = () => {
    // 假设所有权转移成功
    // 从当前列表中移除已转移的钻石
    setDiamonds((prevDiamonds) =>
      prevDiamonds.filter((diamond) => diamond.UniqueId !== selectedDiamond.UniqueId)
    );
    setIsTransferModalOpen(false);
    toast({
      title: "Transfer Successful",
      description: `Ownership of Diamond ID ${selectedDiamond.UniqueId} transferred to ${transferAddress}.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    // 清除选中的钻石和转移地址
    setSelectedDiamond(null);
    setTransferAddress("");
  };


  return (
    <StyledContainer backgroundImage={transferbg} pt="10%" >
      <Table variant="simple" >
        <Thead>
          <Tr>
            <Th>Image</Th>
            <Th>Unique ID</Th>
            <Th>Company Number</Th>
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
              <Td style={{ textAlign: 'center' }}>
                <Button colorScheme="teal" size="sm" onClick={() => handleTransferClick(diamond)}>
                  Transfer
                </Button>
                <Button colorScheme="blue" size="sm" ml={2} onClick={() => handleVerifyClick(diamond)}>
                  Verify
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* 转移所有权模态框 */}
      <Modal isOpen={isTransferModalOpen} onClose={() => setIsTransferModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transfer Ownership</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Enter New Owner's Address"
              value={transferAddress}
              onChange={(e) => setTransferAddress(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={confirmTransfer}>
              Confirm Transfer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* 验证模态框 */}
      <Modal isOpen={isVerifyModalOpen} onClose={() => setIsVerifyModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Verify Diamond</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* 验证逻辑的相关内容 */}
            Verifying Diamond ID: {selectedDiamond?.UniqueId}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => setIsVerifyModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </StyledContainer>
  );
}
