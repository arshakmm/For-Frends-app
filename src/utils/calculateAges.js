
const calculateAge=(day,month,year)=>{
    const date= new Date()
    const currentYear = date.getFullYear()
    const currentMonth= date.getMonth()+1
    const currentDay = date.getDay()
    let age = currentYear-year-1
    if(currentMonth>month){
        age++
    }
    if(currentMonth===month&&currentDay>day){
        age++
    }
    return age
}


export default calculateAge