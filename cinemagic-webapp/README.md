# CineMagic-Website

To run:
1. Download/clone repository.

2. Build docker image. In root directory of project run:
    `docker build -t cinemagic-web .`
    
3. Run container. Run command:
    `docker run -p 3500:80 cinemagic-web`
    
4. Application will be avaible on http://localhost:3500/
