
import { View } from 'react-native';
import React from 'react';
import PetSubInfoCard from './PetSubInfoCard'; // Assuming this is the correct path

export default function PetInfo({ pet }) {
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      {/* Row 1 - Age and Breed */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between', // Ensures even spacing between items
        }}
      >
        <PetSubInfoCard
          title="Age"
          value={pet?.age ?? 'Unknown'} // Fallback in case age is undefined
          icon={require('./../../assets/images/calendar.png')}
        />
        <PetSubInfoCard
          title="Breed"
          value={pet?.breed ?? 'Unknown'} // Fallback in case breed is undefined
          icon={require('./../../assets/images/bone.png')}
        />
      </View>

      {/* Row 2 - Sex and Weight */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between', // Aligns items evenly within the row
          marginTop: 10, // Adds some spacing between rows
        }}
      >
        <PetSubInfoCard
          title="Sex"
          value={pet?.sex ?? 'Unknown'} // Fallback in case sex is undefined
          icon={require('./../../assets/images/sex.png')}
        />
        <PetSubInfoCard
          title="Weight"
          value={pet?.weight ?? 'Unknown'} // Fallback in case weight is undefined
          icon={require('./../../assets/images/weight.png')} // Assuming a scale icon for weight
        />
      </View>
    </View>
  );
}



// import { View, Text } from 'react-native';
// import React from 'react';
// import PetSubInfoCard from './PetSubInfoCard';

// export default function PetSubInfo({ pet }) {
//   console.log(pet);
//   return (
//     <View
//       style={{
//         fontFamily: 'PlaywriteGBS',
//         padding: 20,
//       }}
//     >
//       <View
//         style={{
//           display: 'flex',
//           flexDirection: 'row',
//         }}
//       >
//         <PetSubInfoCard
//           title="Age"
//           value={pet?.age ?? 'Unknown'}  // Added fallback in case Pet?.age is undefined
//           icon={require('./../../assets/images/calendar.png')}
//         />
//         <PetSubInfoCard
//           title="Breed"
//           value={pet?.breed ?? 'Unknown'}  // Added fallback in case Pet?.breed is undefined
//           icon={require('./../../assets/images/bone.png')}
//         />

// <View 
//  style={{
//   display: 'flex',
//   flexDirection: 'row',
// }}>
// <PetSubInfoCard
//           title="Sex"
//           value={pet?.sex ?? 'Unknown'}  // Added fallback in case Pet?.breed is undefined
//           icon={require('./../../assets/images/sex.png')}
//         />
//          <PetSubInfoCard
//           title="Breed"
//           value={pet?.weight ?? 'Unknown'}  // Added fallback in case Pet?.breed is undefined
//           icon={require('./../../assets/images/bone.png')}
//         />
//     </View>
//       </View>
//     </View>
//   );
// }
