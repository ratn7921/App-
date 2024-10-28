// import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity, Pressable } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useNavigation } from 'expo-router';
// import Colors from './../../constants/Colors';
// import { Picker } from '@react-native-picker/picker';
// import { db, storage } from './../../config/FirebaseConfig'; // Ensure storage is imported
// import { collection, getDocs, setDoc, doc } from 'firebase/firestore'; // Import setDoc and doc for saving data
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import uploadBytes and getDownloadURL for image upload
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
//   });
//   const [categoryList, setCategoryList] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [image, setImage] = useState(null);
//   const [imageUrl, setImageUrl] = useState('');

//   useEffect(() => {
//     navigation.setOptions({
//       headerTitle: 'Add New Pet',
//     });
//     GetCategories();
//   }, [navigation]);

//   // Fetch categories from Firebase Firestore
//   const GetCategories = async () => {
//     try {
//       const snapshot = await getDocs(collection(db, 'Category'));
//       const categories = snapshot.docs.map(doc => doc.data());
//       setCategoryList(categories);
//     } catch (error) {
//       console.error("Error fetching categories: ", error);
//     }
//   };

//   // Open image picker for selecting pet image
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

//   // Handle form data change
//   const handleInputChange = (fieldName, fieldValue) => {
//     setFormData((prev) => ({
//       ...prev,
//       [fieldName]: fieldValue,
//     }));
//   };

//   // Validate if form is filled
//   const isFormValid = () => {
//     return (
//       formData.name &&
//       formData.age &&
//       formData.weight &&
//       formData.breed &&
//       formData.address &&
//       formData.about &&
//       selectedCategory
//     );
//   };

//   // Upload image to Firebase Storage and get the URL
//   const UploadImage = async () => {
//     if (!image) return null;
//     const response = await fetch(image);
//     const blobImage = await response.blob();
//     const storageRef = ref(storage, `PetAdopt/${formData.name}-${Date.now()}`);
//     await uploadBytes(storageRef, blobImage);
//     const downloadUrl = await getDownloadURL(storageRef);
//     return downloadUrl;
//   };

