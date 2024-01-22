import { PrismaClient, Prisma, Comment } from "@prisma/client";
const prisma = new PrismaClient();

class CommentModel {
    create = async (data: Prisma.CommentCreateInput): Promise<Comment> => {
        return prisma.comment.create({
            data,
        });
    };

    findAll = async (params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.CommentWhereUniqueInput;
        where?: Prisma.CommentWhereInput;
        orderBy?: Prisma.CommentOrderByWithRelationInput;
    }): Promise<Comment[]> => {
        const { skip, take = 3, cursor, where, orderBy } = params;
        return prisma.comment.findMany({
            skip,
            take,
            cursor,
            where: {
                ...where,
                deleted_at: null,
            },
            orderBy,
        });
    };

    findOne = async (commentWhereUniqueInput: Prisma.CommentWhereUniqueInput): Promise<Comment | null> => {
        return prisma.comment.findUnique({
            where: {
                ...commentWhereUniqueInput,
                deleted_at: null,
            },
        });
    };

    update = async (params: { where: Prisma.CommentWhereUniqueInput; data: Prisma.CommentUpdateInput }): Promise<Comment> => {
        const { where, data } = params;
        return prisma.comment.update({
            data,
            where,
        });
    };

    remove = async (where: Prisma.CommentWhereUniqueInput): Promise<Comment> => {
        return prisma.comment.delete({
            where,
        });
    };
}
export default new CommentModel();
