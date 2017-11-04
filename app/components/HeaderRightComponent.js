import React,{Component} from 'react'
import {Text} from 'react-native'
import {Icon} from 'react-native-elements'
export default (props)=>{
  return <Icon name="search" underlayColor="#ccc" onPress={props.handleSearch}
  containerStyle={{borderRadius:30,padding:10}}
  />
}