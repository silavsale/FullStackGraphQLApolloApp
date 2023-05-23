import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import {
  Input,
  Button,
  Stack,
  Box,
  Text,
  Heading,
  Flex,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      id
      username
    }
  }
`;

type RegisterFormProps = {
  onSwitchToLogin: () => void;
};

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [register, { loading, error }] = useMutation(REGISTER_MUTATION);
  const toast = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await register({ variables: { username, password } });
      console.log('response', response);

      if (response && response.data && response.data.createUser) {
        toast({
          title: 'Registration successful',
          description: `Welcome, ${response.data.createUser.username}!`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        setUsername('');
        setPassword('');
      } else {
        throw new Error('Registration failed: No data returned from server');
      }
    } catch (err) {
      console.error('Failed to register:', err);

      toast({
        title: 'Registration failed',
        description: 'An error occurred during registration.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {' '}
      <Flex h="100vh" alignItems="center" justifyContent="center">
        <Flex
          flexDirection="column"
          bg={'green.200'}
          p={12}
          borderRadius={8}
          boxShadow="lg"
        >
          <Stack spacing={3} maxWidth="320px" margin="0 auto">
            <Heading as="h3" size="lg" m={'2'} p={'2'}>
              Register Form
            </Heading>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" colorScheme="blue">
              Register
            </Button>
            <Button type="button" colorScheme="blue" onClick={onSwitchToLogin}>
              Login
            </Button>
            {loading && <Text>Loading...</Text>}
            {error && <Text color={'red.500'}>Error :{error.message}</Text>}
          </Stack>
        </Flex>
      </Flex>
    </form>
  );
};

export default RegisterForm;
