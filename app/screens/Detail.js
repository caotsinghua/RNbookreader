import React,{Component} from 'react'
import {ScrollView,View,Text,StyleSheet,RefreshControl,Image,Alert,ActivityIndicator} from 'react-native'
import {Icon,Card,Button,List,ListItem} from 'react-native-elements'
import apis from '../config/apis'
const {getBookList}=apis;
const pageNum=20;//每页显示20章 
export default class Detail extends Component{
  constructor(props){
    super(props)
    this.state={
      isRefreshing:false,
      bookDetail:{
        title:'加载中...',
        author:'加载中...',
        chapters:[],
        chapterNum:0,
        poster:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2580763096,6056626&fm=27&gp=0.jpg',
        id:'加载中...',
        des:'暂无简介',
        updateTime:'加载中...'
      },
      currentPage:0
    }
  }
  componentWillMount ()  {
    
    this.getBookInfo();
  }
  getBookInfo(){
    let bookInfo=this.props.navigation.state.params.book;
    this.setState({
      isRefreshing:true
    })
    getBookList(bookInfo.id).then(res=>{
      this.setState({
        isRefreshing:false
      })
      if(res.success){
        this.setState({
          bookDetail:{
            title:res.bookName,
            author:res.author,
            chapters:res.chapters,
            chapterNum:res.num,
            poster:res.poster,
            id:res.bookId,
            des:'暂无简介',
            updateTime:bookInfo.updateTime
          }
        })
      }else{
        Alert.alert('错误','此书不存在');
      }
    }).catch(e=>{
      Alert.alert('错误',e.message);
    })
  }
  _onRefresh(){
    this.getBookInfo();
  }
  prevChapter(){
    let cur=this.state.currentPage;
    if(cur-pageNum>=0){
      this.setState({
        currentPage:cur-pageNum
      })
    }else{
      Alert.alert('错误','不能翻页')
    }
  }
  nextChapter(){
    let cur=this.state.currentPage;
    if(cur+pageNum<=this.state.bookDetail.chapterNum){
      this.setState({
        currentPage:cur+pageNum
      })
    }else{
      Alert.alert('错误','不能翻页')
    }
  }
  render(){
    const bookDetail=this.state.bookDetail;
    return (
      <ScrollView style={styles.container}
      refreshControl={
        <RefreshControl 
          refreshing={this.state.isRefreshing}
          onRefresh={this._onRefresh.bind(this)}
          colors={['red','blue','yellow']}
          enabled={true}
        />
      }
      >
        <Card title={bookDetail.title} >
          <View style={styles.cardContent}>
              <Image style={styles.poster} resizeMode="cover" source={{uri:bookDetail.poster}}/>
              <View style={styles.bookInfo}>
                <Text style={styles.bookInfoText1}>书名:{bookDetail.title}</Text>
                <Text style={styles.bookInfoText2}>作者:{bookDetail.author}</Text>
                <Text style={styles.bookInfoText3}>最近更新:{bookDetail.updateTime}</Text>
              </View>
          </View>
          <View style={{paddingTop:20,paddingBottom:20,borderBottomColor:'#eee',borderBottomWidth:1}}>
            <Text>书籍简介：</Text>
            <Text style={styles.bookDes}>{bookDetail.des}</Text>
          </View>
          <View style={{
            flexDirection:'row',
            paddingTop:20,
            alignContent:'space-between'
          }}>
            <Button
            containerViewStyle={{marginLeft:0,flex:1}}
            icon={{name:'add'}}
            backgroundColor="crimson"
            title="加入书架"/>
            <Button 
            containerViewStyle={{flex:1,marginRight:0}}
            backgroundColor="crimson"
            icon={{name:'search'}} title="开始阅读"/>
          </View>
        </Card>
        <Card title="目录" containerStyle={{marginBottom:20}}>
          <List containerStyle={{marginTop:0}}>
            {
              bookDetail.chapters.slice(this.state.currentPage,this.state.currentPage+pageNum).map((chapter,index)=>{
                let title_arr=chapter.title.split(' ');
                return <ListItem 
                key={index}
                underlayColor="#eee"
                subtitle={title_arr[0]}
                title={title_arr[1]}
                onPress={()=>{
                  this.props.navigation.navigate('Chapter',{bookId:bookDetail.id,chapterId:chapter.id})
                }}
                />
              })
            }
          </List>
          <View
          style={{
            flexDirection:'row',
            justifyContent:'space-between',
            marginTop:20,
          }}
          >
            <Button 
            containerViewStyle={{marginLeft:0,flex:1}}
            disabled={this.state.currentPage==0?true:false}
            onPress={this.prevChapter.bind(this)}
            backgroundColor="darkseagreen" raised icon={{name: 'chevron-left'}} title="上一页"/>
            <Button 
            containerViewStyle={{marginRight:0,flex:1}}
            onPress={this.nextChapter.bind(this)}
            disabled={this.state.currentPage+pageNum>=this.state.bookDetail.chapterNum?true:false}
            backgroundColor="darkseagreen" raised icon={{name: 'chevron-right'}} title="下一页"/>
          </View>
        </Card>
      </ScrollView>
    )
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1
  },
  cardContent:{
    height:170,
    display:'flex',
    flexDirection:'row',
    borderBottomWidth:1,
    borderBottomColor:'#eee'
  },
  poster:{
    width:120,
    height:160
  },
  bookInfo:{
    height:160,
    marginLeft:20,
    display:'flex',
    justifyContent:'space-around'
  },
  bookInfoText1:{
    fontSize:18,
    color:'#000'
  },
  bookInfoText2:{
    fontSize:18,
    color:'coral'
  },
  bookDes:{
    color:'#000'
  }
})