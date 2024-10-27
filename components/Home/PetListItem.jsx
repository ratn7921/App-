import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import { useRouter } from 'expo-router'

export default function PetListItem({pet}) {
const router=useRouter();

  return (
    <TouchableOpacity onPress={()=>router.push({
      pathname:'/pet-details',
      params:pet
    })}
    style={{
        padding:10,
        marginRight:15,
        backgroundColor:Colors.TEXT_LIGHT,
        borderRadius:19,
        marginRight:6
        
    }}>
<Image source={{uri:pet?.imageUrl}}
style={{
    width:150,
    height:123,
    objectFit:'cover',
    borderRadius:10}}/>
<Text
 style={{
            fontFamily:'PlaywriteGBS',
fontSize:15
}}
>{pet.name}</Text>
<View 
style={{
   display:'flex',
   flexDirection:'row',
   justifyContent:'space-between',
   alignItems: 'center'
}}>
<Text 
style={{
  color:Colors.GRAY,
  fontFamily:'PlaywriteGBS'
}}
>{pet?.breed}</Text>
<Text
style={{
  fontFamily:'PlaywriteGBS',
  color:Colors.PRIMARY,
  paddingHorizontal:10,
  borderRadius:9,
  fontSize:11,
  backgroundColor:Colors.LIGHT_YELLOW
}}
>{pet?.age} YRS</Text>
</View>
    </TouchableOpacity>
  )
}
