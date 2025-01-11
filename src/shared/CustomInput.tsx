import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form';

type props = {
  name: string,
  control: Control<FieldValues, any>,
  placeholder: string
}

const CustomInput = ({ name, control, placeholder }: props) => {
  return (
    <View>
      <Controller
        control={control}
        name={name}
        rules={{ required: `${name} is required` }}
        render={({ field: { value, onBlur, onChange }, fieldState: { error } }) => (
          <View>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor={"white"}
              className='text-white p-3 border border-gray-500 rounded-[12px]'
            />
            <Text className='text-red-600 text-[11px]'>{error?.message}</Text>
          </View>
        )}
      />
    </View>
  )
}

export default CustomInput;