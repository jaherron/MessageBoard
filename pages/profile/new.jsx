import React from 'react';
import { useRouter } from 'next/router';
import '../../styles/main.css';
import EditProfileForm from '../../app/editprofileform';
import NewProfileForm from '../../app/newprofileform';
import Head from 'next/head';

export default function Page() {
  const params = useRouter();
  console.log(params);

  return (
    <>
      <Head>
        <title>New Profile - LittleBit's Message Board</title>
        <meta name="description" content="A very simple message board." />
      </Head>
      <div className="header-container">
        <a href="/" title="Back to main page" className='image-button'><img src="https://img.icons8.com/?size=32&id=86960&format=png&color=FFFFFF" /></a>
        <h1>New Profile</h1>
      </div>
      <NewProfileForm />
    </>
  );
}