import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { screenHeight, screenWidth } from '../../utils/responsive';
import CustomButton from '../../shared/CustomButton';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { primaryColor } from '../../utils/color';
import { navigate } from '../../utils/navigationutils';
import { authNavigationType } from '../../types/navigation';
import { mmkvStorage } from '../../store/mmkv';

const AuthEnterCode = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const code = mmkvStorage.getItem('authcode')
  console.log('this is code',code)

  if(value !== code) {
    console.log('code is incorrect')
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView >
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={.86}>
          <View className='px-[10px] mt-[5px]'>
            <AntDesignIcon name='arrowleft' color={"white"} size={25} />
          </View>
        </TouchableOpacity>
  


        <View className='justify-around h-full items-center flex' >
          <View>
            <View className='self-center' style={{ marginTop: screenHeight * .03 }}>
            <Text style={styles.title}>Enter Code</Text>
            <Text style={styles.subtitle}>
              We have sent you an SMS with the code to +62 1309 - 1710 - 1920
            </Text>
          </View>

          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={4} // Updated to 4 cells
            rootStyle={styles.codeFieldRoot}
            autoComplete="off"
            importantForAutofill="no"
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            testID="my-code-input"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                key={index}
                style={[
                  styles.cell,
                  { borderColor: isFocused ? primaryColor : 'transparent' },
                ]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                <Text style={styles.cellText}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
          </View>

          <View className='self-center mb-[10px]'  >
             <Text className='text-white text-center mb-[5px]'>Code not sent <Text className='text-primarygreen underline font-bold'>resend</Text></Text>
            <CustomButton title="Continue" onPress={() => navigate('AuthProfile')}/>
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

export default AuthEnterCode;
