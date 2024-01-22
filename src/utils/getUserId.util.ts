export const getUserIdUtil = (user: any, role: string = "User"): number => {
    try {
        if (!user) {
            throw new Error("Unauthorized access");
        }
        if (role == "Admin" && user.role !== role) {
            throw new Error("Unauthorized access role");
        }
        return user.id || null;
    } catch (error) {
        console.log(error);
        throw new Error("Unauthorized access");
    }
};
