<template>
    <div class="monitor">
        <!-- 图标 -->
        <el-row :gutter="20" class="monitor-header">
            <el-col :xs="24" :sm="24" :md="14" :lg="18" :xl="18">
                <el-row class="monitor-cart-box" :gutter="20">
                    <el-col :span="24">
                        <div class="monitor-cart-name">
                            <div class="monitor-cart-name-left">
                                <div class="monitor-cart-name-left-icon">
                                    <Count class="monitor-cart-name-left-icon-s" />
                                </div>
                                统计数据
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="6">
                        <Monitorcar name='日期跨度天数' :number='782' color='rgb(255, 163, 51)' icon='ViewsSvg' />
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="6">
                        <Monitorcar name='公文数' :number='1335' color='rgb(174, 215, 91)' icon='OrderSvg' />
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="6">
                        <Monitorcar name='用户数' :number='1' color='rgb(65, 171, 211)' icon='RegistrationSvg' />
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <!-- 图标二 -->
        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="13" :lg="17" :xl="17">
                <el-row class="monitor-header-three" :gutter="20">
                    <el-col :span="24">
                        <div class="monitor-cart-name">
                            <div class="monitor-cart-name-left">
                                <div class="monitor-cart-name-left-icon">
                                    <Visitors class="monitor-cart-name-left-icon-s" />
                                </div>
                                业务公文统计
                            </div>
                            
                        </div>
                    </el-col>
                    <el-col :span="24">
                       <div class="monitor-visitors monitor-visitors-scale">
                            <div class="monitor-visitors-left">
                                <ve-ring :data="scaleData_two" :colors="colors_two"></ve-ring>
                            </div>
                            <div class="monitor-visitors-right">
                                <div class="monitor-visitors-right-list" v-for="(item,index) in colors_two" :key="index">
                                    <CircleSvg class="monitor-visitors-right-list-icon" :style="{color: item}"></CircleSvg>
                                    <div class="monitor-visitors-right-list-name">{{scaleData_two.rows[index]['类目']}}</div>
                                    <div class="monitor-visitors-right-list-number"> {{scaleData_two.rows[index]['数量']}}</div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="monitor-header-two" :gutter="20">
                    <el-col :span="24">
                        <div class="monitor-cart-name">
                            <div class="monitor-cart-name-left">
                                <div class="monitor-cart-name-left-icon">
                                    <Visitors class="monitor-cart-name-left-icon-s" />
                                </div>
                                通用公文统计
                            </div>
                            
                        </div>
                    </el-col>
                    <el-col :span="24">
                        <div class="monitor-visitors monitor-visitors-scale">
                            <div class="monitor-visitors-left">
                                <ve-ring :data="scaleData" :colors="colors"></ve-ring>
                            </div>
                            <div class="monitor-visitors-right">
                                <div class="monitor-visitors-right-list" v-for="(item,index) in colors" :key="index">
                                    <CircleSvg class="monitor-visitors-right-list-icon" :style="{color: item}"></CircleSvg>
                                    <div class="monitor-visitors-right-list-name">{{scaleData.rows[index]['类目']}}</div>
                                    <div class="monitor-visitors-right-list-number"> {{scaleData.rows[index]['数量']}}</div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-col> 
        </el-row>       
    </div>
</template>

<script>
import Monitorcar from '../../components/analyze/monitorcar'
import Count from '../../assets/icon/count.svg'
import Visitors from '../../assets/icon/visitors.svg'
import CircleSvg from '../../assets/icon/circle.svg'
import HerdSvg from '../../assets/icon/herd.svg'
import CryingSvg from '../../assets/icon/crying.svg'
import LaughSvg from '../../assets/icon/laugh.svg'

