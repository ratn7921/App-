import { View, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Shared from './../Shared/Shared'
import { useUser } from '@clerk/clerk-expo';
export default function MarkFav({pet,color='black'}) {

    const { user } = useUser();
    const [favList, setFavList] = useState();
    useEffect(() => {
        user && GetFav();
    }, [user])
    const GetFav = async () => {
        const result = await Shared.GetFavList(user);
        console.log(result);
        setFavList(result.favorites ? result.favorites : [])
    }

    const AddToFav=async ()=>{
        const favResult=favList;
        favResult.push(pet?.id)
        await Shared.UpdateFav(user,favResult);
        GetFav();
    }

    const removeFromFav=async()=>{
        const favResult=favList.filter(item=>item!=pet.id)
        await Shared.UpdateFav(user,favResult);
        GetFav();
    }
    return (

        <View>
        
       {favList?.includes(pet.id)?
        <Pressable   onPress={removeFromFav} > 
            <Ionicons name="heart" size={24} color="red" />
        </Pressable>:
        <Pressable onPress={()=>AddToFav()} >
        <Ionicons name="heart-outline" size={24} color={color} />
    </Pressable> }
        </View>
    )
}












// import { View, Pressable } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import Ionicons from '@expo/vector-icons/Ionicons';
// import Shared from './../Shared/Shared'
// import { useUser } from '@clerk/clerk-expo';

// export default function MarkFav({ pet }) {
//     const { user } = useUser();
//     const [favList, setFavList] = useState([]);

//     useEffect(() => {
//         user && GetFav();
//     }, [user]);

//     const GetFav = async () => {
//         const result = await Shared.GetFavList(user);
//         console.log(result);
//         setFavList(result.favorites ? result.favorites : []);
//     };

//     const toggleFavorite = async () => {
//         // Logic to toggle the favorite status of the pet
//         const updatedFavList = favList.includes(pet.id)
//             ? favList.filter(favId => favId !== pet.id) // Remove from favorites
//             : [...favList, pet.id]; // Add to favorites
//         setFavList(updatedFavList);

//         // Update favorite list on the backend if necessary
//         await Shared.UpdateFavList(user, updatedFavList);
//     };

//     return (
//         <View>
//             <Pressable onPress={toggleFavorite}>
//                 <Ionicons 
//                     name={favList.includes(pet.id) ? "heart" : "heart-outline"} 
//                     size={24} 
//                     color="black" 
//                 />
//             </Pressable>
//         </View>
//     );
// }
