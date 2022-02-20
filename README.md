# News app
## Technical assignment

To view it locally, assuming you have `docker-compose` installed, just run:

`docker-compose up -d`

If you'd like to run it without docker, make sure to provide environmental variables defined in `.env.example`. It also requires a running MongoDB instance, so ensure that `MONGODB_URL` you provide points to such. After that, first run:

`npm i`

to install all the dependencies, then:

`npm run dev`

to run the app.

In both these cases, the app will be available at [http://localhost:3000](http://localhost:3000)

I'm including sensitive data in `docker-compose.yml` for demo purposes, in real-world scenario I'd provide them using environmental variables, and I'd ensure that these never end up in version control (or otherwise exposed).

I also deployed this app at [https://news.razmadze.me/](https://news.razmadze.me/), if you'd like to play with already configured and running instance.
