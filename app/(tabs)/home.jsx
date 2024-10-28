// import { View, Text } from 'react-native'
// import React from 'react'
// import Header from '../../components/Home/Header'
// import Slider from '../../components/Home/slider'
// import Category from '../../components/Home/Category'
// import ListOfPets from '../../components/Home/ListOfPets'

// export default function home() {
//   return (
//     <View style={{
//       padding:20,marginTop:20
//     }}
         
//          >
    
//     <Header/>
//     <Slider/>
//     <PetListByCategory/>


//     </View>
//   )
// }
import { ScrollView,Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Header from '../../components/Home/Header';  // Correct import path
import Slider from '../../components/Home/slider';  // Ensure proper case sensitivity
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PetListByCategory from '../../components/Home/PetListByCategory';
import Colors from '../../constants/Colors';
import { Link } from 'expo-router';
// Keep this if it exists


export default function Home() {
  return (
    <ScrollView style={{ padding: 20, marginTop: 20,    marginBottom:10,
    }}>
      <Header />
      <Slider />
      <PetListByCategory />  

   <Link href={'/add-new-pet'} style={styles.addnewpetContainer}>
   <MaterialIcons name="pets" size={24} color="black" />
    <Text
    style={{
      fontFamily:'PlaywriteGBS'    }}
    >Add new pet</Text>
   </Link>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  addnewpetContainer:{
    display:'flex',
    flexDirection:'row',
    gap:10,
    padding:20,
    alignItems:'center',
    marginTop:10,
    marginBottom:10,
    paddingBottom:10,
    backgroundColor:Colors.LIGHT_BLUE,
    borderWidth:1,
    // borderRadius:Colors.PRIMARY,
    borderStyle:'dashed',
    justifyContent:'center',
    textAlign:'center'
  }
})

