import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        version: "v0.0.1",
        title: "Interview Task APIs",
        description: "The Swagger UI of Interview Task API Service",
    },
    servers: [
        {
            url: "http://localhost:3000/v1/",
            description: "Version 1",
        },
    ],
    components: {
        schemas: {
            User: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        description: "User ID",
                        example: 1,
                    },
                    name: {
                        type: "string",
                        description: "User name",
                        example: "test",
                    },
                    email: {
                        type: "string",
                        description: "User email",
                        example: "test@mail.com",
                    },
                    password: {
                        type: "string",
                        description: "User password",
                        example: "testtest",
                    },
                    role: {
                        type: "string",
                        enum: ["User", "Admin"],
                        description: "User role",
                        example: "User",
                    },
                    is_active: {
                        type: "boolean",
                        description: "User activity status",
                    },
                    created_at: {
                        type: "string",
                        format: "date-time",
                        description: "User creation timestamp",
                    },
                    updated_at: {
                        type: "string",
                        format: "date-time",
                        description: "User update timestamp",
                    },
                    deleted_at: {
                        type: "string",
                        format: "date-time",
                        description: "User deletion timestamp",
                    },
                    interview: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/Interview",
                        },
                    },
                    interview_change_log: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/InterviewChangeLog",
                        },
                    },
                    comment: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/Comment",
                        },
                    },
                },
            },
            Interview: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        description: "Interview ID",
                        example: 1,
                    },
                    subject: {
                        type: "string",
                        description: "Interview subject",
                        example: "test topic",
                    },
                    description: {
                        type: "string",
                        description: "Interview description",
                        example: "test description",
                    },
                    status: {
                        type: "string",
                        enum: ["Todo", "InProgress", "Done"],
                        description: "Interview status",
                        example: "Todo",
                    },
                    author_id: {
                        type: "integer",
                        description: "ID of the user who authored the interview",
                        example: 1,
                    },
                    created_at: {
                        type: "string",
                        format: "date-time",
                        description: "Interview creation timestamp",
                    },
                    updated_at: {
                        type: "string",
                        format: "date-time",
                        description: "Interview update timestamp",
                    },
                    archived_at: {
                        type: "string",
                        format: "date-time",
                        description: "Interview archival timestamp",
                    },
                    interview_change_log: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/InterviewChangeLog",
                        },
                    },
                    comment: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/Comment",
                        },
                    },
                },
            },
            InterviewChangeLog: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        description: "Interview change log ID",
                    },
                    interview_id: {
                        type: "integer",
                        description: "ID of the interview associated with the change log",
                    },
                    subject: {
                        type: "string",
                        description: "Change log subject",
                    },
                    description: {
                        type: "string",
                        description: "Change log description",
                    },
                    status: {
                        type: "string",
                        enum: ["Todo", "InProgress", "Done"],
                        description: "Change log status",
                    },
                    editor_id: {
                        type: "integer",
                        description: "ID of the user who edited the interview",
                    },
                    updated_at: {
                        type: "string",
                        format: "date-time",
                        description: "Change log update timestamp",
                    },
                    archived_at: {
                        type: "string",
                        format: "date-time",
                        description: "Change log archival timestamp",
                    },
                },
            },
            Comment: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        description: "Comment ID",
                        example: 1,
                    },
                    interview_id: {
                        type: "integer",
                        description: "ID of the interview associated with the comment",
                        example: 1,
                    },
                    author_id: {
                        type: "integer",
                        description: "ID of the user who authored the comment",
                        example: 1,
                    },
                    message: {
                        type: "string",
                        description: "Comment message",
                        example: "test comment",
                    },
                    created_at: {
                        type: "string",
                        format: "date-time",
                        description: "Comment creation timestamp",
                    },
                    updated_at: {
                        type: "string",
                        format: "date-time",
                        description: "Comment update timestamp",
                    },
                    deleted_at: {
                        type: "string",
                        format: "date-time",
                        description: "Comment deletion timestamp",
                    },
                },
            },
        },
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
            },
        },
    },
    tags: [
        {
            name: "Authentication",
            description: "Authentication and User APIs",
        },
        {
            name: "Interviews",
            description: "Interview APIs",
        },
        {
            name: "Comments",
            description: "Comments API",
        },
    ],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./routes/routes.ts"];

swaggerAutogen({ openapi: "3.0.0", language: "en-US" })(outputFile, endpointsFiles, doc);
