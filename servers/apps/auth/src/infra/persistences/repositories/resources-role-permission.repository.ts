import { AbstractRepositorymySQL } from '@app/shared';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Role_Has_Resource_Permission } from '../entities';
import { CONNECTION } from '@app/shared/tenancy/tenancy.symbols';

@Injectable()
export class ResourceRolePermessionRepositorySQL extends AbstractRepositorymySQL<Role_Has_Resource_Permission> {
  protected readonly logger = new Logger(
    ResourceRolePermessionRepositorySQL.name,
  );

  constructor(
    @Inject(CONNECTION)
    private readonly dataSource: DataSource,
  ) {
    super(
      dataSource.getRepository(Role_Has_Resource_Permission),
      dataSource.createEntityManager(),
    );
  }

  async findAndGroupByRoleAndResource(idTenant: string): Promise<any> {
    try {
      const rawQuery = `
        SELECT
          rr.user_id,
          rr.role_id,
          r.name as rolename,
          rr.resource_id,
          res.name as resourcename,
          rr.permission_id,
          p.name as permissionname
        FROM
          ${idTenant}.role_has_resource_permission rr
        JOIN
          ${idTenant}.role r ON rr.role_id = r._id
        JOIN
          ${idTenant}.resource res ON rr.resource_id = res._id
        JOIN
          ${idTenant}.permission p ON rr.permission_id = p._id
        ORDER BY
          rr.role_id, rr.resource_id, rr.permission_id;
      `;
      const result = await this.entityManager.query(rawQuery);
      // Transforming the result into the desired nested structure
      const groupedResult = result.reduce((acc, row) => {
        // Ensure user is added
        let user = acc.find((u: any) => u.user_id === row.user_id);
        if (!user) {
          user = {
            user_id: row.user_id,
            roles: [],
          };
          acc.push(user);
        }

        // Ensure role is added
        let role = user.roles.find((r: any) => r.role_id === row.role_id);
        if (!role) {
          role = {
            role_id: row.role_id,
            name: row.rolename,
            resources: [],
          };
          user.roles.push(role);
        }

        // Ensure resource is added
        let resource = role.resources.find(
          (res: any) => res.resource_id === row.resource_id,
        );
        if (!resource) {
          resource = {
            resource_id: row.resource_id,
            name: row.resourcename,
            permissions: [],
          };
          role.resources.push(resource);
        }

        // Add permission to the resource
        resource.permissions.push({
          permission_id: row.permission_id,
          name: row.permissionname,
        });

        return acc;
      }, []);

      return groupedResult;
    } catch (error) {
      this.logger.error('Error executing raw SQL query', error);
      throw new InternalServerErrorException('Error executing raw SQL query');
    }
  }
  async findOneNative(userId: number, idTenant: string) {
    try {
      const rawQuery = `
        SELECT 
          usr._id,
          usr.email,
          usr.username,
          usr.password,
          usr.status
        FROM 
          ${idTenant}.user_auth usr
        WHERE 
          usr._id = ${userId}
      `;
      const result = await this.entityManager.query(rawQuery);
      return result;
    } catch (error) {
      this.logger.error('Error executing raw SQL query', error);
      throw new InternalServerErrorException('Error executing raw SQL query');
    }
  }
  async findIAMUserGroupByUser(
    idTenant: string,
    user_id: number,
  ): Promise<any> {
    try {
      const rawQuery = `
        SELECT
          rr.user_id,
          rr.role_id,
          r.name as rolename,
          rr.resource_id,
          res.name as resourcename,
          rr.permission_id,
          p.name as permissionname
        FROM
          ${idTenant}.role_has_resource_permission rr
        JOIN
          ${idTenant}.role r ON rr.role_id = r._id
        JOIN
          ${idTenant}.resource res ON rr.resource_id = res._id
        JOIN
          ${idTenant}.permission p ON rr.permission_id = p._id
        WHERE rr.usercreated_id = ${user_id}
        ORDER BY
          rr.role_id, rr.resource_id, rr.permission_id;
      `;
      const result = await this.entityManager.query(rawQuery);
      // Transforming the result into the desired nested structure
      const groupedResult = result.reduce((acc, row) => {
        // Ensure user is added
        let user = acc.find((u: any) => u.user_id === row.user_id);
        if (!user) {
          user = {
            user_id: row.user_id,
            roles: [],
          };
          acc.push(user);
        }

        // Ensure role is added
        let role = user.roles.find((r: any) => r.role_id === row.role_id);
        if (!role) {
          role = {
            role_id: row.role_id,
            name: row.rolename,
            resources: [],
          };
          user.roles.push(role);
        }

        // Ensure resource is added
        let resource = role.resources.find(
          (res: any) => res.resource_id === row.resource_id,
        );
        if (!resource) {
          resource = {
            resource_id: row.resource_id,
            name: row.resourcename,
            permissions: [],
          };
          role.resources.push(resource);
        }

        // Add permission to the resource
        resource.permissions.push({
          permission_id: row.permission_id,
          name: row.permissionname,
        });
        return acc;
      }, []);
      return groupedResult;
    } catch (error) {
      this.logger.error('Error executing raw SQL query', error);
      throw new InternalServerErrorException('Error executing raw SQL query');
    }
  }
}
