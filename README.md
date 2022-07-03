This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Live 

Try it live: https://online-notepad-one.vercel.app/


## Getting Started

## 1/ Setting up your supabase database
On app.supabase.com
Create your account
Create your project

For the tables, create two tables (note: Please disable RLS (Row Level Security) - while I know this isn't recommended, the current constraints I placed in the current code are not in line with RLS and I will need time to figure it out later):

> "content" table:
![](https://i.imgur.com/zTIZCW6.png)

> "notes" table:
![](https://i.imgur.com/O0rWbLj.png)

Then after pulling the code, create a ".env.local" file inside the root folder.
> NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxx.supabase.co
> NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxxxxx

You can get those in the settings of your project. ![](https://i.imgur.com/ak8dPT6.png)

## 2/ Run the project

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
