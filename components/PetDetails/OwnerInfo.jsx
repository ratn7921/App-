

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



import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function OwnerInfo({ pet }) {
  return (
    <View style={styles.container}>
      <View style={styles.infoRow}>
        <Image 
          source={{ uri: pet?.userImage}} // Add fallback image URL here
          style={styles.ownerImage} // Corrected style name here
        />
        <View style={styles.textContainer}>
          <Text style={styles.ownerName}>        
            Owner: {pet?.username ?? 'Unknown'} {/* Use 'username' as pet owner info */}
          </Text>
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
    gap: 3,
    paddingLeft: 8,
  },
  ownerImage: { // Consistent style name
    width: 40,
    height: 40,
    borderRadius: 20, // Circular image
  },
  textContainer: {
    marginLeft: 10,
  },
  ownerName: {
    fontFamily: 'PlaywriteGBS', // Make sure the font is correctly linked
  },
});
