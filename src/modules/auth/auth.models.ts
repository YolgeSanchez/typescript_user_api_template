import { model, Schema } from 'mongoose'
import { IAuth } from './auth.interfaces'

const userSchema = new Schema<IAuth>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // this will exclude password from being returned when user is fetched
    }, // replace or add each field for your register model
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export default model('User', userSchema)
