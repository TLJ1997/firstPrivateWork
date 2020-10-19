export default {
    memberObj:{
		url:'211.159.188.215'
    },
    setMemberObj(data){
        this.memberObj = Object.assign({},this.memberObj,data) 
    }
}