<template>
	<view @click="toggle" ref="switch" class="evan-switch" :class="{'evan-switch--disabled':disabled}" :style="{height:switchHeight,width:switchTextWidth+size+'rpx',borderRadius:size+'rpx',backgroundColor:currentValue===activeValue?activeColor:inactiveColor}">
		<view class="evan-switch__circle" :style="{width:size+'rpx',height:size+'rpx',transform:currentValue===activeValue?`translateX(${translateX}px)`:`translateX(0)`}"></view>
		<view class="evan-switch__text" :style="{height:size+'rpx',width:switchTextWidth+'rpx',transform:currentValue===activeValue?`translateX(${-size}rpx)`:`translateX(0)`}">
			<text :style="{'font-size':size/1.8+'rpx',color:currentValue===activeValue?activeTextColor:inactiveTextColor}">{{ statusText }}</text>
		</view>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const dom = weex.requireModule('dom')
	// #endif
	export default {
		name: 'EvanSwitch',
		props: {
			value: {
				type: [String, Number, Boolean],
				default: false
			},
			activeColor: {
				type: String,
				default: '#108ee9'
			},
			activeTextColor: {
				type: String,
				default: '#ffffff'
			},
			inactiveColor: {
				type: String,
				default: '#ffffff'
			},
			inactiveTextColor: {
				type: String,
				default: '#8a8a8a'
			},
			size: {
				type: Number,
				default: 50
			},
			disabled: {
				type: Boolean,
				default: false
			},
			activeValue: {
				type: [String, Number, Boolean],
				default: true
			},
			inactiveValue: {
				type: [String, Number, Boolean],
				default: false
			},
			activeText: {
				type: String,
				default: ''
			},
			inactiveText: {
				type: String,
				default: ''
			},
			beforeChange: {
				type: Function,
				default: null
			},
			extraData: null
		},
		computed: {
			switchHeight() {
				// #ifdef APP-NVUE
				return this.size + 2 + 'rpx'
				// #endif
				// #ifndef APP-NVUE
				return this.size + 'rpx'
				// #endif
			},
			
			// 文本所在view的长度
			switchTextWidth() {
				let fontSize = this.size/1.8
				// #ifndef APP-NVUE
				if(uni.upx2px(fontSize) < 12) {
					// 小于12的字体，由于浏览器限制，会按照12px来显示
					fontSize = fontSize/uni.upx2px(fontSize)*12
				}
				// #endif
				
				if(this.activeText || this.inactiveText) {
					let length = this.activeText.length>this.inactiveText.length?this.activeText.length:this.inactiveText.length
					// 文本与与圆钮的间距为5rpx，与另一侧间距为 size/2
					return fontSize*length + this.size/2
				} else {
					return this.size
				}
			},
		},
		watch: {
			value: {
				immediate: true,
				handler(value) {
					this.currentValue = value
				}
			}
		},
		data() {
			return {
				currentValue: false,
				translateX: 0,
				statusText: null,
				initValue: false,
			}
		},
		created() {
			this.initValue = this.currentValue
			this.currentValue = false
		},
		mounted() {
			let self = this
			this.statusText = this.initValue===this.activeValue?this.activeText:this.inactiveText
			this.$nextTick(() => {
				setTimeout(() => {
					// #ifndef APP-NVUE
					let view = uni.createSelectorQuery().in(self).select(".evan-switch");
					if(view) {
						view.boundingClientRect(data => {
							self.translateX = data.width - uni.upx2px(self.size)
							self.currentValue = self.initValue
						}).exec();
					}
					// #endif
					
					// #ifdef APP-NVUE
					const result = dom.getComponentRect(self.$refs.switch, option => {
						self.translateX = option.size.width - uni.upx2px(self.size) - 1
						self.currentValue = self.initValue
					})
					// #endif
				}, 50)
			})
		},
		methods: {
			toggle() {
				if (!this.disabled) {
					if (this.beforeChange && typeof this.beforeChange === 'function') {
						const result = this.beforeChange(this.currentValue === this.activeValue ? this.inactiveValue : this.activeValue,
							this.extraData)
						if (typeof result === 'object') {
							result.then(() => {
								this.toggleValue()
							}).catch(() => {})
						} else if (typeof result === 'boolean' && result) {
							this.toggleValue()
						}
					} else {
						this.toggleValue()
					}
				}
			},
			toggleValue() {
				this.statusText = this.currentValue===this.activeValue?this.inactiveText:this.activeText
				this.$nextTick(function(){
					// #ifndef APP-NVUE
					let view = uni.createSelectorQuery().in(this).select(".evan-switch");
					if(view) {
						view.boundingClientRect(data => {
							this.translateX = data.width - uni.upx2px(this.size)
							
							this.currentValue = this.currentValue === this.activeValue ? this.inactiveValue : this.activeValue
							this.$emit('input', this.currentValue)
							this.$emit('change', this.currentValue)
						}).exec();
					}
					// #endif
				
					// #ifdef APP-NVUE
					const result = dom.getComponentRect(this.$refs.switch, option => {
						this.translateX = option.size.width - uni.upx2px(this.size) - 1
						
						this.currentValue = this.currentValue === this.activeValue ? this.inactiveValue : this.activeValue
						this.$emit('input', this.currentValue)
						this.$emit('change', this.currentValue)
					})
					// #endif
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.evan-switch {
		position: relative;
		border-width: 1px;
		border-color: rgba(0, 0, 0, 0.1);
		border-style: solid;
		transition: background-color 0.3s;
		/* #ifndef APP-NVUE */
		box-sizing: content-box;
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}

	.evan-switch--disabled {
		opacity: 0.3;
	}

	.evan-switch__circle {
		// position: absolute;
		// left: 0;
		// top: 0;
		background-color: #fff;
		border-radius: 50%;
		/* #ifndef APP-NVUE */
		box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);
		/* #endif */
		/* #ifdef APP-NVUE */
		box-shadow: 1px 0 0px 0 rgba(0, 0, 0, 0.2);
		/* #endif */
		transition: transform 0.3s;
	}
	
	.evan-switch__text {
		// position: absolute;
		// left: 0;
		// top: 0;
		transition: transform 0.3s;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		/* #ifdef APP-NVUE */
		// padding: 0 10rpx;
		/* #endif */
		// animation: show 0.3s;
	}
	// @keyframes show {
	// 	0% {opacity:0}
	// 	100% {opacity:1}
	// }
</style>
