import React from 'react';

function About() {
  return (
    <div>
      <h1>このアプリについて</h1>
      <p>これは連絡先を保管するフルスタックアプリケーションです。</p>
      <p>
        このアプリのソースコードは
        <a href='https://github.com/pitang1965/react-contact-list'>GitHub</a>
        にあります。
      </p>
      <p>
        詳細記事は<a href='https://software.pitang1965.com/'>ブログ</a>
        にあげるかも。
      </p>
      <p>
        作成者：ピータン<a href='https://twitter.com/pitang1965'>(Twitter)</a>
      </p>
      <br />
      <p className='bg-dark p'>おまけ</p>
      <p>我が家のメダカです。よろしければご覧ください。</p>
      <iframe
        title='Tomora'
        width='560'
        height='315'
        src='https://www.youtube.com/embed/4e9PS8PYrHo'
        frameborder='0'
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        allowfullscreen
      ></iframe>
    </div>
  );
}

export default About;
