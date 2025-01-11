import { View, Text, Platform, PermissionsAndroid, TouchableOpacity, Alert, Linking, StatusBar, Image, Dimensions } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Contacts from 'react-native-contacts';
import { useNavigation } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { requestContactPermission } from '../services/permissions';
import { loadContacts } from '../services/contacts';
import { showPermissionAlert } from '../utils/openSetting';
import ContactItem from '../components/ContactItem';
import { ListHeaderComponent } from '../components/Header';
import Animated, { FadeInDown, FadeInUp, FadeOutUp, LinearTransition } from 'react-native-reanimated';
const { width, height } = Dimensions.get('window')
import { FlashList } from "@shopify/flash-list";

const AddContacts = () => {
    const [contacts, setContacts] = useState<any[]>([]);
    const [permission, setPermission] = useState(false);
    const navigation = useNavigation()

    useEffect(() => {
        const checkPermission = async () => {
            const granted = await requestContactPermission();
            if (granted) {
                setPermission(true);
                loadContacts({ setContacts });
            } else {
                showPermissionAlert();
            }

        };
        checkPermission();
    }, []);

    const addToChat = (contact: any) => {

    };

    const addNewContact = () => {
        const newPerson = {}
        Contacts.openContactForm(newPerson)
    }

    const ItemSeprator = useCallback(() => {
       return  <View style={{ height: height * .03 }} />
    },[])

    return (
        <SafeAreaView style={{ height: '100%', backgroundColor: 'black' }}>
            <StatusBar backgroundColor={"#152033"} barStyle={"light-content"} />
            <View style={{ backgroundColor: '#152033', paddingHorizontal: 10, paddingTop: height * .02, }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.goBack()}>
                        <MaterialIcon
                            name="arrow-back"
                            color={'white'}
                            size={25}
                        />
                    </TouchableOpacity>
                    <View style={{ marginLeft: width * .03 }}>
                        <Text style={{ color: 'white', fontSize: 17 }}>Select contact</Text>
                        <Text style={{ color: 'white', fontSize: 12 }}>{contacts.length} contacts</Text>
                    </View>

                </View>
            </View>
            <FlashList
                data={contacts}
                estimatedItemSize={50}
                keyExtractor={(item) => item.recordID}
                removeClippedSubviews={true}
                renderItem={({ item }) =>
                    <ContactItem addToChat={addToChat} contacts={contacts} item={item} />
                }
                ListHeaderComponent={() => <ListHeaderComponent addNewContact={addNewContact} />}
                contentContainerStyle={{paddingHorizontal : 15}}
                ListFooterComponent={ItemSeprator}
                style={{ paddingHorizontal: 20 }}
            />
        </SafeAreaView>
    );
};

export default AddContacts;
