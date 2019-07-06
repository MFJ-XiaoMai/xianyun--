<template>
    <div class="fliter">
        <el-row type="flex" justify="space-around"  align="middle">
            <el-col :span="6" class="hotel">
                <el-row 
                class="hotel-price"
                type="flex" 
                justify="space-between" 
                align="middle">
                    <span>价格</span>
                    <span>0-{{price}}</span>
                </el-row>
                <div>
                    <el-slider v-model="price" max="4000"></el-slider>
                </div> 
            </el-col>
           
            <el-col :span="4" class="hotel">
                <div class="hotelclassification">酒店等级</div>
                <div class="hotel-option">
                    <el-select 
                    size="mini"
                     class="select"
                    v-model="hotellevel" 
                    placeholder="请选择">
                        <el-option
                        v-for="item in levels"
                        :key="item.label"
                        :label="item.label"
                        :value="item.value">
                       <el-radio v-model="radio" ></el-radio>
                        <span >{{item.label}}</span>
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            
            <el-col :span="4" class="hotel">
                <div class="hotelclassification">酒店类型</div>
                <div class="hotel-option">
                    <el-select 
                     size="mini"
                      class="select"
                    v-model="hoteltype" 
                    placeholder="请选择">
                        <el-option
                        v-for="item in types"
                        :key="item.label"
                        :label="item.label"
                        :value="item.value">
                        <el-radio v-model="radio" ></el-radio>
                        <span >{{item.label}}</span>
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            
            <el-col :span="4" class="hotel">
                <div class="hotelclassification">酒店设施</div>
                <div class="hotel-option">
                    <el-select
                    size="mini"
                    class="select"
                    v-model="hotelasset" 
                     placeholder="请选择">
                        <el-option
                        v-for="item in assets"
                        :key="item.label"
                        :label="item.label"
                        :value="item.value">
                         <el-radio v-model="radio" ></el-radio>
                        <span >{{item.label}}</span>
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            
            <el-col :span="4" class="hotel">
                <div class="hotelclassification">酒店品牌</div>
                <div class="hotel-option">
                    <el-select 
                    v-model="hotelbrand"
                     size="mini"
                     class="select"
                     placeholder="请选择">
                        <el-option
                        v-for="item in brands"
                        :key="item.label"
                        :label="item.label"
                        :value="item.value">
                         <el-radio v-model="radio" ></el-radio>
                        <span >{{item.label}}</span>
                        </el-option>
                    </el-select>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return {
            price:4000,
            hotelbrand:"不限",
            hotelasset:"不限",
            hoteltype:"不限",
            hotellevel:"不限",
            levels: [],
            types: [],
            assets: [],
            brands: [],
            radio:1,
        }
    },
   mounted(){
       this.$axios({
           url:"/hotels/options",
           method:"GET",
       }).then(res=>{
           console.log(res.data)
           const {levels,types,assets,brands}=res.data.data;
           
           this.levels=levels.map(e=>{
                const val=e.id;
                const lab=e.name;
                return {value:val,label:lab}
           });
            this.types=types.map(e=>{
                const val=e.id;
                const lab=e.name;
                return {value:val,label:lab}
           });
            this.assets=assets.map(e=>{
                const val=e.id;
                const lab=e.name;
                return {value:val,label:lab}
           });
            this.brands=brands.map(e=>{
                const val=e.id;
                const lab=e.name;
                return {value:val,label:lab}
           });
       })
   }
}
</script>

<style scoped lang="less">
    .fliter{
        font-size:14px;
        color:#666;
        width:100%;
        margin-bottom: 30px;
        border:1px solid #aaa;
        .hotel{
            border-right:1px solid #aaa;
            padding-right:26px;
            padding-left: 10px;
           &:first-child{
              padding-left: 10px; 
              border: none;
              position: relative;
              &::after{
                  content: "";
                  display: block;
                  height:47px;
                  border-right:1px solid #aaa;
                  position: absolute;
                  top:12px;
                  right:-3px;
              }
           }
           &:last-child{
               border:none;
               padding: none;
           }
           .hotel-price{
               padding-top:10px;
           }
           .hotelclassification{
               padding-bottom: 10px;
               box-sizing: border-box;
           }
           .hotel-option{
               .select{
                   border:none;
                   outline: none;
               }
           }
        }
    }
</style>
