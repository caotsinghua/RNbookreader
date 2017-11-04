import React,{Component} from 'react'
import {View,Text,StyleSheet,ScrollView,RefreshControl,ToolbarAndroid} from 'react-native'
import { List, ListItem,Icon ,Header} from 'react-native-elements'

import data from '../config/data.js'

class ListView extends Component{
  constructor(props){
    super(props)
    this.state={
      isRefreshing:false
    }
  }
  _onRefresh(){
    this.setState({
      isRefreshing:true
    })
    setTimeout(()=>{
      this.setState({
        isRefreshing:false
      })
    },3000)
  }
  addBook(){
    alert('添加图书')
  }
  toBookDetail(book){
    this.props.navigation.navigate('Detail',{book})
  }
 
  render(){
    return (
      <View style={styles.container}>
      
        <ScrollView style={styles.scrollContainer}
        refreshControl={
          <RefreshControl 
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh.bind(this)}
            colors={['red','blue','yellow']}
            enabled={true}
          />
        }
        >
          <List containerStyle={{borderTopWidth:0,marginTop:0,paddingTop:20}}>
            {
              data.books.map((book,index)=>{
                return <ListItem key={index} title={book.title} subtitle={book.author}
                rightTitle={book.updateTime}
                onPress={this.toBookDetail.bind(this,book)}
                underlayColor="#eee"
                containerStyle={{marginBottom:10,borderTopWidth:1,borderTopColor:'#eee'}}
                />
              })
            }
          </List>
        </ScrollView>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    // backgroundColor:'blue'
  },
  scrollContainer:{
    flex:1,
    backgroundColor:"#fff"
  },
  toolbar:{
    backgroundColor:"#fff",
    height:56,
  }
})

export default ListView;