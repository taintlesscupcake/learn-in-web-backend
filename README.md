<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />

<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>
<h3 align="center">Learn In Web(Backend)</h3>

  <p align="center">
    NestJS Backend for
    <a href="http://khuhub.khu.ac.kr/2021105619/learn-in-web-backend"><strong>Learn In Web</strong></a>
    <br />
    <a href="https://code.sungjin.dev"><strong>View Demo »</strong></a>
    <br />
    <br />
    <a href="http://khuhub.khu.ac.kr/2021105619/learn-in-web-backend/issues">Report Bug</a>
    ·
    <a href="http://khuhub.khu.ac.kr/2021105619/learn-in-web-backend/issues">Request Feature</a>
  </p>

</div>



<!-- TABLE OF CONTENTS -->

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

This project allows users to run codes and study without any IDE. This project focusd on schools, and students for study.

Why we need this project? : 

In Korea, learning programming is essential in school. So students wants to learn programming in school; however it is difficult for students to study programming without computer. 

So run this project in school server, and allow students to access this page. So they can study, and run code only with phone, or tablet.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Nest.js](https://nestjs.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  
  ```sh
  npm install npm@latest ts-node -g
  ```

* Compiler for languages
    
  ```sh
    #For typescript
    npm install -g ts-node
    #Ubuntu, Debian Based
    sudo apt update && sudo apt install golang build-essential
    #RedHat Based
    sudo yum update && sudo yum install golang build-essential
    #Other
    #install golang, cpp, c++ manually.
    ```
    
* Docker, postgreSQL Database
    
  (You can manually change port, name, etc if you want.)

    ```sh
    #Install docker for your OS. ex) sudo apt install docker
    docker pull postgres
    docker run -d -p 5432:5432 --name postgres-container -e POSTGRES_PASSWORD=Your_Password -v ~/pgdata:/Location_to_save_data/ postgres 
    ```
    
    
    
* Installation

1. Clone the repo
   ```sh
   git clone http://khuhub.khu.ac.kr/2021105619/learn-in-web-backend
   ```

2. Install NPM packages
   ```sh
   npm install
   ```

3. Enter your DB URL in `.env`
   ```js
   DATABASE_URL="postgresql://_User:_Password@localhost:5432/postgres""
   ```

4. Migrate DB

   ```sh
   npx prisma migrate dev
   ```

5. Start Server.

   ```sh
   nest start
   ```

   

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->

## Usage

To Use Learn In Web, you need to use this backend; this project communicate via RESTful API.

_For More Useage, please see frontend [Demo](http://khuhub.khu.ac.kr/2021105619/learn_in_web)_

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Add README
- [ ] Add How to Use for new user
- [ ] Add Saving with DB
- [ ] Multi-language Support
  - [ ] English
  - [ ] Japanese

- [ ] View code run time
- [ ] Add competition between users with runtime.

See the [open issues](http://khuhub.khu.ac.kr/2021105619/learn-in-web-backend/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/newFeature`)
3. Commit your Changes (`git commit -m 'Add some newFeature'`)
4. Push to the Branch (`git push origin feature/newFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@taintlesscupcake](https://instagram.com/taintless_cupcake) - [email](mailto:me@sungjin.dev)

Project Link: [http://khuhub.khu.ac.kr/2021105619/learn-in-web-backend](http://khuhub.khu.ac.kr/2021105619/learn-in-web-backend)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
