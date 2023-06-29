import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CTextinput = ({
  title,
  isPassword,
  showIcon,
  showDropdown,
  otherstyle,
  onChangeText,
  onBlur,
  value,
  error,
  errorMessage,
  placeholder,
  dropdownItems,
  onDropdownItemPress,
  multiline
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleDropdownPress = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleDropdownItemPress = item => {
    onDropdownItemPress(item);
    setIsDropdownVisible(false);
  };

  const borderColor = value ? 'blue' : 'gray';

  return (
    <View>
      <View
        style={[
          styles.container,
          otherstyle,
          {
            borderWidth: isFocused ? 2 : 1,
            borderColor: isFocused ? 'blue' : borderColor,
          },
        ]}>
        <View
          style={{
            borderColor: 'snow',
            position: 'absolute',
            top: -12,
            alignSelf: 'center',
            paddingHorizontal: 10,
            backgroundColor: 'snow',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: isFocused ? 'blue' : 'black',
              fontSize: 15,
              fontWeight: '600',
            }}>
            {title}
          </Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            style={{
              flex: 1,
              paddingHorizontal: 10,
              fontSize: 17,
              textAlign: 'center',
              fontWeight: '500',color:'black'
            }}
            placeholder={placeholder}
            secureTextEntry={!showPassword && isPassword}
            onFocus={handleFocus}
            multiline={multiline}
            onBlur={() => {
              handleBlur();
              // onBlur(value);
            }}
            value={value}
            onChangeText={onChangeText}
          />

          {isPassword && showIcon && (
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={{paddingHorizontal: 10}}>
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                color={isFocused ? 'blue' : 'black'}
              />
            </TouchableOpacity>
          )}

          {showDropdown && (
            <TouchableOpacity
              onPress={handleDropdownPress}
              style={{paddingHorizontal: 10}}>
              <Ionicons
                name="chevron-down-sharp"
                size={20}
                color={isFocused ? 'blue' : 'black'}
              />
            </TouchableOpacity>
          )}
        </View>

        {isDropdownVisible && (
          <View style={styles.dropdown}>
            {dropdownItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => handleDropdownItemPress(item)}>
                <Ionicons
                  name="location"
                  size={20}
                  color="black"
                  style={styles.dropdownItemIcon}
                />
                <Text style={styles.dropdownItemText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {error && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      </View>
    </View>
  );
};

export default CTextinput;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: 'snow',
    borderRadius: 15,
  },
  errorMessage: {
    marginTop: 5,
    color: 'red',
    fontSize: 12,
  },
  dropdown: {
    marginTop: 30,
    backgroundColor: 'white',
    // borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    // height:50,
    // paddingVertical:5,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    borderBottomWidth: 0.2,
    paddingVertical: 5,
  },
  dropdownItemIcon: {
    marginRight: 10,
  },
  dropdownItemText: {
    fontSize: 16,
    color:'black'
  },
});
