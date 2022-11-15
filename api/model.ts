import { prop, getModelForClass } from "@typegoose/typegoose";

export class User {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public email!: string;

  @prop({ required: true })
  public age!: number;

  @prop({ required: false, default: "user" })
  public Role?: string;
}

export const UserModel = getModelForClass(User);