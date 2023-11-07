import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='w-full flex flex-col justify-center items-center'>
        <Navbar />
        <body>
          <Home />
        </body>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;