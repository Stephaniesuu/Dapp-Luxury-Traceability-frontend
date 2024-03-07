import React, { useState, useEffect } from "react";
import { useUser } from "../../../UserContext";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Image
} from "@chakra-ui/react";

//asset
import StyledContainer from "../components/StyledContainer";
import diamondImage from "assets/img/diamond.png";
import designbg from "assets/img/process/design.png"

export default function JewelryMaker() {
  const [diamonds, setDiamonds] = useState([])
  const { user } = useUser();
  const { address, usernum, username } = user;;
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
  const toast = useToast();

  //get your owned collected diamond for design from server 
  useEffect(() => {
    const response = fetch(`http://127.0.0.1:8000/design/view/${address}`, {
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
            description: "There is no diamond can be signed.",
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

  const handleDesignClick = (diamond) => {
    setSelectedDiamond(diamond);
    setIsModalOpen(true);
  };

  const handleSignDiamond = async (diamond) => {
    const response = fetch(`http://127.0.0.1:8000/design/designDiamonds/${selectedDiamond.identification}/${address}/${selectedDiamond.unique_id}/${privateKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identification: selectedDiamond.identification, address }),
    });
    response
      .then(async (response) => {
        const data = await response.json();
        console.log('data is',data,typeof(data));
        if (data.length !== 0) {
          const signatureData = JSON.parse(data);
          console.log('Signature:', signatureData);
          const signature = signatureData.signature;
          toast({
            title: "Signing Successful",
            description: signature,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setIsModalOpen(false);
        }
        else {
          toast({
            title: "Signing Failed",
            description: "There was an issue with storing the private key.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      })
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
            <Tr key={diamond.identification}>
              <Td>
                <Image src={diamondImage} boxSize="100px" objectFit="cover" />
              </Td>
              <Td style={{ textAlign: 'center' }}>{diamond.identification}</Td>
              <Td style={{ textAlign: 'center' }}>{diamond.unique_id}</Td>
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

      {/* Modal for signing diamond */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Diamond</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Enter your private key🔑"
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
