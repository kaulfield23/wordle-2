import React, { useState } from 'react';
import {
  Typography,
  Box,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Button,
} from '@mui/material';
import { CustomText, CenterHorizon } from '../UI/customMUI/CustomMUI';

const ConfigureGame = (props) => {
  const [wordLimit, setWordLimit] = useState('');
  const [wordType, setWordType] = useState('repeating');

  const onChangeWordLimit = (e) => {
    setWordLimit(e.target.value);
  };

  const onChangeWordType = (e) => {
    setWordType(e.target.value);
  };

  const checkValues = (e) => {
    if (!wordLimit) {
      e.preventDefault();
      return alert('Set the word limit for playing!');
    }
    props.wordType({ limit: wordLimit, type: wordType });
  };

  const gameType = [
    { value: 'repeating', label: 'Repeating characters (e.g.HELLO)' },
    { value: 'unique', label: 'Unique characters only (e.g.CURLY)' },
  ];

  return (
    <>
      <Typography
        sx={{
          fontSize: '25px',
          margin: '50px auto 70px auto',
          fontWeight: 'bold',
          color: '#65c2a6',
          fontFamily: 'nunito',
          textAlign: 'center',
        }}
      >
        Wordle Game
      </Typography>
      <Typography
        sx={{
          fontSize: '20px',
          textAlign: 'center',
          color: '#6d4c41',
        }}
      >
        🧁Configure game
      </Typography>
      <Box
        sx={{
          minWidth: 300,
          m: '20px auto 100px auto',
          width: '200px',
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="howManyLetters">How many letters?</InputLabel>
          <Select
            labelId="howManyLetters"
            id="howManyLetters"
            value={wordLimit}
            label="How many letters?"
            onChange={onChangeWordLimit}
          >
            {[4, 5, 6].map((num) => (
              <MenuItem
                value={num}
                key={`Menu-${num}`}
              >{`Play with ${num}-letter words`}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <CenterHorizon
        sx={{
          marginBottom: '20px',
        }}
      >
        <FormControl sx={{ textAlign: 'center' }}>
          <FormLabel sx={{ m: 2 }} id="wordType">
            Word type
          </FormLabel>
          <RadioGroup
            aria-labelledby="wordType"
            value={wordType}
            onChange={onChangeWordType}
            name="repeating"
          >
            {gameType.map((item) => (
              <FormControlLabel
                key={item.value}
                sx={{ m: 1 }}
                value={item.value}
                control={<Radio color="secondary" />}
                label={item.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </CenterHorizon>

      <CenterHorizon
        sx={{
          paddingBottom: '30px',
        }}
      >
        <Button variant="contained" onClick={checkValues}>
          <CustomText>PLAY WORDLE!</CustomText>
        </Button>
      </CenterHorizon>
    </>
  );
};

export default ConfigureGame;
