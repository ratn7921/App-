// import { Text, View } from "react-native";
// import { Link, Redirect, useRootNavigationState } from "expo-router";
// import { useUser } from "@clerk/clerk-expo";
// import { useEffect, useCallback } from "react";

// export default function Index() {
//     const { user } = useUser();
//     const rootNavigationState = useRootNavigationState();

//     useEffect(() => {
//         // Your   logic here
//     }, []);

//     const CheckNavLoaded = useCallback(() => {
//         if (!rootNavigationState.key) return null;
//         return true; // Or some other logic
//     }, [rootNavigationState.key]); // Dependency array

//     return user && (
//         <View style={{ flex: 1 }}>
//             {CheckNavLoaded() ? 
//                     <Redirect href={'/(tabs)/home'} />
//                 : 
//                 <Redirect href={'/login'} />
//             }
//         </View>
//     );
// }







import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router';
import { useUser } from "@clerk/clerk-expo";


export default function Index() {
    const{user}=useUser();

  return (
    <View
    style={{
        flex:1,
    }}>
   
    {user?
    <Redirect href={'/(tabs)/home'}/>
    : 
    <Redirect href={'/login'}/>
}

    </View>
  )
}