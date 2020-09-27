import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import { Asset } from "@aws-cdk/aws-s3-assets";
import * as path from "path";
export class Ec2Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const instanceType = new ec2.InstanceType("t2.micro");
    const machineImage = ec2.MachineImage.latestAmazonLinux({
      generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      cpuType: ec2.AmazonLinuxCpuType.X86_64,
      edition: ec2.AmazonLinuxEdition.STANDARD,
      storage: ec2.AmazonLinuxStorage.GENERAL_PURPOSE,
    });
    const vpc = ec2.Vpc.fromLookup(
      this,
      this.node.tryGetContext("defaultVpcId"),
      {
        isDefault: true,
        vpcId: this.node.tryGetContext("defaultVpcId"),
      }
    );
    const sshSecurityGroup = new ec2.SecurityGroup(this, "ssh-ec2-sg", {
      vpc,
      securityGroupName: "ec2-ssh-sg",
      allowAllOutbound: true,
      description: `SG to allow access to EC2 instances in the VPC: ${vpc.vpcId}`,
    });
    sshSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22));
    const webAccessSg = new ec2.SecurityGroup(this, "http-and-https-sg", {
      vpc,
      securityGroupName: "ec2-http-and-https-sg",
      description: "sg for web access",
    });
    webAccessSg.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.allTcp(),
      "web-ingress"
    );

    const userData = ec2.UserData.forLinux({ shebang: "#!/bin/bash" });
    const MyIns = new ec2.Instance(this, "my-instance", {
      vpc,
      instanceType,
      machineImage,
      securityGroup: sshSecurityGroup,
      keyName: this.node.tryGetContext("instanceKeyPairName"),
      userData: userData,
    });
    MyIns.addSecurityGroup(webAccessSg);
    MyIns.userData.addCommands(
      "yum update -y",
      "yum install -y httpd.x86_64",
      "systemctl start httpd.service",
      "systemctl enable httpd.service",
      'echo "Hello Rajesh! from $(hostname -f)" > /var/www/html/index.html'
    );
  }
}
