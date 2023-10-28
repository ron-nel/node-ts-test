export class Response {
    constructor( public success: boolean, public data?: any, public errors?: string[] ) {}

    static success (data: any) : Response {
        return new Response(true, data, undefined)
    }

    static fail(errors: string[]): Response {
        return new Response(false, undefined, errors)
    }
}

export class User {
    private static users: User[] = [];

    constructor(
        public name: string,
        public amount: number,
        public role?: string
    ) {
        this.role = role ?? "client";
        User.users.push(this)
    }

    viewBalance(): number {
        return this.amount;
    }

    deposit(amount: number): boolean {
        amount <= 0 && false;
        this.setAmount(this.amount+amount);
        return true;
    }

    withdraw(amount: number): boolean {
        amount >= this.amount && false;
        this.setAmount(this.amount-amount);
        return true;
    }

    transfer(name: string, amount: number): boolean {
        const targetUser = User.findUser(name);
        !targetUser && false;
        !this.withdraw(amount) && false;
        !targetUser?.deposit(amount) && false;
        return true;
    }

    setAmount(amount: number): void {
        this.amount = amount;
    }

    static getUsers(): User[] {
        return User.users;
    }

    static findUser(name: string): User | undefined {
        return User.users.find(user => user.name === name)  
    }

    static getTotalAmount(name: string): Number {
        const manager = User.findUser(name);
        if (manager?.role === "manager") {
            return User.users.map(user => user.amount).reduce((a,b) => a + b, 0);
        }
        return 0;
    }
}

export const createUser = (name: string, amount: number, role?: string ): Response => {
    let errors: string[] = [];

    if (typeof(name) === undefined || name === null || name.trim().length === 0) {
        errors = [...errors, "Name cannot be empty"];
    }

    if (amount === null || amount === undefined || amount <= 0 ) {
        errors = [...errors, "Amount must be more than 0"];
    }

    if (errors.length > 0) {
        return Response.fail(errors);
    }

    const newUser = new User(name, amount, role);
    return Response.success({"user": newUser});
}