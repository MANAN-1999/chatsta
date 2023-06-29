import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const CAlert = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Text>CAlert</Text>
    </View>
  )
}

export default CAlert

const styles = StyleSheet.create({})