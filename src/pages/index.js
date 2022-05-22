import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home({ data, error }) {
  const router = useRouter();
  const handleNavigation = (item) => {
    router.push(`/${item.slug}`);
  };
  return (
    <div>
      <Head>
        <title>Campaign Manager</title>
      </Head>
      <div className={styles.container}>
        <h1>Available Campaigns</h1>
        {error && <p>{error}</p>}
        {data.map((item, index) => (
          <div
            key={index}
            className={styles.box}
            onClick={() => handleNavigation(item)}
          >
            <Link href={"/" + item.slug}>
              <h1>{item.title}</h1>
            </Link>
            <Image
              src={"https://res.cloudinary.com/djnipsyod/" + item.logo}
              height={120}
              width={120}
              alt="Campaign image"
            />
            <p>{item.description}</p>
            <p>Created on {item.created_at}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  let data = [];
  let error = null;
  try {
    let response = await fetch(`${process.env.BASE_URL}/campaign`);
    data = await response.json();
  } catch (err) {
    error = err.message ? JSON.stringify(err.message) : "Something Went Wrong";
  }
  return {
    props: {
      data,
      error,
    },
  };
}
