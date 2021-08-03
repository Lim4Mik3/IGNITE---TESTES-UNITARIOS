import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase"

let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create user use case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  })

  it("Should be able create a user", async() => {
    const user = {
      name: "Leonardo Oliveira",
      email: "test@test.com",
      password: "test"
    }

    const userCreated = await createUserUseCase.execute(user);

    expect(userCreated).toHaveProperty("id")

  })

  it("should not be able create a user with the email in use", async () => {
    expect(async () => {
      const user = {
        name: "Leonardo Oliveira",
        email: "test@test.com",
        password: "test"
      }

      await createUserUseCase.execute(user)

      await createUserUseCase.execute(user)
    }).rejects.toBeInstanceOf(CreateUserError);
  })
})
