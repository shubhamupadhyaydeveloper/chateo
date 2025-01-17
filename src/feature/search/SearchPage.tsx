import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import Ionicon from 'react-native-vector-icons/FontAwesome5'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { goBackNavigate } from '../../utils/navigationutils';

const SearchPage = () => {
    const [input, setInput] = useState<string>('');
    const [isSearch, setIsSearch] = useState(false);
    const sharedRotate = useSharedValue(50)
    const sharedOpacity = useSharedValue(0.5)

    useEffect(() => {
        setIsSearch(input.length >= 1);
    }, [input]);

    const iconAnimate = useAnimatedStyle(() => {
        sharedRotate.value = withSpring(isSearch ? 0 : 50, { damping: 10, stiffness: 100 })
        sharedOpacity.value = withTiming(isSearch ? 1 : 0.5, { duration: 50 })
        return {
            transform: [{ rotate: `${sharedRotate.value}deg` }],
            opacity: sharedOpacity.value
        }
    })

    const handleClicked = () => {
        console.log('clicked')
    }


    return (
        <SafeAreaView>
            <View className='bg-[#22282C] flex flex-row items-center px-[20px] gap-[15px]'>
                {isSearch ?
                    <TouchableOpacity onPress={goBackNavigate}>
                        <Animated.View style={[iconAnimate]}>
                            <Ionicon name='arrow-left' color={"white"} size={18} />
                        </Animated.View>
                    </TouchableOpacity>
                    :
                    <FontistoIcon
                        name={isSearch ? 'arrow-left' : 'search'}
                        color={'#ffffff'}
                        size={15}
                    />
                }
                <TextInput
                    autoFocus
                    className='flex-1'
                    value={input}
                    onChangeText={setInput}
                    placeholder='Search'
                    placeholderTextColor={'white'}
                    cursorColor={'#00AA82'}
                    selectionColor={'#00AA82'}
                />
            </View>
            <Text className='text-white mt-[50px] text-center'>SearchPage</Text>
        </SafeAreaView>
    );
};


export default SearchPage;
