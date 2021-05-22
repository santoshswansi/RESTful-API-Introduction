# WHAT IS REST API?

* It stands for **RE**presentational **S**tate **T**ransfer
* REST is a software architectural style that defines the set of rules to be used for creating web services
* Web services which follow the REST architectural style are known as **RESTful web services**
* It allows requesting systems to access and manipulate web resources by using a uniform and predefined set of rules. Interaction in REST based systems happen through Internet’s Hypertext Transfer Protocol (HTTP).

* In a client-server communication, REST suggests to create an object of the data requested by the user

* **For Example :** If the user is requesting for an event at a particular place and time, the server can create object of the matching data

* So we are sending the **state** of an object, we are requesting from server that's why REST is known as **RE**presentational **S**tate **T**ransfer


* The architectural style of REST helps in leveraging the lesser use of bandwidth to make an application more suitable for the internet



## WHY USE REST API?

* _Book My Show_ app contains lots of data which are constantly changing i.e. they are dynamic 
* **QUESTION:** Where does those data come from?
  **ANSWER:**
  * This data is received from the server(Web-Server)
  * So the client requests the server for the required information, via an API, & then, server sends a response to the client
  
  * This response is in the form of an HTML web page
  * Definitely we would not expect a web page as an response, every-time we request for some information
  * Instead we would prefer a more structured format. For such reason, the data returned by the server, in response to the request by the client is either in the format of JSON or XML 

* **ONE PROBLEM** 
  * We have to use a lot of methods to get the required information. It is quite cumbersome to get complex data  
  
  * Here **REST comes in rescue** for us: The REST API creates an object, & thereafter sends the values of an object in response to the client
  * REST breaks down a transaction in order to create small modules. Now, each of these modules is used to address a specific part of the transaction. This approach _provides more flexibility but requires a lot of effort to be built from the very scratch_
  
#### PRINCIPLES OF REST API 

* There are six ground principles laid down by Dr Fielding who was the one to define the REST API design in 2000

    * Uniform Interface
    * Stateless
    * Cacheable
    * Client-Server
    * Layered System
    * Code on Demand


1. **Uniform Resource**
   * It suggests a uniform way of a interacting with given server irrespective of device or type of application(website, mobile application)

   * There are four guidelines principle of Uniform Interfaces are :-
        * **Resource-Based:** Individual resources are identified in requests. For Example: API/users

        * **Manipulation of resources through representations:**   Client has representation of resource and it contains enough information to modify or delete the resource on the server, provided it has permission to do so. **Example:** Usually user get a user id when user request for a list of users and then use that id to delete or modify that particular user.

        * **Self-descriptive Messages:** Each message includes enough information to describe how to process the message so that server can easily analyses the request
        * **Hypermedia as the Engine of Application State (HATEOAS):** It need to include links for each response so that client can discover other resources easily.

2. **Stateless**
    * The requests sent from a client to a server will contain all the required information to make the server understand the requests sent from the client
    * This can be either a part of URL,  query-string parameters, body, or even headers 
    * **The URL is used to uniquely identify the resource and the body holds the state of the requesting resource** 
    * Once the server processes the request, a response is sent to the client through body, status or headers

3. **Cacheable**
    * Every response should include whether the response is cacheable or not and for how much duration responses can be cached at the client side
    * Client will return the data from its cache for any subsequent request and there would be no need to send the request again to the server
    * A well-managed caching partially or completely eliminates some client–server interactions, further improving availability and performance
    * But sometime there are chances that user may receive stale data.

4. **Client-Server**
    * REST application should have a client-server architecture
    * A _Client_ is _someone who is requesting resources and are not concerned with data storage, which remains internal to each server_, and _server_ is _someone who holds the resources and are not concerned with the user interface or user state_. They can evolve independently. Client doesn’t need to know anything about business logic and server doesn’t need to know anything about frontend UI.

5. **Layered system**
    * An application architecture needs to be composed of multiple layers
    * Each layer doesn’t know any thing about any layer other than that of immediate layer and there can be lot of intermediate servers between client and the end server.
    * Intermediary servers may improve system availability by enabling load-balancing and by providing shared caches

6. **Code on demand**
   * It is an optional feature
   * According to this, servers can also provide executable code to the client. 
   * The examples of code on demand may include the compiled components such as Java applets and client-side scripts such as JavaScript.


#### Rules of REST API:

   * There are certain rules which should be kept in mind while creating REST API endpoints
   * REST is based on the resource or noun instead of action or verb based. It means that a URI of a REST API should always end with a noun. **Example:** /api/users is a good example, but /api?type=users is a bad example of creating a REST API.
   * HTTP verbs are used to identify the action. Some of the HTTP verbs are – **GET**, **PUT**, **POST**, **DELETE**, **UPDATE**, **PATCH**.
   * A web application should be organized into resources like users and then uses HTTP verbs like – **GET**, **PUT**, **POST**, **DELETE** to modify those resources. And as a developer it should be clear that what needs to be done just by looking at the endpoint and HTTP method used.

URI	| HTTP VERB |	DESCRIPTION
-----|----|---
api/users |	GET |	Get all users
api/users/new |	GET |	Show form for adding new user
api/users |	POST |	Add a user
api/users/1 |	PUT |	Update a user with id = 1
api/users/1/edit |	GET |	Show edit form for user with id = 1
api/users/1	| DELETE	| Delete a user with id = 1
api/users/1	| GET |	Get a user with id = 1

* Always use plurals in URL to keep an API URI consistent throughout the application
* Send a proper HTTP code to indicate a success or error status.


* **Note :** You can easily use GET and POST but in order to use PUT and DELETE you will need to install method override. You can do this by following below code :

```
    npm install method-override --save
```

This simply require this package in your code by writing :

```js
    var methodOverride = require("method-override");
```

Now you can easily use PUT and DELETE routes :

```js
    app.use(methodOverride("_method"));
```

**HTTP verbs:** Some of the common HTTP methods/verbs are described below:

* **GET:** Retrieves one or more resources identified by the request URI and it can cache the information receive.
* **POST:** Create a resource from the submission of a request and response is not cache-able in this case. This method is unsafe if no security is applied to the endpoint as it would allow anyone to create a random resource by submission.
* **PUT:** Update an existing resource on the server specified by the request URI.
* **DELETE:** Delete an existing resource on the server specified by the request URI. It always return an appropriate HTTP status for every request.
* **GET**, **PUT**, **DELETE** methods are also known as **Idempotent methods**. Applying an operation once or applying it multiple times has the same effect. Example: Delete any resource from the server and it succeeds with 200 OK and then try again to delete that resource than it will display an error message 410 GONE.
