import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CHeder from '../../component/CHeder';
import CTextinput from '../../component/CTextinput';

const Accounts = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{marginHorizontal: 20, flex: 1}}>
        <CHeder
          otherstyle={{paddingVertical: 10}}
          title={'Account'}
          ficone={'md-chevron-back-sharp'}
          // sicone={'close-sharp'}
          isize={30}
          isIcon={true}
          onpress={() => navigation.goBack()}
        />

        <View
          style={{
            paddingVertical: 50,
            borderBottomWidth: 1,
            backgroundColor: 'snow',
          }}>
          <CTextinput />
          <CTextinput otherstyle={{marginTop: 30}} />
          <CTextinput otherstyle={{marginTop: 30}} />
          <CTextinput otherstyle={{marginTop: 30}} />
          <CTextinput otherstyle={{marginTop: 30}} />
          <CTextinput otherstyle={{marginTop: 30}} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Accounts;

const styles = StyleSheet.create({});
