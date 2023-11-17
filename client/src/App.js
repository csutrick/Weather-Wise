import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import Footer from './components/Footer';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='w-full flex flex-col justify-center items-center'>
          <Navbar />
          <div>
            <Routes>
                <Route 
                  path="/" 
                  element={<Search />} 
                />
                <Route 
                  path="/login" 
                  element={<Login />} 
                />
                <Route 
                  path="/signup" 
                  element={<Signup />} 
                />
                <Route 
                  path="/favorites" 
                  element={<Favorites />} 
                />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;