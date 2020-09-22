#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { AwsCdkPracticeStack } from "../lib/aws-cdk-practice-stack";

const app = new cdk.App();
new AwsCdkPracticeStack(app, "AwsCdkPracticeStack");
