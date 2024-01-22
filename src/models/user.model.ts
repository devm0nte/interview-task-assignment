import { PrismaClient, Prisma, User } from "@prisma/client";
const prisma = new PrismaClient();

class UserModel {
    create = async (data: Prisma.UserCreateInput): Promise<User> => {
        return prisma.user.create({
            data,
        });
    };

    findAll = async (params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<User[]> => {
        const { skip, take = 3, cursor, where, orderBy } = params;
        return prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    };

    findOne = async (userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> => {
        return prisma.user.findUnique({
            where: userWhereUniqueInput,
        });
    };

    update = async (params: { where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput }): Promise<User> => {
        const { where, data } = params;
        return prisma.user.update({
            data,
            where,
        });
    };

    remove = async (where: Prisma.UserWhereUniqueInput): Promise<User> => {
        return prisma.user.delete({
            where,
        });
    };
}
export default new UserModel();
