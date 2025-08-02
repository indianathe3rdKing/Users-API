#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { UsersApiStack } from "../lib/users-api-stack";
import { DynamoDBStack } from "../lib/dynamodb-stack";
import dotenv from "dotenv";

dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL;
const app = new cdk.App();

const dynamodbStack = new DynamoDBStack(app, "DynamoDBStack");

const usersApiStack = new UsersApiStack(app, "UsersApiStack", {
  dynamodbStack,
});
usersApiStack.addDependency(dynamodbStack);
