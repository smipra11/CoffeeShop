import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useStore } from "../store/store"

const CartScreen = () => {
  const CartList = useStore((state: any) => state.CartList);
  console.log("Cart List",CartList)
  return (
    <View>
      <Text>CartScreen</Text>
    </View>
  )
}



const styles = StyleSheet.create({})

export default CartScreen