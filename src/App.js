import React from 'react';
import './App.css';
import { ThemeProvider } from 'theme-ui';
import theme from '@rebass/preset';
import { Flex, Box, Text } from 'rebass';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import CustomerForm from './components/CustomerForm/CustomerForm';
import FormCep from './components/FormCep/FormCep';
import Render from './components/Demo/Render';
import Toggle from './components/Demo/Toggle';

function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box maxWidth="700px" margin="0 auto">
          <Flex px={2} alignItems='center'>
            <Text p={2} fontWeight='bold'>
              Test demos
            </Text>
            <Box mx='auto' />
            <Link to="/render-test">
              <Text ml="10px" data-testid="render-link">Render</Text>
            </Link>
            <Link to="/toggle">
              <Text ml="10px" data-testid="toggle-link">Toogle</Text>
            </Link>
            <Link to="customer-form">
              <Text ml="10px" data-testid="customer-link">Customer Form</Text>
            </Link>
            <Link to="/form-cep">
              <Text ml="10px" data-testid="address-link">Address Form</Text>
            </Link>
          </Flex>
          <Switch>
            <Route path='/render-test'>
              <Render />
            </Route>
            <Route path='/toggle'>
              <Toggle />
            </Route>
            <Route path='/customer-form'>
              <CustomerForm />
            </Route>
            <Route path='/form-cep'>
              <FormCep />
            </Route>
          </Switch>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
