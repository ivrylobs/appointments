# Appointment Service

This is a fork of  [NestJS Boilerplate by Brocoders](https://github.com/brocoders/nestjs-boilerplate) <br>
Edited By [Roongpetch Kunthakuldusadee](https://github.com/ivrylobs), owner of this Github account for creating working prototype 
## Description <!-- omit in toc -->

[Full documentation here](/docs/readme.md)

## Table of Contents <!-- omit in toc -->

- [Features](#features)
- [Architecture](#architecture)
- [Support](#support)

## Features

- [x] Database. Support [MySQL/MariaDB](https://www.npmjs.com/package/typeorm)
- [x] Seeding.
- [x] Config Service ([@nestjs/config](https://www.npmjs.com/package/@nestjs/config)).
- [x] Mailing ([nodemailer](https://www.npmjs.com/package/nodemailer)).
- [x] Sign in and sign up via email.
- [x] Admin and User roles.
- [x] Internationalization/Translations (I18N) ([nestjs-i18n](https://www.npmjs.com/package/nestjs-i18n)).
- [x] File uploads. Support local and Amazon S3 drivers.
- [x] Swagger.
- [x] E2E and units tests.
- [x] Docker.
- [x] CI (Github Actions).

## Architecture

This project intend to use the concept of microservices design
Especially [UserAuth Service](https://github.com/ivrylobs/user-auth) module has responsiblity for user registeration and user authentication which stand before each of other services
There 2 others microservices checkout here
[Appointment Service](https://github.com/ivrylobs/appointments) and [Real-time Session Microservice]() <br>
In authentication layer every request should be valid before pass through gateway to other services if the request that attached Jwt inside header is invalid client should refresh the token by refresh token that receive since login or re-login again

<a href="https://ibb.co/kK4chmH"><img src="https://i.ibb.co/Nx9YLTV/Architecture.png" alt="Architecture" border="0"></a>

## Support

If you seek consulting, support, or wish to collaborate, please contact us via [boilerplates@brocoders.com](mailto:boilerplates@brocoders.com). For any inquiries regarding boilerplates, feel free to ask on [GitHub Discussions](https://github.com/brocoders/nestjs-boilerplate/discussions) or [Discord](https://discord.com/channels/520622812742811698/1197293125434093701).
