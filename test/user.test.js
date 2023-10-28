"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../src/user");
describe("Response class", () => {
    it("should return a fail Response obejct", () => {
        const newSuccessResponse = user_1.Response.fail(["sample errors"]);
        expect(newSuccessResponse).toEqual({
            success: false,
            errors: ["sample errors"]
        });
    });
    it("should return a success Response obejct", () => {
        const newSuccessResponse = user_1.Response.success({ "test": "sample data" });
        expect(newSuccessResponse).toEqual({
            success: true,
            data: { "test": "sample data" }
        });
    });
});
it("should return a response object containing User object", () => {
    expect((0, user_1.createUser)("", 100)).toEqual({
        success: false,
        errors: ["Name cannot be empty"],
    });
    expect((0, user_1.createUser)("Sam", 0)).toEqual({
        success: false,
        errors: ["Amount must be more than 0"],
    });
    (0, user_1.createUser)("Peter", 10, "manager");
    (0, user_1.createUser)("Mary", 400);
    expect((0, user_1.createUser)("John", 100)).toEqual({
        success: true,
        data: { "user": { "name": "John", "amount": 100, "role": "client" } },
    });
});
describe("User Class", () => {
    it("should find user", () => {
        const existingUser = user_1.User.findUser("John");
        expect(existingUser).toBeDefined();
    });
    it("should view balance of user", () => {
        const existingUser = user_1.User.findUser("John");
        expect(existingUser === null || existingUser === void 0 ? void 0 : existingUser.viewBalance()).toBe(100);
    });
    it("should deposit to user", () => {
        const existingUser = user_1.User.findUser("John");
        expect(existingUser === null || existingUser === void 0 ? void 0 : existingUser.deposit(500)).toBeTruthy();
        expect(existingUser === null || existingUser === void 0 ? void 0 : existingUser.amount).toBe(600);
    });
    it("should withdraw to user", () => {
        const existingUser = user_1.User.findUser("John");
        expect(existingUser === null || existingUser === void 0 ? void 0 : existingUser.withdraw(200)).toBeTruthy();
        expect(existingUser === null || existingUser === void 0 ? void 0 : existingUser.amount).toBe(400);
    });
    it("should transfer amount from one user to another", () => {
        const existingUser = user_1.User.findUser("John");
        expect(existingUser === null || existingUser === void 0 ? void 0 : existingUser.transfer("Mary", 200)).toBeTruthy();
        expect(existingUser === null || existingUser === void 0 ? void 0 : existingUser.amount).toBe(200);
        const targetUser = user_1.User.findUser("Mary");
        expect(targetUser === null || targetUser === void 0 ? void 0 : targetUser.amount).toBe(600);
    });
    it("should return all users", () => {
        const users = user_1.User.getUsers();
        expect(users).toBeTruthy();
    });
    it("should return 0 as the total amount of all users", () => {
        const totalAmount = user_1.User.getTotalAmount("John");
        expect(totalAmount).toBe(0);
    });
    it("should return the total amount of all users", () => {
        const totalAmount = user_1.User.getTotalAmount("Peter");
        expect(totalAmount).toBe(810);
    });
});
//# sourceMappingURL=user.test.js.map