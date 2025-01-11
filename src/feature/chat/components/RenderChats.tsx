import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useCallback, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { screenHeight, screenWidth } from '../../../utils/responsive';
import { formatChatDate } from '../../../utils/dates';

type RenderChatsProps = {
    userId: number,
    messages: string[]
}

const RenderChats = ({ messages, userId }: RenderChatsProps) => {
    const currentDate = formatChatDate(new Date())

    const RenderChat = React.memo(({ item, index }: { item: any, index: number }) => {
        const isFirstMessage = index === 0;
        return (
            <View
                style={{
                    alignSelf: item.senderId === userId ? 'flex-end' : 'flex-start',
                    marginVertical: 2,
                }}>
                <View className='flex flex-row gap-[5px] items-end justify-end' style={[
                    styles.message,
                    {
                        backgroundColor:
                            item.senderId === userId ? '#004E35' : '#152033',
                        borderBottomLeftRadius: 12,
                        borderBottomRightRadius: 12,
                        borderTopLeftRadius: item.senderId === userId ? 12 : 0,
                        borderTopRightRadius: item.senderId === userId && isFirstMessage ? 0 : 12,
                        padding: 8,
                    },
                ]}>
                    <Text
                        className='text-white text-[15px]'
                    >
                        {item.message}
                    </Text>
                    <Text className='text-[10px] text-[#b9bfc4]  '>{currentDate.toString()}</Text>
                </View>
            </View>
        )
    })
    return (
        <FlashList
            showsVerticalScrollIndicator={false}
            inverted={true}
            data={messages}
            estimatedItemSize={100}
            ListHeaderComponent={() => <View style={{ height: screenHeight * 0.02 }} />}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => <RenderChat index={index} item={item} />}
            contentContainerStyle={{
                paddingHorizontal: 10,
            }}
        />
    )
}

export default RenderChats;

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
        color: 'white',
    },
    message: {
        padding: 7,
        // marginVertical: 5,
        borderRadius: 5,
        color: 'white'
    },
})