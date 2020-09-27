#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { Ec2Stack } from "../lib/explore-ec2-stack";

const app = new cdk.App();
const env = {
  region: app.node.tryGetContext("aws-my-region"),
  account: process.env.CDK_DEFAULT_ACCOUNT,
};
new Ec2Stack(app, "AwsEC2Practice", { env });
