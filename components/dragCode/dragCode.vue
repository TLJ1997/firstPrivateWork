<template>
    <view class="container">
            <dragball @hmove="moving" @endStop="endStop" ref="dragball" :x=50 :y=50 image="http://pic27.nipic.com/20130321/9678987_225139671149_2.jpg"></dragball>
			<!-- <clickCircle ref="clickCircle"></clickCircle> -->
			<image class="target_img" :style="'left:' + (dragX - 10) + 'px;top:' + (dragY - 10) + 'px'" src="http://pic27.nipic.com/20130321/9678987_225139671149_2.jpg"/>
	</view>
</template>
<script>
    import dragball from '../../components/drag-ball/my-drag-ball.vue';
    export default {
        components: {
            dragball,
			
        },
		props:{
		},
        data() {
            return {
				dragData:false,
				dragX:120,
				dragY:140
            }
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
				if(this.moving(e)){
					setTimeout(()=>{
						this.$emit("drag_over",{moveX:this.$refs.dragball.moveX,moveY:this.$refs.dragball.moveY});
					},1000);
				}
			}
        }
	}
</script>

<style lang="less">
	.container{
		width: 100vw;
		font-size: 28upx;
		color: #6B8082;
		position: relative;
		background-color: #f6f6f6;
		.target_img{
			position: absolute;
			width: 124upx;
			height: 124upx;
		}
	}
</style>
