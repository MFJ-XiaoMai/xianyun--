
export const state = () => {
  //采用接口返回数据结构
  return{
    hotelInfo: {
      hotelassets:{},
    },
  }
}

export const mutations = {
  // 保存信息到state(设置用户数据)
  setHotelInfo(state, data) {//state指向上面的const state 
    state.hotelInfo = data  //date 是第二个参数即传递过来的数据
    // console.log(data);
  },
}