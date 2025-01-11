import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { screenHeight, screenWidth } from '../../utils/responsive';
import CustomButton from '../../../storybook/stories/CustomButton/CustomButton';
import { navigate, resetAndNavigate } from '../../utils/navigationutils';
import { mmkvStorage } from '../../store/mmkv';

const AuthProfile = () => {
    const navigation = useNavigation();
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView >
                <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={.86}>
                    <View className='px-[10px] mt-[5px] flex flex-row items-center'>
                        <AntDesignIcon name='arrowleft' color={"white"} size={25} style={{ width: 30 }} />
                        <Text className='text-white font-bold'>Your Profile</Text>
                    </View>
                </TouchableOpacity>



                <View className='justify-around h-full items-center flex' >
                    <View>
                        <View className='self-center relative' >
                            <View className='bg-[#3C474F] w-[120px] h-[120px] items-center justify-center rounded-full '>
                                <AntDesignIcon name='user' color={"white"} size={40} style={{ textAlign: "center" }} />
                            </View>
                            <View className='bg-white rounded-full w-[35px] h-[35px] items-center justify-center absolute right-0 bottom-0'>
                                <AntDesignIcon name='plus' color={"black"} size={25} style={{ textAlign: "center" }} />
                            </View>
                        </View>

                        <View className='flex flex-col gap-[10px]' style={{ marginTop: screenHeight * .03 }}>
                            <View
                                style={{
                                    paddingHorizontal: 10,
                                    paddingVertical: 3,
                                    borderRadius: 10,
                                    backgroundColor: '#3C474F',
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 4,
                                    elevation: 5,
                                }}>
                                <TextInput
                                    style={{
                                        color: 'white',
                                        width: screenWidth * 0.8,

                                    }}
                                    value={firstName}
                                    placeholder="First Name (required)"
                                    placeholderTextColor={'#A6A5A5'}
                                    onChangeText={setFirstName}
                                    keyboardType="phone-pad"
                                />
                            </View>
                            <View
                                style={{
                                    paddingHorizontal: 10,
                                    paddingVertical: 3,
                                    borderRadius: 10,
                                    backgroundColor: '#3C474F',
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 4,
                                    elevation: 5,
                                }}>
                                <TextInput
                                    style={{
                                        color: 'white',
                                        width: screenWidth * 0.8,

                                    }}
                                    value={lastName}
                                    placeholder="Last Name (optional)"
                                    placeholderTextColor={'#A6A5A5'}
                                    onChangeText={setLastName}
                                    keyboardType="phone-pad"
                                />
                            </View>
                        </View>

                    </View>

                    <View className='self-center mb-[35px]'  >
                        <CustomButton title="Save" onPress={() => {
                             mmkvStorage.setItem('id','1234')
                            resetAndNavigate('AppMainScreen')
                        }} />
                    </View>
                </View>


            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({

    backButton: {
        padding: 10,
        marginTop: 10,
        marginLeft: 10,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: screenHeight * 0.05,
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        color: '#82888C',
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 5,
        width: screenWidth * 0.7,
    },
    codeFieldRoot: {
        marginTop: 20,
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cell: {
        width: 50,
        height: 50,
        backgroundColor: '#3C474F',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
    },
    cellText: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
    },
    buttonContainer: {
        marginTop: screenHeight * 0.05,
    },
});

export default AuthProfile;