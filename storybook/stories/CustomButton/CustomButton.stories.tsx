import {Meta, StoryFn, StoryObj} from '@storybook/react'
import CustomButton from './CustomButton'
import { View } from 'react-native'

const CustomButtonMeta: Meta<typeof CustomButton> = {
  title : "CustomButton",
  component : CustomButton,
  args : {},
  decorators : [
     (Story:StoryFn) => (
        <View style={{flex : 1,justifyContent : "center",alignItems : 'center'}}>
             <Story />
        </View>
     )
  ]
}

export default CustomButtonMeta;

export const Basic:StoryObj<typeof CustomButton> = {}
