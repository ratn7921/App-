



// import { View, Text, FlatList } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from '../../config/FirebaseConfig';
// import { useUser } from '@clerk/clerk-expo';
// import Useritem from '../../components/Inbox/Useritem';

// export default function Inbox() {
//   /**
//    * Get user list depending on current user emails
//    * Filter the list of other users in one state
//    */
  
//   const { user } = useUser();
//   const [userList, setUserList] = useState([]);

//   useEffect(() => {
//     if (user) {
//       GetUserList();
//     }
//   }, [user]);

//   const GetUserList = async () => {
//     try {
//       const q = query(
//         collection(db, 'Chat'),
//         where('userIds', 'array-contains', user?.primaryEmailAddress?.emailAddress)
//       );

//       const querySnapshot = await getDocs(q);
//       const users = [];
//       querySnapshot.forEach(doc => {
//         console.log(doc.data());
//         users.push(doc.data());
//       });
//       setUserList(users);
//     } catch (error) {
//       console.error("Error fetching user list:", error);
//     }
//   };

//   const MapOtherUserList = () => {
//     return userList
//       .map(record => {
//         const otherUsers = record.userIds?.filter(
//           userEmail => userEmail !== user?.primaryEmailAddress?.emailAddress
//         );
//         return otherUsers.length > 0 ? { docId: record.id, email: otherUsers[0] } : null;
//       })
//       .filter(Boolean);
//   };

//   return (
//     <View style={{ padding: 20, marginTop: 20 }}>
//       <Text style={{ fontSize: 40 }}>Inbox</Text>

//       <FlatList
//         data={MapOtherUserList()}
//         renderItem={({ item }) => <Useritem userInfo={item} />}
//         keyExtractor={(item) => item.docId}
//       />
//     </View>
//   );
// }




// import { View, Text, FlatList } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from '../../config/FirebaseConfig';
// import { useUser } from '@clerk/clerk-expo';
// import Useritem from '../../components/Inbox/Useritem';

// export default function Inbox() {
//   const [loader,setLoader]=useState();
//   const { user } = useUser();
//   const [userList, setUserList] = useState([]);

//   useEffect(() => {
//     if (user) {
//       GetUserList();
//     }
//   }, [user]);

//   const GetUserList = async () => {
//     setLoader(true)
//     try {
//       const q = query(
//         collection(db, 'Chat'),
//         where('userIds', 'array-contains', user?.primaryEmailAddress?.emailAddress)
//       );

//       const querySnapshot = await getDocs(q);
//       const users = [];
//       querySnapshot.forEach(doc => {
//         users.push(doc.data());
//       });
//       setUserList(users);
//     } catch (error) {
//       console.error("Error fetching user list:", error);
//     }
//     setLoader(false)
//   };

//   const MapOtherUserList = () => {
//     return userList
//       .map(record => {
//         const otherUser = record.users?.find(
//           u => u.email !== user?.primaryEmailAddress?.emailAddress
//         );
//         return otherUser ? { docId: record.id, ...otherUser } : null;
//       })
//       .filter(Boolean);
//   };

//   return (
//     <View style={{ padding: 20, marginTop: 20 }}>
//       <Text style={{ fontSize: 40 }}>Inbox</Text>
//       <FlatList
//       refreshing={loader }
//       onRefresh={GetUserList}
//         data={MapOtherUserList()}
//         renderItem={({ item }) => <Useritem userInfo={item} />}
//         keyExtractor={(item) => item.docId}
//       />
//     </View>
//   );
// }



import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import Useritem from '../../components/Inbox/Useritem';

export default function Inbox() {
  const { user } = useUser();
  const [userList, setUserList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (user) {
      GetUserList();
    }
  }, [user]);

  const GetUserList = async () => {
    setLoader(true);
    try {
      const q = query(
        collection(db, 'Chat'),
        where('userIds', 'array-contains', user?.primaryEmailAddress?.emailAddress)
      );

      const querySnapshot = await getDocs(q);
      const users = [];
      querySnapshot.forEach(doc => {
        users.push(doc.data());
      });
      setUserList(users);
    } catch (error) {
      console.error("Error fetching user list:", error);
    } finally {
      setLoader(false);
    }
  };

  const MapOtherUserList = () => {
    return userList
      .map(record => {
        const otherUser = record.users?.find(
          u => u.email !== user?.primaryEmailAddress?.emailAddress
        );
        return otherUser ? { docId: record.id, ...otherUser } : null;
      })
      .filter(Boolean);
  };

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontSize: 40 }}>Inbox</Text>
      <FlatList
        refreshing={loader}
        onRefresh={GetUserList}
        data={MapOtherUserList()}
        renderItem={({ item }) => <Useritem userInfo={item} />}
        keyExtractor={(item) => item.docId}
      />
    </View>
  );
}
