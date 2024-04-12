import { StatusBar, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import React, { useState, useRef } from 'react'
import { useStore } from '../store/store'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING, BORDERRADIUS } from '../theme/theme';
import CustomIcon from '../components/CustomIcon';
import CoffeeCard from '../components/CoffeeCard';

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getCoffeeList = (category: string, data: any) => {
  if (category == 'All') {
    return data;
  } else {
    let coffeelist = data.filter((item: any) => item.name == category);
    return coffeelist;
  }
};




const HomeScreen = ({navigation}:any) => {

  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const [categories, setCategories] = useState(
    getCategoriesFromData(CoffeeList),
  );
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, CoffeeList),
  );
  console.log("All categories", categories)
  const CoffeeCardAddToCart = () => {

  }

  const ListRef: any = useRef<FlatList>();

  const searchCoffee = (search: string) => {
    if (search != '') {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setCategoryIndex({ index: 0, category: categories[0] });
      setSortedCoffee([
        ...CoffeeList.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        ),
      ]);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        {/* App Header */}

        <Text style={styles.screenTitle}>Café Connect: Your Ultimate Coffee Companion </Text>
        {/*Search Input */}

        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => { searchCoffee(searchText) }}>
            <CustomIcon name="search" size={FONTSIZE.size_14} color={searchText.length > 0 ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} style={styles.searchicon} />
          </TouchableOpacity>
          <TextInput placeholder='Search for your favorite coffee...' style={styles.textinput} value={searchText} placeholderTextColor={COLORS.primaryLightGreyHex} onChangeText={(text) => setSearchText(text)} />
        </View>

        {/*Category scroller */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.CategoryScrollViewStyle}>
          {categories.map((data, index) => (
            <View
              key={index.toString()}
              style={styles.CategoryScrollViewContainer}>
              <TouchableOpacity
                style={styles.CategoryScrollViewItem}
                onPress={() => {

                  setCategoryIndex({ index: index, category: categories[index] });
                  setSortedCoffee([
                    ...getCoffeeList(categories[index], CoffeeList),
                  ]);
                }}>
                <Text
                  style={[
                    styles.CategoryText,
                    categoryIndex.index == index
                      ? { color: COLORS.primaryOrangeHex }
                      : {},
                  ]}>
                  {data}
                </Text>
                {categoryIndex.index == index ? (
                  <View style={styles.ActiveCategory} />
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            </View>
          ))}

        </ScrollView>
        {/*Coffee Flatlist */}
        <FlatList horizontal data={sortedCoffee} keyExtractor={item => item.id} contentContainerStyle={styles.FlatListContainer} showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={()=>  navigation.push('Details', {
                  index: item.index,
                  id: item.id,
                  type: item.type,
                })}
              >
                <CoffeeCard
                  id={item.id}
                  index={item.index}
                  type={item.type}

                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={CoffeeCardAddToCart} />
              </TouchableOpacity>
            )
          }} />


        <Text style={styles.coffeebeanstext}>  Coffee Beans</Text>

        <FlatList horizontal data={BeanList} keyExtractor={item => item.id} contentContainerStyle={styles.FlatListContainer} showsHorizontalScrollIndicator={false} 
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
                onPress={()=>  navigation.push('Details', {
                  index: item.index,
                  id: item.id,
                  type: item.type,
                })}
              >
            <CoffeeCard
              id={item.id}
              index={item.index}
              type={item.type}
              roasted={item.roasted}

              imagelink_square={item.imagelink_square}
              name={item.name}
              special_ingredient={item.special_ingredient}
              average_rating={item.average_rating}
              price={item.prices[2]}
              buttonPressHandler={CoffeeCardAddToCart} />
              </TouchableOpacity>
          )
        }} />




      </ScrollView>
    </View>
  )
}



const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  screenTitle: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
    paddingTop: SPACING.space_30,
    marginTop: SPACING.space_20,
    paddingLeft: SPACING.space_10
  },

  textinput: {
    height: SPACING.space_20 * 2,
    color: COLORS.primaryWhiteHex,

  },
  inputContainer: {
    flexDirection: 'row',
    margin: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
  },
  searchicon: {
    marginHorizontal: SPACING.space_18
  },
  CategoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  EmptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 3.6,
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  coffeebeanstext: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  }
})
export default HomeScreen

function setCategoryIndex(arg0: { index: number; category: any; }) {
  throw new Error('Function not implemented.');
}
