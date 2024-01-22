import { PrismaClient, Prisma, Interview_change_log } from "@prisma/client";
const prisma = new PrismaClient();

class InterviewChangeLogModel {
    create = async (data: Prisma.Interview_change_logCreateInput): Promise<Interview_change_log> => {
        return prisma.interview_change_log.create({
            data,
        });
    };

    findAll = async (params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.Interview_change_logWhereUniqueInput;
        where?: Prisma.Interview_change_logWhereInput;
        orderBy?: Prisma.Interview_change_logOrderByWithRelationInput;
    }): Promise<Interview_change_log[]> => {
        const { skip, take, cursor, where, orderBy } = params;
        return prisma.interview_change_log.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    };

    findOne = async (
        interview_change_logWhereUniqueInput: Prisma.Interview_change_logWhereUniqueInput,
    ): Promise<Interview_change_log | null> => {
        return prisma.interview_change_log.findUnique({
            where: interview_change_logWhereUniqueInput,
        });
    };

    update = async (params: {
        where: Prisma.Interview_change_logWhereUniqueInput;
        data: Prisma.Interview_change_logUpdateInput;
    }): Promise<Interview_change_log> => {
        const { where, data } = params;
        return prisma.interview_change_log.update({
            data,
            where,
        });
    };

    remove = async (where: Prisma.Interview_change_logWhereUniqueInput): Promise<Interview_change_log> => {
        return prisma.interview_change_log.delete({
            where,
        });
    };
}
export default new InterviewChangeLogModel();
