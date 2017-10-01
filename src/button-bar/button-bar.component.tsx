import * as React from 'react';
import { View, Button, StyleSheet } from 'react-native';

interface Props {
  hidden: boolean;
  pressFocusHandler(): void;
  pressBreakHandler(): void;
  pressBreakPlusHandler(): void;
}

const ComponentName: React.SFC<Props> = (props) => {
  const { hidden, pressFocusHandler, pressBreakHandler, pressBreakPlusHandler } = props;
  return (
    <View style={hidden && styles.hidden || styles.container}>
      <Button title="Focus" onPress={pressFocusHandler} />
      <Button title="Break" onPress={pressBreakHandler} />
      <Button title="Break +" onPress={pressBreakPlusHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  hidden: {
    backfaceVisibility: 'hidden'
  }
})

export default ComponentName;