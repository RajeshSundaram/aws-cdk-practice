import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
} from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import * as AwsCdkPractice from "../lib/explore-ec2-stack";

test("Empty Stack", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new AwsCdkPractice.Ec2Stack(app, "MyTestStack");
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {},
      },
      MatchStyle.EXACT
    )
  );
});
