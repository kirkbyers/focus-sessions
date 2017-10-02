import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import NotesComponent from './note-pad/note-pad.container';
import ButtonBarComponent from './button-bar/button-bar.component';
import { theme } from './constants/theme';
import endFocusNotification from './notifications/end-focus';

interface Props { }

interface State {
  focusInterval: number;
  breakInterval: number;
  breakPlusInterval: number;
  intervalTargetTime: number;
  intervalTargetValue: number;
  currentIntervalValue: number;
  currentInterval: number;
}

const initState = (): State => ({
  focusInterval: 50, // in min
  breakInterval: 10, // in min
  breakPlusInterval: 25, // in min
  currentIntervalValue: 0, // Min till end
  intervalTargetTime: 0, // Epoch Time/Date In min
  intervalTargetValue: 0, // Total time pass In min
  currentInterval: 0 // Cancelable Interval
})

class MainComponent extends React.Component<Props, State> {
  state = initState();

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
    const now = new Date();
    this.setState((prevState: State): Partial<State> => ({
      currentIntervalValue: 0,
      intervalTargetTime: (value) + (now.getTime() / 60000),
      intervalTargetValue: value,
      currentInterval: setInterval(() => {
        const now = new Date();
        const timeDiff = this.state.intervalTargetTime - (now.getTime() / 60000); // Time till end
        if (timeDiff > 0) {
          this.setState((prevState: State) => ({
            currentIntervalValue: Math.ceil(timeDiff)
          }));
        } else {
          clearInterval(this.state.currentInterval);
          endFocusNotification();
        }
      }, 1000)
    }));
  }

  handleCancelSession = () => {
    clearInterval(this.state.currentInterval);
    this.setState((prevState: State) => (initState()));
  }

  render() {
    return (
      <View style={styles.root}>
        <View style={{ backgroundColor: '#FFF1B8', flex: Math.floor(100 * ((this.state.intervalTargetValue - this.state.currentIntervalValue) / this.state.intervalTargetValue)) }} />
        <View style={{ backgroundColor: '#f58db6', flex: Math.floor(100 - 100 * ((this.state.intervalTargetValue - this.state.currentIntervalValue) / this.state.intervalTargetValue)) }} />
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