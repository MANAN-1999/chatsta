import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileCard = ({name, location,bios,quotes,heights}) => {
  const {height, width} = Dimensions.get('window');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };


  const infoData = [
    { icon: 'md-location', text: 'helloo' },
    { icon: 'md-person', text: 'Hello' },
    { icon: 'md-time', text: 'World' }, 
  ];

  return (
    <View
      style={{
        backgroundColor: 'snow',
        borderRadius: 20,
        width: width,
        alignSelf: 'center',
        elevation: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text>{'                          '}</Text>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
          {name}
        </Text>
        <TouchableOpacity>
          <Text> Edit Profile </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 30}}>
        <Ionicons name={'md-location'} size={20} color={'black'} />
        <Text style={{textAlign: 'center',color:'black'}}>{location}</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 30,
        }}>
       {infoData.map((item, index) => (
        <View style={styles.infoRow} key={index}>
          <Ionicons name={item.icon} size={20} color="black" />
          <Text style={styles.infoText}>{item.text}</Text>
        </View>
      ))}
      </View>

      <View style={{alignSelf: 'center', alignItems: 'center'}}>
        <Text
          style={{
            marginTop: 30,
            fontSize: 20,
            color: 'black',
            fontWeight: 'bold',
          }}>
          Bio
        </Text>

        <Text style={{textAlign: 'center',color:'black'}}>
         {bios}
        </Text>
      </View>

      {isExpanded ? (
        <>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={{color:'black'}}>Height</Text>
            <Text style={{color:'black'}}>{heights} cm</Text>
          </View>

          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={{color:'black'}}>Intrest</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  height: 30,
                  width: 80,
                  borderWidth: 1,
                  borderRadius: 20,
                  justifyContent: 'center',
                  margin: 10,
                }}>
                <Text style={{textAlign: 'center',color:'black'}}>Music</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 30,
                  width: 80,
                  borderWidth: 1,
                  borderRadius: 20,
                  justifyContent: 'center',
                  margin: 10,
                }}>
                <Text style={{textAlign: 'center',color:'black'}}>Music</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 30,
                  width: 80,
                  borderWidth: 1,
                  borderRadius: 20,
                  justifyContent: 'center',
                  margin: 10,
                }}>
                <Text style={{textAlign: 'center',color:'black'}}>Music</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black',color:'black'}}>
              Quotes
            </Text>
            <Text style={{textAlign: 'center', marginTop: 10,color:'black'}}>
              {quotes}
            </Text>
          </View>
        </>
      ) : null}

      {isExpanded ? (
        <TouchableOpacity onPress={handleToggleExpanded}>
          <View style={{alignSelf: 'center', marginTop: 20, marginBottom: 20}}>
            <Text style={{color: 'blue'}}>Show Less</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleToggleExpanded}>
          <View style={{alignSelf: 'center', marginTop: 20, marginBottom: 20}}>
            <Text style={{color: 'blue'}}>Show More</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  infoRow: {
    // flexDirection: 'row',
    alignItems: 'center',
    margin:10,
    marginBottom: 10,
  },
});
