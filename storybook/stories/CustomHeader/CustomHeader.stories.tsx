import { Meta, StoryFn, StoryObj } from '@storybook/react'
import CustomHeader from './CustomHeader'
import { View } from 'react-native'

const CustomHeaderMeta: Meta<typeof CustomHeader> = {
    title: "CustomHeader",
    component: CustomHeader,
    args: {},
    decorators: [
        (Story: StoryFn) => (
            <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                <Story />
            </View>
        )
    ]
}

export default CustomHeaderMeta;

export const Basic: StoryObj<typeof CustomHeader> = {}
