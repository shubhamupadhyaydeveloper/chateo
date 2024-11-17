import React from 'react';
import { View, TextInput, KeyboardType } from 'react-native';
const TextInputContainer = ({ placeholder, value, setValue, keyboardType }: { placeholder: string, value: any, setValue: any, keyboardType: KeyboardType }) => {
    return (
        <View
            style={{
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#202427',
                borderRadius: 12,
                marginVertical: 12,
            }}>
            <TextInput
                style={{
                    margin: 8,
                    padding: 8,
                    width: '90%',
                    textAlign: 'center',
                    fontSize: 16,
                    color: '#FFFFFF',
                }}
                multiline={true}
                numberOfLines={1}
                cursorColor={'#5568FE'}
                placeholder={placeholder}
                placeholderTextColor={'#9A9FA5'}
                onChangeText={setValue}
                value={value}
                keyboardType={keyboardType}
            />
        </View>
    );
};

export default TextInputContainer;