//   // Save form data to Firestore
//   const SaveFormData = async (imageUrl) => {
//     const docId = Date.now().toString();
//     await setDoc(doc(db, 'Pets', docId), {
//       ...formData,
//       Category: selectedCategory,
//       imageUrl: imageUrl,
//       id: docId,
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     if (!isFormValid()) {
//       alert('Please fill in all required fields.');
//       return;
//     }

//     const imagePath = await UploadImage(); // Upload image to Firebase Storage
//     if (imagePath) {
//       await SaveFormData(imagePath); // Save form data with image URL to Firestore
//       alert('Pet added successfully!');
//       setFormData({
//         name: '',
//         age: '',
//         weight: '',
//         breed: '',
//         address: '',
//         about: '',
//         Category: '',
//       });
//       setImage(null); // Reset the image picker
//       setSelectedCategory(''); // Reset the selected category
//     } else {
//       alert('Error uploading image');
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={{ padding: 20 }}>
//       <Text style={{ fontFamily: 'PlaywriteGBS', fontSize: 20 }}>Add New Pet</Text>

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

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Pet Name *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter pet name"
//           value={formData.name}
//           onChangeText={(value) => handleInputChange('name', value)}
//         />
//       </View>

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

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Age *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter pet age"
//           keyboardType="numeric"
//           value={formData.age}
//           onChangeText={(value) => handleInputChange('age', value)}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Weight *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter pet weight"
//           keyboardType="numeric"
//           value={formData.weight}
//           onChangeText={(value) => handleInputChange('weight', value)}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Breed *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter pet breed"
//           value={formData.breed}
//           onChangeText={(value) => handleInputChange('breed', value)}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Address *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your address"
//           value={formData.address}
//           onChangeText={(value) => handleInputChange('address', value)}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>About *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Tell us about your pet"
//           multiline
//           numberOfLines={4}
//           value={formData.about}
//           onChangeText={(value) => handleInputChange('about', value)}
//         />
//       </View>

//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Submit</Text>
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







// import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity, Pressable } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useNavigation } from 'expo-router';
// import Colors from './../../constants/Colors';
// import { Picker } from '@react-native-picker/picker';
// import { db, storage } from './../../config/FirebaseConfig'; // Ensure storage is imported
// import { collection, getDocs, setDoc, doc } from 'firebase/firestore'; // Import setDoc and doc for saving data
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import uploadBytes and getDownloadURL for image upload
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
//     gender: '', // Added gender field
//   });
//   const [categoryList, setCategoryList] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedGender, setSelectedGender] = useState(''); // Added gender state
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     navigation.setOptions({
//       headerTitle: 'Add New Pet',
//     });
//     GetCategories();
//   }, [navigation]);

//   // Fetch categories from Firebase Firestore
//   const GetCategories = async () => {
//     try {
//       const snapshot = await getDocs(collection(db, 'Category'));
//       const categories = snapshot.docs.map(doc => doc.data());
//       setCategoryList(categories);
//     } catch (error) {
//       console.error("Error fetching categories: ", error);
//     }
//   };

//   // Open image picker for selecting pet image
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

//   // Handle form data change
//   const handleInputChange = (fieldName, fieldValue) => {
//     setFormData((prev) => ({
//       ...prev,
//       [fieldName]: fieldValue,
//     }));
//   };

//   // Validate if form is filled
//   const isFormValid = () => {
//     return (
//       formData.name &&
//       formData.age &&
//       formData.weight &&
//       formData.breed &&
//       formData.address &&
//       formData.about &&
//       selectedCategory &&
//       selectedGender // Ensure gender is selected
//     );
//   };

//   // Upload image to Firebase Storage and get the URL
//   const UploadImage = async () => {
//     if (!image) return null;
//     const response = await fetch(image);
//     const blobImage = await response.blob();
//     const storageRef = ref(storage, `PetAdopt/${formData.name}-${Date.now()}`);
//     await uploadBytes(storageRef, blobImage);
//     const downloadUrl = await getDownloadURL(storageRef);
//     return downloadUrl;
//   };

//   // Save form data to Firestore
//   const SaveFormData = async (imageUrl) => {
//     const docId = Date.now().toString();
//     await setDoc(doc(db, 'Pets', docId), {
//       ...formData,
//       Category: selectedCategory,
//       gender: selectedGender, // Include gender in saved data
//       imageUrl: imageUrl,
//       id: docId,
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     if (!isFormValid()) {
//       alert('Please fill in all required fields.');
//       return;
//     }

//     const imagePath = await UploadImage(); // Upload image to Firebase Storage
//     if (imagePath) {
//       await SaveFormData(imagePath); // Save form data with image URL to Firestore
//       alert('Pet added successfully!');
//       setFormData({
//         name: '',
//         age: '',
//         weight: '',
//         breed: '',
//         address: '',
//         about: '',
//         Category: '',
//         gender: '', // Reset gender field
//       });
//       setImage(null); // Reset the image picker
//       setSelectedCategory(''); // Reset the selected category
//       setSelectedGender(''); // Reset the selected gender
//     } else {
//       alert('Error uploading image');
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={{ padding: 20 }}>
//       <Text style={{ fontFamily: 'PlaywriteGBS', fontSize: 20 }}>Add New Pet</Text>

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

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Pet Name *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter pet name"
//           value={formData.name}
//           onChangeText={(value) => handleInputChange('name', value)}
//         />
//       </View>

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

//       {/* Added Gender Picker */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Gender *</Text>
//         <Picker
//           selectedValue={selectedGender}
//           onValueChange={(itemValue) => {
//             setSelectedGender(itemValue);
//             handleInputChange('gender', itemValue); // Update form data with gender
//           }}
//           style={styles.picker}
//         >
//           <Picker.Item label="Select Gender" value="" />
//           <Picker.Item label="Male" value="Male" />
//           <Picker.Item label="Female" value="Female" />
//         </Picker>
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Age *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter pet age"
//           keyboardType="numeric"
//           value={formData.age}
//           onChangeText={(value) => handleInputChange('age', value)}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Weight *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter pet weight"
//           keyboardType="numeric"
//           value={formData.weight}
//           onChangeText={(value) => handleInputChange('weight', value)}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Breed *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter pet breed"
//           value={formData.breed}
//           onChangeText={(value) => handleInputChange('breed', value)}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Address *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your address"
//           value={formData.address}
//           onChangeText={(value) => handleInputChange('address', value)}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>About *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Tell us about your pet"
//           multiline
//           numberOfLines={4}
//           value={formData.about}
//           onChangeText={(value) => handleInputChange('about', value)}
//         />
//       </View>

//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Submit</Text>
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




import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import Colors from './../../constants/Colors';
import { Picker } from '@react-native-picker/picker';
import { db, storage } from './../../config/FirebaseConfig'; // Ensure storage is imported
import { collection, getDocs, setDoc, doc } from 'firebase/firestore'; // Import setDoc and doc for saving data
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import uploadBytes and getDownloadURL for image upload
import * as ImagePicker from 'expo-image-picker';

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
      aspect: [4, 3],
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
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!isFormValid()) {
      alert('Please fill in all required fields.');
      return;
    }

    const imagePath = await UploadImage(); // Upload image to Firebase Storage
    if (imagePath) {
      await SaveFormData(imagePath); // Save form data with image URL to Firestore
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
        gender: '', // Reset gender field
      });
      setImage(null); // Reset the image picker
      setSelectedCategory(''); // Reset the selected category
      setSelectedGender(''); // Reset the selected gender
    } else {
      alert('Error uploading image');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontFamily: 'PlaywriteGBS', fontSize: 20 }}>Add New Pet</Text>

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
            handleInputChange('gender', itemValue); // Update form data with gender
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
