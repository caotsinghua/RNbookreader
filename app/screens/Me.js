import React,{Component} from 'react'
import {View,Text,StyleSheet,Image,TouchableHighlight} from 'react-native'
import {Icon,Avatar,List,ListItem} from 'react-native-elements'
export default class Me extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.banner}>
          <Image source={require('../resources/images/timg.jpeg')} style={styles.poster} resizeMode="cover"/>
          <View style={styles.userInfo}>
            <Avatar
              large
              rounded
              source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"}}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
            />
            <TouchableHighlight>
              <Text style={{color:"#fff"}}>未登录</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.menu}>
          <List>
            <ListItem leftIcon={{name:'brightness-3'}} title="夜间模式" 
            hideChevron
            switchThumbTintColor="#ccc"
            switchOnTintColor="#ccc"
            switchTintColor="#eee"
            onSwitch={()=>{console.log('moon')}}
            switchButton={true}
            />
            <ListItem leftIcon={{name:'settings'}} title="其他设置" />
            <ListItem leftIcon={{name:'insert-comment'}} title="用户反馈" />
          </List>
        </View>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  },
  banner:{
    height:180,
    position:'relative'
  },
  poster:{
    position:'absolute',
    left:0,
    top:0,
    right:0,
    bottom:0,
    height:180
  },
  userInfo:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }

})