import React from 'react';
import {Login} from '../layouts/unauthorized/components';
import {Main} from '../layouts/authorized/components';
import '../assets/styles/app.scss';

const App = () => {
  const auth = false;

  return !auth ? <Login /> : <Main />;
};

export default App;
