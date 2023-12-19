import React from 'react';
import { View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageViewer from 'react-native-image-zoom-viewer';
import COLORS from '../../components/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Mapa = () => {
  const images = [{
    props: {
      // Or you can set source directory.
      source: require('../../assets/Mapa.jpg')
    }
  }];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1 }}>
        <ImageViewer 
          imageUrls={images}
          backgroundColor={COLORS.white}
          style={{ width: windowWidth, height: windowHeight, marginTop: -170}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Mapa;


