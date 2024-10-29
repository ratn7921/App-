// import { View, Text, Image, StyleSheet } from 'react-native';
// import React from 'react';
// import Colors from '../../constants/Colors';
// import Ionicons from '@expo/vector-icons/Ionicons';

// export default function OwnerInfo({ pet }) {
//   return (
//     <View style={styles.container}>
//       <View style={styles.infoRow}>
//         <Image 
//           source={{ uri: pet.userImage ?? 'fallback-image-url-here' }} // Add fallback image URL here
//           style={styles.userImage}
//         />
//         <View style={styles.textContainer}>
//           <Text style={styles.username}>
//             Owner: {pet?.username }
//           </Text>
//         </View>
//       </View>
//       <Ionicons name="send" size={24} color="black" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 13,
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 20,
//     borderWidth: 1,
//     borderRadius: 15,
//     padding: 20,
//     backgroundColor: Colors.LIGHT_BLUE,
//     justifyContent: 'space-between',
//     borderColor: Colors.LIGHT_BLUE,
//   },
//   infoRow: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     gap: 3,
//     paddingLeft: 8,
//   },
//   ownerImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20, // Circular image
//   },
//   textContainer: {
//     marginLeft: 10,
//   },
//   ownerName: {
//     fontFamily: 'PlaywriteGBS',
//   },
// });



// import { View, Text, Image, StyleSheet } from 'react-native';
// import React from 'react';
// import Colors from '../../constants/Colors';
// import Ionicons from '@expo/vector-icons/Ionicons';

// export default function OwnerInfo({ pet }) {
//   return (
//     <View style={styles.container}>
//       <View style={styles.infoRow}>
//         <Image 
//           source={{ uri: pet?.userImage}} // Add fallback image URL here
//           style={styles.ownerImage} // Corrected style name here
//         />
//         <View style={styles.textContainer}>
//           <Text style={styles.ownerName}>        
//             Owner: {pet?.username ?? 'Unknown'} {/* Use 'username' as pet owner info */}
//           </Text>
//         </View>
//       </View>
//       <Ionicons name="send" size={24} color="black" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 13,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 20,
//     borderWidth: 1,
//     borderRadius: 15,
//     padding: 20,
//     backgroundColor: Colors.LIGHT_BLUE,
//     justifyContent: 'space-between',
//     borderColor: Colors.LIGHT_BLUE,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 3,
//     paddingLeft: 8,
//   },
//   ownerImage: { // Consistent style name
//     width: 40,
//     height: 40,
//     borderRadius: 20, // Circular image
//   },
//   textContainer: {
//     marginLeft: 10,
//   },
//   ownerName: {
//     fontFamily: 'PlaywriteGBS', // Make sure the font is correctly linked
//   },
// });


// import { View, Text , Image } from 'react-native'
// import React from 'react'
// import { useUser } from '@clerk/clerk-expo';

// export default function OwnerInfo({pet}) {
//   const {user}=useUser();

//   return (
//     <View
//     style={{
//       paddingHorizontal:20
//     }}>
//      <Image source={{uri:pet?.userImage}}
//      style={
//       {
//         width:40,
//         height:60,
//         borderRadius:90
//       }
//      }
//      />

//   <View>
//     <Text style={{
//       fontFamily:'PlaywriteGBS'
//     }}>
//       {pet?.username}
//     </Text>
//     <Text 
//     style={{
//       fontFamily:'PlaywriteGBS'
//     }}>
//       Pet Owner
//     </Text>
//   </View>

//     </View>
//   )
// }

import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import Colors from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function OwnerInfo({ pet }) {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.infoRow}>
        <Image
          source={{ uri: pet?.userImage ?? 'fallback-image-url-here' }} // Fallback URL if userImage is not provided
          style={styles.ownerImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.ownerName}>
            Owner: {pet?.username ?? 'Unknown'}
          </Text>
          <Text style={styles.role}>Pet Owner</Text>
        </View>
      </View>
      <Ionicons name="send" size={24} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    backgroundColor: Colors.LIGHT_BLUE,
    justifyContent: 'space-between',
    borderColor: Colors.LIGHT_BLUE,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingLeft: 8,
  },
  ownerImage: {
    width: 40,
    height: 40,
    borderRadius: 20, // Circular image
  },
  textContainer: {
    marginLeft: 10,
  },
  ownerName: {
    fontFamily: 'PlaywriteGBS', // Ensure the font is linked correctly in your project
  },
  role: {
    fontFamily: 'PlaywriteGBS',
    color: 'gray', // Additional styling for the role text
  },
});
