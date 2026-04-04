import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { AuthService } from "../auth/auth.service";
import { User } from "./user.entity";
import { NotFoundException } from "@nestjs/common";

describe("UsersController", () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeAuthService = {
      signup: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password });
      },
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password });
      },
    };
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: "test@gmail.com",
          password: "password",
        });
      },
      find: (email: string) => {
        return Promise.resolve([
          { id: 1, email, password: "password" },
          { id: 1, email, password: "password" },
        ]);
      },
      create: (email: string, password: string) => {
        return Promise.resolve({
          id: 1,
          email,
          password,
        });
      },
      // update: (id: number, attrs: Partial<User>) => {
      //   return Promise.resolve([{ id, email: attrs.email, password: attrs.password}])
      // },
      // remove: (id: number) => {
      //   return Promise.resolve({ id, email: "test@gmail.com", password: 'password'});
      // },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("findUser retruns a user with the given id", async () => {
    const user = await controller.findUser("1");
    expect(user.email).toEqual("test@gmail.com");
    expect(user).toBeDefined();
  });

  it("findUser throws an error if user with given id is not found", async () => {
    fakeUsersService.findOne = () => null;
    await expect(controller.findUser("1")).rejects.toThrow(NotFoundException);
  });

  it("findAllUsers returns a list of users with given email", async () => {
    const users = await controller.findAllUsers("test@gmail.com");
    expect(users).toHaveLength(2);
    expect(users[0].email).toEqual("test@gmail.com");
  });

  it("signup users and sets the session email to the passed in email", async () => {
    const session = { email: "test@1.com" };
    const user = await controller.createUser(
      { email: "asdf@gmail.com", password: "123" },
      session,
    );
    expect(user).toBeDefined();
    expect(user.email).toEqual("asdf@gmail.com");
    expect(session.email).toEqual("asdf@gmail.com");
  });

  it("signin users and sets the session userId to the passed in id", async () => {
    const session = { userId: "1" };
    const user = await controller.signin(
      { email: "asdf@gmail.com", password: "123" },
      session,
    );
    expect(user).toBeDefined();
    expect(user.email).toEqual("asdf@gmail.com");
    expect(session.userId).toEqual(1);
  });
});
