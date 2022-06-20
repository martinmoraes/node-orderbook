# Mercado Livre - Code Challenge NodeJS

## Setup
- Install docker
- Install docker-compose
- Clone da project with the following commands:

```
$ git clone https://github.com/martinmoraes/node-orderbook
```

## Start the kafka
Responsible for keeping the queue. Run the following command from the project folder.
```
$ cd kafga
$ docker-compose up
```
## Start the API
Responsible for receiving messages and putting them in the queue. Run the following command from the project folder.
```
$ cd api
$ npm run start
```
## Start the APP
Responsible for receiving messages from the queue and handling each one. Run the following command from the project folder.
```
$ cd app
$ chmod +x startMongodb.sh
$ ./startMongodb.sh
$ npm run start
```






API are under port 3333

#### POST /order

Add buy or sell order
**Payload**

```
[{
	"client": 1112,
	"type":"buy"|"sell",
	"orderType":"limit" | "market",
	"amount":10,
	"value": 100
}]
```

# Sources about orderbook
Order Book Matching Algorithms - https://hkopp.github.io/2016/10/order-book-matching-algorithms

Continues Trading Matching Algorithm -https://hupx.hu/uploads/Piac%C3%B6sszekapcsol%C3%A1s/Public%20Description%20of%20the%20Continuous%20Trading%20Matching%20Algorithm.pdf https://hupx.hu/uploads/Piac%C3%B6sszekapcsol%C3%A1s/Public%20Description%20of%20the%20Continuous%20Trading%20Matching%20Algorithm.pdf

Matching Orders - https://corporatefinanceinstitute.com/resources/knowledge/trading-investing/matching-orders/


