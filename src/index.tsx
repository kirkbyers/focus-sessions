import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props { }

const EXComponent: React.SFC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Hello World
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    textAlign: 'center'
  }
});

export default EXComponent;