import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import styled from "styled-components";

export const Title = styled.h1`
  color: red;
`

export default function User ({user}) {
  return (
    <>
      <Head>
        <title>{ user?.firstName } {user?.lastName }</title>
      </Head>
      <main>
        <Link href="/">
          <a>Revenir à l&apos;accueil</a>
        </Link>
        <Title>{ user?.firstName } {user?.lastName }</Title>
        <Image loader={() => user.picture} src={user.picture} alt={user.id} height={144} width={144}/>
        <p>{ user?.dateOfBirth }</p>
        <p>{ user?.gender }</p>
        <p>{ user?.email }</p>
        <p>{ user?.phone }</p>
        <p>
          { user?.location?.street }, { user?.location?.city },
          { user?.location?.country }
        </p>
        <p>{ user?.registerDate }</p>
        <p>{ user?.updatedDate }</p>
      </main>
    </>
  )
};

export async function getStaticProps({params}){

  console.log(params);
  const data =  await axios.get(
    `https://dummyapi.io/data/v1/user/${params.id}`,
    {
      headers: {
        "app-id": `62e939beeb3595baa8e7128d`,
      },
    }
  );

  return {
    props: {
      user: data.data
  }
}
}

export async function getStaticPaths () {
  const data = await axios.get(
    "https://dummyapi.io/data/v1/user?limit=10",
    {
      headers: {
        "app-id": `62e939beeb3595baa8e7128d`,
      },
    }
  );

  return {
    paths: data.data.data.map((user) => ({
      params: {id: user.id.toString()}
    })),
    fallback: false
  }
}