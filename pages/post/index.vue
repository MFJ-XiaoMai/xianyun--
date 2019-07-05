<template>
    <div>
        <DIGUI :data="data"/>
    </div>
</template>

<script>
import DIGUI from "./digui"
export default {
    data(){
        return {
            data:[
                {type:"服装",
                children:[
                    {type:"男装"},
                    {type:"女装"}
                ]},
                {type:"电器",
                children:[
                    {type:"冰箱"},
                    {type:"电视机"},
                    {type:"洗衣机"}
                ]}

            ]
        }
    },
    components:{
        DIGUI
    }
}
</script>

<style>

</style>
