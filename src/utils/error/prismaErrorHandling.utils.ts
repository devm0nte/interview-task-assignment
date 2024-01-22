import HttpException from "../httpException.util";

export const handlePrismaError = (error: any): HttpException => {
    console.log("Prisma Error:", JSON.stringify(error));

    // Prisma error codes documentation: https://www.prisma.io/docs/concepts/components/prisma-client/handling-errors#error-codes
    if (error.code === "P2002") {
        return new HttpException(400, `Duplicate field value. This ${error.meta.target} already exists.`);
    } else if (error.code === "P2025") {
        // Record not found in where cause
        return new HttpException(404, `${error.meta.modelName} not found, or has no associated to this data`);
    }

    return new HttpException(500, "Something went wrong");
};
