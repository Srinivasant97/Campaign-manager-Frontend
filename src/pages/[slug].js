import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

function Slug({ data }) {
  const [email, setEmail] = useState("");
  const subscribeToCampaign = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      body: JSON.stringify({
        campaign: data.id,
        email: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://127.0.0.1:8000/api/subscribers/", options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    setEmail("");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{data.title}</title>
      </Head>
      <h1>{data.title}</h1>
      <Image
        src={"https://res.cloudinary.com/djnipsyod/" + data.logo}
        height={120}
        width={120}
        alt="Campaign image"
      />
      <p>{data.description}</p>
      <p>Created on {data.created_at}</p>
      <form onSubmit={subscribeToCampaign}>
        <input
          required
          type="email"
          placeholder="Type Email..."
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
}

export async function getStaticPaths() {
  const response = await fetch(`${process.env.BASE_URL}/campaign`);
  const data = await response.json();
  const allSlugs = data.map((item) => item.slug);
  const paths = allSlugs.map((slug) => ({ params: { slug: slug } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let response = await fetch(`${process.env.BASE_URL}/campaign/${params.slug}`);
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
}
export default Slug;
