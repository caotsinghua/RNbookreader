import React,{Component} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import {Icon} from 'react-native-elements'
export default class Me extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <View style={styles.container}>
        <Text>this is Me</Text>
        <Icon name="person" size={50} />
        <View>
          <Icon name="add" size={50} raised={true} />
        </View>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center'
  }
})