// import { View, Text } from 'react-native'
// import React, { useEffect } from 'react'
// import { collection, doc, getDoc } from 'firebase/firestore'
// import { db } from './../../config/FirebaseConfig';

// export default function Slider() {

// useEffect(()=>{
//   Getsliders();
// },[])

//   const Getsliders= async ()=>{
//     const snapshot=await getDoc(collection(db,'sliders'))
//     snapshot.forEach((doc)=>{
//       console.log(doc.data());
//     })
//   }

//   return (
//     <View>
//       <Text>slider</Text>
//     </View>
//   )
// }

// import { View, Text } from 'react-native';
// import React, { useEffect } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from './../../config/FirebaseConfig';  // Adjusted path

// export default function Slider() {
//   const[sliderList,setSliderList]=useState([]);
//   useEffect(() => {
//     Getsliders();  // Calls the function when the component mounts
//   }, []);

//   const Getsliders = async () => {
//     try {
//       const snapshot = await getDocs(collection(db, 'sliders'));  // Use getDocs to fetch documents
//       snapshot.forEach((doc) => {
//         console.log(doc.data());  
//         setSliderList(SliderList=>[...sliderList,doc.data])
//         // Log each document's data
//       });
//     } catch (error) {
//       console.error("Error fetching sliders: ", error);  // Error handling
//     }
//   };

//   return (
//     <View>
//       <Text>slider</Text>
//     </View>
//   );
// }

// import { View, Text } from 'react-native';
// import React, { useEffect, useState } from 'react';  // Added useState
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from './../../config/FirebaseConfig';  // Adjusted path
// import { FlatList } from 'react-native-web';
// import Index from './../../app/index';

// export default function Slider() {
//   const [sliderList, setSliderList] = useState([]);  // Corrected useState syntax

//   useEffect(() => {
//     Getsliders();  // Calls the function when the component mounts
//   }, []);

//   const Getsliders = async () => {
//     try {
//       const snapshot = await getDocs(collection(db, 'sliders'));  // Use getDocs to fetch documents
//       const sliders = [];
//       snapshot.forEach((doc) => {
//         sliders.push(doc.data());  // Collect each document's data
//       });
//       setSliderList(sliders);  // Update the state with the fetched data
//     } catch (error) {
//       console.error("Error fetching sliders: ", error);  // Error handling
//     }
//   };

//   return (
//     <View>
//       {/* {sliderList.length > 0 ? (
//         sliderList.map((slider, index) => (
//           <Text key={index}>{slider.name}</Text>  // Assuming each slider has a "name" field
//         ))
//       ) : (
//         <Text>No sliders available</Text>
//       )} */}


//       <FlatList
//       data={setSliderList}
//       renderItem={({item,Index})=>(
//         <view>
//           <Image source={{uri:item?.imageUrl}}
//           style={styles?.sliderImage} />
//         </view>
//       )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   sliderImage:{
//     width:'80%',
//     height:160
//   }
  
// })



import { View, Text, Image, StyleSheet, FlatList, Dimensions } from 'react-native';  // Import Image and StyleSheet
import React, { useEffect, useState } from 'react';  // Import useState
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../config/FirebaseConfig';  // Adjusted path

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);  // Correct useState syntax

  useEffect(() => {
    Getsliders();  // Calls the function when the component mounts
  }, []);

  const Getsliders = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'sliders'));  // Use getDocs to fetch documents
      const sliders = [];
      snapshot.forEach((doc) => {
        sliders.push(doc.data());  // Collect each document's data
      });
      setSliderList(sliders);  // Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching sliders: ", error);  // Error handling
    }
  };

  return (
    <View>
      {sliderList.length > 0 ? (
        <FlatList
          data={sliderList} 
          horizontal={true} 
          showsHorizontalScrollIndicator={false}// Pass sliderList, not setSliderList
          keyExtractor={(item, index) => index.toString()}  // Unique key for each item
          renderItem={({ item }) => (
            <View>
              <Image 
                source={{ uri: item?.imageUrl }}  // Assuming the image URL is in imageUrl field
                style={styles.sliderImage} 
              />
            </View>
          )}
        />
      ) : (
        <Text>No sliders available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sliderImage: {
    width: Dimensions.get('screen').width*0.9,
    height: 189,
    borderRadius:15,
    marginRight:15
  },
});
