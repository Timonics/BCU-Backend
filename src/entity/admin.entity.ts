import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Admin {
  @ApiProperty({
    example: 1,
    description: 'Auto-generated unique identifier',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Oderinde', description: 'First name of member' })
  @Column()
  firstName: string;

  @ApiProperty({ example: 'Michael', description: 'Last name of member' })
  @Column()
  lastName: string;

  @ApiProperty({ example: 'mick@example.com', description: 'Email address' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'Password of the admin' })
  @Column()
  password: string;
}
