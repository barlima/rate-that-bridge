import React from 'react'

const About = () => {
  return (
    <div className="about">
      <h1 className="about__app-title">Rate that Bridge!</h1>

      <div className="about__content">
        <div className="about__text">
          <h2 className="about__header">About the app</h2>
          <p className="about__paragraph">
            Welcome to #RateThatBridge, a simple application in which you can rate bridges.
            <br/>
            All you have to is to log in and select between 2 bridges. The selected one, gets a point.
            <br/>
            You can vote only once for a bridge during a day. If there are no more bridges to vote,
            you can always come back tomorrow.
            <br/>
            <br/>
            If you wish, you can add your own bridges under the <a href="/contribute">contribution</a> tab.
            Once your bridge is acceppted by the administrator, everyone can vote for it.
          </p>

          <h2 className="about__header">Security</h2>

          <p className="about__paragraph">
            For users authentication we use an external service - <a href="https://oauth.net/2/">OAuth 2.0</a>.
            <br/>
            All we store is just your email address and name.
          </p>
        </div>

        <div className="about__separator"/>

        <div className="about__icon">

        </div>
      </div>

      <footer className="about__footer">
        Created by Bartlomiej Perucki <a href="https://github.com/barlima">@barlima</a>
      </footer>
    </div>   
  )
}

export default About;