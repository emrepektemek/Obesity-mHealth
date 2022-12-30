import { View, Text, TextInput, StyleSheet } from 'react-native';

import { Colors } from '../../constants/colors';

function Input({label,keyboardType,secure,onUpdateValue,value,isInvalid,}){
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize={false}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
    alignItems: 'center'
  },
  label: {
    color: 'black',
    marginBottom: 4,
    fontSize: 17
  },
  labelInvalid: {
    color: Colors.colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 4,
    fontSize: 16,
    borderWidth: 3,
    width: '80%'
  },
  inputInvalid: {
    backgroundColor: Colors.colors.error100,
  },
});
