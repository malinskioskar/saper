import React, { useState, useEffect } from 'react';
import Card from '../card'
import { StyledBoard } from './styles';
import { SETTINGS } from '../settings';

const Board = () => {
    const [listOfCards, setListOfCards] = useState([]);

    //THIS PROJECT (MINESWEEPER) IS WORK IN PROGRESS, I HAVE BEEN WORKING ON IT ON THE TRAIN IN FEW RECENT DAYS TO IMPROVE MY HOOKS KNOWLEDGE
    //I AM ABOUT TO USE SOME CUSTOM HOOKS IN IT VERY SOON
    const boardXOffset = (SETTINGS.cellWidth * SETTINGS.howManyColumns)/2;
    const boardYOffset = (SETTINGS.cellHeight * SETTINGS.howManyRows)/2;

    const createGridData = () => {
        let listOfCards = [];
        for (let columnIndex = 0; columnIndex < SETTINGS.howManyColumns; columnIndex++) {
            for (let rowIndex = 0; rowIndex < SETTINGS.howManyRows; rowIndex++) {
                const indexString = 'column:' + String(columnIndex) + ' row:' + String(rowIndex);
                listOfCards.push(
                    {
                        index:indexString,
                        column:columnIndex,
                        row:rowIndex,
                        isMine:false,
                        value:0,
                        revealed:false,
                    }
                );
            }
        }
        return listOfCards;
    }

    const addMines = (listOfAllCards) => {
        const newListOfCards = [...listOfAllCards];
        for (let i = 0; i < SETTINGS.maxAmountOfLines; i++) {
            const indexOfMine = addMine(newListOfCards);
            for (let j = 0; j < newListOfCards.length; j++) {
                if (newListOfCards[j].index === indexOfMine) {
                    newListOfCards[j].isMine = true;
                }
            }
        }
        return newListOfCards;
    }
    const addMine = (newListOfCards) => {
        const filteredList = newListOfCards.filter((card) => {return !card.isMine});
        const randomIndex = Math.floor(Math.random() * filteredList.length);
        return filteredList[randomIndex].index;
    }

    const calculateValuesForCards = (listOfAllCards) => {
        const newListOfCards = [...listOfAllCards];
        for (let i = 0; i < newListOfCards.length; i++) {
            const currentCard = newListOfCards[i];
            for (let j = 0; j < newListOfCards.length; j++) {
                const checkedAgainsCard = newListOfCards[j];
                if (checkedAgainsCard.isMine) {
                    if(Math.abs(checkedAgainsCard.column - currentCard.column) <= 1 &&
                       Math.abs(checkedAgainsCard.row - currentCard.row) <= 1) {
                        currentCard.value++;
                    }
                }
            }
        }
        return newListOfCards;
    }

    const handleClick = index => {
        const newListOfCards = [...listOfCards];
        const checkIfRevealed= newListOfCards.filter((card) => {return !card.revealed && card.index === index});
        const cardNotRevealedYet = checkIfRevealed.length > 0 ? true : false;
        if (checkIfRevealed.length > 0) {

        }
        console.log('clickedOn:' + index + ' cardNotRevealedYet:' + cardNotRevealedYet);
    }
    useEffect(() => {
        let listOfAllCards = createGridData();
        listOfAllCards = addMines(listOfAllCards);
        listOfAllCards = calculateValuesForCards(listOfAllCards);
        setListOfCards(listOfAllCards);
    }, []);
    
  return (
    <StyledBoard 
        boardXOffset={boardXOffset}
        boardYOffset={boardYOffset}
    > {
        listOfCards.map(card => 
            <Card 
                key={card.index}
                index={card.index}
                column={card.column}
                row={card.row}
                isMine={card.isMine}
                handleClick={handleClick}
                value={card.value}
            />
        )
    }
    </StyledBoard>
  );
}

export default Board;