<template>
    <div id="main">
        <div id="imgWrapper" :style="styleObject">
            <img src="../../static/assets/displayFirst.png" alt="行政楼、教学楼、图书馆" style="width:100%;height:100%">
            <div @click="selectBuiding(item,$event)" 
                 v-bind:class="['mark',buildingColor(item.status)]" 
                 v-for="item in buildingData" 
                 :key="item.buildingId" 
                 :style="{width:'30px',height:'30px',top:item.yPosition*0.65 +'px',left:item.xPosition*0.65 +'px'}"
            >
            <div >
                    <span>mark</span> 
                    <div class="floorDisplay" v-if="item.buildingId == selectedBuildingId">
                        <ul v-if="appear" >
                            <li v-for="floorItem in shownBuilding.floorInfo" :key="floorItem.floorId" @click.stop="selectFloor(floorItem.Id,$event)" @click="showRoom(floorItem.roomResult ? floorItem.roomResult : [])">
                                <span :class="['statusSpan',buildingColor(floorItem.status)] "> </span>
                                 <span>{{floorItem.Description}}</span>
                                 <div class="roomStatusWrapper" v-if="floorItem.Id==shownFloorId" :key="floorItem.floorId">
                                     <div  v-if="floorItem.floorId" :class="['convergeRoomStatus',roomColor(shownconvergeRoom.length ? shownconvergeRoom[0].status : undefined)]">
                                       <div>汇聚机房</div>  
                                     </div>
                                     <div v-if="floorItem.floorId" :class="['lowVoltageRoomStatus',roomColor(shownlowVoltageRoom.length ? shownlowVoltageRoom[0].status : undefined)]">
                                        <div>弱电间</div> 
                                     </div>
                                </div>
                            </li>
                        </ul>
                    </div>
            </div>
            </div>
            <div class="tips" style="position:absolute;top:350px;left:760px;">
                <ul style="width:200px">
                    <li class="tipWrapper"><div class="tipImg" style="background-color:#e60f2d"></div><div class="tipWords">故障+异常</div></li>
                    <li class="tipWrapper"><div class="tipImg" style="background-color:#FFFF00"></div><div class="tipWords">故障</div></li>
                    <li class="tipWrapper"><div class="tipImg" style="background-color:#CDC9C9"></div><div class="tipWords">异常</div></li>
                    <li class="tipWrapper"><div class="tipImg" style="background-color:#C0FF3E"></div><div class="tipWords">正常</div></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'

