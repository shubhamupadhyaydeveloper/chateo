import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { userData } from '../../../mock/users';
import { screenHeight, screenWidth } from '../../../utils/responsive';
import LazyImage from '../../../shared/LazyImage';
import { navigate } from '../../../utils/navigationutils';

type props = {
    item: any,
    randomIndex: number,
    handleProfileClick: (userId: number,
        name: string,
        targetUserId: number,
        image: string
    ) => void;
    contentLength: number;
    index: number
}

const UserRenderHomepage = React.memo(({ handleProfileClick, item, randomIndex, contentLength, index }: props) => {
    const isSame = item.userId !== userData[randomIndex].userId;
    const isLast = contentLength - 1 === index

    return (
        isSame && (

            <View
                key={item.userId}
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: screenHeight * .04,
                    marginBottom: isLast ? screenHeight * .05 : 0,
                    gap: 10,
                }}>
                <TouchableOpacity activeOpacity={.85} onPress={() => {
                    navigate('ProfileImage',{
                        image: `https://avatar.iran.liara.run/public/boy?username=${item.name}`,
                        sharedTag: `profileImage-${index}`
                    })
                    console.log('this is sharetag lazy', `profileImage-${index}`)
                }}>
                    <View style={{ position: 'relative' }}>
                        <LazyImage
                            width={50}
                            height={50}
                            image={`https://avatar.iran.liara.run/public/boy?username=${item.name}`}
                            sharedTag={`profileImage-${index}`}
                        />
                    </View>
                </TouchableOpacity>
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
                    <View style={{ width: screenWidth * .7 }}>
                        <View className='flex flex-row justify-between items-center w-full'>
                            <Text
                                style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
                                {item.name}
                            </Text>
                            <Text
                                style={{ fontSize: 11, fontWeight: '600', color: '#ADB5BD', }}>
                                yestarday
                            </Text>
                        </View>
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
                </TouchableOpacity>
            </View>

        )
    )

})

export default UserRenderHomepage;