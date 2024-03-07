import React from "react";
import StyledContainer from "../components/StyledContainer";
import { useState, useEffect } from "react";
import { useUser } from "../../../UserContext";
import {
  Image,
  useToast,
  Table,
  Button,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

// assets
import gradingbg from '../../../assets/img/process/crave.png';
import diamondImage from "assets/img/DiamondType/cut.png";

export default function GradingLab() {

  const [diamonds, setDiamonds] = useState([]);
  const { user } = useUser();
  const { address, usernum, username } = user;
  const toast = useToast();

  //limit display rows in table
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = diamonds.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(diamonds.length / rowsPerPage);

  const [carve, setCarve] = useState(false); 

  //get cut diamond from server 
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/carve/view`, {
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
            description: "There is no diamond to be cut.",
            status: "info",
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        console.error("Failed to show your mined diamond :", error);
        toast({
          title: "Show Failed",
          description: "Unable to connect to the server.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }, [carve]);

  // !!!need to change url
  // carve diamond
  const handleCarvedClick = async (diamond) => {
    const response = fetch(`http://127.0.0.1:8000/carve/carveDiamonds/${diamond.identification}/${address}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        diamondID: diamond.diamondID,
        companyNum: diamond.companyNum,
        address: diamond.address
      }),
    }).then((response) => {
      if (response.ok) {
        toast({
          title: "Carve Successful",
          description: "The diamond status has been updated to Carved.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        //update Carve status
        setCarve(prevCarve => !prevCarve); // Toggle the state of "Carve"
      }
      else {
        toast({
          title: "Carve Failed",
          description: "Unable to connect to the server.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    })
  }

  return (
    <StyledContainer backgroundImage={gradingbg} pt="10%">
      <Table variant="simple" >
        <Thead>
          <Tr>
            <Th>cut Diamond</Th>
            <Th>Unique ID</Th>
            <Th>Current Owner</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentRows.map((diamond) => (
            <Tr key={diamond.identification}>
              <Td style={{ textAlign: 'center' }}>
                <Image src={diamondImage} boxSize="50px" objectFit="cover" />
              </Td>
              <Td style={{ textAlign: 'center' }}>{diamond.identification}</Td>
              <Td style={{ textAlign: 'center' }}>{diamond.currentOwner}</Td>
              <Td >
                <Button
                  colorScheme="teal"
                  size="sm"
                  onClick={() => handleCarvedClick(diamond)}
                >
                  Carve it
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {currentPage > 1 ?
          <Button
            bg='linear-gradient(90deg, rgba(173, 216, 230, 1), rgba(240, 248, 255, 1))'
            w='15%'
            h='45'
            color='white'
            mt='20px'
            colorScheme="teal"
            size="md"
            style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', transition: 'all 0.2s ease-in-out' }}
            _hover={{ transform: 'scale(1.05)' }}
            _active={{ transform: 'scale(0.95)' }}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ⬅️
          </Button>
          :
          <div style={{ width: '30%' }}></div> // empty div for spacing
        }

        {currentPage < totalPages &&
          <Button
            bg='linear-gradient(90deg, rgba(173, 216, 230, 1), rgba(240, 248, 255, 1))'
            w='15%'
            h='45'
            color='white'
            mt='20px'
            colorScheme="teal"
            size="md"
            style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', transition: 'all 0.2s ease-in-out' }}
            _hover={{ transform: 'scale(1.05)' }}
            _active={{ transform: 'scale(0.95)' }}
            onClick={() => setCurrentPage(currentPage + 1)}>
            ➡️
          </Button>}
      </div>
    </StyledContainer>

  );
}
