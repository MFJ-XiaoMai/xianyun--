<template>
    <div class="container">
        <el-row class="header">
            <span>酒店 > 南京市酒店预订</span>
        </el-row>
        <el-row 
        type="flex" 
        class="search"
        align="middle">
            <div class="search-city">
                <el-autocomplete
                v-model="city"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @select="handleSelect"
                @blur="handledefault"
                >
                </el-autocomplete>
            </div>
            <div class="search-date">
                <el-date-picker
                v-model="Data"
                type="daterange"
                align="right"
                unlink-panels
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
                </el-date-picker>
            </div>
            <div class="search-person">
                <el-input
                    placeholder="人数未定"
                    @focus="querySearch"
                    v-model="person">
                    <i
                        class="iconfont iconuser el-input__icon"
                        slot="suffix"
                        @click="handleIconClick">
                    </i>
                </el-input>
                <div v-if="isshow" class="search-person-num">
                    <el-row 
                    class="search-person-content" 
                    type="flex" 
                    justify="space-between" 
                    align="middle">
                       <span class="search-person-room">每间</span>
                       <div class="search-person-select">
                           <el-row  type="flex"  >
                               <el-select 
                               class="select-adult"
                                size="mini"
                                v-model="adultvalue"
                                placeholder="请选择">
                                    <el-option
                                    v-for="item in item.adults"
                                    :key="item.label"
                                    :label="`${item.label}成人`"
                                    :value="`${item.label}成人`">
                                    </el-option>
                                </el-select>
                                <el-select 
                                class="select-child"
                                v-model="childvalue"
                                size="mini"
                                placeholder="请选择">
                                    <el-option
                                    v-for="item in item.children"
                                    :key="item.label"
                                    :label="`${item.label}孩童`"
                                    :value="`${item.label}孩童`">
                                    </el-option>
                                </el-select>
                           </el-row>
                        
                       </div>
                    </el-row>
                    <el-row class="search-btn" type="flex" justify="end">
                        <el-button 
                        type="primary" 
                        size="mini"
                        @click="allperson">
                        确认</el-button>
                    </el-row>
                </div>
                   
            </div>
            <div class="search-price">
                <el-row >
                     <el-button type="primary">查看价格</el-button>
                </el-row>
                
            </div>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return {
            city:"",
            id:0,
            Data:"",
            isshow:false,
            adultvalue:"",
            childvalue:"",
            person:"",
            item:{
                adults: [
                    {label: 1},
                    {label: 2},
                    {label: 3},
                    {label: 4},
                    {label: 5},
                    {label: 6},
                    {label: 7},
            ],
            children: [
                {label: 0},
                {label: 1},
                {label: 2},
                {label: 3},
                {label: 4},
            ],
            },
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
        }
        
    },
    methods:{
        // 触发城市输入框
        async querySearchAsync(city, cb) {
           const arr= await this.getquerysearchcity(city)
        cb(arr)
         },
        //  固定选择城市
       async handledefault(){
           if(this.city) return 
             const arr= await this.getquerysearchcity(this.city)
             if(arr.length>1){
                 this.id=arr[0].id||0;
                 this.city=arr[0].value
             }
             this.$axios({
              url:"/hotels",
              method:"GET",
              params:{
                  city:this.id
              }
          }).then(res=>{
              const {data}=res.data
            this.$emit("setHotelInfo",data)
          }) 
        },
        //  获取城市数据
        getquerysearchcity(city){
          return new Promise((resolve,reject)=>{
              if(!city){
                  return resolve([])
              }
               this.$axios({
                url:"/airs/city",
                method:"GET",
                params:{
                    name:city
                }
         }).then(res=>{ 
             const {data}=res.data
            
             const arr=data.map(e=>{
                 return {...e,value:e.name,}
             })
             resolve(arr)
         })
          })
          
      },
    //   单击选中城市
         handleSelect(item){
          this.id=item.id
          this.$axios({
              url:"/hotels",
              method:"GET",
              params:{
                  city:this.id
              }
          }).then(res=>{
              const {data}=res.data
              this.$emit("setHotelInfo",data)
          })
         },
        querySearch() {
            this.isshow=true
      },
        handleIconClick() {
            this.isshow=true
      },
    //   计算总人数
        allperson(){
            if(this.childvalue.indexOf(0)===-1){
                this.person=this.adultvalue+this.childvalue
            }else{
                this.person=this.adultvalue
            }
            this.isshow=false;
            
        }
    },
   
    mounted() {
      this.city
    }
  
}
</script>

<style scoped lang="less">
.container{
     font-size:14px;
    .header{ 
        color:#666;
        padding-top:20px;
        padding-bottom: 20px;
    }
    .search{
        .search-city{
            margin-right:20px;
        }
        .search-date{
            margin-right: 10px;
        }
        .search-person{
            margin-right:20px;
            position: relative;
            .search-person-num{
                position: absolute;
                top:60px;
                box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
                border: 1px solid #ebeef5;
                background: #fff;
                width:300px;
                min-width: 150px;
                z-index: 1000;
                .search-person-content{
                    padding: 10px;
                    padding-bottom: 20px;
                    border-bottom: 1px solid #aaa;
                .search-person-room{
                   
                }
                .search-person-select{
                     z-index: 10000;
                    .select-adult{
                        width:94px;
                        height:28px;
                    }
                    .select-child{
                        width:94px;
                        height:28px;
                    }

                } 
            }
            .search-btn{
                    padding: 10px;
                    padding-bottom: 10px;
                   
                }
            }
        }
    }
}

</style>
