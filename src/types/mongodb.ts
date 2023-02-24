import {
  InferSchemaType,
  Model,
  Mongoose,
  ObtainSchemaGeneric,
  Schema,
} from 'mongoose'

declare global {
  var mongoose: {
    promise: Promise<Mongoose> | null
    conn: Mongoose | null
  }
}

export type MongoGenericModel<TSchema extends Schema = any> = Model<
  InferSchemaType<TSchema>,
  ObtainSchemaGeneric<TSchema, 'TQueryHelpers'>,
  ObtainSchemaGeneric<TSchema, 'TInstanceMethods'>,
  ObtainSchemaGeneric<TSchema, 'TVirtuals'>,
  TSchema
> &
  ObtainSchemaGeneric<TSchema, 'TStaticMethods'>
