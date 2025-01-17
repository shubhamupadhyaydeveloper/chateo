import { View, Text, Image } from 'react-native';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../../shared/CustomHeader';
import { FieldValues, useForm } from 'react-hook-form';
import CustomInput from '../../../shared/CustomInput';
import CustomButton from '../../../shared/CustomButton';


const CommunityScreen = () => {

  const { control, formState: { errors }, handleSubmit } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log('this is data', data);
  };

  return (
    <SafeAreaView className="h-full bg-black">
      <View className="px-[15px]">
        <CustomHeader title="Teams" />
        <Text className="text-white">CommunityScreen</Text>

        <CustomInput control={control} name="name" placeholder="Enter your name" />
        <CustomInput control={control} name="fathername" placeholder="Enter your father name" />

        <CustomButton title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>


    </SafeAreaView>
  );
};

export default CommunityScreen;
