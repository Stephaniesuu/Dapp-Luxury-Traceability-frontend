import React, { useState, useEffect } from "react";
import { useUser } from "../../../UserContext";
import StyledContainer from "../components/StyledContainer";
import {
  Button,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
} from "@chakra-ui/react";

// assets
import minebg from '../../../assets/img/process/mining.png';
import diamondImage from "assets/img/DiamondType/mined.png";


export default function OwnMined() {
  const [diamonds, setDiamonds] = useState([]);
  const toast = useToast();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = diamonds.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(diamonds.length / rowsPerPage);


  // get user info from UserContext
  const { user } = useUser();
  const { address } = user;

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/user/view/${address}`, {
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
      .catch((error) => {
        console.error("Show your mined diamond failed:", error);
        // show error message
        toast({
          title: "Show Failed",
          description: "Unable to connect to the server.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }, []); // empty dependency array means this effect will only run once (like componentDidMount in classes)


  return (
    <StyledContainer backgroundImage={minebg} pt="10%">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th style={{ textAlign: 'center' }}>Rough Diamond</Th>
            <Th style={{ textAlign: 'center' }}>Diamond ID</Th>
            <Th style={{ textAlign: 'center' }}>Current Owner's Address</Th>
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
            ⬅️  Prev
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
            ➡️  Next
          </Button>}
      </div>
    </StyledContainer>

  );
}
