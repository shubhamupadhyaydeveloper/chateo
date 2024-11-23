import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { userData } from '../../../mock/users';
import { screenHeight, screenWidth } from '../../../utils/responsive';

type props = {
    item: any,
    randomIndex: number,
    handleProfileClick: (userId: number,
        name: string,
        targetUserId: number,
        image: string
    ) => void
}

const UserRenderHomepage = ({ handleProfileClick, item, randomIndex }: props) => {
    const isSame = item.userId !== userData[randomIndex].userId;

    return (
        isSame && (
            <TouchableOpacity
                key={item.userId}
                onPress={() =>
                    handleProfileClick(
                        item.userId,
                        item.name,
                        userData[randomIndex].userId,
                        `https://avatar.iran.liara.run/public/boy?username=${item.name}`
                    )
                }
                activeOpacity={0.75}>
                <View
                    key={item.userId}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',

                        gap: 20,
                    }}>
                    <View style={{ position: 'relative' }}>
                        <Image
                            style={{ width: screenWidth * 0.15, height: screenHeight * 0.075, }}
                            source={{
                                uri: `https://avatar.iran.liara.run/public/boy?username=${item.name}`,
                            }}
                        />
                        <View
                            style={{
                                position: 'absolute',
                                right: 0,
                                width: 15,
                                height: 15,
                                backgroundColor: '#2CC069',
                                borderRadius: 20
                            }}
                        />
                    </View>
                    <View>
                        <Text
                            style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
                            {item.name}
                        </Text>
                        <Text
                            style={{
                                color: '#ADB5BD',
                                fontSize: 12,
                                fontWeight: '600',
                                marginTop: 3
                            }}>
                            online
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    )

}

export default UserRenderHomepage;