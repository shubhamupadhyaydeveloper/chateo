import { Meta, StoryFn, StoryObj } from '@storybook/react'
import CustomLiked from './CustomLiked'
import { View } from 'react-native'

const CustomLikedMeta: Meta<typeof CustomLiked> = {
    title: "CustomLiked",
    component: CustomLiked,
    args: {},
    decorators: [
        (Story: StoryFn) => (
            <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                <Story />
            </View>
        )
    ]
}

export default CustomLikedMeta;

export const Basic: StoryObj<typeof CustomLiked> = {}
