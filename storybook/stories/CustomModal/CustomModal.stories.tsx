import { Meta, StoryFn, StoryObj } from '@storybook/react'
import CustomModal from './CustomModal'
import { View } from 'react-native'

const CustomModalMeta: Meta<typeof CustomModal> = {
    title: "CustomModal",
    component: CustomModal,
    args: {},
    decorators: [
        (Story: StoryFn) => (
            <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                <Story />
            </View>
        )
    ]
}

export default CustomModalMeta;

export const Basic: StoryObj<typeof CustomModal> = {}
