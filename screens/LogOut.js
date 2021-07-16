import * as React from 'react';
import { Text, View,StyleSheet} from 'react-native';
import * as firebase from 'firebase';

export default class LogOut extends React.Component{
    componentDidMount(){
        firebase.auth().signOut()
    }

    render(){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>Log Out</Text>
            </View>
        )
    }
    
}
