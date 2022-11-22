


import mongoose, { Schema } from "mongoose"


export interface UserData {
    _id?:string;
    email: string;
    lastname: string;
    firstname: string;
    birthday: Date;
    password:string;
    marketingAgreeDate: Date;
    privacyTermsAgreeDate: Date;
    marketingAgreeState:string;
    AntiDiscrimination:string;
}

const UserSchema = new mongoose.Schema<UserData>({
    email: { type: String, required: true , trim:true , unique:true},
    password: { type: String, required: true },
    lastname: { type: String, required: true },
    firstname: { type: String, required: true },
    birthday: { type: Date, required: true },
    marketingAgreeDate: { type: Date || null, required: true },
    privacyTermsAgreeDate: { type: Date || null, required: true },
    marketingAgreeState: { type: String, required: true },
    AntiDiscrimination:{type:String, required:true}
})


export default mongoose.models.user || mongoose.model<UserData>("user", UserSchema);