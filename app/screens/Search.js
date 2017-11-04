import React,{Component} from 'react'
import {View,Text,StyleSheet,Alert,ActivityIndicator,ToastAndroid} from 'react-native'
import {Icon,SearchBar,List,ListItem} from 'react-native-elements'
import apis from '../config/apis'
import BookList from '../components/BookList'
const {searchBook,getBookList,getBookChapter} =apis;

export default class Search extends Component{
  constructor(props){
    super(props)
    this.state={
      searchText:'',
      searchResult:{result:[]},
      isLoading:false,
      searched:false
    }
  }
  _onChangeText(text){
    this.setState({
      searchText:text
    })
  }
  search(){
    this.setState({
      isLoading:true
    })
    let searchKey=this.state.searchText;
    searchBook(searchKey).then(res=>{
      this.setState({
        isLoading:false
      })

      if(res.success){
        this.setState({
          searchResult:res,
          searchText:''
        })
        ToastAndroid.show('搜索成功',1000);
      }else{
        Alert.alert('警告','搜索失败');
      }
      this.setState({
        searched:true
      })
    }).catch(e=>{
      Alert.alert('错误',e.message);
    })
  }
  render(){
    return (
      <View style={styles.container}>
        <SearchBar
          round
          lightTheme
          onChangeText={this._onChangeText.bind(this)}
          placeholder='输入书籍名...' 
          clearIcon={{ color: '#86939e', name: 'clear' }}
          onEndEditing={this.search.bind(this)}
          />
          <View style={{flex:1,backgroundColor:'#fff'}}>
           <Text style={{marginTop:10,marginLeft:10}}>搜索结果</Text>
            {this.state.isLoading&&<ActivityIndicator
            animating={this.state.isLoading}
            size="large"
            color="blue"
            style={{
              height:80,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 8,
            }}
            />}
            {
              this.state.searched&&this.state.searchResult.result.length==0?<Text style={{alignSelf:'center'}}>没有找到你要的小说.</Text>:
              <BookList books={this.state.searchResult.result} navigation={this.props.navigation} />
            }
          </View>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1
  }
})