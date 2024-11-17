import { View, Text, Platform, PermissionsAndroid, TouchableOpacity, FlatList, Alert, Linking, StatusBar, Image, Dimensions } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Contacts from 'react-native-contacts';
import { useNavigation } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import LazyImage from '../../../shared/LazyImage';
const { width, height } = Dimensions.get('window')

const AddContacts = () => {
    const [contacts, setContacts] = useState<any[]>([]);
    const [permission, setPermission] = useState(false);
    const navigation = useNavigation()

    useEffect(() => {
        const checkPermission = async () => {
            const granted = await requestContactPermission();
            if (granted) {
                setPermission(true);
                loadContacts();
            } else {
                showPermissionAlert();
            }

        };
        checkPermission();
    }, [permission]);

    const showPermissionAlert = () => {
        Alert.alert(
            'Permission Denied',
            'Chateo needs access to your contacts to add friends. Please enable permissions.',
            [
                {
                    text: 'Go to Settings',
                    onPress: () => Linking.openSettings(),
                },
            ],
            { cancelable: false }
        );
    };

    const requestContactPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    title: 'Contacts Permission',
                    message: 'Chateo would like to view your contacts.',
                    buttonPositive: 'Allow',
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    };

    const loadContacts = () => {
        Contacts.getAll()
            .then(contacts => {
                const sortedContacts = contacts.sort((a, b) =>
                    a.displayName.localeCompare(b.displayName)
                );
                setContacts(sortedContacts);
            })
            .catch(err => console.error(err));
    };

    const renderContact = useMemo(() => ({ item }: { item: any }) => {
        if (item.displayName.length > 1) {
            return (
                <TouchableOpacity activeOpacity={.85} onPress={() => addToChat(item)}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: height * .03 }}>
                        <View>
                            {item.thumbnailPath ? (
                                <LazyImage
                                    image={item.thumbnailPath}
                                    width={40}
                                    height={40}
                                />
                            ) : (
                                <LazyImage
                                    width={40}
                                    height={40}
                                    image={`https://avatar.iran.liara.run/public/boy?username=${item.displayName}`}
                                />
                            )}
                        </View>
                        <View style={{ marginLeft: width * .03 }}>
                            <Text style={{ color: 'white', fontSize: 16 }}>{item.displayName}</Text>
                            <Text style={{ color: '#ADB5BD', fontSize: 10, }}>start chat with person</Text>
                        </View>
                    </View>
                </TouchableOpacity>


            )
        } else {
            return <View />;
        }
    }, [contacts])

    const ListHeaderComponent = () => {
        return (
            <View style={{ marginTop: height * .03 }}>
                <TouchableOpacity activeOpacity={0.85} onPress={addNewContact} >
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: 40, height: 40, backgroundColor: '#2CC069', borderRadius: 25 }}>
                            <MaterialIcon name='person-add-alt-1' color="white" size={25} />
                        </View>
                        <Text style={{ color: 'white', fontSize: 16, marginLeft: width * .03 }}>
                            New Contact
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={{ marginTop: height * .025 }} >
                    <Text style={{ color: '#ADB5BD' }}>Existing Contacts</Text>
                </View>
            </View>
        );
    };

    const addToChat = (contact: any) => {

    };

    const addNewContact = () => {
        const newPerson = {}
        Contacts.openContactForm(newPerson)
    }

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
            <FlatList
                data={contacts}
                keyExtractor={(item) => item.recordID}
                renderItem={renderContact}
                ListHeaderComponent={ListHeaderComponent}
                ListFooterComponent={() => <View style={{ height: height * .03 }} />}
                style={{ paddingHorizontal: 20 }}
            />
        </SafeAreaView>
    );
};

export default AddContacts;
