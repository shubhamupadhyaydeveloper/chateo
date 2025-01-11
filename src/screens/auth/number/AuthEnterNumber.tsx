import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import { screenHeight, screenWidth } from '../../../utils/responsive';
import { countryImage } from '../../../utils/images';
import ContryModal from './component/CountryModal';
import CustomButton from '../../../../storybook/stories/CustomButton/CustomButton';
import { navigate } from '../../../utils/navigationutils';
import { useNumberFormHandler } from './forms/numberform';


const AuthEnterNumber = () => {
  const navigation = useNavigation()
  const [visible, setVisible] = useState<boolean>(false);
  const [countryOptionValue, setCountryOptionValue] = useState<string>('');
  const [countryFlag, setCountryFlag] = useState<string>('');
  const { Controller, control, errors, handleSubmit, onSubmit } = useNumberFormHandler()


  const toogleVisible = useCallback(() => {
    setVisible(prev => !prev);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={.86}>
          <View className='px-[10px] mt-[5px]'>
            <AntDesignIcon name='arrowleft' color={"white"} size={25} />
          </View>
        </TouchableOpacity>

        <View className='justify-around h-full items-center flex'>
          <View>
            <View className='items-center' style={{ marginTop: screenHeight * .03 }}>
              <Text className='text-white font-bold text-center text-[18px]'>Enter Your Phone Number</Text>
              <View style={{ width: screenWidth * .7 }} className='self-center text-center mt-[5px]'>

                <Text className='text-[#82888C] text-center font-extrabold text-[11px]'>
                  Please confirm your country code and enter your phone number
                </Text>
              </View>
            </View>

            <View>
              <View style={styles.inputcontainer} className='self-center'>
                <TouchableOpacity activeOpacity={0.95} onPress={toogleVisible}>
                  <View style={[styles.flag, { gap: 3 }]}>
                    {countryFlag ? (
                      <Image
                        style={{ width: 30, height: 30, borderRadius: 20 }}
                        source={{ uri: countryFlag }}
                      />
                    ) : (
                      <Image source={countryImage} />
                    )}
                    <Text style={{ color: 'white' }}>+91</Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    paddingHorizontal: 10,
                    // paddingVertical: 1,
                    borderRadius: 10,
                    backgroundColor: '#3C474F',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 5,
                  }}>
                  <Controller
                    key={'number'}
                    name='number'
                    control={control}
                    render={({ field: { value, onBlur, onChange } }) => (
                      <TextInput
                        style={{
                          color: 'white',
                          width: screenWidth * 0.53,
                        }}
                        value={value}
                        placeholder="Enter Phone number"
                        placeholderTextColor={'#A6A5A5'}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        keyboardType="phone-pad"
                      />
                    )}
                  />

                </View>
              </View>
              <View style={{marginTop : screenHeight * .015}}>
                {errors.number && (
                  <View>
                    <Text className='text-white text-[13px]'>Verification</Text>
                    <Text className='text-red-600 text-[10px]'>{errors.number &&  "Number " + errors.number.message}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          <View className='self-center mb-[22px]'>
            <CustomButton title='Continue' onPress={handleSubmit(onSubmit)} />
          </View>
        </View>

        <ContryModal
          setCountryFlag={setCountryFlag}
          setCountryOptionValue={setCountryOptionValue}
          toogleVisible={toogleVisible}
          visible={visible}

        />
      </SafeAreaView>
    </TouchableWithoutFeedback>

  )
}

const styles = StyleSheet.create({
  inputcontainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: screenWidth * 0.8,
    marginTop: screenHeight * 0.05,
  },

  flag: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#3C474F',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginRight: 10,
  },
});


export default AuthEnterNumber;