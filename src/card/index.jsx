import React from 'react';
import { StyledCard } from './styles';
import { SETTINGS } from '../settings';

function Card({index, column, row, handleClick, isMine, value, config}) {
    const borderThickness = 1;
    const extraLeftOffset = 0;
    const extraTopOffset = 0;
    const columnOffset = (SETTINGS.cellWidth * column) + extraLeftOffset;
    const rowOffset = (SETTINGS.cellHeight * row) + extraTopOffset;
    const borderColor = 'grey';
    const valueToBeDisplayed = isMine ? 'X' : value;
    
    let backgroundColor = '#CCCCCC';
    if (isMine) {
        backgroundColor = 'red';
    }
  return (
    <StyledCard 
        config={SETTINGS}
        backgroundColor={backgroundColor}
        borderThickness={borderThickness}
        columnOffset={columnOffset}
        rowOffset={rowOffset}
        borderColor={borderColor}
        onClick={() => {
        handleClick(index)
    }}>
        {valueToBeDisplayed}
    </StyledCard>
  );
}

export default Card;