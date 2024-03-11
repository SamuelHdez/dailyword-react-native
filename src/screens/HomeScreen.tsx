import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import GameGrid from '../components/GameGrid';
import VirtualKeyboard from '../components/VirtualKeyboard';

const HomeScreen = () => {
    const [currentWord, setCurrentWord] = useState('');
    const [attempts, setAttempts] = useState([]);
    const [targetWord] = useState('react');
    const initialLetterStates = {
        A: '', B: '', C: '', D: '', E: '',
        F: '', G: '', H: '', I: '', J: '',
        K: '', L: '', M: '', N: '', O: '',
        P: '', Q: '', R: '', S: '', T: '',
        U: '', V: '', W: '', X: '', Y: '', Z: ''
    };

    const [letterStates, setLetterStates] = useState(initialLetterStates);

    const handleKeyPress = (key: string) => {
        if (key === '←') {
            setCurrentWord(currentWord.slice(0, -1));
        } else if (key === 'Enter') {
            if (currentWord.length === 5) {
                updateLetterStates(currentWord, targetWord);
                setAttempts([...attempts, currentWord.toUpperCase()]);
                setCurrentWord('');
            } else {
                alert('You must enter a 5-letter word!');
            }
        } else {
            if (currentWord.length < 5) {
                setCurrentWord(currentWord + key.toUpperCase());
            }
        }
    };

    const updateLetterStates = (word: string, targetWord: string) => {
        const newStates = { ...letterStates };
        const wordUpper = word.toUpperCase();
        const targetWordUpper = targetWord.toUpperCase();

        for (let i = 0; i < wordUpper.length; i++) {
            const letter = wordUpper[i];
            if (targetWordUpper.includes(letter)) {
                if (targetWordUpper[i] === letter) {
                    newStates[letter] = 'correct';
                } else if (!newStates[letter] || newStates[letter] === 'absent') {
                    newStates[letter] = 'present';
                }
            } else {
                if (!newStates[letter]) {
                    newStates[letter] = 'absent';
                }
            }
        }

        setLetterStates(newStates);
    };

    return (
        <View style={styles.container}>
            <GameGrid currentWord={currentWord} attempts={attempts} targetWord={targetWord} />
            <VirtualKeyboard onKeyPress={handleKeyPress} letterStates={letterStates} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
