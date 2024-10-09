import { model, Schema } from 'mongoose'
import { IUser } from './users.interfaces'

const userSchema = new Schema<IUser>(
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
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
      default: 'user',
    }, // replace or add each field for your user model
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export default model('User', userSchema)
