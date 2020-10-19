<template>
    <view class="container">
            <dragball @hmove="moving" @endStop="endStop" ref="dragball" :x="left" :y="250" image="/static/img/icon_Securityverification.png"></dragball>
			<image ref="v1" class="target_img"  src="/static/img/icon_erification.png"/>
	</view>
</template>
<script>
    import dragball from '@/components/drag-ball/my-drag-ball.vue';
    export default {
        components: {
            dragball
			
        },
		props:{
		},
        data() {
            return {
				//dragData:false,
				//dragX:120,
				//dragY:140
				left:0,
				top:0,
				vtop:371,
				vleft:78,
				isverfy:false
            }
        },
		mounted(){
			// 在节点挂载之后，获取dom元素
			    const res = uni.getSystemInfoSync();

				var t=this;
				// this.vtop=865*res.screenHeight/1344;
				this.vleft=150*res.screenWidth/750;
			 
			 
		},
		created(){
			this.left=this.randomNum(75,215)
			
			//this.top=this.randomNum(213,500)
			//this.top=this.randomNum(100,200)
		},
        onLoad() {
			
        },
        methods: {
			moving(e) {
				//console.log(this.$refs.dragball.x,this.$refs.dragball.y);
				//console.log(this.$refs.dragball.moveX,this.$refs.dragball.moveY);
					if(this.$refs.dragball.moveX >= this.dragX - 10 && 
					this.$refs.dragball.moveX <= this.dragX + 10 &&
							this.$refs.dragball.moveY >= this.dragY - 10 && 
							this.$refs.dragball.moveY <= this.dragY + 10){
						this.$refs.clickCircle.conClick(e);
						return true;
					}else{
						return false;
					}
			},
			endStop(e){										  
					/*setTimeout(()=>{
						this.$emit("drag_over",{moveX:this.$refs.dragball.moveX,moveY:this.$refs.dragball.moveY});
					},1000);*/
				//}
				console.log(e.left+','+e.top)
				/*if(e.left<this.vleft){
					e.style.left=this.vleft;
				}
				if(e.top<this.vtop){
					e.style.top=this.vtop;
				}*/
				console.log(this.vleft+','+this.vtop)
				
				if(e.left-this.vleft>=0&&e.left-this.vleft<=30&&e.top-this.vtop>=0&&e.top-10-this.vtop<=60){
					this.isverfy=true;
					this.$emit("verfy",this.isverfy);  
					//alert('msg')
				}else{
					this.isverfy=false;
					this.$emit("verfy",this.isverfy);
				}
			}
        }
	}
</script>

<style lang="less">
	.container{
		font-size: 28upx;
		color: #6B8082;		
		background-color: #f6f6f6;		
		.target_img{
			position: fixed;
			width: 176upx;
			height: 187upx;
			top: 870upx;
			left: 155upx;
		}
	}
</style>
