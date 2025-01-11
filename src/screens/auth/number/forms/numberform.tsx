import React, { useState } from 'react';
import { useForm, FieldValues, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { number, z } from 'zod';
import { numberVerifyType } from '../../../../types/auth/numberverification';
import { navigate } from '../../../../utils/navigationutils';
import axios from 'axios'
import { mmkvStorage } from '../../../../store/mmkv';

export const useNumberFormHandler = () => {
    const [confirm, setConfirm] = useState(null);
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<z.infer<typeof numberVerifyType>>({
        resolver: zodResolver(numberVerifyType),
    });

    const onSubmit = async (formValues: FieldValues) => {
        try {
            // const {data} = await axios.post('http://192.168.1.110:4000/sendsms',{
            //     number: formValues.number
            // })

            // if(data) {
            //     navigate('EnterCode')
            //     mmkvStorage.setItem('authcode', data.otp)
            // }
            console.log('this is formvalues',formValues)
            navigate('EnterCode')
        } catch (error:any) {
            console.log('error in sending otp',error.message)
        }
    };

    return {
        control,
        handleSubmit,
        errors,
        reset,
        onSubmit,
        Controller
    };
};
