// import { View, Text, FlatList, ActivityIndicator, Dimensions } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import Shared from './../../Shared/Shared';
// import { useUser } from '@clerk/clerk-expo';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from '../../config/FirebaseConfig';
// import PetListItem from './../../components/Home/PetListItem';

// export default function Favourate() {
//   const { user } = useUser();
//   const [favIds, setFavIds] = useState([]);
//   const [favPetList, setFavPetList] = useState([]);
//   const [loader, setLoader] = useState(false);
//   const screenWidth = Dimensions.get('window').width;

//   useEffect(() => {
//     if (user) {
//       GetFavPetIds();
//     }
//   }, [user]);

//   // Fetch the favorite pet IDs
//   const GetFavPetIds = async () => {
//     setLoader(true);
//     try {
//       const result = await Shared.GetFavList(user);
//       const favorites = result?.favorites || [];
//       setFavIds(favorites);

//       // Fetch the pet details only if there are favorites
//       if (favorites.length > 0) {
//         await GetFavPetList(favorites);
//       } else {
//         setFavPetList([]); // No favorites, clear list
//       }
//     } catch (error) {
//       console.error('Error fetching favorite pet IDs:', error);
//     }
//     setLoader(false);
//   };

//   // Fetch pet details from Firestore based on IDs
//   const GetFavPetList = async (favIds_) => {
//     try {
//       setFavPetList([]); // Clear list before fetching
//       const q = query(collection(db, 'Pets'), where('id', 'in', favIds_));
//       const querySnapshot = await getDocs(q);
//       const pets = [];
//       querySnapshot.forEach((doc) => {
//         pets.push(doc.data());
//       });
//       setFavPetList(pets);
//     } catch (error) {
//       console.error('Error fetching favorite pets:', error);
//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Text
//         style={{
//           fontFamily: 'PlaywriteGBS',
//           fontSize: 30,
//           fontWeight: 'bold',
//           marginBottom: 20,
//         }}
//       >
//         Favourites
//       </Text>

//       {loader ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : favPetList.length > 0 ? (
//         <FlatList
//           numColumns={2}
//           onRefresh={GetFavPetIds}
//           refreshing={loader}
//           data={favPetList}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <View
//               style={{
//                 width: screenWidth / 2 - 40, // Half screen minus padding/margin
//                 margin: 10, // Space between columns
//                 backgroundColor: '#f0f0f0', // Add a background to distinguish items
//                 borderRadius: 10, // Rounded corners for aesthetic
//                 padding: 10, // Padding inside each item
//               }}
//             >
//               <PetListItem pet={item} />
//             </View>
//           )}
//         />
//       ) : (
//         <Text style={{ fontFamily: 'PlaywriteGBS', fontSize: 18 }}>
//           No favorites found.
//         </Text>
//       )}
//     </View>
//   );
// }







import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Shared from './../../Shared/Shared';
import { useUser } from '@clerk/clerk-expo';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import PetListItem from './../../components/Home/PetListItem';

export default function Favourate() {
  const { user } = useUser();
  const [favIds, setFavIds] = useState([]);
  const [favPetList, setFavPetList] = useState([]);
  const[loader,setloader]=useState(false);
  useEffect(() => {
    if (user) {
      GetFavPetIds();
    }
  }, [user]);

  // Fetch the favorite pet IDs

  const GetFavPetIds = async () => {
    setloader(true);
    try {
      const result = await Shared.GetFavList(user);
      const favorites = result?.favorites || [];
      setFavIds(favorites);
      
      // Fetch the pet details only if there are favorites
      if (favorites.length > 0) {
        GetFavPetList(favorites);
      } else {
        setFavPetList([]); // No favorites, clear list
      }
    } catch (error) {
      console.error('Error fetching favorite pet IDs:', error);

    }
    setloader(false);
  };

  // Fetch pet details from Firestore based on IDs
  const GetFavPetList = async (favIds_) => {
    setloader(true);

    try {
      setFavPetList([]); // Clear list before fetching
      const q = query(collection(db, 'Pets'), where('id', 'in', favIds_));
      const querySnapshot = await getDocs(q);
      const pets = [];
      querySnapshot.forEach((doc) => {
        pets.push(doc.data());
      });
      setFavPetList(pets);
    } catch (error) {
      console.error('Error fetching favorite pets:', error);
    }
    setloader(false);

  };

  return (
    <View style={{ padding: 20, margin: 20 }}>
      <Text
        style={{
          fontFamily: 'PlaywriteGBS',
          fontSize: 30,
          fontWeight: 'bold', // Use 'fontWeight' instead of 'fontStyle'
        }}
      >
        Favourites
      </Text>

      {favPetList.length > 0 ? (
        <FlatList
      
        
        onRefresh={GetFavPetIds}
       refreshing={loader}
        data={favPetList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <PetListItem pet={item} />
            </View>
          )}
        />
      ) : (
        <Text style={{ fontFamily: 'PlaywriteGBS', fontSize: 18 }}>
          No favorites found.
        </Text>
      )}
    </View>
  );
}

