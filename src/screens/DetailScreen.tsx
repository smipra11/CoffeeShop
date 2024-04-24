import { BackHandler, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from "../store/store"
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import ImagebackgroundInfo from '../components/ImagebackgroundInfo';
import PaymentFooter from '../components/PaymentFooter';


const DetailScreen = ({ navigation, route }: any) => {
  const [isFull, setIsFull] = useState(false)

  const ItemOfIndex = useStore((state: any) =>
    route.params.type == 'Coffee' ? state.CoffeeList : state.BeanList,
  )[route.params.index];
  console.log(ItemOfIndex)
  const BackHandler = () => {
    navigation.pop()
  }
  const toggleDesc = () => {
    setIsFull(prev => !prev)
  }
  const [price, setPrice] = useState(ItemOfIndex.prices[0]);
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const addToCarthandler = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    price,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices: [{...price, quantity: 1}],
    });
    calculateCartPrice();
    navigation.navigate('Cart');
  };


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
          ToggleFavourite={() => { }}
        />

        <View style={{ flex: 1, padding: SPACING.space_10 }}>
          <Text style={{ color: COLORS.primaryWhiteHex, fontSize: FONTSIZE.size_10, marginLeft: SPACING.space_8, marginTop: SPACING.space_12 }}>Description</Text>
          {
            isFull ?
              <TouchableWithoutFeedback onPress={toggleDesc}>

                <Text style={styles.description}> {ItemOfIndex.description}</Text>
              </TouchableWithoutFeedback>
              :
              <TouchableWithoutFeedback onPress={toggleDesc}>
                <Text style={styles.description} numberOfLines={3}> {ItemOfIndex.description}</Text>
              </TouchableWithoutFeedback>
          }

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: SPACING.space_12 }}>

            {ItemOfIndex.prices.map((data: any) => {
              return (
                <TouchableOpacity key={data.size}
                  onPress={() => {
                    setPrice(data)
                  }}>
                  <View style={[styles.sizeContainer, { borderColor: price.size == data.size ? COLORS.primaryOrangeHex : COLORS.primaryDarkGreyHex, borderWidth: 1 }]}>
                    <Text style={{ color: COLORS.primaryWhiteHex }}> {data.size}</Text>

                  </View>
                </TouchableOpacity>
              )
            })}

          </View>
          <PaymentFooter  price={price} title="Add to Card" buttonPressHandler={() => {
            addToCarthandler({
              id: ItemOfIndex.id,
              index: ItemOfIndex.index,
              name: ItemOfIndex.name,
              roasted: ItemOfIndex.roasted,
              imagelink_square: ItemOfIndex.imagelink_square,
              special_ingredient: ItemOfIndex.special_ingredient,
              type: ItemOfIndex.type,
              price: price,
            });
          }}/>
          

        </View>
      </ScrollView>



    </View>
  )
}



const styles = StyleSheet.create({
  detailscrreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  scrollviewflex: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  description: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_12,
    marginTop: SPACING.space_8
  },
  sizeContainer: {
    width: 70,
    height: 30,
    backgroundColor: COLORS.primaryLightGreyHex,
    alignContent: 'center',
    alignItems: 'center',
    borderRadius:2
  }
})
export default DetailScreen