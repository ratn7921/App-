
// import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import React from 'react';
// import { Ionicons } from '@expo/vector-icons';
// import { useAuth, useUser } from '@clerk/clerk-expo';
// import { useNavigation } from 'expo-router';

// export default function Profile() {
//   const { user } = useUser();
//   const navigation = useNavigation();
//   const { signOut } = useAuth();

//   const Menu = [
//     {
//       id: 1,
//       name: 'Add New Pet',
//       icon: 'add-circle',
//       path: './add-new-pet',
//     },
//     {
//       id: 5,
//       name: 'My Post',
//       icon: 'bookmark',
//       path: '/../user-post',
//     },
//     {
//       id: 2,
//       name: 'Favorites',
//       icon: 'heart',
//       path: '/(tabs)/favorites',
//     },
//     {
//       id: 3,
//       name: 'Inbox',
//       icon: 'chatbubble',
//       path: '/(tabs)/inbox', // Correct path without .jsx extension
//     },

//     {
//       id: 4,
//       name: 'Logout',
//       icon: 'exit',
//       path: '/logout',
//     }

   
//   ];
  

//   const onPressMenu = (menu) => {
//     if (menu.id === 4) { // Check for Logout
//       signOut();
//       return;
//     }
//     navigation.navigate(menu.path);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Profile</Text>

//       <View style={styles.profileContainer}>
//         <Image
//           source={{ uri: user?.imageUrl || 'https://via.placeholder.com/100' }}
//           style={styles.profileImage}
//         />
//         <Text style={styles.userName}>{user?.fullName}</Text>
//       </View>

//       <FlatList
//         data={Menu}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.menuItem}
//             onPress={() => onPressMenu(item)}
//           >
//             <Ionicons name={item.icon} size={24} style={styles.icon} />
//             <Text style={styles.menuText}>{item.name}</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     marginTop: 20,
//   },
//   title: {
//     fontFamily: 'PlaywriteGBS',
//     fontSize: 30,
//     marginBottom: 20,
//   },
//   profileContainer: {
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 10,
//   },
//   userName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//   },
//   icon: {
//     marginRight: 15,
//   },
//   menuText: {
//     fontSize: 18,
//   },
// });


import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useNavigation } from 'expo-router';


export default function Profile() {
  const { user } = useUser();
  const navigation = useNavigation();
  const { signOut } = useAuth();

  const Menu = [
    {
      id: 1,
      name: 'Add New Pet',
      icon: 'add-circle',
      path: '/add-new-pet',
    },
    {
      id: 5,
      name: 'My Post',
      icon: 'bookmark',
      path: '/user-post',
    },
    {
      id: 2,
      name: 'Favorites',
      icon: 'heart',
      path: '/favourate', // Remove (tabs) if not necessary
    },
    {
      id: 3,
      name: 'Inbox',
      icon: 'chatbubble',
      path: '/inbox', // Remove (tabs) if not necessary
    },
    {
      id: 4,
      name: 'Logout',
      icon: 'exit',
      path: '/logout',
    }
  ];
  
  
  const onPressMenu = (menu) => {
    if (menu.id === 4) { // Check for Logout
      signOut();
      return;
    }
    navigation.navigate(menu.path);
  };
  navigation.navigate("user-post");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.profileContainer}>
        <Image
          source={{ uri: user?.imageUrl || 'https://via.placeholder.com/100' }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{user?.fullName}</Text>
      </View>

      <FlatList
        data={Menu}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => onPressMenu(item)}
          >
            <Ionicons name={item.icon} size={24} style={styles.icon} />
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
  },
  title: {
    fontFamily: 'PlaywriteGBS',
    fontSize: 30,
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  icon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 18,
  },
});
