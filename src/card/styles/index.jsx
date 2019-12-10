import styled from 'styled-components';

export const StyledCard = styled.div(props => ({
    backgroundColor: props.backgroundColor,
    width: `${props.config.cellWidth}px`,
    height: `${props.config.cellHeight}px`,
    border: `${props.borderThickness}px solid ${props.borderColor}`,
    position: 'absolute',
    top: `${props.rowOffset}px`,
    left: `${props.columnOffset}px`,
  }));

