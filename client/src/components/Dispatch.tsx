import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

const GET_USER_DISPATCHES = gql`
  query GetUserDispatches($userId: ID!) {
    userDispatches(userId: $userId) {
      id
      content
      createdAt
    }
  }
`;

const CREATE_DISPATCH = gql`
  mutation CreateDispatch($userId: ID!, $content: String!) {
    createDispatch(userId: $userId, content: $content) {
      id
      content
      createdAt
    }
  }
`;

type DispatchProps = {
  userId: string;
};

const Dispatch: React.FC<DispatchProps> = ({ userId }) => {
  const { loading, error, data, refetch } = useQuery(GET_USER_DISPATCHES, {
    variables: { userId },
  });

  console.log('data', data);
  console.log('error', error);

  const [createDispatch, { data: newDispatchData }] =
    useMutation(CREATE_DISPATCH);
  const [dispatchContent, setDispatchContent] = useState('');

  useEffect(() => {
    if (newDispatchData) {
      refetch();
    }
  }, [newDispatchData]);

  const handleDispatchSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    await createDispatch({ variables: { userId, content: dispatchContent } });
    setDispatchContent('');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box p={4}>
      <Text as="h2" fontSize="2xl" mb={4}>
        User Dispatches
      </Text>
      <Stack direction={['column', 'row']} mb={4}>
        <FormControl>
          <FormLabel htmlFor="content">Content</FormLabel>
          <Input
            type="text"
            id="content"
            value={dispatchContent}
            onChange={(e) => setDispatchContent(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="blue" type="submit" onClick={handleDispatchSubmit}>
          Create Dispatch
        </Button>
      </Stack>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Content</Th>
            <Th>Created At</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.userDispatches?.map((dispatch: { [key: string]: any }) => (
            <Tr key={dispatch.id}>
              <Td>{dispatch.content}</Td>
              <Td>{dispatch.createdAt || 'N/A'}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Dispatch;
