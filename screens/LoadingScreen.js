import * as React from 'react';
import { Text, View,ActivityIndicator} from 'react-native';
import * as firebase from "firebase";

export default class LoadingScreen extends React.Component{
    componentDidMount(){
        this.checkIfLoggedin()
    }
    checkIfLoggedin=()=>{
    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            this.props.navigation.navigate('DashboardScreen')
        }
        else{
            this.props.navigation.navigate('LoginScreen')
        }
        
    })
    }
    
render(){
  return(
    <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
        <ActivityIndicator size="large"/>
      <Text>Loading Screen</Text>
    </View>
  )
}
}