import React, { useState, useMemo, useRef,RefObject } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  TouchableOpacity,
  ListRenderItemInfo,
  Animated as RNAnimated,
  Alert,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Lottery } from '../types';
import { colors } from '../colors';
import {
  LotteryListSortingOptions,
  useLotteriesSortingContext,
} from '../context/lotteries-sorting-context';
import { LotteriesNavigatorNavigationProp } from '../navigation/types';
import SearchInput from './SearchInput';

import Animated, {useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate, withTiming, Layout,SlideInRight,Extrapolate} from 'react-native-reanimated';
import { Swipeable } from 'react-native-gesture-handler';
import { SwipeableProps } from 'react-native-gesture-handler/lib/typescript/components/Swipeable';
import { RectButton } from 'react-native-gesture-handler';

interface ItemProps {
  item: Lottery;
  index: number;
  onPress: (id: string) => void;
  onDetailPress: (item: Lottery) => void;
  leftActionLabel: string;
  onLeftActionPressed: (item: Lottery, swipeable: RefObject<Swipeable>) => void;
  selected?: boolean;
  disabled?: boolean;
  registered?: boolean;
}

const LotteryListItem = ({
  item,
  index,
  onPress,
  onDetailPress,
  leftActionLabel,
  onLeftActionPressed,
  selected = false,
  disabled = false,
  registered = false,
}: ItemProps) => {
  const swipeable = useRef<Swipeable>(null);
  const background = disabled ? colors.grey : colors.secondary;

  const renderLeftActions: SwipeableProps['renderLeftActions'] = (
    _progress,
    dragX,
  ) => {
    const translation = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton
        style={styles.leftAction}
        onPress={() => onLeftActionPressed(item, swipeable)}
      >
        <RNAnimated.Text
          style={[
            styles.actionLabel,
            { transform: [{ translateX: translation }] },
          ]}
        >
          {leftActionLabel}
        </RNAnimated.Text>
      </RectButton>
    );
  };

  return (
    <Animated.View entering={SlideInRight.delay(50 * index)}>
      <Swipeable
        ref={swipeable}
        friction={2}
        renderLeftActions={renderLeftActions}
        leftThreshold={30}
      >
        <Pressable
          accessibilityRole="button"
          testID="lottery-item"
          style={[
            styles.container,
            {
              backgroundColor: registered ? colors.lightBlue : background,
              borderColor: selected
                ? colors.buttonSecondary
                : colors.borderColor,
            },
          ]}
          onPress={() => onPress(item.id)}
          disabled={disabled || registered}
          accessible={false}
        >
          <View style={styles.iconsContainer}>
            {item.status === 'running' && (
              <AntDesign name="sync" size={24} color="black" />
            )}
            {item.status == 'finished' && (
              <MaterialIcons name="done" size={24} color="black" />
            )}
          </View>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={
              () => onDetailPress(item)
              // navigation.navigate('LotteryDetails', { id: item.id })
            }
            accessible={true}
          >
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
          <Text style={styles.prize}>{item.prize}</Text>
          <Text style={styles.id}>{item.id}</Text>
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
};

type Props = {
  lotteries: Lottery[];
  loading: boolean;
  onPress: (id: string) => void;
  selectedLotteries: Array<string>;
  registeredLotteries: Array<string>;
  registered?: boolean;
};

const LotteryList = ({
  lotteries,
  loading,
  onPress,
  selectedLotteries,
  registeredLotteries,
}: Props) => {
  const [filter, setFilter] = useState('');
  const { width } = useWindowDimensions();
  const scrollY = useSharedValue(0);

  const scrollHandler= useAnimatedScrollHandler((event)=>{
    scrollY.value = withTiming(event.contentOffset.y,{duration:0});
  })

  const navigation = useNavigation<LotteriesNavigatorNavigationProp<'Home'>>();

  const { selectedSorting } = useLotteriesSortingContext();

  const animatedHeaderStyle=useAnimatedStyle(()=>({
    height:interpolate(scrollY.value,[0,200],[200,60],Extrapolate.CLAMP),
    opacity:interpolate(scrollY.value,[0,100],[1,0],Extrapolate.CLAMP),
    transform:[
      {
        scale:interpolate(
          scrollY.value,[0,200],[1,0,5],Extrapolate.CLAMP,
        ),
      },
    ],
  }));

  // const headerHeight = scrollY.interpolate({
  //   inputRange: [0, 200],
  //   outputRange: [200, 60],
  //   extrapolate: 'clamp',
  // });

  // const opacity = scrollY.interpolate({
  //   inputRange: [0, 100],
  //   outputRange: [1, 0],
  //   extrapolate: 'clamp',
  // });

  // const scale = scrollY.interpolate({
  //   inputRange: [0, 200],
  //   outputRange: [1, 0.5],
  //   extrapolate: 'clamp',
  // });

  const filteredLotteries = useMemo(
    () =>
      lotteries
        ?.filter((lottery) => lottery.name.includes(filter))
        .sort((a, b) =>
          selectedSorting === LotteryListSortingOptions.Ascending
            ? Number(a.prize) - Number(b.prize)
            : Number(b.prize) - Number(a.prize),
        ),
    [filter, lotteries, selectedSorting],
  );

  const toggleFavorite = (item: Lottery, swipeable: RefObject<Swipeable>) => {
    Alert.alert(`Adding lottery ${item.name} is not implemented`);
    swipeable.current?.close();
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<Lottery>) => (
    <LotteryListItem
      item={item}
      index={index}
      onPress={onPress}
      onDetailPress={(item) =>
        navigation.navigate('LotteryDetails', { id: item.id })
      }
      leftActionLabel="Favorite"
      onLeftActionPressed={toggleFavorite}
      selected={selectedLotteries?.includes(item.id)}
      registered={registeredLotteries?.includes(item.id)}
    />
  );

  const SearchNoResult = () => (
    <View>
      {lotteries.length !== 0 && filteredLotteries?.length === 0 && (
        <Text style={styles.text}> No search results for `{filter}`</Text>
      )}
      {lotteries.length === 0 && !loading && (
        <View style={styles.wrapper}>
          <MaterialIcons
            name="sentiment-very-dissatisfied"
            size={24}
            color="black"
          />
          <Text style={styles.text}>There are no lotteries currently</Text>
        </View>
      )}
    </View>
  );

  const Header = () => (
    <Animated.View style={[styles.header, animatedHeaderStyle]}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Lotteries</Text>
        <MaterialIcons name="casino" size={36} color="black" />
      </View>
      <SearchInput value={filter} onSearch={(val) => setFilter(val)} />
      <SearchNoResult />
    </Animated.View>
  );

  return (
    <>
      <Animated.FlatList
        data={filteredLotteries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{ width: width - 24 }}
        ListHeaderComponent={Header}
        onScroll={scrollHandler}
        itemLayoutAnimation={Layout.springify().damping(10)}
      />
    </>
  );
};
const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginBottom: 16,
    borderRadius: 4,
    padding: 16,
    borderWidth: 1,
  },
  iconsContainer: {
    alignSelf: 'flex-end',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  prize: {
    fontSize: 16,
    marginBottom: 8,
  },
  id: {
    fontSize: 16,
  },
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
    marginBottom: 16,
  },
  actionLabel: {
    color: 'white',
    padding: 10,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    marginTop: 16,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  titleText: {
    fontSize: 36,
    marginRight: 16,
  },
});

export default LotteryList;