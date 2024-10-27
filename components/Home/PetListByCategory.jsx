import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Category from './Category';
import { collection,getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useState } from 'react';
import PetListItem from './PetListItem';
import { useEffect } from 'react';

export default function PetListByCategory() {
  
const [petList,setPetList]=useState([]);
const [loader,setLoader]=useState(false);
useEffect(()=>{
GetPetList('Dog')
},[])
/**
 * used to get pet list on category selection
 * @param {*} Category 
 */

  const GetPetList=async (Category)=>{
    setLoader(true)
    setPetList([]);
    const q=query(collection(db,'Pets'),where('Category','==',Category));
    const querySnapshot=await getDocs(q);
    querySnapshot.forEach(doc=>{
      console.log(doc.data());
      setPetList(petList=>[...petList,doc.data()])
    })
    setLoader(false);
  }
  
  return (
    <View>
<Category Category={(value)=>GetPetList(value)}  />

  <FlatList
  data={petList}
  style={{marginTop:10}}
  refreshing={loader}
  onRefresh={()=>GetPetList('Dog')}
  horizontal={true}
  renderItem={({item,inex})=>(
    <PetListItem 
    pet={item}
    />
  )}
  />
    </View>
  )
}