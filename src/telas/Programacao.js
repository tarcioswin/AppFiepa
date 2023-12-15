import React from 'react';
import { View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageViewer from 'react-native-image-zoom-viewer';
import COLORS from '../../components/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Programacao = () => {
  const images = [{
    url: '',
    props: {
      // Or you can set source directory.
      source: require('../../assets/Programacao.png')
    }
  }];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1 }}>
        <ImageViewer 
          imageUrls={images}
          backgroundColor={COLORS.white}
          style={{ width: windowWidth, height: windowHeight, marginTop: -160}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Programacao;
