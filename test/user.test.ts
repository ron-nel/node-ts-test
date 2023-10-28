import { User, createUser, Response } from "../src/user";

describe("Response class", () => {

    it("should return a fail Response obejct", () => {
        const newSuccessResponse = Response.fail(["sample errors"])
        expect(newSuccessResponse).toEqual({
            success: false,
            errors: ["sample errors"]
        })
    })

    it("should return a success Response obejct", () => {
        const newSuccessResponse = Response.success({"test": "sample data"})
        expect(newSuccessResponse).toEqual({
            success: true,
            data: {"test": "sample data"}
        })
    })

})

it("should return a response object containing User object", () => {
    expect(createUser("", 100)).toEqual({
        success: false,
        errors: ["Name cannot be empty"],
    })

    expect(createUser("Sam", 0)).toEqual({
        success: false,
        errors: ["Amount must be more than 0"],
    })

    createUser("Peter", 10, "manager");
    createUser("Mary", 400);

    expect(createUser("John", 100)).toEqual({
        success: true,
        data: {"user": {"name": "John", "amount": 100, "role": "client"}},
    })
})

describe("User Class", () => {

    it("should find user", () => {
        const existingUser = User.findUser("John");
        expect(existingUser).toBeDefined();
    })

    it("should view balance of user", () => {
        const existingUser = User.findUser("John");
        expect(existingUser?.viewBalance()).toBe(100);
    })

    it("should deposit to user", () => {
        const existingUser = User.findUser("John");
        expect(existingUser?.deposit(500)).toBeTruthy();
        expect(existingUser?.amount).toBe(600);
    })

    it("should withdraw to user", () => {
        const existingUser = User.findUser("John");
        expect(existingUser?.withdraw(200)).toBeTruthy();
        expect(existingUser?.amount).toBe(400);
    })

    it("should transfer amount from one user to another", () => {
        const existingUser = User.findUser("John");
        expect(existingUser?.transfer("Mary", 200)).toBeTruthy();
        expect(existingUser?.amount).toBe(200);
        
        const targetUser = User.findUser("Mary");
        expect(targetUser?.amount).toBe(600);
    })

    it("should return all users", () => {
        const users = User.getUsers();
        expect(users).toBeTruthy();
    })

    it("should return 0 as the total amount of all users", () => {
        const totalAmount = User.getTotalAmount("John");
        expect(totalAmount).toBe(0);
    })

    it("should return the total amount of all users", () => {
        const totalAmount = User.getTotalAmount("Peter");
        expect(totalAmount).toBe(810);
    })

  });