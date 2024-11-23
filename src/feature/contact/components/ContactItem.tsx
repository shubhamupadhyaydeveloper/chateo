import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import React, { useMemo } from 'react';
import LazyImage from '../../../shared/LazyImage';

const { width, height } = Dimensions.get('window');

type Props = {
    addToChat: (data: any) => void;
    item: any;
    contacts: any[];
};

const ContactItem = ({ addToChat, item, contacts }: Props) => {
    const renderItem = useMemo(() => {
        if (item.displayName.length > 1) {
            return (
                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => addToChat(item)}
                    accessible={true}
                    accessibilityLabel={`Start chat with ${item.displayName}`}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: height * 0.03 }}>
                        <View>
                            {item.thumbnailPath ? (
                                <LazyImage image={item.thumbnailPath} width={40} height={40} />
                            ) : (
                                <LazyImage
                                    width={40}
                                    height={40}
                                    image={`https://avatar.iran.liara.run/public/boy?username=${item.displayName}`}
                                />
                            )}
                        </View>
                        <View style={{ marginLeft: width * 0.03 }}>
                            <Text style={{ color: 'white', fontSize: 16 }}>{item.displayName}</Text>
                            <Text style={{ color: '#ADB5BD', fontSize: 10 }}>Start chat with this person</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
        return <View />; 
    }, [item, contacts, addToChat]); 

    return renderItem;
};

export default ContactItem;
