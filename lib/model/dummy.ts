


import mongoose, { Schema } from "mongoose"

export type Types = {
    property:string;
    description:string;
}

export interface Dummy {
    _id:string;
    group: string;
    image: string;
    types?: Types[];
}

const DummySchema = new mongoose.Schema<Dummy>({
    _id:String, 
    group: { type: String},
    image: { type: String},
    types: { type: Array }
})


export default mongoose.models.dummy || mongoose.model<Dummy>("dummy", DummySchema);