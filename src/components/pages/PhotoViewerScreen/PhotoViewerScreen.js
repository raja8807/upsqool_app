import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PhotoViewerScreenPage = () => {
  return (
    <View style={styles.container}>
      <Text>PhotoViewerScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default PhotoViewerScreenPage;
