import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageProps,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';

import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';
import GradientBgIcon from './GradientBgIcon';

interface ImageBackgroundInfoProps {
    EnableBackHandler: boolean;
    imagelink_portrait: ImageProps;
    type: string;
    id: string;
    favourite: boolean;
    name: string;
    special_ingredient: string;
    ingredients: string;
    average_rating: number;
    ratings_count: string;
    roasted: string;
    BackHandler?: any;
    ToggleFavourite: any;
}

const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
    EnableBackHandler,
    imagelink_portrait,
    type,
    id,
    favourite,
    name,
    special_ingredient,
    ingredients,
    average_rating,
    ratings_count,
    roasted,
    BackHandler,
    ToggleFavourite,
}) => {
    return (
        <View>
            <ImageBackground
                source={imagelink_portrait}
                style={styles.ItemBackgroundImage}>
                {
                    EnableBackHandler ?
                        <View style={styles.ImageHeaderBarContainerWithBack}>
                            <TouchableOpacity onPress={() => BackHandler()}>
                                <GradientBgIcon name="left" color={COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <GradientBgIcon name="like" color={COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} />
                            </TouchableOpacity>

                        </View>
                        :
                        <View style={styles.ImageHeaderBarContainerWithBack}>

                            <TouchableOpacity>
                                <Text style={{ color: COLORS.primaryWhiteHex }}> Favorite</Text>
                            </TouchableOpacity>

                        </View>

                }

                <View style={styles.ImageInfoOuterContainer}>
                    <View style={styles.ImageInfoInnerContainer}>
                        <View style={styles.InfoContainerRow}>
                            <View>
                                <Text style={{ color: COLORS.primaryWhiteHex, fontSize: FONTSIZE.size_18, fontFamily: FONTFAMILY.poppins_semibold }}>{name}</Text>
                                <Text style={{ color: COLORS.primaryWhiteHex, fontSize: FONTSIZE.size_18 }}>{special_ingredient}</Text>
                            </View>
                            <View style={styles.ItemPropertiesContainer}>
                                <View style={styles.ProperFirst}>
                                    <CustomIcon name={type == 'Bean' ? 'bean' : 'beans'}
                                        size={type == 'Bean' ? FONTSIZE.size_18 : FONTSIZE.size_24}
                                        color={COLORS.primaryOrangeHex} />
                                    <Text style={styles.PropertyTextFirst}>{type}</Text>

                                </View>
                                <View style={styles.ProperFirst}>
                                    <CustomIcon
                                        name={type == 'Bean' ? 'location' : 'drop'}
                                        size={FONTSIZE.size_16}
                                        color={COLORS.primaryOrangeHex}
                                    />
                                    <Text style={styles.PropertyTextLast}>{ingredients}</Text>
                                </View>

                            </View>



                        </View>
                        <View style={styles.InfoContainerRow} >
                            <View style={{display:'flex',flexDirection:'row'}}>
                            <CustomIcon name="star" size={FONTSIZE.size_18} color={COLORS.primaryOrangeHex}
                            />
                            <Text style={{ color: COLORS.primaryWhiteHex, fontSize: FONTSIZE.size_16,marginLeft:SPACING.space_8,marginRight:SPACING.space_8 }}> {average_rating}</Text>
                            <Text style={{ color: COLORS.primaryLightGreyHex, fontSize: FONTSIZE.size_16 }}> {`(${ratings_count})`}</Text>
                          </View>
                          <View style={styles.RoastedContainer}>
                            <Text style={{color:COLORS.primaryLightGreyHex,fontSize:FONTSIZE.size_12}}>{roasted}</Text>


                          </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    ItemBackgroundImage: {
        width: '100%',
        aspectRatio: 20 / 25,
        justifyContent: 'space-between',
    },
    ImageHeaderBarContainerWithBack: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ImageHeaderBarContainerWithoutBack: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    ImageInfoOuterContainer: {
        paddingVertical: SPACING.space_24,
        paddingHorizontal: SPACING.space_30,
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopLeftRadius: BORDERRADIUS.radius_20 * 2,
        borderTopRightRadius: BORDERRADIUS.radius_20 * 2,
    },
    ImageInfoInnerContainer: {
        justifyContent: 'space-between',
        gap: SPACING.space_15,
    },
    InfoContainerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ItemTitleText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_24,
        color: COLORS.primaryWhiteHex,
    },
    ItemSubtitleText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryWhiteHex,
    },
    ItemPropertiesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.space_20,
    },
    ProperFirst: {
        height: 55,
        width: 55,
        borderRadius: BORDERRADIUS.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryBlackHex,
    },
    RoastedContainer:{
        
        width: 40,
        borderRadius: BORDERRADIUS.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryBlackHex,
    },
    PropertyTextFirst: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex,
    },
    PropertyTextLast: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex,
        marginTop: SPACING.space_2 + SPACING.space_4,
    },
    RatingContainer: {
        flexDirection: 'row',
        gap: SPACING.space_10,
        alignItems: 'center',
    },
    RatingText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
    },
    RatingCountText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryWhiteHex,
    },
    RoastedContainer: {
        height: 55,
        width: 55 * 2 + SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryBlackHex,
    },
    RoastedText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex,
    },
});

export default ImageBackgroundInfo;