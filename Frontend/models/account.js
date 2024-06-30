import { Int32 } from "mongodb";
import mongoose, {Schema} from "mongoose";

const accountSchema = new Schema (
    {
        accountAddress: String,
        accountName: String,
        isCompany: Boolean,
        assets: {
            type: Map,
            of: new Schema({
                nftName: String,
                points: Number
            })
        }
    },
);

const Account =  mongoose.model.Account || mongoose.model("Account", accountSchema);

export default Account

