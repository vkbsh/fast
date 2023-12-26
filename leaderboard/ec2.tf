provider "aws" {
  region = "eu-central-1" # Frankfurt
}


resource "aws_instance" "leaderboard" {
  ami           = "ami-0c55b159cbfafe1f0" # Replace with the latest or your preferred AMI
  instance_type = "t2.micro"

  tags = {
    Name = "KotlinAPIServer"
  }
}
