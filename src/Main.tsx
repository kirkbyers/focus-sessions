import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props { }

class EXComponent extends React.Component<Props, {}> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Hello World
      </Text>
      </View>
    );
  }
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