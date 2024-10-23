#!/usr/bin/env bash
set -e

/opt/wait-for-it.sh db:3306
/opt/wait-for-it.sh host.docker.internal:1025
npm run migration:run
# npm run seed:run:relational
npm run start:prod
