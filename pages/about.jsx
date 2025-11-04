import React from 'react';
import '../styles/main.css';
import Head from 'next/head';

export default function Page() {
  return (
    <div className="about-page">
      <Head>
        <title>About LittleBit's Message Board</title>
        <meta name="description" content="A very simple message board." />
      </Head>
      <div className="header-container">
        <a href="/" title="Back to main page" className='image-button'><img src="https://img.icons8.com/?size=32&id=86960&format=png&color=FFFFFF" /></a>
      </div>
      <h1>About This Website</h1>
      <p>
        LittleBit's Message Board; a very simple message board written with Next.js.
      </p>
      <h2>Credits</h2>
      <p>
        LittleBit's Message Board is a project by James Herron (LittleBit).<br />
        The code for this software is available on <a href="https://github.com/jaherron/MessageBoard">GitHub</a>. Licensed under the MIT License.<br /><br />
        Written using <a href="https://nextjs.org">Next.js</a>, a React framework.<br /><br />
        Public deployments handled by <a href="https://vercel.com">Vercel</a>.<br />
        Domain registration and main website hosting (littlebitstudios.com) handled by <a href="https://www.dreamhost.com">DreamHost</a>.<br /><br />
        All icons used are from <a href="https://icons8.com">Icons8</a>.<br /><br />
        Font used across this website is Inter by Rasmus Andersson.<br/>Learn more or download from <a href="https://rsms.me/inter/">the author's website</a>.<br /><br />
      </p>

      <h2>Contact Me</h2>
      <p>
        My socials are available from my <a href="https://littlebit670.link">Gravatar page</a>, you may use direct messages to contact me.<br />
        My email is <a href="mailto:littlebit@littlebitstudios.com">littlebit@littlebitstudios.com</a>.
      </p>

      <h2>Privacy Information</h2>
      <p>
        This website uses no analytics or tracking.<br />
        The only data stored on this website's server is profiles and posts you create.<br />
        This website will use your browser's localStorage to store the profiles you hold, and the profile you are currently using.
      </p>
    </div>
  );
}