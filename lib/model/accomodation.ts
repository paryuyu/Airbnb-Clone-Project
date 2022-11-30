


import mongoose, { Schema } from "mongoose";

export type AmenityData = {
    facilities: string[];
    special: string[];
    safty: string[];
}



export type floorPlanData = {
    guest: number,
    bed: number,
    bedroom: number,
    bathroom: number
}
type Location = {
    lat:number;
    lng:number;
}
export interface AccomodationData {
    _id: string;
    email?: string
    groupType?: string;
    propertyType?: string;
    privacyType?: string;
    location?: Location;
    address?:string;
    floorPlan?: floorPlanData;
    amenities?: AmenityData;
    Photos?: string[];
    title?: string;
    description?: string[];
    price?: number;
    receipt?: string;
    publish?: boolean;
    reservationData?:any;
}

const AccomodationSchema = new mongoose.Schema<AccomodationData>({
    groupType: { type: String },
    email: { type: String },
    propertyType: { type: String },
    privacyType: { type: String },
    location: { type: Object },
    address:{type:String},
    floorPlan: { type: Object },
    amenities: { type: Object },
    Photos: { type: Array },
    title: { type: String },
    description: { type: Array },
    price: { type: Number },
    receipt: { type: Date },
    publish: { type: Boolean },
})

AccomodationSchema.virtual('reservationData',{
    localField:'_id',
    foreignField:'productId',
    ref:'reservation'
})


export default mongoose.models.accomodation || mongoose.model<AccomodationData>("accomodation", AccomodationSchema);