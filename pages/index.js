import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from "axios";
import Link from 'next/link';
import styled from "styled-components";

export const Title = styled.h1`
  color: red;
`
export const Item = styled.li`
  list-style: none;
`;

export default function Home({users}) {

  return (
   <>
    <Head>
      <title>Sandbox Next.js</title>
    </Head>
    <section>
      <Title>Liste des utilisateurs</Title>
      <ul>
        {users?.map((user) => <Item key={user.id}>
          <Link href={`/user/${user.id}`}>
            <a>
              <h3>{user.id} - { user.title } { user.firstName } {user.lastName }</h3>
            </a>
          </Link>
        </Item>)}

      </ul>
    </section>
   </>
  )
}

export async function getStaticProps () {
  const data = await axios.get(
    "https://dummyapi.io/data/v1/user?limit=10",
    {
      headers: {
        "app-id": `62e939beeb3595baa8e7128d`,
      },
    }
  );

  return {
    props: {
      users: data.data.data
    }
  }
}