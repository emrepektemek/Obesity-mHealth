import { StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";

function BesinEkleInput({onChangeText,value,title,placeHolderMessage,keyboardType}){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            <TextInput 
                style={styles.textInput}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeHolderMessage}
                keyboardType={keyboardType}
            />
    </View>
    );
}

export default BesinEkleInput;


const styles = StyleSheet.create({

    container:{
        alignItems: 'center'
    },
    text:{
        marginTop: 20,
        marginBottom: 10,
        fontSize: 19,
    },
    textInput:{
        width: '80%',
        height: 50,
        borderWidth: 1,
        color: 'black',
        fontSize: 20,
        paddingLeft: 20,
        borderRadius: 6,
        borderColor: '#000000a4',
        borderTopWidth: 3,
        borderBottomWidth:3,
        borderLeftWidth: 3,
        borderRightWidth: 3,
        fontSize: 17,
    }
});