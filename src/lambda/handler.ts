import { ApiGateway } from "aws-cdk-lib/aws-events-targets";
import { APIGatewayProxyEventV2, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResult> => {
  const method = event.requestContext.http.method;
  const path = event.requestContext.http.path;

  try {
    if (path === "/users") {
      switch (method) {
        case "GET":
          return getAllUsers(event);
        case "POST":
          return createUser(event);
        default:
          return {
            statusCode: 400,
            body: JSON.stringify({
              message: "Unsupported method for /users path",
            }),
          };
      }
    }
    if (path.startsWith("/users/")) {
      const userId = path.split("/")[1];
      if (!userId) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "User ID IS REQUIRED" }),
        };
      }

      switch (method) {
        case "GET":
          return getUser(userId);
        case "PUT":
          return updateUser(userId, event);
        case "DELETE":
          return deleteUser(userId);
      }
    }
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Not found",
      }),
    };
  } catch (error) {
    console.error("Error while processing request:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error",
      }),
    };
  }
};

async function getAllUsers(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "fetch all users",
    }),
  };
}
async function createUser(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Create a new user",
    }),
  };
}
async function getUser(userId: string): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "fetch user with id ",
    }),
  };
}
async function updateUser(
  userId: string,
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "update user  ",
    }),
  };
}
async function deleteUser(userId: string): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `user deleted : ${userId}`,
    }),
  };
}
