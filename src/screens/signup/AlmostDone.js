import {intrestlist} from '../../assets/data/dummydata';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {almostdone, lastque} from '../../utils/Strings';
import CTextinput from '../../component/CTextinput';
import CButton from '../../component/CButton';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setLastQue} from '../../redux/Slices/UserSlice';
import firestore from '@react-native-firebase/firestore';

const AlmostDone = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selectedItems, setSelectedItems] = useState([]);
  const data = useSelector(state => state.user.data);
  const [isFocused, setIsFocused] = useState(false);
  const [height, setHeight] = useState('');
  const [quotes, setQuotes] = useState('');

  const toggleItemSelection = item => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const renderInterestItem = ({item}) => {
    const isSelected = selectedItems.includes(item);

    return (
      <TouchableOpacity
        style={[styles.itemContainer, isSelected && styles.selectedItem]}
        ƒ
        onPress={() => toggleItemSelection(item)}>
        <Text style={isSelected && styles.selectedText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (selectedItems.length > 0) {
      setIsFocused(true);
    } else setIsFocused(false);
  }, [selectedItems]);

  const storeToFirestore = async lastQue => {
    const collectionRef = firestore().collection('Users');
    const docRef = collectionRef.doc(data[0].Email);
    await docRef.set({...data[0], lastQue});
    console.log('User Data Stored Successfully');
    navigation.navigate('Yahoo');
  };

  const handleNextButton = async () => {
    try {
      const selectedI = selectedItems.map(i => i.name);
      const lastQue = {
        height: height,
        quotes: quotes,
        selectedItems: selectedI,
      };
      dispatch(setLastQue(lastQue));
      storeToFirestore(lastQue);
    } catch (error) {
      console.log('Error in creating Firestore data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{almostdone}</Text>
      <Text style={styles.subtitle}>{lastque}</Text>
      <CTextinput
        title={'Height'}
        otherstyle={{marginTop: 20}}
        value={height}
        onChangeText={text => setHeight(text)}
      />
      <View style={{height: '50%'}}>
        <View
          style={[
            styles.listContainer,
            {
              borderWidth: isFocused ? 2 : 1,
              borderColor: isFocused ? 'blue' : 'black',
            },
          ]}>
          <Text
            style={{
              position: 'absolute',
              top: -12,
              alignSelf: 'center',
              color: isFocused ? 'blue' : 'black',
              fontSize: 15,
              fontWeight: '600',
              paddingHorizontal: 10,
              backgroundColor: 'snow',
              alignItems: 'center',
            }}>
            Interest
          </Text>
          <FlatList
            renderItem={renderInterestItem}
            data={intrestlist}
            numColumns={2}
            keyExtractor={item => item.name}
          />
        </View>
      </View>
      <CTextinput
        title={'Quotes'}
        multiline={true}
        value={quotes}
        onChangeText={text => setQuotes(text)}
        otherstyle={{height: 'auto', padding: 20, marginTop: 30}}
      />
      <CButton
        btntxt={'Next'}
        onPress={() => handleNextButton()}
        otherstyle={{marginTop: 20}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'snow',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    marginTop: 50,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '400',
    alignSelf: 'center',
    color: 'black',
    marginTop: 10,
  },
  listContainer: {
    width: '80%',
    // borderWidth: 1,
    // height: '40%',
    alignSelf: 'center',
    marginTop: 30,
    padding: 10,
    borderRadius: 20,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 20,
  },
  selectedItem: {
    backgroundColor: 'blue',
  },
  selectedText: {
    color: 'snow',
  },
});

export default AlmostDone;
