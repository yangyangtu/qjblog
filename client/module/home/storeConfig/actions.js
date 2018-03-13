import Vue from 'vue'

export const getTableList = ({commit,state})=>{
    let postData = state.filterContent;
    return Vue.$http({
        url:'/home/ajax-get-article-list',
        method:'post',
        data:postData
    }).then((res)=>{
        let data = res.data;
        commit('setTableList',data.data)
        
        return data
    })
}
//获取右侧时间数据
export const getDateList = ({commit})=>{
    let t = this;
    Vue.$http({
        url:'/home/ajax-get-dateMonth-list',
        method:'post'
    }).then((res)=>{
        let data = res.data;
        commit('setDateList',data.data)
        return data
    })
}
export const updateFilterContent = ({commit,dispatch},filter)=>{
    console.log(filter)
    //更新filterContent
    commit('updateFilterContent',filter)
    //重新请求数据
    dispatch('getTableList')
    
}