import countTo from 'vue-count-to';
export default {
    data(){
        return {
            value1:'',
            config:{
                shape: 'roundRect'
            },
            
            colors : ['#F141AF','#F85E1F', '#9830FA', '#0C99FD', '#25D9B4','#1AA2FC','#FFA500','#B8868B','#FF4500','#F0E68C'],
            colors_two : ['#F141AF','#F85E1F', '#9830FA', '#0C99FD', '#25D9B4','#1AA2FC','#FFA500','#B8868B','#FF4500','#F0E68C', '#FF00FF','#FFC0CB'],
            scaleData: {
                columns: ['类目', '数量'],
                rows: [
                    { '类目': '报告', '数量': 1 },
                    { '类目': '公告', '数量': 62 },
                    { '类目': '函', '数量': 65 },
                    { '类目': '决定', '数量': 45 },
                    { '类目': '命令', '数量': 61 },
                    { '类目': '批复', '数量': 130 },
                    { '类目': '通报', '数量': 10 },
                    { '类目': '通告', '数量': 43 },
                    { '类目': '通知', '数量': 804 },
                    { '类目': '意见', '数量': 114 },
                ]
            },
            scaleData_two: {
                columns: ['类目', '数量'],
                rows: [
                    { '类目': '安全-核安全', '数量': 397 },
                    { '类目': '安全-社会安全', '数量': 28 },
                    { '类目': '安全-网络安全', '数量': 35 },
                    { '类目': '军事-军事批复', '数量': 116 },
                    { '类目': '军事-人事任命', '数量': 9 },
                    { '类目': '军事-战功命令', '数量': 59 },
                    { '类目': '军事-征兵通知', '数量': 7 },
                    { '类目': '科技-创新改革', '数量': 198 },
                    { '类目': '科技-国防科技', '数量': 29 },
                    { '类目': '科技-航空探月', '数量': 3 },
                    { '类目': '科技-新能源', '数量': 40 },
                    { '类目': '政府类型公文', '数量': 414 },
                ]
            },
        }
    },
    components:{
        Monitorcar,
        Count,
        Visitors,
        CircleSvg,
        countTo,
        HerdSvg,
        CryingSvg,
        LaughSvg
    }
}
</script>

