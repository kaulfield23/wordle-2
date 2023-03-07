import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { CustomBox, CustomText } from './customMUI/CustomMUI';

const ColorBoxes = ({ item }) => {
  const [width, setWidth] = useState();
  let boxSize;

  useEffect(() => {
    function handleSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleSize);
    handleSize();

    return () => {
      window.removeEventListener('resize', handleSize);
    };
  }, [setWidth]);

  if (width <= 700) {
    boxSize = `45px`;
  }
  const generateColorBoxes = (backgroundColor, letter) => {
    return (
      <CustomBox
        sx={{
          backgroundColor: backgroundColor,
          width: `${boxSize}`,
          height: `${boxSize}`,
        }}
      >
        <Box sx={{ position: 'relative', top: '30%' }}>
          <CustomText>{letter}</CustomText>
        </Box>
      </CustomBox>
    );
  };

  if (item.result === 'Correct') {
    return generateColorBoxes('#65c2a6', item.letter);
  }
  if (item.result === 'Misplaced') {
    return generateColorBoxes('#f8d486', item.letter);
  }
  if (item.result === 'Incorrect') {
    return generateColorBoxes('#ec8585', item.letter);
  }
};

export default ColorBoxes;
