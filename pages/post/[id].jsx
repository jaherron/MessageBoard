import React from 'react';
import { useRouter } from 'next/router';
import '../../styles/main.css';
import EditPostForm from '../../app/editpostform';
import ActiveProfileContainer from '../../app/activeprofilecontainer';
import Head from 'next/head';

export default function Page() {
  const params = useRouter();
  console.log(params);

  return (
    <>
      <Head>
        <title>Edit Post - LittleBit's Message Board</title>
        <meta name="description" content="A very simple message board." />
      </Head>
      <div className="header-container" style={{ paddingBottom: "10px" }}>
        <div style={{ paddingRight: "120px" }}>
          <a href="/" title="Back to main page" className='image-button'><img src="https://img.icons8.com/?size=32&id=86960&format=png&color=FFFFFF" /></a>
        </div>
        <h1 className="hide-on-mobile">Edit Post</h1>
        <ActiveProfileContainer />
      </div>
      <EditPostForm postId={params.query.id} />
    </>
  );
}