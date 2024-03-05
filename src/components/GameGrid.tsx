import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cellSize = width * 0.9 / 5 - 10;

const GameGrid = ({ currentWord, attempts, targetWord }) => {
    const rows = 6;
    const columns = 5;


    const getLetterColors = (attempt: string, targetWord: string) => {
        let result = new Array(attempt.length).fill('red');
        let targetWordCopy = targetWord.toUpperCase().split('');

        for (let i = 0; i < attempt.length; i++) {
            if (attempt[i] === targetWordCopy[i]) {
                result[i] = 'green';
                targetWordCopy[i] = null;
            }
        }

        for (let i = 0; i < attempt.length; i++) {
            if (result[i] !== 'green' && targetWordCopy.includes(attempt[i])) {
                result[i] = 'orange';
                targetWordCopy[targetWordCopy.indexOf(attempt[i])] = null;
            }
        }

        return result;
    };

    return (
        <View style={styles.grid}>
            {Array.from({ length: rows }, (_, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {Array.from({ length: columns }, (_, cellIndex) => {
                        let content = '';
                        let backgroundColor = '#fff';

                        if (rowIndex < attempts.length) {
                            content = attempts[rowIndex][cellIndex] || '';
                            const colors = getLetterColors(attempts[rowIndex], targetWord);
                            backgroundColor = colors[cellIndex] || '#fff';
                        } else if (rowIndex === attempts.length && currentWord) {
                            content = currentWord[cellIndex] || '';
                        }

                        return (
                            <View key={cellIndex} style={[styles.cell, { backgroundColor }]}>
                                <Text style={styles.cellText}>{content.toUpperCase()}</Text>
                            </View>
                        );
                    })}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    grid: {
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5,
    },
    cell: {
        width: cellSize,
        height: cellSize,
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
    },
    cellText: {
        fontSize: 20,
    },
});

export default GameGrid;
