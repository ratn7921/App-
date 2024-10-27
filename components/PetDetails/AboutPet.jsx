// import { View, Text, Pressable } from 'react-native'
// import React, { useState } from 'react'
// import Colors from '../../constants/Colors';

// export default function AboutPet({pet}) {
//   const[ readMore, setreadMore]=useState(false);
//   return (
//     <View
//     style={{
//         padding:20
//       }}
//     >
//       <Text
//        style={{
//         fontFamily:'PlaywriteGBS'
//       }}
//       >AboutPet {pet?.name}</Text>

// <Text numberOfLines={readMore?3:20}
//        style={{
//         fontFamily:'PlaywriteGBS',
//         fontSize:14,
//       }}
//       >{pet?.about}   </Text>
//   {readMore&&
//   <Pressable onPress={()=>setreadMore(false)}>
//   <Text 
//   style={{
//     fontFamily:'PlaywriteGBS',
//     fontSize:14,
//     color:Colors.BORDER

//   }}>
// Read More
// </Text>
// </Pressable>
// }
    
//     </View>
//   )
// }

import { ScrollView, View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../constants/Colors';

export default function AboutPet({ pet }) {
  const [readMore, setReadMore] = useState(false);

  return (
    <ScrollView // Wrap the content in ScrollView for scrolling functionality
      contentContainerStyle={{
        padding: 20, // Add padding to the ScrollView content
      }}
      showsVerticalScrollIndicator={false} // Optional: hides the vertical scrollbar
    >
      <View>
        <Text
          style={{
            fontFamily: 'PlaywriteGBS',
            fontSize: 18, // Adjusted font size for the title
          }}
        >
          About Pet: {pet?.name ?? 'Unknown'}
        </Text>

        <Text
          numberOfLines={readMore ? undefined : 3} // Set to undefined for no limit when readMore is true
          style={{
            fontFamily: 'PlaywriteGBS',
            fontSize: 14,
            marginTop: 10, // Added margin for better spacing
          }}
        >
          {pet?.about ?? 'No description available.'} {/* Fallback if about is undefined */}
        </Text>

        {/* "Read More" or "Show Less" button */}
        <Pressable onPress={() => setReadMore(!readMore)}>
          <Text
            style={{
              fontFamily: 'PlaywriteGBS',
              fontSize: 14,
              color: Colors.BORDER,
              marginTop: 10, // Added margin for better spacing
            }}
          >
            {readMore ? 'Show Less' : 'Read More'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
