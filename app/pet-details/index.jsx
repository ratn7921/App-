import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { router, useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import PetInfo from '../../components/PetDetails/PetInfo';
import PetSubInfo from '../../components/PetDetails/PetSubInfo';
import AboutPet from '../../components/PetDetails/AboutPet';
import OwnerInfo from '../../components/PetDetails/OwnerInfo';
import Colors from '../../constants/Colors';
import { useUser } from '@clerk/clerk-expo';
// import {  } from 'express';
import { query, collection, getDocs, where, setDoc, doc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig'; // Ensure you import your Firestore db instance

export default function PetDetails() {
  const pet = useLocalSearchParams();
  const navigation = useNavigation();
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: ' ',
    });
  }, [navigation]);

  const InitiateChat = async () => {
    const docId1 = user?.primaryEmailAddress?.emailAddress + '_' + pet?.email;
    const docId2 = pet?.email + '_' + user?.primaryEmailAddress?.emailAddress;
    const q = query(collection(db, 'Chat'), where('id', 'in', [docId1, docId2]));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      console.log(doc.data());
      router.push({
        pathname: '/Chat',
        params: { id: doc.id }
      })
    })
    if (querySnapshot.docs?.length == 0) {
      await setDoc(doc(db, 'Chat', docId1), {
        id: docId1,
        users: [
          {
            email: user?.primaryEmailAddress?.emailAddress,
            imageUrl: user?.imageUrl,
            name: user?.fullName
          },
          {
            email: pet?.email,
            imageUrl: pet?.userImage,
            name: pet?.username
          }
        ],
        userIds:[user?.primaryEmailAddress?.emailAddress,pet?.email]
      });

      router.push({
        pathname: '/Chat',
        params: { id: docId1 }
      })
    }

  }
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 2 }}
        showsVerticalScrollIndicator={false}
      >
        <PetInfo pet={pet} />
        <PetSubInfo pet={pet} />
        <AboutPet pet={pet} />
        <OwnerInfo pet={pet} />
        <View style={{ height: 70 }} />
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={InitiateChat}
          style={styles.adoptBtn}>
          <Text style={styles.adoptBtnText}>Adopt me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.TEXT_LIGHT,
  },
  adoptBtn: {
    backgroundColor: Colors.WARNING,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  adoptBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
