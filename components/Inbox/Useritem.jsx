
// import { View, Text, Image } from 'react-native';
// import React from 'react';

// export default function Useritem({ userInfo }) {
//   return (
//     <View
//       style={{
//         padding: 10,
//         borderBottomWidth: 1,
//         borderColor: '#ccc',
//         marginVertical: 7,
//         flexDirection: 'row',
//         alignItems: 'center',
//       }}
//     >
//       <Image
//         source={{ uri: userInfo?.imageUrl }}
//         style={{
//           width: 40,
//           height: 40,
//           borderRadius: 20,
//           marginRight: 10, // Add spacing between the image and text
//         }}
//       />
//       <Text style={{ fontSize: 16 }}>{userInfo?.name}</Text>
//     </View>
//   );
// }



import { View, Text, Image } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

export default function Useritem({ userInfo }) {
  return (
    <Link href={'/Chat?id='+userInfo.docId} >
    <View
      style={{
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginVertical: 7,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Image
        source={{ uri: userInfo?.imageUrl }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          marginRight: 10,
        }}
      />
      <Text style={{ fontSize: 16 }}>{userInfo?.name}</Text>
    </View>

    </Link>
  );
}
