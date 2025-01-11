import { View, Text, Modal } from 'react-native'
import React from 'react'

type props = {
    isVisible: boolean
    children: React.ReactNode
}

const CustomModal = ({ isVisible, children }: props) => {
    return (
        <Modal
            animationType="none"
            presentationStyle='overFullScreen'
            transparent={true}
            statusBarTranslucent={true}
            visible={isVisible}
            hardwareAccelerated
            >
            {children}
        </Modal>
    );
}

export default CustomModal