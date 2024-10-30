import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import Colors from './../../constants/Colors';
import { Picker } from '@react-native-picker/picker';
import { db, storage } from './../../config/FirebaseConfig'; // Ensure storage is imported
import { collection, getDocs, setDoc, doc } from 'firebase/firestore'; // Import setDoc and doc for saving data
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import uploadBytes and getDownloadURL for image upload
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '@clerk/clerk-expo';

export default function AddNewPet() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    breed: '',
    address: '',
    about: '',
    Category: '',
    gender: '', // Added gender field
  });
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGender, setSelectedGender] = useState(''); // Added gender state
  const [image, setImage] = useState(null);

 const {user}=useUser();
const router=useRouter();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add New Pet',
    });
    GetCategories();
  }, [navigation]);

  // Fetch categories from Firebase Firestore
  const GetCategories = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'Category'));
      const categories = snapshot.docs.map(doc => doc.data());
      setCategoryList(categories);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };

  // Open image picker for selecting pet image
  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Handle form data change
  const handleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  // Validate if form is filled
  const isFormValid = () => {
    return (
      formData.name &&
      formData.age &&
      formData.weight &&
      formData.breed &&
      formData.address &&
      formData.about &&
      selectedCategory &&
      selectedGender // Ensure gender is selected
    );
  };

  // Upload image to Firebase Storage and get the URL
  const UploadImage = async () => {
    if (!image) return null;
    const response = await fetch(image);
    const blobImage = await response.blob();
    const storageRef = ref(storage, `PetAdopt/${formData.name}-${Date.now()}`);
    await uploadBytes(storageRef, blobImage);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  }; 

  // Save form data to Firestore
  const SaveFormData = async (imageUrl) => {
    const docId = Date.now().toString();
    await setDoc(doc(db, 'Pets', docId), {
      ...formData,
      Category: selectedCategory,
      gender: selectedGender, // Include gender in saved data
      imageUrl: imageUrl,
      id: docId,
      username:user.fullName,
      email:user?.primaryEmailAddress?.emailAddress,
      userImage:user?.imageUrl
    });
    router.replace('/(tabs)/home')
  };

  // Handle form submission
  // const handleSubmit = async () => {
  //   if (!isFormValid()) {
  //     alert('Please fill in all required fields.');
  //     return;
  //   }

  //   const imagePath = await UploadImage(); // Upload image to Firebase Storage
  //   if (imagePath) {
  //     await SaveFormData(imagePath); // Save form data with image URL to Firestore
  //     alert('Pet added successfully!');
  //     // Reset the form
  //     setFormData({
  //       name: '',
  //       age: '',
  //       weight: '',
  //       breed: '',
  //       address: '',
  //       about: '',
  //       Category: '',
  //       gender: '', // Reset gender field
  //     });
  //     setImage(null); // Reset the image picker
  //     setSelectedCategory(''); // Reset the selected category
  //     setSelectedGender(''); // Reset the selected gender
  //   } else {
  //     alert('Error uploading image');
  //   }
  // };


  const handleSubmit = async () => {
    if (!isFormValid()) {
      alert('Please fill in all required fields.');
      return;
    }
  
    console.log('Submitting data...'); // Debugging log
  
    const imagePath = await UploadImage();
    if (imagePath) {
      await SaveFormData(imagePath);
      alert('Pet added successfully!');
      // Reset the form
      setFormData({
        name: '',
        age: '',
        weight: '',
        breed: '',
        address: '',
        about: '',
        Category: '',
        gender: '',
      });
      setImage(null);
      setSelectedCategory('');
      setSelectedGender('');
      navigation.goBack(); // Navigate back if needed
    } else {
      alert('Error uploading image');
    }
  };
  

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontFamily: 'PlaywriteGBS', fontSize: 20,Textalign:'center' }}>List New Pet for Adoption </Text>

      <Pressable onPress={imagePicker}>
        <Image
          source={image ? { uri: image } : require('./../../assets/images/Addnew.png')}
          style={{
            width: 100,
            height: 100,
            borderRadius: 165,
            borderWidth: 1,
            borderColor: Colors.GRAY,
          }}
         />
      </Pressable>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter pet name"
          value={formData.name}
          onChangeText={(value) => handleInputChange('name', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Category *</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => {
            setSelectedCategory(itemValue);
            handleInputChange('Category', itemValue);
          }}
          style={styles.picker}
        >
          <Picker.Item label="Select Category" value="" />
          {categoryList.map((category, index) => (
            <Picker.Item key={index} label={category.name} value={category.name} />
          ))}
        </Picker>
      </View>

      {/* Added Gender Picker */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender *</Text>
        <Picker
          selectedValue={selectedGender}
          onValueChange={(itemValue) => {
            setSelectedGender(itemValue);
            handleInputChange('sex', itemValue); // Update form data with gender
          }}
          style={styles.picker}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter pet age"
          keyboardType="numeric"
          value={formData.age}
          onChangeText={(value) => handleInputChange('age', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter pet weight"
          keyboardType="numeric"
          value={formData.weight}
          onChangeText={(value) => handleInputChange('weight', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Breed *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter pet breed"
          value={formData.breed}
          onChangeText={(value) => handleInputChange('breed', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your address"
          value={formData.address}
          onChangeText={(value) => handleInputChange('address', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>About *</Text>
        <TextInput
          style={styles.input}
          placeholder="Tell us about your pet"
          multiline
          numberOfLines={4}
          value={formData.about}
          onChangeText={(value) => handleInputChange('about', value)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
  },
  input: {
    padding: 9,
    backgroundColor: Colors.TEXT_LIGHT,
    borderRadius: 12,
    marginTop: 5,
  },
  label: {
    marginVertical: 5,
    fontFamily: 'PlaywriteGBS',
  },
  button: {
    marginTop: 15,
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: '100%',
    marginTop: 5,
    backgroundColor: Colors.TEXT_LIGHT,
    borderRadius: 12,
  },
});






// import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useNavigation } from 'expo-router';
// import Colors from './../../constants/Colors';
// import { Picker } from '@react-native-picker/picker';
// import { db, storage } from './../../config/FirebaseConfig';
// import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import * as ImagePicker from 'expo-image-picker';

// export default function AddNewPet() {
//   const navigation = useNavigation();
//   const [formData, setFormData] = useState({
//     name: '',
//     age: '',
//     weight: '',
//     breed: '',
//     address: '',
//     about: '',
//     Category: '',
//     gender: '',
//   });
//   const [categoryList, setCategoryList] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedGender, setSelectedGender] = useState('');
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false); // Loading state

//   useEffect(() => {
//     navigation.setOptions({ headerTitle: 'Add New Pet' });
//     GetCategories();
//   }, [navigation]);

//   const GetCategories = async () => {
//     try {
//       const snapshot = await getDocs(collection(db, 'Category'));
//       const categories = snapshot.docs.map(doc => doc.data());
//       setCategoryList(categories);
//     } catch (error) {
//       console.error("Error fetching categories: ", error);
//     }
//   };

//   const imagePicker = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });
//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   const handleInputChange = (fieldName, fieldValue) => {
//     setFormData(prev => ({
//       ...prev,
//       [fieldName]: fieldValue,
//     }));
//   };

//   const isFormValid = () => {
//     return Object.values(formData).every(field => field) && selectedCategory && selectedGender;
//   };

//   const UploadImage = async () => {
//     if (!image) return null;
//     const response = await fetch(image);
//     const blobImage = await response.blob();
//     const storageRef = ref(storage, `PetAdopt/${formData.name}-${Date.now()}`);
//     await uploadBytes(storageRef, blobImage);
//     return await getDownloadURL(storageRef);
//   };

//   const SaveFormData = async (imageUrl) => {
//     const docId = Date.now().toString();
//     await setDoc(doc(db, 'Pets', docId), {
//       ...formData,
//       Category: selectedCategory,
//       gender: selectedGender,
//       imageUrl: imageUrl,
//       id: docId,
//     });
//   };

//   const handleSubmit = async () => {
//     if (!isFormValid()) {
//       alert('Please fill in all required fields.');
//       return;
//     }

//     setLoading(true); // Set loading to true
//     try {
//       const imagePath = await UploadImage();
//       if (imagePath) {
//         await SaveFormData(imagePath);
//         alert('Pet added successfully!');
//         // Reset the form
//         setFormData({
//           name: '',
//           age: '',
//           weight: '',
//           breed: '',
//           address: '',
//           about: '',
//           Category: '',
//           gender: '',
//         });
//         setImage(null);
//         setSelectedCategory('');
//         setSelectedGender('');
//         navigation.goBack(); // Navigate back if needed
//       } else {
//         alert('Error uploading image');
//       }
//     } catch (error) {
//       console.error("Error submitting data: ", error);
//       alert('Failed to add pet. Please try again.');
//     } finally {
//       setLoading(false); // Reset loading state
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={{ padding: 20 }}>
//       <Text style={{ fontFamily: 'PlaywriteGBS', fontSize: 20, textAlign: 'center' }}>List New Pet for Adoption</Text>

//       <Pressable onPress={imagePicker}>
//         <Image
//           source={image ? { uri: image } : require('./../../assets/images/Addnew.png')}
//           style={{
//             width: 100,
//             height: 100,
//             borderRadius: 165,
//             borderWidth: 1,
//             borderColor: Colors.GRAY,
//           }}
//         />
//       </Pressable>

//       {/* Form Fields */}
//       {Object.keys(formData).map((key) => (
//         <View key={key} style={styles.inputContainer}>
//           <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)} *</Text>
//           <TextInput
//             style={styles.input}
//             placeholder={`Enter ${key}`}
//             value={formData[key]}
//             keyboardType={key === 'age' || key === 'weight' ? 'numeric' : 'default'}
//             onChangeText={(value) => handleInputChange(key, value)}
//             multiline={key === 'about'}
//             numberOfLines={key === 'about' ? 4 : 1}
//           />
//         </View>
//       ))}

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Pet Category *</Text>
//         <Picker
//           selectedValue={selectedCategory}
//           onValueChange={(itemValue) => {
//             setSelectedCategory(itemValue);
//             handleInputChange('Category', itemValue);
//           }}
//           style={styles.picker}
//         >
//           <Picker.Item label="Select Category" value="" />
//           {categoryList.map((category, index) => (
//             <Picker.Item key={index} label={category.name} value={category.name} />
//           ))}
//         </Picker>
//       </View>

//       {/* Gender Picker */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Gender *</Text>
//         <Picker
//           selectedValue={selectedGender}
//           onValueChange={(itemValue) => {
//             setSelectedGender(itemValue);
//             handleInputChange('gender', itemValue);
//           }}
//           style={styles.picker}
//         >
//           <Picker.Item label="Select Gender" value="" />
//           <Picker.Item label="Male" value="Male" />
//           <Picker.Item label="Female" value="Female" />
//         </Picker>
//       </View>

//       <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
//         {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Submit</Text>}
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   inputContainer: {
//     marginVertical: 5,
//   },
//   input: {
//     padding: 9,
//     backgroundColor: Colors.TEXT_LIGHT,
//     borderRadius: 12,
//     marginTop: 5,
//   },
//   label: {
//     marginVertical: 5,
//     fontFamily: 'PlaywriteGBS',
//   },
//   button: {
//     marginTop: 15,
//     padding: 15,
//     backgroundColor: Colors.PRIMARY,
//     borderRadius: 15,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//     marginTop: 5,
//     backgroundColor: Colors.TEXT_LIGHT,
//     borderRadius: 12,
//   },
// });
