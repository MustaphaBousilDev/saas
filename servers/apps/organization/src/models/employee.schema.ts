import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { DepartementORG } from './departement.schema';
// import { Departement } from './departement.schema';

@Entity()
@ObjectType() // for add it in schema qraphql
export class EmployeeORG extends AbstractEntity<EmployeeORG> {
  @Column()
  @Field() // for graph
  name: string;

  @Column()
  @Field() // for graph
  image: string;

  @ManyToOne(() => DepartementORG, (departement) => departement.employee, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  departement: DepartementORG;
}
