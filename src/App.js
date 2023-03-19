import React from 'react';
import AsciiImage from './Component/Home/AsciiImage';
import Header from './Component/Home/Header';
import img from './uber.jpeg';

const App = () => {
  return (
    <>
      <Header />
      <div className='flex justify-center align-middle'>
        <AsciiImage imageSrc={img} width={556} height={755} />
      </div>
    </>
  );
};

export default App;
