#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { AwsCdkPracticeStack } from "../lib/aws-cdk-practice-stack";
import { S3Stack } from "../lib/aws-s3-bucket-stack";

const app = new cdk.App();
const env = {
  region: app.node.tryGetContext("aws-my-region"),
};
new AwsCdkPracticeStack(app, "AwsCdkPracticeStack", { env });
new S3Stack(app, "AwsS3Stack", { env });
