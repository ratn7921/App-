
// import { View, Text, Image } from 'react-native';
// import React from 'react';
// import Colors from '../../constants/Colors';
// import MarkFav from '../MarkFav';

// export default function PetInfo({ pet }) {
//   return (
//     <View>
      
//       <Image
//         source={{ uri: pet?.imageUrl }}
//         style={{
//           width: '100%', // Adjusts to screen size
//           height: 400,
//           marginTop: 40,
//         }}
//       />
//       <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//         <View>
//           <Text style={{ fontFamily: 'PlaywriteGBS', fontSize: 20 }}>{pet?.name}</Text>
//           <Text style={{ fontFamily: 'PlaywriteGBS', color: Colors.GRAY }}>{pet.address}</Text>
//         </View>
//         <MarkFav pet={pet} />
//       </View>
//     </View>
//   );
// }


import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import MarkFav from '../MarkFav';
import PropTypes from 'prop-types';

const PetInfo = ({ pet }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: pet?.imageUrl }}
        style={styles.image}
        accessibilityLabel={`Image of ${pet?.name}`}
      />
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.petName}>{pet?.name}</Text>
          <Text style={styles.petAddress}>{pet?.address}</Text>
        </View>
        <MarkFav pet={pet} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  image: {
    width: '100%', // Adjusts to screen size
    height: 400,
    borderRadius: 10, // Optional: add border radius for rounded corners
    marginTop: 20,
  },
  infoContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  petName: {
    fontFamily: 'PlaywriteGBS',
    fontSize: 20,
  },
  petAddress: {
    fontFamily: 'PlaywriteGBS',
    color: Colors.GRAY,
  },
});

// Prop type validation
PetInfo.propTypes = {
  pet: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default PetInfo;
