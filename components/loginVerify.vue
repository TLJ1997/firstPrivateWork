<template>
	<view>
		<view v-show="drag_show">
			<dragCode ref="dragCode" @drag_over="verfy" @verfy="verfy">
			</dragCode>
		</view>
	</view>
</template>

<script>
	import dragCode from '@/components/dragCode/my-dragCode.vue';
	export default {
		components:{
			dragCode
		},
		data() {
			return {
				drag_show:true
			}
		},
		methods: {
			verfy(isverfy){				
				this.$emit("verfy",isverfy);
			}
		}
	}
</script>

<style>
</style>
