import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CTextinput from '../../component/CTextinput';
import dummydata from '../../assets/data/dummydata';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CButton from '../../component/CButton';
import {moreaboutyou, moredesc} from '../../utils/Strings';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setAboutYou} from '../../redux/Slices/UserSlice';

const IconCategory = ({
  category,
  icons,
  iconsPerRow,
  numIconRows,
  getValue,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    name:""
  });

  const handleIconPress = item => {
    setSelectedItem(item === selectedItem ? null : item);
    setIsFocused(item === selectedItem ? false : true);
    getValue(item === selectedItem ? null : item);
  };

  const renderIcon = ({item}) => {
    const {name, type, additionlname} = item;
    const IconComponent = type === 'Ionicons' ? Icon : MaterialCommunityIcon;

    return (
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => handleIconPress({...item, category})}>
        <IconComponent
          name={name}
          size={40}
          color={selectedItem.name === item.name ? 'blue' : 'black'}
        />
        <Text
          style={[
            styles.iconName,
            selectedItem.name === item.name ? styles.selectedIconName : styles.iconename,
          ]}>
          {additionlname}
        </Text>
      </TouchableOpacity>
    );
  };
  const borderColor = isFocused ? 'blue' : 'gray';
  const borderWidth = isFocused ? 2 : 1;
  const categoryTextColor = isFocused ? 'blue' : 'black';

  return (
    <View style={[styles.container1, {borderColor, borderWidth}]}>
      <View style={styles.categoryContainer}>
        <Text style={[styles.categoryTitle, {color: categoryTextColor}]}>
          {category}
        </Text>
      </View>
      <FlatList
        data={icons}
        renderItem={renderIcon}
        keyExtractor={(item, index) => index.toString()}
        numColumns={iconsPerRow}
        columnWrapperStyle={styles.rowContainer}
        nestedScrollEnabled={false}
      />
    </View>
  );
};

const Moreaboutyou = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.user);
  console.log(data, 'data');
  // const [alldata,SetAllData] = useState([])
  // const [alldata, setAllData] = useState({});

  const [selectedData, setSelectedData] = useState({
    gender: '',
    relation_status: '',
    star_sign: '',
  });
  // const [alldata, setAllData] = useState({ icons: [], bio: '' });
  const [bio, setBioState] = useState('');

  const getValue = values => {
    if (values.category === 'Gender') {
      setSelectedData({
        ...selectedData,
        gender: values.name,
      });
    } else if (values.category === 'Relationship Status') {
      setSelectedData({
        ...selectedData,
        relation_status: values.name,
      });
    } else {
      setSelectedData({
        ...selectedData,
        star_sign: values.name,
      });
    }
  };
  //     console.log(alldata,"alldata");
  //     const uniqueData = Array.from(new Set(alldata.map(JSON.stringify))).map(JSON.parse);
  // console.log(uniqueData,'uniqueData');

  const handleNextButton = () => {
    // const uniqueData = Array.from(new Set(alldata.icons.map(JSON.stringify))).map(JSON.parse);
    // console.log('I am selected value', selectedData);
    const finalData = {...selectedData, bio: bio};

    console.log(finalData, 'finalData');
    dispatch(setAboutYou(finalData));
    navigate.navigate('AlmostDone');
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 25,
          color: 'black',
          fontWeight: 'bold',
          alignSelf: 'center',
          marginTop: 30,
        }}>
        {moreaboutyou}
      </Text>
      <Text
        style={{
          fontSize: 15,
          fontWeight: '400',
          color: 'black',
          alignSelf: 'center',
          marginTop: 10,
        }}>
        {moredesc}
      </Text>
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
        {dummydata.map((category, index) => (
          <IconCategory
            key={index}
            category={category.category}
            icons={category.icons}
            iconsPerRow={category.iconsPerRow}
            numIconRows={category.numIconRows}
            getValue={getValue}
          />
        ))}
        <CTextinput
          title={'Your Bio'}
          multiline={true}
          otherstyle={{height: 'auto', padding: 20, marginTop: 30}}
          placeholder={'Type your bio here...'}
          value={bio}
          onChangeText={text => setBioState(text)}
        />
        <CButton
          btntxt={'Next'}
          otherstyle={{marginTop: 30, marginBottom: 100}}
          onPress={() => handleNextButton()}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'snow',
  },
  container1: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 20,
    padding: 10,
  },
  categoryContainer: {
    borderColor: 'snow',
    position: 'absolute',
    top: -15,
    alignSelf: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'snow',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  rowContainer: {
    justifyContent: 'space-around',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
    marginBottom: 8,
    marginTop: 10,
  },
  iconName: {
    marginTop: 4,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  selectedIconName: {
    color: 'blue',
    fontSize: 15,
  },
  iconename: {
    color: 'black',
    opacity: 0.4,
    fontSize: 12,
  },
});

export default Moreaboutyou;
