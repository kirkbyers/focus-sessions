import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import NotesComponent from './note-pad/note-pad.container';
import { theme } from './constants/theme';

interface Props { }

interface State { }

class EXComponent extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <NotesComponent />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: theme.spacing * 2,
    paddingBottom: theme.spacing * 2,
    paddingLeft: theme.spacing / 2,
    paddingRight: theme.spacing / 2,
  },
  text: {
    textAlign: 'center'
  }
});

export default EXComponent;