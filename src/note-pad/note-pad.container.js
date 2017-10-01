import * as React from 'react';
import { View, TextInput, StyleSheet, Keyboard } from 'react-native';
class ComponentName extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            notes: '',
            touch: 0,
            node: {}
        };
        this.handleTextChange = (text) => {
            this.setState({ notes: text });
        };
        this.handleTouch = (event) => {
            if (this.state.touch > 0 || event.nativeEvent.touches.length > 1) {
                Keyboard.dismiss();
            }
            this.setState((prevState) => ({
                touch: prevState.touch + 1
            }));
            setTimeout(() => {
                this.setState((prevState) => ({
                    touch: prevState.touch - 1
                }));
            }, 500);
        };
    }
    render() {
        return (<View>
        <TextInput placeholder="Notes to come back to after focus session" value={this.state.notes} onChangeText={this.handleTextChange} style={styles.textInput} multiline={true} onTouchStart={this.handleTouch}/>
      </View>);
    }
}
const styles = StyleSheet.create({
    textInput: {
        height: '100%',
    }
});
export default ComponentName;
//# sourceMappingURL=note-pad.container.js.map