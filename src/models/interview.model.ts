import { PrismaClient, Prisma, Interview } from "@prisma/client";
const prisma = new PrismaClient();

class InterviewModel {
    create = async (data: Prisma.InterviewCreateInput): Promise<Interview> => {
        return prisma.interview.create({
            data,
        });
    };

    findAll = async (params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.InterviewWhereUniqueInput;
        where?: Prisma.InterviewWhereInput;
        orderBy?: Prisma.InterviewOrderByWithRelationInput;
    }): Promise<Interview[]> => {
        const { skip, take = 3, cursor, where, orderBy } = params;
        return prisma.interview.findMany({
            skip,
            take,
            cursor,
            where: {
                ...where,
                archived_at: null,
            },
            orderBy,
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });
    };

    findOne = async (interviewWhereUniqueInput: Prisma.InterviewWhereUniqueInput): Promise<Interview | null> => {
        return prisma.interview.findUnique({
            where: {
                ...interviewWhereUniqueInput,
                archived_at: null,
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                comment: {
                    take: 3,
                },
                interview_change_log: {
                    take: 3,
                },
            },
        });
    };

    update = async (params: {
        where: Prisma.InterviewWhereUniqueInput;
        data: Prisma.InterviewUpdateInput;
    }): Promise<Interview> => {
        const { where, data } = params;
        return prisma.interview.update({
            data,
            where,
        });
    };

    remove = async (where: Prisma.InterviewWhereUniqueInput): Promise<Interview> => {
        return prisma.interview.delete({
            where,
        });
    };
}
export default new InterviewModel();
