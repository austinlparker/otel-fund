## about

a project to help identify libraries/projects that people want otel support added to

## development

You'll need Postgres running locally. With Docker, run -

```
$ docker run --name otelfund-db -e POSTGRES_PASSWORD=<password> -d postgres
```

You'll also need the github client id and client secret for the github app you're using to auth.
Finally, Auth.JS needs some secrets.

```
DATABASE_URL
AUTH_GITHUB_ID
AUTH_GITHUB_SECRET
AUTH_SECRET
NEXTAUTH_URL
```
