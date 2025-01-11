import {z} from 'zod'

export const numberVerifyType = z.object({
     number : z.string().regex(/^[0-9]{10}$/,{message : 'please enter a valid mobile number'}).min(1,{message : 'mobile number is required'})
})