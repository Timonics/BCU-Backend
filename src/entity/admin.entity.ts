import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Admin {
  @ApiProperty({
    example: 1,
    description: "Auto-generated unique identifier",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Oderinde", description: "First name of admin" })
  @Column()
  firstName: string;

  @ApiProperty({ example: "Michael", description: "Last name of admin" })
  @Column()
  lastName: string;

  @ApiProperty({ example: "mick@example.com", description: "Email address" })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: "Admin email is verified" })
  @Column({ default: false })
  isVerified: boolean;

  @ApiProperty({ description: "Password of the admin" })
  @Column()
  password: string;
}
