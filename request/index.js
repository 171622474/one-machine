export const request = (params)=>{
    return new Promise((resove,rejext)=>{
        wx.request({
            ...params,
            success: (result)=>{
                resove(result)
            },
            fail: (err)=>{
                rejext(err)
            },
        })
    })
}