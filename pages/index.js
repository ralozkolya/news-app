import Link from "next/link";

export default function Home() {

  return (
    <>
      <h1 className="mb-4">Welcome to the News app</h1>
      <p>This app offers the following functionality:</p>
      <ol>
        <li>Query news from NewsApi.org <Link href="/import"><a>here</a></Link></li>
        <li>Save chosen articles for later viewing <Link href="/import"><a>here</a></Link></li>
        <li>See all the saved articles <Link href="/news"><a>here</a></Link></li>
      </ol>
    </>
  )
}
