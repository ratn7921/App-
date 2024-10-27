import { View,Text, Image } from 'react-native';
import React from 'react';

export default function OwnerInfo({ pet }) {
  return (
    <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
      <Image 
        source={{ uri:pet?.userimage }} 
        style={{
          width: 40,
          height: 40,
          borderRadius: 20, // Makes the image circular
        }}
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontFamily: 'PlaywriteGBS' }}>        
              Owner: {pet?.user?.name ?? 'Unknown'}
        </Text>
      </View>
    </View>
  );
}