<style scoped>
.monitor{
    background: #F5F7F9;
    padding: 25px;
    box-sizing: border-box;
    width: 100%;
    min-height: 100%;
}
.monitor-header{
    border: 1px solid #E6E6E6;
    background: #ffffff;
    border-radius: 5px;
    margin-bottom: 20px;
    width: 100%;
}
.monitor-header-two{
    border: 1px solid #E6E6E6;
    background: #ffffff;
    border-radius: 5px;
    margin-bottom: 20px;
    width: 100%;
    height: 500px;
}
.monitor-header-three{
    border: 1px solid #E6E6E6;
    background: #ffffff;
    border-radius: 5px;
    margin-bottom: 20px;
    width: 100%;
    height: 600px;
}
.monitor-cart-name{
    width: 100%;
    height: 50px;
    /* background: yellow; */
    margin-bottom: 20px;
    border-bottom: 1px solid #E6E6E6;
    display: flex;
    justify-content: space-between;
}
.monitor-cart-name-left{
    width: 160px;
    height: 100%;
    /* background: blueviolet; */
    line-height: 42px;
    color: #5C5C5C;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;
}
.monitor-cart-name-left-icon{
    width: 30px;
    height: 30px;
    background: #F7EEFF;
    border-radius: 2px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
}
.monitor-cart-name-left-icon-s{
    width: 20px;
    height: 20px;
    color: blueviolet;
    fill: currentColor;
}
.monitor-cart-name-right{
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.monitor-cart-name-right-list{
    width: 60px;
    height: 50px;
    /* background: chartreuse; */
    text-align: center;
    line-height: 50px;
    color: #515A6E;
    font-size: 14px;
    cursor: pointer;
}
.monitor-cart-name-right-list:hover{
    color: #2D8CF0;
}
.monitor-cart-box{
    /* background: chocolate; */
    width: 100%;
    height: 100px;
    padding: 10px 15px 0;
    box-sizing: border-box;
    /* border: 1px solid #E6E6E6; */
    background: #ffffff;
    border-radius: 5px;
    margin-bottom: 20px;
}
.monitor-cart-probability{
    /* background: cornflowerblue; */
    width: 100%;
    height: 210px;
    padding: 20px 15px 0px;
    box-sizing: border-box;
}
.monitor-cart-probability-box{
    width: 100%;
    height: 80%;
    /* border: 1px solid #515A6E; */
    border-radius: 5px;
}
.monitor-cart-probability-name{
    width: 100%;
    height: 20%;
    text-align: center;
    line-height: 34px;
    /* background: chartreuse; */
    color: #515A6E;
    font-size: 14px;
    cursor: pointer;
}
.monitor-visitors{
    width: 100%;
    height: 400px;
}
.monitor-visitors-scale{
    display: flex;
    justify-content: space-between;
}
.monitor-visitors-left{
    width: 60%;
    height: 100%;
}
.monitor-visitors-right{
    width: 40%;
    height: 100%;
    /* background: chocolate; */
    padding: 20px;
    box-sizing: border-box;
}
.monitor-visitors-right-list{
    width: 100%;
    height: 40px;
    /* background: cyan; */
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.monitor-visitors-right-list-icon{
    width: 15px;
    height: 15px;
    color: #666666;
    fill: currentColor;
}
.monitor-visitors-right-list-name{
    width: 120px;
    /* background: darkgoldenrod; */
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    color: #595959;
    padding-left: 10px;
    box-sizing: border-box;
}
.monitor-visitors-right-list-number{
    flex: 1;
    /* background: yellowgreen; */
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    color: #8C8C8C;
    padding-left: 10px;
    box-sizing: border-box;
    text-align: right;
    padding-right: 15px;
}
.monitor-header-users{
    width: 100%;
    height: auto;
    padding: 0px 10px;
    box-sizing: border-box;
}
.monitor-header-users-time{
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #515A6E;
    text-align: center;
    margin-bottom: 10px;
}
.monitor-header-users-number{
    width: 100%;
    height: 58px;
    text-align: center;
    font-size: 40px;
    line-height: 58px;
    color: #515A6E;
    font-weight: bold;
}
.monitor-header-users-message{
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    color: #515A6E;
    text-align: center;
}
/* 用户数 */
.monitor-header-users-icon{
    width: 100%;
    height: 50px;
    text-align: center;
    /* background: chocolate; */
    display: flex;
    justify-content: center;
    align-items: center;
}
.monitor-header-users-icon-s{
    width: 36px;
    height: 36px;
    fill: currentColor;
    color: #2399FA;
}
/* 评论 */
.monitor-header-comment{
    width: 100%;
    height: auto;
}
.monitor-header-comment .monitor-header-comment-list:nth-last-child(1){
    border-bottom-color: transparent;
}
.monitor-header-comment-list{
    width: 100%;
    height: 120px;
    display: flex;
    box-sizing: border-box;
    border-bottom: 1px solid #E8EAEC;
}
.monitor-header-comment-list-li{
    width: 33%;
    height: 120px;
}
.monitor-header-comment-list-li-number{
    font-weight: bold;
    font-size: 30px;
    color: #515A6E;
    line-height: 120px;
    text-align: center;
}
.monitor-header-comment-list-li-icon{
    width: 50px;
    height: 50px;
    color: #FBD971;
    fill: currentColor;
}
.monitor-header-comment-list-li-tag{
    display: flex;
    /* background: cyan; */
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
.monitor-header-comment-list-li-tag-text{
    width: 100%;
    height: 35px;
    text-align: center;
    line-height: 35px;
    color: #808695;
    font-size: 14px;
}
.monitor-header-comment-list-li-percentage{
    height: 100%;
    line-height: 120px;
    color: #36C17B;
    font-size: 18px;
    text-align: center;
}
.el-col-lg-18 {
  width: 100%;
}
.el-col-lg-17 {
  width: 100%;
}
</style>