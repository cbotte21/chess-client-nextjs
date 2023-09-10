variable "name" {
  type    = string
  default = "chess-client-nextjs"
}

variable "port" {
  type    = number
  default = 3000
}

packer {
  required_plugins {
    docker = {
      version = ">= 0.0.7"
      source  = "github.com/hashicorp/docker"
    }
  }
}

source "docker" "ubuntu" {
  image  = "node:20-alpine"
  commit = true
  changes = [
    "WORKDIR /app",
    "EXPOSE ${var.port}",
    "ENTRYPOINT [\"npm\", \"run\", \"dev\"]"
  ]
}

build {
  name = "chess/${var.name}"
  sources = [
    "source.docker.ubuntu"
  ]
  provisioner "shell" {
    inline = [
      "apk add git",
      "git clone https://github.com/cbotte21/${var.name} app",
      "cd app/",
      "yarn install",
      "npm run build"
    ]
  }
  provisioner "file" {
    source      = ".env"
    destination = "app/.env"
  }
  post-processors {
    post-processor "docker-tag" {
      repository = "chess/${var.name}"
      tags       = ["0.1"]
    }
  }
}