Vue.directive('clickoutside',{
  bind: function(el, binding) {
        function documentHandler(e) {
            //判断点击的区域是否是指令所在的元素内部，如果是，就跳出函数，不往下执行。
            if (el.contains(e.target)) {
                return false;
            }
            //判断当前的指令v-clickoutside有没有写表达式

            if (binding.expression) {
                //binding.value()就是用来执行当前上下文methods中指定的函数的
                binding.value(e);
            }
        }
        //用于在unbind钩子函数中移除对document的click事件监听。
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    unbind: function() {
        document.removeEventListener('click', el.__vueClickOutside__);
        //如果不移除，当组件或元素销毁时，它仍存在于内存中
        delete el.__vueClickOutside__;
    }
});
export default {
    name:"displayFirst",
    data(){
        return {
            styleObject:{
                width:1197*0.65+'px',
                height:1411*0.65 + 'px',
                margin:'0 auto',
                position:'relative',
            },
            buildingData:[],
            selectedBuildingId:-1,
            shownBuilding:{},
            appear:true,
            shownFloorId:-1,
            shownRooms:[],
            shownlowVoltageRoom:[],
            shownconvergeRoom:[],
            show:true,
            buildingTarget:null
        }
    },
    filters:{
        imgWidth:function(value){
            return value*0.6
        },
        imgHeight:function(value){
            return value*0.6
        },
    },
    methods:{
        buildingColor(status){
            switch(status){
                case -2:
                return 'buildingRed';
                case -1:
                return 'buildingYellow';
                case 0:
                return 'buildingGrey';
                case 1:
                return 'buildingGreen';
                case undefined:
                return 'buildingTransperant';
            }
        },
        handleClose(){
            console.log(1)
            // this.show=false
        },
        roomColor(status){
            // console.log(status,this.shownlowVoltageRoom,this.shownconvergeRoom)
            switch(status){
                case -2:
                return 'buildingRed';
                case -1:
                return 'buildingYellow';
                case 0:
                return 'buildingGrey';
                case 1:
                return 'buildingGreen';
                case undefined:
                return 'buildingGreen';
            }
        },
        selectBuiding(item,event){

            this.buildingTarget=event.target;
            this.show=true;
            this.shownFloorId=-1;
            if(this.selectedBuildingId==-1){
                this.shownBuilding={};
                this.$nextTick(()=>{
                    // console.log(this.shownBuilding)
                    this.getFloors(item)
                })
            }else{
                if(this.selectedBuildingId==item.buildingId) return;
                    this.appear=false;
                    this.shownBuilding={}
                    this.$nextTick(()=>{
                        // console.log(this.shownBuilding)
                        this.getFloors(item)
                    })
            }
        },
        selectFloor(floorId,event){
            

            this.shownFloorId=floorId;
            // console.log(floorId)
        },
        showRoom(rooms){
            this.shownRooms=rooms;
            this.$nextTick(()=>{
                console.log(this.shownRooms)
                this.shownlowVoltageRoom=this.shownRooms.length ?  this.shownRooms.filter((item)=>{
                    return item.deviceType=="NKD_WEAK_ELECTRIC_ADVICE"
                })
                : []
                ;
                this.shownconvergeRoom=this.shownRooms.length ?  this.shownRooms.filter((item)=>{
                    return item.deviceType=="NKD_AGG_DEVICE"
                })
                : []
                ;
                this.$nextTick(()=>{
                    // console.log(this.shownlowVoltageRoom,this.shownconvergeRoom)
                })
            })
        },
        getFloors(item){
            this.$http.toGetAllFloors(item.buildingId).then((res)=>{
                // console.log(res,item.floorResult)
                if(res.data.success){
                    let floorInfo= res.data.data.map ((singleFloor)=>{
                        item.floorResult.map((floorWithDevice)=>{
                            if(floorWithDevice.floorId==singleFloor.Id){
                                singleFloor={
                                    ...singleFloor,
                                    ...floorWithDevice
                                }
                            }
                        })
                        return singleFloor
                    });
                    
                    item.floorInfo=floorInfo;
                    // console.log(floorInfo,item.floorResult)
                    this.shownBuilding=item;
                    this.appear=true;
                    this.$nextTick(()=>{
                        this.selectedBuildingId=item.buildingId;
                    })
                }
            })
        }
    },
    created(){
        this.$http.toGetdisplayFirst().then((res)=>{
            // console.log(res)
            if(res.data.success){
                this.buildingData=res.data.data.map((item)=>{
                    item.showFloor=false;
                    item.showRoom=false;
                    return item
                });
                this.$nextTick(()=>{
                    // console.log(this.buildingData)
                })
            }
        })
    }
}
</script>
<style scoped>
    .mark{
        border-radius:50%;
        position:absolute;
    }
    .mark:hover{
        cursor: pointer;
    }
    .tips ul li{
        list-style: none;
        margin-bottom: 5px;
    }
    .tipWrapper{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .tipImg{
        width: 15px;
        height: 15px;
        margin-right: 10px;
    }
    .buildingGreen{
        background-color:#C0FF3E
    }
    .buildingGrey{
        background-color:#CDC9C9
    }
    .buildingRed{
        background-color:#e60f2d
    }
    .buildingYellow{
        background-color:#FFFF00
    }
    .buildingTransperant{
        opacity: 0 !important;
    }
    .floorDisplay{
        min-width: 120px;
        min-height:20px;
        font-size: 12px;
        position: absolute;
        top: 0px;
        left: 32px;
    }
    .floorDisplay ul{
        width: 100%;
        min-height: 20px;
        padding:0;
        margin-bottom: 0;
        background-color: #FFFAFA;
        border: 1px solid black;
        /* border-right: none; */
        position: relative;
    }
    .floorDisplay ul li{
        height: 20px;
        line-height: 20px;
        list-style: none;
        margin-bottom: 1px;
        border-bottom: 1px solid #DCDCDC;
        vertical-align: middle;
    }
    .floorDisplay ul li:last-child{
        border-bottom:none;
    }
    .statusSpan{
        display: inline-block;
        width: 11px;
        height: 11px;
        margin-right: 2px;
        margin-left: 2px;
    }
    .roomStatusWrapper{
        width: 150px;
        height: 150px;
        top: 0px;
        left: 120px;
        z-index:100;
        background-color: #FFFAFA;
        border: 1px solid black;
        position: absolute;
    }
    .convergeRoomStatus{
        width: 60px;
        height: 50px;
        position: absolute;
        left:0;
        top: 98px;
        border-left: none;
        border-bottom: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .lowVoltageRoomStatus{
        width: 60px;
        height: 50px;
        border-right: none;
        border-top: none;
        position: absolute;
        left:88px;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>