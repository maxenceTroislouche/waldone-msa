export type User = {
    id: number;
    username: string;
};
export type Balance = number;

const credits = new Map<User, Balance>();
credits.set({
    id: 1,
    username: "Max3lush",
}, 100);
credits.set({
    id: 2,
    username: "Noema",
}, 200);
credits.set({
    id: 3,
    username: "Matt1as",
}, 300);

function getUserById(userId: number): User | undefined {
    for (const [user, _] of credits) {
        if (user.id === userId) {
            return user;
        }
    }
    return undefined;
}

export function getUserBalance(userId: number): Balance {
    const user = getUserById(userId);
    if (!user) {
        return 0;
    }
    return credits.get(user) || 0;
}

export function useCredits(userId: number, amount: number) {
    const balance = getUserBalance(userId);
    if (balance < amount) {
        return;
    }
    const user = getUserById(userId);
    if (!user) {
        return;
    }
    credits.set(user, balance - amount);
}
