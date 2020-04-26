# wheelOfFortune

To start Angular ```npm start``` or ```ng serve --open --proxy-config proxy.conf.json```

```php bin/console doctrine:migrations:migrate```

```php bin/console doctrine:fixtures:load```

```symfony server:start```

```ng serve --open```

To start Mercure in Powershell (better):

```$env:JWT_KEY='WheelOfFortune'; $env:ADDR='localhost:3000'; $env:DEMO='1'; $env:ALLOW_ANONYMOUS='1'; $env:CORS_ALLOWED_ORIGINS='*'; $env:PUBLISH_ALLOWED_ORIGINS='http://localhost:3000'; mercure\mercure.exe```

To start Mercure in cmd:

``` mercure/mercure --jwt-key='WheelOfFortune' --addr='localhost:3000' --allow-anonymous --cors-allowed-origins='*'```