import React from 'react';

const Home = (props) => {
  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>AgileHelp!</div>
        <div id="subtitle">O bot já está ao seu dispor!!</div>
      </div>
      <iframe
        title="Webchat"
        src="http://localhost:3000/"
        style={{
          width: '100%',
          height: '620px',
          border: 'none',
        }}
      />
    </div>
  );
};

export default Home;
