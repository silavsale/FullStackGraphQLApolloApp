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

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

type LoginFormProps = {
  onLogin: (userData: { token: string; userId: string }) => void;
  onRegister: () => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onRegister }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, error, data }] = useMutation(LOGIN_MUTATION);
  const toast = useToast();
  console.log('LoginForm data', data);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('LoginForm.tsx handleSubmit');

    try {
      const response = await login({
        variables: { username: name, password: password },
      });

      // Here you should handle the response, save the token, etc.
      // For example, you might want to save it in localStorage:
      localStorage.setItem('token', response.data.login.token);
      localStorage.setItem('userId', response.data.login.user.id); // store userId in local storage
      console.log(response.data.login); // This will log 'Login successful' or 'Invalid credentials'

      // Call the onLogin function passed in from the parent component
      onLogin({
        token: response.data.login.token,
        userId: response.data.login.user.id,
      });

      // Show success toast
      toast({
        title: 'Login successful',
        description: 'You have been logged in.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error('Failed to log in:', err);

      // Show error toast
      toast({
        title: 'Login failed',
        description: 'An error occurred while logging in.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
              Login Form
            </Heading>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" colorScheme="blue">
              Log in
            </Button>
            <Button type="button" colorScheme="teal" onClick={onRegister}>
              Register
            </Button>
            {loading && <Text>Loading...</Text>}
            {error && <Text color={'red.500'}>Error :{error.message}</Text>}
          </Stack>
        </Flex>
      </Flex>
    </form>
  );
};

export default LoginForm;
