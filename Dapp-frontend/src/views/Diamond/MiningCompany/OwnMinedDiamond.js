import React, { useState, useEffect } from "react";
import StyledContainer from "../components/StyledContainer";
import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Button,
  Input,
  useToast,
  Box,
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
  // const [diamondNumber, setDiamondNumber] = useState('');
  // const [companyNumber, setCompanyNumber] = useState('');
  // const toast = useToast();

  useEffect(() => {
    // 获取当前用户拥有的状态为“mined”的钻石列表
    fetch("/diamond.json")
      .then((response) => response.json())
      .then((data) => {
        const OwnMinedDiamonds = data.filter((diamond) => diamond.status === "mined");
        setDiamonds(OwnMinedDiamonds);
      })
      .catch((error) => console.error("获取数据失败:", error));
  }, []);


  return (
    <StyledContainer backgroundImage={minebg} pt="10%">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Rough Diamond</Th>
              <Th>Diamond ID</Th>
              <Th>Company Number</Th>
            </Tr>
          </Thead>
          <Tbody>
            {diamonds.map((diamond) => (
              <Tr key={diamond.id}>
                <Td>
                  <Image src={diamondImage} boxSize="50px" objectFit="cover" />
                </Td>
                <Td>{diamond.id}</Td>
                <Td>{diamond.companyNumber}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        </StyledContainer>

  );
}
