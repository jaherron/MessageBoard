import React from 'react';
import '../styles/main.css';
import { PrismaClient } from '@prisma/client';
import PostContainer from './postcontainer';
import ActiveProfileContainer from './activeprofilecontainer';

export const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
})

export default async function HomePage() {
  return (
    <>
      <div className="header-container">
        <div>
          <a style={{paddingRight:"5px"}} href="/post" title="Write a post" className='image-button'><img src="https://img.icons8.com/?size=32&id=82802&format=png&color=FFFFFF" /></a>
          <a className="image-button" title="About this website" href="/about"><img src="https://img.icons8.com/?size=32&id=82889&format=png&color=FFFFFF" /></a>
        </div>
        <h1 className="hide-on-mobile">LittleBit's Message Board</h1>
        <ActiveProfileContainer />
      </div>
      <PostContainer />
      <div style={{textAlign:"center", marginTop:"15px"}}>
        LittleBit's Message Board - <a href="/about">About this website</a> - Icons on this website by <a href="https://icons8.com">Icons8</a>
      </div>
    </>
  );
}