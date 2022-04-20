import React from 'react';
import { RecoilRoot } from 'recoil';
import CharCounter from './pages/CharCounter';

function App() {
  return (
    <RecoilRoot>
      <CharCounter />
    </RecoilRoot>
  );
}

export default App;
