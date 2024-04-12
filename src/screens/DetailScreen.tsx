import { BackHandler, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {useStore} from "../store/store"
import { COLORS } from '../theme/theme';
import ImagebackgroundInfo from '../components/ImagebackgroundInfo';

const DetailScreen = ({navigation,route}:any) => {
  const ItemOfIndex = useStore((state: any) =>
  route.params.type == 'Coffee' ? state.CoffeeList : state.BeanList,
)[route.params.index];
console.log(ItemOfIndex)
const BackHandler = () =>{
  navigation.pop()
}
  return (
    <View style={styles.detailscrreenContainer}>
     
        <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollviewflex}>
        <ImagebackgroundInfo
          EnableBackHandler={true}
          imagelink_portrait={ItemOfIndex.imagelink_portrait}
          type={ItemOfIndex.type}
          id={ItemOfIndex.id}
          favourite={ItemOfIndex.favourite}
          name={ItemOfIndex.name}
          special_ingredient={ItemOfIndex.special_ingredient}
          ingredients={ItemOfIndex.ingredients}
          average_rating={ItemOfIndex.average_rating}
          ratings_count={ItemOfIndex.ratings_count}
          roasted={ItemOfIndex.roasted}
          BackHandler={BackHandler}
          ToggleFavourite={()=>{}}
        />
        </ScrollView>

    
   
    </View>
  )
}



const styles = StyleSheet.create({
  detailscrreenContainer:{
    flex:1,
    backgroundColor:COLORS.primaryBlackHex
  },
  scrollviewflex:{
    flexGrow: 1,
    justifyContent: 'space-between',
  }
})
export default DetailScreen