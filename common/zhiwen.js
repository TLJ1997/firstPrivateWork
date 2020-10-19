export default {
    memberObj:{
		bian:'0'
    },
    setMemberObj(data){
        this.memberObj = Object.assign({},this.memberObj,data) 
    }
}