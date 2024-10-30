

// import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { useNavigation } from 'expo-router';
// import { query, collection, getDocs, where } from 'firebase/firestore';
// import { db } from '../../config/FirebaseConfig';
// import { useUser } from '@clerk/clerk-expo';
// import PetListItem from './../../components/Home/PetListItem';

// export default function Userpost() {
//   const [userPostList, setUserPostList] = useState([]);
//   const navigation = useNavigation();
//   const { user } = useUser();

//   useEffect(() => {
//     navigation.setOptions({
//       headerTitle: 'User Post'
//     });
//     if (user) {
//       GetUserPost();
//     }
//   }, [user]);

//   const GetUserPost = async () => {
//     const q = query(
//       collection(db, 'Pets'),
//       where('email', '==', user?.primaryEmailAddress?.emailAddress)
//     );
//     const querySnapshot = await getDocs(q);
//     const posts = querySnapshot.docs.map((doc) => doc.data());
//     setUserPostList(posts);
//   };
// const onDeletePost=()=>{

//   Alert.alert('Do You want to Delete this post ')
//   {
//     text:'cancle '
//     onPress:()=>console.log("Cancle Click")
//   },{
//     text:'Delete',
//     onPress:()=>console.log("Delete")
//   }
// }
//   return (
//     <View style={{ padding: 20 }}>
//       <Text style={{ fontFamily: 'PlaywriteGBS', fontSize: 30 }}>User Post</Text>

//       <FlatList
//         data={userPostList}
//         numColumns={2}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.itemContainer}>
//             <PetListItem pet={item} />
//             <Pressable onPress={()=>onDeletePost(item?.id)} style={styles.deleteButton}>
//               <Text style={styles.deleteButtonText}>Delete</Text>
//             </Pressable>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   itemContainer: {
//     flex: 1,
//     margin: 10,
//   },
//   deleteButton: {
//     backgroundColor: 'red',
//     padding: 10,
//     marginTop: 5,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   deleteButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });


import { View, Text, FlatList, Pressable, StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from 'expo-router';
import { query, collection, getDocs, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import PetListItem from './../../components/Home/PetListItem';

export default function Userpost() {
  const [userPostList, setUserPostList] = useState([]);
  const navigation = useNavigation();
  const { user } = useUser();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'User Post'
    });
    if (user) {
      GetUserPost();
    }
  }, [user]);

  const GetUserPost = async () => {
    const q = query(
      collection(db, 'Pets'),
      where('email', '==', user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setUserPostList(posts);
  };

  const onDeletePost = (postId) => {
    Alert.alert(
      'Delete Post',
      'Do you want to delete this post?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Clicked'), style: 'cancel' },
        { text: 'Delete', onPress: () => handleDelete(postId), style: 'destructive' }
      ]
    );
  };

  const handleDelete = async (postId) => {
    try {
      await deleteDoc(doc(db, 'Pets', postId));
      setUserPostList((prev) => prev.filter((post) => post.id !== postId));
      console.log('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post: ', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: 'PlaywriteGBS', fontSize: 30 }}>User Post</Text>

      <FlatList
        data={userPostList}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <PetListItem pet={item} />
            <Pressable onPress={() => onDeletePost(item.id)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
