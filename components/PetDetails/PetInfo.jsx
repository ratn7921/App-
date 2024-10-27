import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function PetInfo({pet}) {
  return (
    <View>
<Image source={{uri:pet.imageUrl}}
style={{
    width:500,
    height:400,
    marginTop:40,
    objectFit:''
}}
/> 
<View  style={{   padding:20 ,display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}  >
  <View>
    <Text style={{ fontFamily:'PlaywriteGBS',        fontSize:20,  }}>{pet?.name}</Text>
   <Text style={{ fontFamily:'PlaywriteGBS', color:Colors.GRAY    }} >{pet.address}</Text>
   </View>
   <Ionicons name="heart-outline" size={24} color="black" />
 

</View>

   </View>
  )
}