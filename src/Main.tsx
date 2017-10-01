import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import NotesComponent from './note-pad/note-pad.container';
import ButtonBarComponent from './button-bar/button-bar.component';
import { theme } from './constants/theme';
import endFocusNotification from './notifications/end-focus';

interface Props { }

interface State {
  focusInterval: Number;
  breakInterval: Number;
  breakPlusInterval: Number;
  currentIntervalValue: Number;
  currentInterval: Number;
}

class EXComponent extends React.Component<Props, State> {
  state = {
    focusInterval: 50,
    breakInterval: 10,
    breakPlusInterval: 25,
    currentIntervalValue: 0,
    initIntervalValue: 0,
    currentInterval: 0
  }

  handleFocusClick = () => {
    this.setInterval(this.state.focusInterval);
  }
  handleBreakClick = () => {
    this.setInterval(this.state.breakInterval);
  }
  handleBreakPlusClick = () => {
    this.setInterval(this.state.breakPlusInterval);
  }

  setInterval = (value: number) => {
    this.setState(() => ({
      currentIntervalValue: value,
      initIntervalValue: value,
      currentInterval: setInterval(() => {
        if (this.state.currentIntervalValue > 0) {
          this.setState((prevState: State) => ({ currentIntervalValue: Number(prevState.currentIntervalValue) - 1 }));
        } else {
          clearInterval(this.state.currentInterval);
          endFocusNotification();
        }
      }, 60000)
    }));
  }

  handleCancelSession = () => {
    clearInterval(this.state.currentInterval);
    this.setState((prevState: State) => ({ currentIntervalValue: 0 }));
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.currentIntervalValue === 0 && <ButtonBarComponent
          pressFocusHandler={this.handleFocusClick}
          pressBreakHandler={this.handleBreakClick}
          pressBreakPlusHandler={this.handleBreakPlusClick}
        />}
        <NotesComponent />
        {this.state.currentInterval !== 0 && (
          <Button title="Cancel Session" onPress={this.handleCancelSession} />
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: theme.spacing * 2,
    paddingBottom: theme.spacing * 3,
    paddingLeft: theme.spacing / 2,
    paddingRight: theme.spacing / 2,
  },
  text: {
    textAlign: 'center'
  }
});

export default EXComponent;