## development

You'll need Postgres running locally. With Docker, run -

```
$ docker run --name otelfund-db -e POSTGRES_PASSWORD=<password> -d postgres
```

You'll also need the github client id and client secret for the github app you're using to auth.

```
DATABASE_URL
AUTH_GITHUB_ID
AUTH_GITHUB_SECRET
```
