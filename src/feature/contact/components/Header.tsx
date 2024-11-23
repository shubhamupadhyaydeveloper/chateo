import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const {width,height} = Dimensions.get('window')

export const ListHeaderComponent = ({addNewContact}:{addNewContact:() => void}) => {
    return (
        <View style={{ marginTop: height * .03}}>
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