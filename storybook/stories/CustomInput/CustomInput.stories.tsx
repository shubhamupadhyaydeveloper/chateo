import { Meta, StoryFn, StoryObj } from '@storybook/react'
import CustomInput from './CustomInput'
import { View } from 'react-native'

const CustomInputMeta: Meta<typeof CustomInput> = {
    title: "CustomInput",
    component: CustomInput,
    args: {},
    decorators: [
        (Story: StoryFn) => (
            <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                <Story />
            </View>
        )
    ]
}

export default CustomInputMeta;

export const Basic: StoryObj<typeof CustomInput> = {}
