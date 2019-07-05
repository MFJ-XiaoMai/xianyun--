<template>
    <div class="filters">
         <el-row>
            <el-col :span="8">单程： 
                {{data.info.departCity}} - {{data.info.destCity}} /
                {{data.info.departDate}}
            </el-col>
            <el-col :span="4" >
                <el-select 
                v-model="selectairport" 
                class="filters-tiaojian" 
                placeholder="起飞机场" 
                size="mini"
               @change="handleselectairport"
                >
                    <el-option 
                    v-for="(item) in data.options.airport"
                    :key="item"
                    :label="item" 
                    :value="item"
                    
                    ></el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select 
                v-model="selecttime" 
                class="filters-tiaojian" 
                placeholder="起飞时间" 
                size="mini" 
                @change="handleselecttime"
                >
                    <el-option 
                     v-for="(item,index) in  data.options.flightTimes"
                    :key="index"
                    :label="`${item.from}:00 - ${item.to}:00`" 
                    :value="`${item.from},${item.to}`"
                   >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select 
                v-model="selectaircompany" 
                class="filters-tiaojian" 
                placeholder="航空公司" 
                size="mini" 
                @change="handleselectaircompany"
                >
                    <el-option 
                    v-for="(item,index) in  data.options.company"
                    :key="index"
                    :label="item"
                    :value="item"
                    
                    ></el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select v-model="selectairtype" 
                class="filters-tiaojian" 
                @change="handleselectairtype"
                placeholder="机型"
                 size="mini">
                    <el-option 
                    v-for="(item,index) in airportSize" 
                    :label="item.size" 
                    :value="item.type"
                    :key="index"
                     
                    ></el-option>
                    
                </el-select>
            </el-col>
        </el-row>
        <el-row type="flex">
            <span>筛选：</span>
            <span class="button" @click="handleclear">撤销</span>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return{
            selectairtype:"",
            selectaircompany:"",
            selecttime:"",
            selectairport:"",
            airportSize:[
                {type:"L",size:"大"},
                {type:"M",size:"中"},
                {type:"S",size:"小"}
            ]
        }
    },
    props:{
        data:{
            type:Object,
            default:{}
        },
    },
    methods:{
        handleclear(){
            this.selectairtype="";
            this.selectaircompany="";
            this.selecttime="";
            this.selectairport="";
            this.$emit("select",this.data.flights)
        },
        // 选中飞机类型时
        handleselectairtype(val){
            const arr =this.data.flights.filter(v=>v.plane_size===val)
            this.$emit("select",arr)
        },
        // 选中航空公司时
        handleselectaircompany(val){
            const arr =this.data.flights.filter(v=>v.airline_name===val)
            this.$emit("select",arr)
        },
        // 选中时间是
        handleselecttime(val){
            const time=val.split(",")
            if(+time[0]< +time[1]){
                const arr=this.data.flights.filter(
                    v=>{
                       return +v.dep_time.split(":")[0]>=+time[0]
                       &&+v.arr_time.split(":")[0]<=+time[1]&&+v.arr_time.split(":")[0]>+time[0]
                        })
                 this.$emit("select",arr) 
            }else{
                const arr=this.data.flights.filter(
                    v=>{
                        if(+v.dep_time.split(":")[0]>+v.arr_time.split(":")[0]){
                          return  +v.dep_time.split(":")[0]>=+time[0]&&
                                    +v.arr_time.split(":")[0]>=+time[1]
                        }else{
                            return +v.dep_time.split(":")[0]>=+time[0]&&
                                    +v.arr_time.split(":")[0]<=+time[1]
                        }
                        
                    })
                    this.$emit("select",arr) 
            }
           
           
        },
        handleselectairport(val){
             const arr =this.data.flights.filter(v=>v.org_airport_name===val)

            this.$emit("select",arr)
        }
     }
  
}
</script>

<style scoped lang="less">
    .filters{
        font-size: 14px;
        margin-top:20px;
        .filters-tiaojian{
            width:120px;
        }
        .button{
        cursor: pointer;
        background:#ecf5ff;
        border-color: #b3d8ff;
        color: #409eff;
        width:56px;
        height:28px;
        border-radius: 10px;
        text-align: center;
        line-height: 28px;
        &:hover{
            background: #409eff;
            color:#ecf5ff;
        }
    }
    }
   
</style>
