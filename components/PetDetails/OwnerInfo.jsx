import { View, Text, Image,StyleSheet } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function OwnerInfo({ pet }) {
  return (
    <View style={styles.container}>
      <View
      style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        gap:3,
        paddingLeft:8,
       
        
      }}
      >
      <Image 
        source={{ uri: pet?.userimage }} // Corrected here
        style={{
          width: 40,
          height: 40,
          borderRadius: 20, // Makes the image circular
        }}
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontFamily: 'PlaywriteGBS' }}>        
              Owner: {pet?.name ?? 'Unknown'}
        </Text>
      </View>
      </View>
      <Ionicons name="send" size={24} color="black" />

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 13,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap:20,
    borderWidth:1,
    borderRadius:15,
    padding:20,
    backgroundColor:Colors.LIGHT_BLUE,
    justifyContent:'space-between',
    paddingLeft:5,
    borderColor:Colors.LIGHT_BLUE,
    backgroundColor:Colors.LIGHT_BLUE,
    justifyContent:'space-between'

  },
})