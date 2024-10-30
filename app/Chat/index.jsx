// import { View, Text } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useLocalSearchParams, useNavigation } from 'expo-router'
// import { db } from '../../config/FirebaseConfig';
// import { addDoc, collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
// import { useUser } from '@clerk/clerk-expo';
// import { GiftedChat, Message } from 'react-native-gifted-chat'
// import moment from 'moment'
// export default function ChatScreen() {
//   const params=useLocalSearchParams();
//   const [messages, setMessages] = useState([])

//   const {user}=useUser();
// const navigation=useNavigation();
//   console.log(params);
// useEffect(()=>{
//   GetUserDetails();

//   const unSubscribe=onSnapshot(collection(db,'Chat',params?.id,'Message'),(snapshot)=>{
//     const messageData=snapshot.docs.map((doc)=>({
//       _id:doc.id,
//       ...doc.data()

//     }))
//     setMessages(messageData)
//   } );
//   return ()=>unSubscribe();
// },[])

//   const GetUserDetails=async ()=>{
//     const docRef=doc(db,'Chat',params?.id);
//     const docSnap=await getDoc(docRef);

//     const result=docSnap.data();
//     console.log(result);
//     const otherUser=result?.users.filter(item=>item.email!=user?.primaryEmailAddress?.emailAddress);
//     console.log(otherUser);
//     navigation.setOptions({
//       headerTitle:otherUser[0].name
//     })
//   }

//   const onSend=async (newMessage)=>{
//    setMessages((previousMessage)=>GiftedChat.append(previousMessage,newMessage));
//   //  newMessage[0].createdAt=moment().format('MM-DD-YYYY HH:mm:ss')
//    await addDoc(collection(db,'Chat',params.id,'Messages'),newMessage[0])
//   }
//   return (
//     <GiftedChat
//     messages={messages}
//     onSend={messages => onSend(messages)}
//     showUserAvatar={true}
//     user={{
//       _id: user?.primaryEmailAddress.emailAddress,
//       name:user?.fullName,
//       avatar:user?.imageUrl
//     }}
//   />
//   )
// }


// import { View, Text } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useLocalSearchParams, useNavigation } from 'expo-router';
// import { db } from '../../config/FirebaseConfig';
// import { addDoc, collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
// import { useUser } from '@clerk/clerk-expo';
// import { GiftedChat } from 'react-native-gifted-chat';
// import moment from 'moment';

// export default function ChatScreen() {
//   const params = useLocalSearchParams();
//   const [messages, setMessages] = useState([]);
//   const { user } = useUser();
//   const navigation = useNavigation();

//   useEffect(() => {
//     GetUserDetails();

//     const unsubscribe = onSnapshot(
//       collection(db, 'Chat', params?.id, 'Messages'),
//       (snapshot) => {
//         const messageData = snapshot.docs.map((doc) => ({
//           _id: doc.id,
//           createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : new Date(),
//           ...doc.data(),
//         }));
//         setMessages(messageData.sort((a, b) => b.createdAt - a.createdAt)); // Sort messages by date
//       },
//       (error) => console.error("Error fetching messages:", error)
//     );

//     return () => unsubscribe();
//   }, [params?.id]);

//   const GetUserDetails = async () => {
//     try {
//       const docRef = doc(db, 'Chat', params?.id);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         const result = docSnap.data();
//         const otherUser = result?.users.filter(
//           (item) => item.email !== user?.primaryEmailAddress?.emailAddress
//         );
//         if (otherUser?.[0]?.name) {
//           navigation.setOptions({
//             headerTitle: otherUser[0].name,
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//     }
//   };

//   const onSend = async (newMessages) => {
//     const newMessage = {
//       ...newMessages[0],
//       createdAt: new Date(),
//     };

//     setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));

//     try {
//       await addDoc(collection(db, 'Chat', params.id, 'Messages'), newMessage);
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={(newMessages) => onSend(newMessages)}
//       showUserAvatar={true}
//       user={{
//         _id: user?.primaryEmailAddress?.emailAddress,
//         name: user?.fullName,
//         avatar: user?.imageUrl,
//       }}
//     />
//   );
// }



import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { db } from '../../config/FirebaseConfig';
import { addDoc, collection, doc, getDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';
import { GiftedChat } from 'react-native-gifted-chat';
import moment from 'moment';

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const [messages, setMessages] = useState([]);
  const { user } = useUser();
  const navigation = useNavigation();

  useEffect(() => {
    GetUserDetails();

    const unsubscribe = onSnapshot(
      collection(db, 'Chat', params?.id, 'Messages'),
      (snapshot) => {
        const messageData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            _id: doc.id,
            text: data.text,
            user: data.user,
            createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
          };
        });
        setMessages(messageData.sort((a, b) => b.createdAt - a.createdAt)); // Sort messages by date
      },
      (error) => console.error("Error fetching messages:", error)
    );

    return () => unsubscribe();
  }, [params?.id]);

  const GetUserDetails = async () => {
    try {
      const docRef = doc(db, 'Chat', params?.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const result = docSnap.data();
        const otherUser = result?.users.find(
          (item) => item.email !== user?.primaryEmailAddress?.emailAddress
        );
        if (otherUser?.name) {
          navigation.setOptions({
            headerTitle: otherUser.name,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const onSend = async (newMessages) => {
    const newMessage = {
      ...newMessages[0],
      createdAt: serverTimestamp(),  // Set server timestamp in Firestore
    };

    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));

    try {
      await addDoc(collection(db, 'Chat', params.id, 'Messages'), newMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      showUserAvatar={true}
      user={{
        _id: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
        avatar: user?.imageUrl,
      }}
    />
  );
}
