
const apis={
  searchBook:async (searchKey)=>{
    const api=`http://book.tssword.xin/api/book/search?searchKey=${searchKey}`;
    let res=await fetch(api);
    let json=null;
    if(res.ok){
      json=await res.json();
      return json;
    }else{
      throw new Error('请求网络失败')
    }
  },
  getBookList:async (bookId)=>{
    const api=`http://book.tssword.xin/api/book/${bookId}`;
    let res=await fetch(api);
    let json=null;
    if(res.ok){
      json=await res.json();
      return json;
    }else{
      throw new Error('请求网络失败')
    }
  },
  getBookChapter:async (bookId,chaperId)=>{
    const api=`http://book.tssword.xin/api/book/${bookId}/${chapterId}`;
    let res=await fetch(api);
    let json=null;
    if(res.ok){
      json=await res.json();
      return json;
    }else{
      throw new Error('请求网络失败')
    }
  }
}

export default apis;