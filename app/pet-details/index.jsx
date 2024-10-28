

// import { ScrollView, View } from 'react-native';
// import React, { useEffect } from 'react';
// import { useLocalSearchParams, useNavigation } from 'expo-router';
// import PetInfo from '../../components/PetDetails/PetInfo';
// import PetSubInfo from '../../components/PetDetails/PetSubInfo';
// import AboutPet from '../../components/PetDetails/AboutPet';
// import OwnerInfo from '../../components/PetDetails/OwnerInfo';

// export default function PetDetails() {
//   const pet = useLocalSearchParams();
//   const navigation = useNavigation();

//   useEffect(() => {
//     navigation.setOptions({
//       headerTransparent: true,
//       headerTitle: ' ',
//     });
//   }, []);

//   return (
//     <ScrollView 
//       style={{ flex: 1 }} // Ensure ScrollView can take full space
//       contentContainerStyle={{ padding: 2 }} // Padding around content
//       showsVerticalScrollIndicator={false} // Optional: hides the vertical scrollbar
//     >
//       {/* Uncomment to view pet details */}
//       {/* <Text>{JSON.stringify(pet)}</Text> */}

//       {/* Pet info */}
//       <PetInfo pet={pet} />
//       {/* Pet properties */}
//       <PetSubInfo pet={pet} />
//       {/* About the pet */}
//       <AboutPet pet={pet} />

//       <OwnerInfo pet={pet}/>
//       {/* Add more components here, like owner details or adopt button */}
//     </ScrollView>
//   );
// }



// import { ScrollView, View, Text, StyleSheet } from 'react-native';
// import React, { useEffect } from 'react';
// import { useLocalSearchParams, useNavigation } from 'expo-router';
// import PetInfo from '../../components/PetDetails/PetInfo';
// import PetSubInfo from '../../components/PetDetails/PetSubInfo';
// import AboutPet from '../../components/PetDetails/AboutPet';
// import OwnerInfo from '../../components/PetDetails/OwnerInfo';
// import { TouchableOpacity } from 'react-native';

// export default function PetDetails() {
//   const pet = useLocalSearchParams();
//   const navigation = useNavigation();

//   useEffect(() => {
//     navigation.setOptions({
//       headerTransparent: true,
//       headerTitle: ' ',
//     });
//   }, [navigation]);

//   return (
//     // <View>
//     <ScrollView 
//       style={{ flex: 1 }} // Ensure ScrollView can take full space
//       contentContainerStyle={{ padding: 2 }} // Padding around content
//       showsVerticalScrollIndicator={false} // Optional: hides the vertical scrollbar
//     >
//       {/* Uncomment to view pet details */}
//       {/* <Text>{JSON.stringify(pet)}</Text> */}

//       {/* Pet info */}
//       <PetInfo pet={pet} />
//       {/* Pet properties */}
//       <PetSubInfo pet={pet} />
//       {/* About the pet */}
//       <AboutPet pet={pet} />
//       {/* Owner info */}
//       <OwnerInfo pet={pet} />
//       <View style={{
//         height:70
//       }}>

//       </View>
//       <View style={styles?.bottomContainer}>
//       <TouchableOpacity >
//         <Text>Adopt me</Text>
//       </TouchableOpacity>
//       </View>
//       {/* Add more components here, like owner details or adopt button */}
//     </ScrollView>


//   );
// }


// const styles = StyleSheet.create({
//   adoptBtn:{

//   },
//   bottomContainer:{
//     display:12
//   }
// })


import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import PetInfo from '../../components/PetDetails/PetInfo';
import PetSubInfo from '../../components/PetDetails/PetSubInfo';
import AboutPet from '../../components/PetDetails/AboutPet';
import OwnerInfo from '../../components/PetDetails/OwnerInfo';
import Colors from '../../constants/Colors';

export default function PetDetails() {
  const pet = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: ' ',
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView 
        style={{ flex: 1 }} // Ensure ScrollView takes full space
        contentContainerStyle={{ padding: 2 }} // Padding around content
        showsVerticalScrollIndicator={false} // Optional: hides vertical scrollbar
      >
        {/* Uncomment to view pet details */}
        {/* <Text>{JSON.stringify(pet)}</Text> */}

        {/* Pet info */}
        <PetInfo pet={pet} />
        {/* Pet properties */}
        <PetSubInfo pet={pet} />
        {/* About the pet */}
        <AboutPet pet={pet} />
        {/* Owner info */}
        <OwnerInfo pet={pet} />

        {/* Spacer to ensure content does not overlap with the button */}
        <View style={{ height: 70 }} />
      </ScrollView>

      {/* Bottom button container */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.adoptBtn}>
          <Text style={styles.adoptBtnText}>Adopt me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:Colors.TEXT_LIGHT, // Add some background color to distinguish it
  },
  adoptBtn: {
    backgroundColor:Colors.WARNING, // A light red/pink color for the button
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  adoptBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
