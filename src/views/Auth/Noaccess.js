import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Text, Box, ChakraProvider, useToast } from '@chakra-ui/react';

function NoAccess() {
  // const [shouldRedirect, setShouldRedirect] = useState(false);
  // const toast = useToast();

  // useEffect(() => {
  //   toast({
  //     title: "错误",
  //     description: "你没有权限访问该页面",
  //     status: "error",
  //     duration: 5000,
  //     isClosable: true
  //   });

  //   const timer = setTimeout(() => {
  //     setShouldRedirect(true);
  //   }, 5000); // 延迟 5 秒

  //   return () => clearTimeout(timer); // 清除定时器
  // }, [toast]); // 添加 toast 作为 useEffect 的依赖

  // if (shouldRedirect) {
  //   return <Redirect to='/auth/signin' />;
  // }

  return (
    <Flex position='relative' mb='40px'>
      <ChakraProvider>
        <Box>
          <Text>
            No Access to this page
          </Text>
        </Box>
      </ChakraProvider>
    </Flex>
  );
}

export default NoAccess;