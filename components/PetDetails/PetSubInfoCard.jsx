// import { View, Text ,Image} from 'react-native'
// import React from 'react'
// import Colors from '../../constants/Colors'


// export default function PetSubInfoCard({icon,title,value}) {
//   return (
//     <View 
//     style={{ display:'flex',flexDirection:'row', alignItems:'center',backgroundColor:Colors.LIGHT_YELLOW,padding:10,margin:5,
//         borderRadius:8,gap:10,flex:1
//      }}>
//         <Image source={icon}
//         style={{
//             width:40,
//             height:40
//         }}
//         />
//         <View
//          style={{
//           display: 'flex',
//           flexDirection: 'row',
//           flex:1
//         }}
//         >
//         <Text style={{ fontFamily:'PlaywriteGBS',
//             fontSize:9,  }} >{title}</Text>
//         <Text style={{ fontFamily:'PlaywriteGBS',
//             fontSize:9,  }} 
//         >{value}</Text>
//         </View>
//     </View>
//   )
// }

import { View, Text, Image } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';

export default function PetSubInfoCard({ icon, title, value }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.LIGHT_YELLOW,
        padding: 12,
        marginVertical: 6,
        marginHorizontal: 10,
        borderRadius: 10,
        flex: 1,
        elevation: 3, // Add shadow for better aesthetics (for Android)
        shadowColor: '#000', // Add shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      }}
    >
      <Image
        source={icon}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20, // Make the image circular if it's square
        }}
      />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text
          style={{
            fontFamily: 'PlaywriteGBS',
            fontSize: 12, // Increased font size for better readability
            color: Colors.DARK_TEXT_COLOR, // Use a consistent text color
            marginBottom: 2, // Adds spacing between title and value
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontFamily: 'PlaywriteGBS',
            fontSize: 10,
            color: Colors.MID_GRAY, // Slightly lighter color for value text
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}
