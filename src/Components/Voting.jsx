import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import { Button } from 'react-bootstrap';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import Select from 'react-select';

const Voting = ({ timer, playerInfo, currentPhase, playerRoles, playerState, socket }) => {
  //need to get playerId through props from GamePage
  console.log('compPInfo', playerInfo);
  const [voteSelection, setVoteSelection] = useState(null);

  const options = playerInfo
    .filter((player) => player.player_id !== playerState.player_id)
    .map((player, idx) => {
      return { value: player.username, label: player.username }
    });

  const logChange = (e) => {
    setVoteSelection(e.value);
  }

  useEffect(() => {
    //TODO: add lifecycle method to watch for cuurentPhase change
  }, [currentPhase]);

  const submitVote = (e) => {
    let voteTuple = [playerState.username, voteSelection];
    // On Click of Submit button, create and send tuple of vote values
    // VOTE SENDER
    console.log(voteTuple)
    socket.emit('vote-send', voteTuple);
  };

  return (
    <>
      <h3>Voting</h3>
      <Select
        className="dropdown"
        options={options}
        onChange={logChange}
      />
      <div className="game-button">
        <Button variant="warning" style={{ marginRight: "18px" }}>Skip Vote</Button>{' '}
        <Button variant="secondary" onClick={submitVote}>Submit</Button>{' '}
        {/* submit button will have submitVote functionality
        state to track submitted status
        disable button if submitted is true */}
      </div>
    </>
  );
};

export default Voting;
