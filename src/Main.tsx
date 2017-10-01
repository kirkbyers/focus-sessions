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

class MainComponent extends React.Component<Props, State> {
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
    const sessionCompleteRatio = (this.state.initIntervalValue - this.state.currentIntervalValue) / this.state.initIntervalValue;
    return (
      <View style={styles.root}>
        {this.state.initIntervalValue !== 0 && <View style={{ backgroundColor: '#FFF1B8', flex: 100 * sessionCompleteRatio }} />}
        {this.state.initIntervalValue !== 0 && <View style={{ backgroundColor: '#f58db6', flex: 100 - (100 * sessionCompleteRatio) }} />}
        {this.state.currentIntervalValue === 0 && <View style={{ backgroundColor: '#FFF1B8', flex: 1 }} />}
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
      </View>
    );
  }
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: 'column',
    paddingTop: theme.spacing * 2,
    paddingBottom: theme.spacing * 3,
    paddingLeft: theme.spacing / 2,
    paddingRight: theme.spacing / 2
  },
  text: {
    textAlign: 'center'
  }
});

export default MainComponent;