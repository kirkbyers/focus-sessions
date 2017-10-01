import * as React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  GestureResponderEvent,
  TouchableWithoutFeedback
} from 'react-native'

interface ComponentProps { }

interface ComponentState {
  notes: string;
  touch: number;
  node: any;
}

class ComponentName extends React.Component<ComponentProps, ComponentState> {
  state = {
    notes: '',
    touch: 0,
    node: {}
  }

  handleTextChange = (text: string) => {
    this.setState({ notes: text });
  }

  handleTouch = (event: GestureResponderEvent) => {
    if (this.state.touch > 0 || event.nativeEvent.touches.length > 1) {
      Keyboard.dismiss()
    }
    this.setState((prevState: ComponentState) => ({
      touch: prevState.touch + 1
    }));
    setTimeout(() => {
      this.setState((prevState: ComponentState) => ({
        touch: prevState.touch - 1
      }));
    }, 500);

  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="Notes to come back to after focus session"
          value={this.state.notes}
          onChangeText={this.handleTextChange}
          style={styles.textInput}
          multiline={true}
          onTouchStart={this.handleTouch}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: '100%',
  }
});

export default ComponentName;