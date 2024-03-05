import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const keySize = width * 0.8 / 10 - 6

const VirtualKeyboard = ({ onKeyPress, letterStates }) => {
    const rows = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '←'],
    ];

    const getKeyStyle = (key: string) => {
        const state = letterStates[key];
        if (state === 'correct') return styles.correctKey;
        if (state === 'present') return styles.presentKey;
        if (state === 'absent') return styles.absentKey;
        return {};
    };

    return (
        <View style={styles.keyboard}>
            {rows.map((row, rowIndex) => (
                <View key={`row-${rowIndex}`} style={styles.row}>
                    {row.map((key) => (
                        <TouchableOpacity
                            key={key}
                            style={[styles.key, key.length > 1 ? styles.specialKey : {}, getKeyStyle(key)]}
                            onPress={() => onKeyPress(key)}>
                            <Text style={styles.keyText}>{key}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    keyboard: {
        marginTop: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5,
    },
    key: {
        width: keySize,
        height: keySize * 2,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 4,
        padding: 5,
        minWidth: 30,
    },
    specialKey: {
        minWidth: keySize * 2.5,
    },
    keyText: {
        fontSize: 18,
        textAlign: 'center',
    },

    correctKey: {
        backgroundColor: 'green',
    },
    presentKey: {
        backgroundColor: 'orange',
    },
    absentKey: {
        backgroundColor: 'red',
    },
});

export default VirtualKeyboard;
