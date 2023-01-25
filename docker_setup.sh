#!/bin/bash
sudo groupadd docker
sudo usermod -aG docker nouriss
newgrp docker
docker run hello-world
sudo systemctl enable docker.service
sudo systemctl enable containerd.service