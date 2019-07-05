

export const state=()=>{
    return {
        userInfo:{
           token:"",
            user:{}
        }
    }
};

export const mutations={
    setloginInfo(state,data){
    state.userInfo=data
    },
    clearloginInfo(state,data){
        if(process.browser){
            localStorage.removeItem("userInfo");
        }
        state.userInfo=data
    } 
};

export const actions={
    login({commit},data){
       return this.$axios({
            url: "/accounts/login",
            method: "POST",
            data
        }).then(res => {
            commit("setloginInfo",res.data)
           return res.data 
        })
    }
}

