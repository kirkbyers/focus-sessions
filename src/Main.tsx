import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
    currentInterval: 0
  }

  handleFocusClick = () => {
    this.setState((prevState: State) => ({ currentIntervalValue: prevState.focusInterval }));
    this.setInterval();
  }
  handleBreakClick = () => {
    this.setState((prevState: State) => ({ currentIntervalValue: prevState.breakInterval }));
    this.setInterval();
  }
  handleBreakPlusClick = () => {
    this.setState((prevState: State) => ({ currentIntervalValue: prevState.breakPlusInterval }));
    this.setInterval();
  }

  setInterval = () => {
    this.setState(() => ({
      currentInterval: setInterval(() => {
        if (this.state.currentIntervalValue > 0) {
          this.setState((prevState: State) => ({ currentIntervalValue: Number(prevState.currentIntervalValue) - 1 }));
        } else {
          clearInterval(this.state.currentInterval);
          endFocusNotification();
        }
      }, 200)
    }));
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