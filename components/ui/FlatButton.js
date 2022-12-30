import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/colors';

function FlatButton({ children, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'black',
    width: '50%',
    borderRadius: 10,
    
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold'
  },
});
