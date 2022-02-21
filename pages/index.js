import Link from "next/link";

export default function Home() {

  return (
    <>
      <h1 className="mb-4">Welcome to the News app</h1>
      <p>This app offers the following functionality:</p>
      <ol>
        <li>Query news from NewsApi.org <Link href="/import"><a>here</a></Link>;</li>
        <li>Save chosen articles for later viewing <Link href="/import"><a>here</a></Link>;</li>
        <li>See all the saved articles <Link href="/news"><a>here</a></Link>.</li>
      </ol>
      <p>
        This app is developed using <a href="https://nextjs.org/" target="_blank" rel="noreferrer">NextJS</a> framework,
        utilizing <a href="https://redux-toolkit.js.org/">Redux Toolkit</a>,
        and is backed by <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer">MongoDB</a> NoSQL database.
      </p>
    </>
  )
}
