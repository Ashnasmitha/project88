import * as React from 'react';
import {StyleSheet} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import CreateStory from '../screens/CreateStory';
import Feed from '../screens/Feed';
import * as firebase from 'firebase';


const Tab=createMaterialBottomTabNavigator()

export default class BottomTabNavigator extends React.Component{
  constructor(props){
    super(props);
    this.state={
      light_theme: true,
      isUpdated: false
    }
  }

  componentDidMount() {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", function(snapshot) {
        theme = snapshot.val().current_theme;
      });
    this.setState({ light_theme: theme === "light" ? true : false });
  }
changeUpdated=()=>{
  this.setState({isUpdated:true})
}
removeUpdated=()=>{
  this.setState({isUpdated:false})
}
renderFeed=(props)=>{
  return <Feed setUpdateToFalse={this.removeUpdated}{...props}/>
}
renderStory=(props)=>{
  return <CreateStory setUpdateToTrue={this.changeUpdated}{...props}/>

}
  render(){
  return(
    <Tab.Navigator 
    labeled={false}
    barStyle={
      this.state.light_theme?
      styles.bottomTabStyleLight
      :styles.bottomTabStyleLight
    }
    screenOptions={({route})=>({
      tabBarIcon:({focused,color,size})=>{
        let iconName;
        if(route.name === 'Feed'){
          iconName=focused ?
          'home':'home-outline';
        }
        else if(route.name === 'CreateStory'){
          iconName=focused ?
          'add-circle':'add-circle-outline';
        }
        return 
        <Ionicons 
        name={iconName}
        size={size}
        color={color}
        style={{width:30}}
        />
      }
    })}
    tabBarOptions={{activeTintColor:'black',inactiveTintColor:'grey'}}
    >
    <Tab.Screen name='Feed' component={this.renderFeed} options={{ unmountOnBlur: true }}/>
    <Tab.Screen name='CreateStory' component={this.renderStory} options={{ unmountOnBlur: true }}/>
    </Tab.Navigator>
  )}
}


const styles=StyleSheet.create({
  bottomTabStyle:{
    backgroundColor:'#2f345d',
    height:'8%',
    borderTopRightRadius:30,
    borderBottomLeftRadius:30,
    overflow:'hidden',
    position:'absolute'
  },
  bottomTabStyleLight: {
    backgroundColor: "#eaeaea",
    height: "8%",
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
    overflow: "hidden",
    position: "absolute"
  },
  icons:{
    width:RFValue(30),
    height:RFValue(30)
  }
})