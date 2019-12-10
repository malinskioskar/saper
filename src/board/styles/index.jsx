import styled from 'styled-components';

export const StyledBoard = styled.div(props => ({
  position: 'absolute',
  left:`calc(50vw - ${props.boardXOffset}px)`,
  top:`calc(50vh - ${props.boardYOffset}px)`,
}));