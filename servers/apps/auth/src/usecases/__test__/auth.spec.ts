import { IsAuthenticatedUseCases } from '../isAuthenticated.usecases';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { UserM } from '../../domain/model/user';
import { LoginUseCases } from '../auth/login.usecases';
import { LogoutUseCases } from '../auth/logout.usecases';
import { ILogger } from '../../domain/logger/logger.interface';
import { IException } from '../../domain/exception/exception.interface';
import { IJwtService } from '../../domain/adapter/jwt.interface';
import { JWTConfig } from '../../domain/config/jwt.interface';
import { IBcryptService } from '../../domain/adapter/bcrypt.interface';

describe('useCases Authentication', () => {
  let isAuthenticated: IsAuthenticatedUseCases;
  let adminUserRepo: UserRepository;
  //loggin
  let loginUseCases: LoginUseCases;
  let logoutUseCases: LogoutUseCases;
  let logger: ILogger;
  let exception: IException;
  let jwtService: IJwtService;
  let jwtConfig: JWTConfig;
  let bcryptService: IBcryptService;
  beforeEach(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();
    exception = {} as IException;
    jwtService = {} as IJwtService;
    jwtService.createToken = jest.fn();
    jwtConfig = {} as JWTConfig;
    jwtConfig.getJwtExpirationTime = jest.fn();
    jwtConfig.getJwtSecret = jest.fn();
    jwtConfig.getJwtRefreshSecret = jest.fn();
    jwtConfig.getJwtRefreshExpirationTime = jest.fn();
    adminUserRepo = {} as UserRepository;
    adminUserRepo.getUserByUsername = jest.fn();
    adminUserRepo.updateLastLogin = jest.fn();
    adminUserRepo.updateRefreshToken = jest.fn();
    bcryptService = {} as IBcryptService;
    bcryptService.compare = jest.fn();
    bcryptService.hash = jest.fn();
    isAuthenticated = new IsAuthenticatedUseCases(adminUserRepo);
    loginUseCases = new LoginUseCases(
      logger,
      jwtService,
      jwtConfig,
      adminUserRepo,
      bcryptService,
    );
    logoutUseCases = new LogoutUseCases();
  });
  describe('creating a cookie', () => {
    // return cookie
    it('should return a cookie', async () => {
      const expireIn = '200';
      const token = 'token';
      (jwtConfig.getJwtSecret as jest.Mock).mockReturnValue(() => 'secret');
      (jwtConfig.getJwtExpirationTime as jest.Mock).mockReturnValue(expireIn);
      (jwtService.createToken as jest.Mock).mockReturnValue(token);

      expect(await loginUseCases.getCookieWithJwtToken(1)).toEqual(
        `Authentication=${token}; HttpOnly; Path=/; Max-Age=${expireIn}`,
      );
    });
    // return refresh in cookie
    it('should return a refresh cookie', async () => {
      const expireIn = '200';
      const token = 'token';
      (jwtConfig.getJwtRefreshSecret as jest.Mock).mockReturnValue(
        () => 'secret',
      );
      (jwtConfig.getJwtRefreshExpirationTime as jest.Mock).mockReturnValue(
        expireIn,
      );
      (jwtService.createToken as jest.Mock).mockReturnValue(token);
      (bcryptService.hash as jest.Mock).mockReturnValue(
        Promise.resolve('hashed password'),
      );
      (adminUserRepo.updateRefreshToken as jest.Mock).mockReturnValue(
        Promise.resolve(null),
      );

      expect(await loginUseCases.getCookieWithJwtRefreshToken(1)).toEqual(
        `Refresh=${token}; HttpOnly; Path=/; Max-Age=${expireIn}`,
      );
      expect(adminUserRepo.updateRefreshToken).toBeCalledTimes(1);
    });
    //validate Local Strategy
  });
  describe('validate local strategy', () => {
    it('should return null because user not found', async () => {
      (adminUserRepo.getUserByUsername as jest.Mock).mockReturnValue(
        Promise.resolve(null),
      );
      expect(
        await loginUseCases.validateUserForLocalStragtegy(1, 'password'),
      ).toEqual(null);
    });
    it('it should return null because wrong password', async () => {
      const user: UserM = {
        id: 1,
        firstName: 'firstName',
        lastName: 'lastName',
        password: 'password',
        lastLogin: null,
        email: 'rert@gmail.com',
        roles: 'Admin',
        hashRefreshToken: 'refresh token',
        createDate: new Date(),
        updatedDate: new Date(),
      };
      (adminUserRepo.getUserByUsername as jest.Mock).mockReturnValue(
        Promise.resolve(user),
      );
      (bcryptService.compare as jest.Mock).mockReturnValue(
        Promise.resolve(false),
      );
      expect(
        await loginUseCases.validateUserForLocalStragtegy(1, 'password'),
      ).toEqual(null);
    });
    it('should return user without password', async () => {
      const userd: UserM = {
        id: 1,
        firstName: 'rrr',
        lastName: 'rtrt',
        email: 'ererer',
        password: 'ererer',
        lastLogin: null,
        hashRefreshToken: 'refdlfk',
        roles: '',
        createDate: new Date(),
        updatedDate: new Date(),
      };
      (adminUserRepo.getUserByUsername as jest.Mock).mockReturnValue(
        Promise.resolve(userd),
      );
      (bcryptService.compare as jest.Mock).mockReturnValue(
        Promise.resolve(true),
      );
      const { password, ...rest } = userd;
      console.log(password);
      expect(
        await loginUseCases.validateUserForLocalStragtegy(1, 'password'),
      ).toEqual(rest);
    });
  });
  describe('isAuthenticated', () => {
    it('should return an array to invalid the cookie', async () => {
      const user: UserM = {
        id: 1,
        firstName: 'username',
        lastName: 'lastName',
        password: 'password',
        email: 'err@gmail.com',
        roles: 'Admin',
        lastLogin: null,
        hashRefreshToken: 'refresh token',
        createDate: new Date(),
        updatedDate: new Date(),
      };
      (adminUserRepo.getUserByUsername as jest.Mock).mockReturnValue(
        Promise.resolve(user),
      );

      const { password, ...rest } = user;
      console.log(password);

      expect(await isAuthenticated.execute(user.id)).toEqual(rest);
    });
  });
  describe('validation jwt strategy', () => {
    it('should return null because user not found', async () => {
      (adminUserRepo.getUserByUsername as jest.Mock).mockReturnValue(
        Promise.resolve(null),
      );
      (bcryptService.compare as jest.Mock).mockReturnValue(
        Promise.resolve(false),
      );
      expect(await loginUseCases.validateUserForJWTStragtegy(1)).toEqual(null);
    });
    it('should return user', async () => {
      const user: UserM = {
        id: 1,
        firstName: 'username',
        lastName: 'lastName',
        password: 'password',
        email: 'err@gmail.com',
        roles: 'Admin',
        lastLogin: null,
        hashRefreshToken: 'refresh token',
        createDate: new Date(),
        updatedDate: new Date(),
      };
      (adminUserRepo.getUserByUsername as jest.Mock).mockReturnValue(
        Promise.resolve(user),
      );
      expect(await loginUseCases.validateUserForJWTStragtegy(1)).toEqual(user);
    });
  });
  describe('Validation refresh token', () => {
    it('should return null because user not found', async () => {
      (adminUserRepo.getUserByUsername as jest.Mock).mockReturnValue(
        Promise.resolve(null),
      );

      expect(
        await loginUseCases.getUserIfRefreshTokenMatches('refresh token', 1),
      ).toEqual(null);
    });
    it('should retutn null because user not found', async () => {
      const user: UserM = {
        id: 1,
        firstName: 'rrrr',
        lastLogin: null,
        lastName: 'erer',
        hashRefreshToken: 'erer',
        email: 'lrktkrlt',
        roles: 'lkrtkl',
        password: 'rktkrt',
        createDate: new Date(),
        updatedDate: new Date(),
      };
      (adminUserRepo.getUserByUsername as jest.Mock).mockReturnValue(
        Promise.resolve(user),
      );
      (bcryptService.compare as jest.Mock).mockReturnValue(
        Promise.resolve(false),
      );
      expect(
        await loginUseCases.getUserIfRefreshTokenMatches('refresh token', 1),
      ).toEqual(null);
    });
    it('should return user', async () => {
      const user: UserM = {
        id: 1,
        firstName: 'rrrr',
        lastLogin: null,
        lastName: 'erer',
        hashRefreshToken: 'erer',
        email: 'lrktkrlt',
        roles: 'lkrtkl',
        password: 'rktkrt',
        createDate: new Date(),
        updatedDate: new Date(),
      };
      (adminUserRepo.getUserByUsername as jest.Mock).mockReturnValue(
        Promise.resolve(user),
      );
      (bcryptService.compare as jest.Mock).mockReturnValue(
        Promise.resolve(true),
      );
      expect(
        await loginUseCases.getUserIfRefreshTokenMatches('refresh token', 1),
      ).toEqual(user);
    });
  });
  describe('logout', () => {
    it('should return an array to invalid the cookie', async () => {
      expect(await logoutUseCases.execute()).toEqual([
        'Authentication=; HttpOnly; Path=/; Max-Age=0',
        'Refresh=; HttpOnly; Path=/; Max-Age=0',
      ]);
    });
  });
});
