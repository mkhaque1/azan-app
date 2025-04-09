import { View, Text, FlatList, Dimensions, Image } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';

const { width } = Dimensions.get('window');

type CarouselProps = {
  content: {
    id: string;
    type: string;
    content: string;
    reference?: string;
    icon?: any;
    background?: any;
  }[];
};

const Carousel = ({ content }: CarouselProps) => {
  const [index, setIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (content.length > 0) {
      const interval = setInterval(() => {
        const nextIndex = (index + 1) % content.length;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        setIndex(nextIndex);
      }, 5000); // Auto-slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [index, content]);

  const renderItem = ({ item }: any) => (
    <View
      className="w-full items-center justify-center p-5 rounded-2xl bg-white/10 border border-white/20 my-4"
      style={{
        width: width * 0.8,
      }}
    >
      {/* Optional Icon */}
      {item.icon && (
        <Image
          source={item.icon}
          style={{ width: 48, height: 48, marginBottom: 10 }}
          resizeMode="contain"
        />
      )}
      <Text className="text-amber-500 text-lg font-semibold mb-2">
        {item.type}
      </Text>
      <Text className="text-white text-base text-center leading-6">
        {item.content}
      </Text>
      {item.reference && (
        <Text className="text-white/60 text-sm mt-2">{item.reference}</Text>
      )}
    </View>
  );

  if (content.length === 0) {
    return (
      <View className="w-full items-center justify-center p-5">
        <Text className="text-white text-base">No content available</Text>
      </View>
    );
  }

  return (
    <View className="w-full">
      <FlatList
        data={content}
        ref={flatListRef}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(
            e.nativeEvent.contentOffset.x / (width * 0.8)
          );
          setIndex(newIndex);
        }}
        contentContainerStyle={{ paddingHorizontal: width * 0.1, gap: 15 }} // Center slides
      />
      {/* Dots */}
      <View className="flex-row justify-center mt-4">
        {content.map((_, i) => (
          <View
            key={i}
            className={`w-2.5 h-2.5 rounded-full mx-1 ${
              i === index ? 'bg-amber-500' : 'bg-white/30'
            }`}
          />
        ))}
      </View>
    </View>
  );
};

export default Carousel;
