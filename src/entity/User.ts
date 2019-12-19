import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import { Entity, CreateDateColumn, UpdateDateColumn, BaseEntity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, AfterInsert, AfterUpdate } from "typeorm";

export interface UserDocument {
  id: number;
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: string;
  facebook: string;
  tokens: AuthToken[];
  profile: Profile;
  comparePassword: comparePasswordFunction;
  gravatar: (size: number) => string;
}

export interface Profile {
  name: string;
  gender: string;
  location: string;
  website: string;
  picture: string;
}

export interface AuthToken {
  accessToken: string;
  kind: string;
}

type comparePasswordFunction = (candidatePassword: string, cb: (err: Error, isMatch: boolean) => {}) => void;

@Entity()
export class User extends BaseEntity implements UserDocument {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({
    nullable: true,
    default: undefined
  })
  email: string;

  @Column({
    nullable: true,
    default: undefined
  })
  password: string;

  private tempPassword: string;

  @AfterInsert()
  @AfterUpdate()
  private loadTempPassword(): void {
    this.tempPassword = this.password;
  }

  @Column({
    nullable: true,
    default: undefined
  })
  passwordResetToken: string;

  @Column({
    nullable: true,
    default: undefined
  })
  passwordResetExpires: string;

  @Column({
    nullable: true,
    default: undefined
  })
  facebook: string;

  @Column({
    nullable: true,
    default: undefined
  })
  twitter: string;

  @Column({
    nullable: true,
    default: undefined
  })
  google: string;

  @Column("simple-array", {
    nullable: true
  })
  tokens: AuthToken[] = [];

  @Column("simple-json", {
    nullable: true
  })
  profile: {
    name: string;
    gender: string;
    location: string;
    website: string;
    picture: string;
  };

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  genSalt = function () {
    if (this.tempPassword === this.password) { return; }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
  };

  comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
      cb(err, isMatch);
    });
  };

  gravatar = function (size: number = 200) {
    if (!this.email) {
      return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto.createHash("md5").update(this.email).digest("hex");
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
  }
}
