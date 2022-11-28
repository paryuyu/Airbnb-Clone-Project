import mongoose from "mongoose";

export interface ReservationData {
    productId:string,
    guestEmail:string,
    paypal:{
        orderId:string,
        payId:string
    },
    checkin:Date,
    checkout:Date,
    guest:number,
    numberOfInfants:number,
    numberOfPets:number,
    numberOfAdults:number,
    numberOfChildren:number
   
}

const ReservationSchema = new mongoose.Schema<ReservationData>({
    productId:String,
    guestEmail:String,
    paypal:{
        orderId:String,
        payId:String,
    },
    checkin:Date,
    checkout:Date,
    guest:Number,
    numberOfInfants:Number,
    numberOfPets:Number,
    numberOfAdults:Number,
    numberOfChildren:Number
})


export default mongoose.models.reservation || mongoose.model<ReservationData>("reservation", ReservationSchema);