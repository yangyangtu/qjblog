<template>
    <div class='articel-list'>
        <el-table
            :data="dataList"
            style="width: 100%">
            <el-table-column
                prop="title"
                label="文章标题">
            </el-table-column>
            <el-table-column
                prop="name"
                label="作者">
            </el-table-column>
            <el-table-column
                prop="modiTime"
                label="更新时间">
                <template slot-scope="scope">
                    <span>{{DateFormate(new Date(scope.row.modiTime),'yyyy-mm-dd')}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="modiTime"
                label="发表时间"
                v-if='type!="draft"'>
                <template slot-scope="scope">
                    <span v-if='scope.row.publishTime'>{{DateFormate(new Date(scope.row.publishTime),'yyyy-mm-dd')}}</span>
                    <span v-else></span>
                </template>
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态"
                width='80'
                v-if='type!="draft"'>
                <template slot-scope="scope">
                    <span>{{scope.row.status==1?"已发表":"未发表"}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="categoryId"
                label="标签分类"
                v-if='type!="draft"'>
                <template slot-scope="scope">
                    <span>{{scope.row.categoryId||""}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="id"
                label="操作">
                <template slot-scope="scope">
                    <span class='publish' v-if='type != "draft" && scope.row.status==0'>发表</span>
                    <span class='edit' v-if='type == "draft"'>编辑</span>
                    <span class='tag-set'>标签设置</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import {DateFormater} from 'assets/js/commonFn'
export default {
    props:['dataList','type'],
    data(){
        return {}
    },
    methods:{
        DateFormate(date,ymd){
            return DateFormater(date,ymd)
        }
    }
    
}
</script>
<style lang='scss'>
.articel-list{
    .publish{
        color:#ccc;
    }
    .tag-set{
        color:#ccc;
    }
    .edit{
        color:#ccc;
    }
}
</style>
