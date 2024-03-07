import React from "react";
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
import diamondImage from "assets/img/DiamondType/mined.png";
import StyledContainer from "../components/StyledContainer";
import cutbg from '../../../assets/img/process/cutting.png';
import async from "async";

export default function CuttingCompany() {

  const [diamonds, setDiamonds] = useState([]);
  const { user } = useUser();
  const { address, usernum, username } = user;
  const toast = useToast();


    //limit display rows in table
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Add this line to track the state of "cut"
  const [cut, setCut] = useState(false); 


  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = diamonds.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(diamonds.length / rowsPerPage);

  //get mined diamond from server 
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/process/view`, {
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
        console.log(parsedData)
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
  }, [cut]);


  //cut diamond
  const handleCutClick = async (diamond) => {
    //const usernameNumberInt = parseInt(usernameNumber, 10);
    const { identification } = diamond;
    const response = fetch(`http://127.0.0.1:8000/process/processDiamonds/${identification}/${usernum}/${address}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identification: diamond.identification,
        usernum: usernum,
        address: address
      }),
    }).then((response) => {
      if (response.ok) {
        toast({
          title: "Cutting Successful",
          description: "The diamond status has been updated to cut.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        //update cut status
        setCut(prevCut => !prevCut); // Toggle the state of "cut"
      }
      else {
        toast({
          title: "Cutting Failed",
          description: "Unable to connect to the server.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    })
  }

  return (
    <StyledContainer backgroundImage={cutbg} pt="10%" >
      <Table variant="simple" >
        <Thead>
          <Tr>
            <Th style={{ textAlign: 'center' }}>Rough Diamond</Th>
            <Th style={{ textAlign: 'center' }}>Diamond ID</Th>
            <Th style={{ textAlign: 'center' }}>Current Owner</Th>
            <Th style={{ textAlign: 'center' }}>Price</Th>
            <Th style={{ textAlign: 'center' }}>Action</Th>
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
              <Td style={{ textAlign: 'center' }}>0.5 ETH</Td>
              <Td style={{ textAlign: 'center' }}>
                <Button
                  colorScheme="teal"
                  size="sm"
                  onClick={() => handleCutClick(diamond)}
                >
                  Cut it
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
