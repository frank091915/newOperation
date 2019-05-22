<template>
    <div id="main">
        <h4>行政楼、教学楼、图书馆</h4> 
        <div id="imgWrapper" :style="styleObject">
            <img src="../../static/assets/displayFirst.png" alt="行政楼、教学楼、图书馆" style="width:100%;height:100%">
            <div class="mark" v-for="item in buildingData" :key="item.Id" :style="{width:'15px',height:'15px',top:item.yPosition*0.6 +'px',left:item.xPosition*0.6 +'px'}">
                    mark
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name:"displayFirst",
    data(){
        return {
            styleObject:{
                width:1197*0.6+'px',
                height:1411*0.6 + 'px',
                margin:'0 auto',
                position:'relative'
            },
            buildingData:[]
        }
    },
    filters:{
        imgWidth:function(value){
            console.log(value*0.6)
            return value*0.6
        },
        imgHeight:function(value){
            console.log(value*0.6)
            return value*0.6
        },
    },
    created(){
        this.$http.toGetdisplayFirst().then((res)=>{
            console.log(res)
            if(res.data.success){
                this.buildingData=res.data.data;
                this.$nextTick(()=>{
                    console.log(this.buildingData)
                })
            }
        })
    }
}
</script>
<style scoped>
    .mark{
        border-radius:50%;
        z-index: 1;
        position:absolute
    }
</style>