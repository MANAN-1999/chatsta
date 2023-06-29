import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Modal} from 'react-native';
import CText from '../../component/CText';
import {
  accountcreated,
  complimenatry,
  notediscripction,
  plesenote,
  success,
  successtext1,
  successtext2,
  successtext3,
  successtext4,
} from '../../utils/Strings';
import CButton from '../../component/CButton';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SuccessScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleSkip = () => {
    setModalVisible(true);
  };

  const handleSkipModal = () => {
    setModalVisible(false);
    navigation.navigate('Deshbord');
  };

  const handleContinueModal = () => {
    setModalVisible(false);
    navigation.navigate('Namescreen');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={handleSkip}>
        <Text style={styles.skipButton}>Skip</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{success}</Text>
      <Text style={styles.subtitle}>{accountcreated}</Text>
      <Text style={styles.complimentary}>{complimenatry}</Text>
      <CText otherstyle={styles.text} text={successtext1} />
      <CText otherstyle={styles.text} text={successtext2} />
      <CText otherstyle={styles.text} text={successtext3} />
      <CText otherstyle={styles.text} text={successtext4} />
      <CButton
        btntxt="Complete My Profile"
        otherstyle={styles.button}
        onPress={() => navigation.navigate('Namescreen')}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="md-alert-outline" size={40} color="snow" />
            </View>
            <Text style={styles.modalText}>{plesenote}</Text>
            <Text style={styles.modeldisctext}>{notediscripction}</Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={[styles.modalButton, {borderColor: 'red'}]}
                onPress={handleSkipModal}>
                <Text style={styles.modalButtonText}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, {backgroundColor: 'blue'}]}
                onPress={handleContinueModal}>
                <Text style={[styles.modalButtonText, {color: 'snow'}]}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  header: {
    position: 'absolute',
    top: 12,
    right: -25,
  },
  skipButton: {
    fontSize: 16,
    fontWeight: '400',
    color: 'gray',
  },
  title: {
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 15,
  },
  subtitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
    marginTop: 15,
  },
  complimentary: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 30,
  },
  text: {
    marginTop: 5,
  },
  button: {
    padding: 10,
    marginTop: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    // padding: 20,
    borderRadius: 5,
    height: '33%',
    width: '80%',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderTopWidth: 8,
    borderTopColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: -28,
    alignSelf: 'center',
    height: 50,
    width: 50,
    backgroundColor: 'red',
    borderRadius: 30,
    // padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 30,
    fontWeight: 'bold',
    // marginBottom: 20,
    textAlign: 'center',
    color: 'red',
    marginTop: 10,
  },
  modeldisctext: {
    textAlign: 'center',
    fontSize: 15,
    width: '80%',
    marginTop: 10,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    width: '80%',
  },
  modalButton: {
    // backgroundColor: 'blue',
    // padding: 10,
    height: 40,
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    width: '40%',
    borderWidth: 1,
  },
  modalButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
