import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { User } from "src/users/user.entity";
import { scrypt as _scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

describe("AuthService", () => {
  let service: AuthService;

  //resolving the dependency of Auth Service by creating fake users service
  let fakeUsersService: Partial<UsersService>;
  beforeEach(async () => {
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 99999),
          email,
          password,
        };
        users.push(user);
        return Promise.resolve(user);
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("creates a new user with a salted and hashed password", async () => {
    const user = await service.signup("test@gmail.com", "password");
    expect(user.password).not.toEqual("password");
    const [salt, hash] = user.password.split(".");
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it("throws an error if user signs up with email that is in use", async () => {
    fakeUsersService.find = () =>
      Promise.resolve([{ id: 1, email: "a", password: "1" } as User]);
    await expect(service.signup("asdf@asdf.com", "asdf")).rejects.toThrow(
      BadRequestException,
    );
  });

  it("throws if signin is called with an unused email", async () => {
    await expect(
      service.signin("asdflkj@asdlfkj.com", "passdflkj"),
    ).rejects.toThrow(NotFoundException);
  });

  //   it("throws an error if invalid password is given", async () => {
  //     fakeUsersService.find = () =>
  //       Promise.resolve([{ email: "asdflkj@asdlfkj.com", password: "password" } as User]);

  //     await expect(
  //       service.signin("asdflkj@asdlfkj.com", "password"),
  //     ).rejects.toThrow(BadRequestException);
  //   });

  it("throws an error if invalid password is given", async () => {
    const salt = randomBytes(8).toString("hex");

    const hash = (await scrypt("correct_password", salt, 32)) as Buffer;

    const storedPassword = salt + "." + hash.toString("hex");

    fakeUsersService.find = () =>
      Promise.resolve([
        { email: "test@test.com", password: storedPassword } as User,
      ]);

    await expect(
      service.signin("test@test.com", "wrong_password"),
    ).rejects.toThrow(BadRequestException);
  });

  it("returns a user if correct password is provided", async() => {
    await service.signup("test@gmail.com", "password");
    const user = await service.signin("test@gmail.com", "password");
    expect(user).toBeDefined();
  });
});
