<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


## ejecutar en develop

1. clonar el repo
2. ejecutar
 ```
 yarn install
 ```
3. tener nest cli
    ```
    npm i -g @nest/cli
    ```

4. levantar base de datos
```
docker-compose up -d
```

5. build database
```
{{LOCALURL}}api/v2/seed
```

# production build
1. crear .env de produccion 
 ```
.env.prod
 ```
2. crear imagen ```docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build ```
 
## stack
*    mongodb
*    nestjs
