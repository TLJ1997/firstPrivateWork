export default {
    memberObj:{
        name:'0',
    },
    setMemberObj(data){
        this.memberObj = Object.assign({},this.memberObj,data) 
    }
}