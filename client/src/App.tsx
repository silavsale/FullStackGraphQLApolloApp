import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, extendTheme } from '@chakra-ui/react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dispatch from './components/Dispatch';

type User = {
  token: string;
  userId: string;
} | null;

const App = () => {
  const [user, setUser] = useState<User>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  console.log('user', user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); // retrieve userId from local storage
    if (token && userId) {
      setUser({ token, userId }); // Set user state if there's a token and userId
    }
  }, []);

  const handleLogin = (userData: { token: string; userId: string }) => {
    setUser(userData);
    setIsRegistering(false);
  };

  const handleRegister = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <ChakraProvider>
      <Box fontSize="xl">
        {!user ? (
          isRegistering ? (
            <RegisterForm onSwitchToLogin={handleRegister} />
          ) : (
            <LoginForm onLogin={handleLogin} onRegister={handleRegister} />
          )
        ) : (
          <Dispatch userId={user.userId} />
        )}
      </Box>
    </ChakraProvider>
  );
};

export default App;
