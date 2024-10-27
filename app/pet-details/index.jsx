

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



import { ScrollView, View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import PetInfo from '../../components/PetDetails/PetInfo';
import PetSubInfo from '../../components/PetDetails/PetSubInfo';
import AboutPet from '../../components/PetDetails/AboutPet';
import OwnerInfo from '../../components/PetDetails/OwnerInfo';

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
    <ScrollView 
      style={{ flex: 1 }} // Ensure ScrollView can take full space
      contentContainerStyle={{ padding: 2 }} // Padding around content
      showsVerticalScrollIndicator={false} // Optional: hides the vertical scrollbar
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
      {/* Add more components here, like owner details or adopt button */}
    </ScrollView>
  );
}
