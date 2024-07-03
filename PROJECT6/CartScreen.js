import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Pressable, Image} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

 export default function CartScreen ({navigation}) {
  const [cartItems, setCartItems] = useState([]);
  
    const fetchCartItems = async () => {
      try {
        const storedCartItems = await AsyncStorage.getItem('cartItems');
        if (storedCartItems !== null) {
          setCartItems(JSON.parse(storedCartItems));
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
  


  const removeFromCart = async (item) => {
    try {
      let existingCartItems = await AsyncStorage.getItem('cartItems');
      existingCartItems = existingCartItems ? JSON.parse(existingCartItems) : [];

      // Remove the item from the list
      const updatedCartItems = existingCartItems.filter(cartItem => cartItem.index !== item.index);

      // Save updated cart items back to AsyncStorage
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

      // Update state
      setCartItems(updatedCartItems);

     
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  React.useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <View style={styles.container}>
    <ScrollView style={styles.scroll}>
    <View style={styles.positioning}>
       <Image style={{top:5, left: 160}}source={require('./assets/Logo.png')}/>
       <Pressable style={{left: 350, top: -25}}><Ionicons name="search-outline" size={30} color="black"/></Pressable>
       <Text style={{ fontSize:26, top:10, left:130,marginBottom:-30}}>CHECKOUT</Text>
       <Pressable style={styles.back} onPress={() => navigation.navigate('Home')}><Ionicons name="arrow-back-outline" size={35} color="black"/></Pressable>
    </View>
    {cartItems.map((item, index) => (
          <View key={index} style={styles.cartItem}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.dressName}</Text>
              <Text style={styles.itemdescription}>{item.dressType}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
            <Pressable  onPress={() => removeFromCart(item)} style={{top:-30, left: 290}}><Ionicons name="close-circle-outline" size={25} color="red"/></Pressable>
          </View>
        ))}
    </ScrollView>
    <Text style={{fontSize:20, top: 10, left:15}}>EST. TOTAL</Text>
    <View style={{alignItems:'flex-end'}}>
    <Text style={{fontSize:20, top: -15, right:20, color:'orange'}}>$240</Text>
    </View>
    <Text style={{top:40, fontSize:20}}>hi</Text>
    <View style={{alignItems:'center'}}>
    <Pressable style={styles.button}>
    <Ionicons name="bag-handle-outline" size={45} color="white" style={{top:5, right:85}}/>
   <Text style={{color:'white', fontSize:26, top:-30, left:20}}>CHECKOUT</Text>
    </Pressable>
    </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  scroll:{
   
    backgroundColor: '#fff',
    
  },
  positioning:{
    marginTop:30,
      marginBottom:30,
      top: 40
   
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding:5,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: 'black',
    top:20,
    width:450,
    left: 10,
    marginTop:-50
  },
  itemImage:{
    top:30,
    left: 10,
    height:160,
    width:'40%',
    marginTop:10,
    marginBottom:-50,
    resizeMode:'contain'
  },
  itemDetails:{
    top:-70,
    left:160,
    justifyContent:'flex-end',
  },
  itemName:{
    fontSize: 25,
  },
  itemPrice:{
    fontSize: 20,
    color:'orange',
  marginTop:5  
  },
  itemdescription:{
    marginTop:5  
  },
  back:{
    top:-30,
    left:20
  }
});