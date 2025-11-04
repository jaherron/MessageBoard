import React from 'react';
import '../../styles/main.css';
import NewPostForm from '../../app/newpostform';
import ActiveProfileContainer from '../../app/activeprofilecontainer';
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>New Post - LittleBit's Message Board</title>
        <meta name="description" content="A very simple message board." />
      </Head>
      <div className="header-container" style={{paddingBottom:"10px"}}>
        <div style={{paddingRight:"120px"}}>
          <a href="/" title="Back to main page" className='image-button'><img src="https://img.icons8.com/?size=32&id=86960&format=png&color=FFFFFF"/></a>
        </div>
        <h1 className="hide-on-mobile">New Post</h1>
        <ActiveProfileContainer />
      </div>
      <NewPostForm />
    </>
  );
}