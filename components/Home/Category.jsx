
// Import necessary modules from React Native and Firebase
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore'; // Use getDocs to fetch data
import { db } from './../../config/FirebaseConfig'; // Ensure this path is correct
import Colors from './../../constants/Colors'
import { StyleSheet } from 'react-native';
export default function Category({Category}) {
  const [categoryList, setCategoryList] = useState([]); // State to store fetched categories
  const [fontsLoaded, setFontsLoaded] = useState(false); // State to track font loading
  const[selectedCategory,setselectedCategory]=useState('Dog');
  // Load custom fonts using expo-font
  useEffect(() => {
    const loadFonts = async () => {
      
      setFontsLoaded(true); // Set fontsLoaded to true once the font is loaded
    };
    loadFonts(); // Call the font loading function
  }, []);

  // Fetch categories from Firebase Firestore
  useEffect(() => {
    GetCategories(); // Fetch categories when component mounts
  }, []);

  const GetCategories = async () => {
    const snapshot = await getDocs(collection(db, 'Category')); // Fetch the 'Category' collection
    const categories = []; // Temporary array to store fetched data
    snapshot.forEach((doc) => {
      categories.push(doc.data()); // Push the data from each document into the array
    });
    setCategoryList(categories); // Update the state with the fetched categories
  };

  // Render the component only after fonts have loaded
  if (!fontsLoaded) {
    return null; // Return null or a loading spinner until fonts are loaded
  }

  return (
    <View style={{ marginTop: 20 ,  }}>
      {/* Display the category heading */}
      <Text style={{ fontFamily: 'PlaywriteGBS', fontSize: 20 }}>Category</Text>

      {/* FlatList to display the list of categories */}
      <FlatList
        data={categoryList}
        numColumns={4} // Data to be displayed
        renderItem={({ item }) => (
         
          <TouchableOpacity
          onPress={()=>{
            setselectedCategory(item.name)
            Category(item.name)
          }}
          style={{
            flex:1,
            alignItems:'center',
            borderWidth:1,
            borderRadius:15,
            borderColor:Colors.WARNING,
            margin:5
          }}>

          <View 
          style={
[            styles.container,
  selectedCategory==item.name&&styles.selectedCategoryContainer
]            
          }
          >
            {/* Display each category's image */}
            <Image
              source={{ uri: item?.imageUrl }}
              style={{ width: 40, height: 40 }}
            />
          </View>
          <Text
          style={{
            textAlign:'center',
            fontFamily:'PlaywriteGBS'

          }}
          >{item?.name}  </Text>

</TouchableOpacity>


        )}
        keyExtractor={(item, index) => index.toString()} // Key extractor for better list performance
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:Colors.LIGHT_YELLOW,
    padding:15,
    borderRadius:15

    
  },
selectedCategoryContainer:{
  backgroundColor:Colors.LIGHT_BLUE,
  borderRadius:15
}
})


