
# Log Book

*This log book describes the development process taken for Footle itself*

The project uses **[Loopback.io](https://loopback.io)**, a modern API framework for Node.js made and supported by **[StrongLoop](https://strongloop.com/)**.

The features I liked the most:
* Combines the best libraries for debugging, production, scalability
* Model based
* Auto API generation based on models
* Auto API docs based on models
* Auth, rate limit, and many other features!!

## Tips and tricks

**1. Useful resources**

- https://github.com/pasindud/awesome-loopback


2\. Could be possible to change Swagger UI:

- https://docs.strongloop.com/display/public/LB/Swagger+generator
- See uiDirs option:  https://github.com/strongloop/loopback-component-explorer

## 1. Setup and running

```shell
sudo npm install -g strongloop
# Create project
slc loopback

# Create model Establishment (Extended PersistedModel)
slc loopback:model
# Add property to model
slc loopback:property
# Add relation
slc loopback:relation

# Add datasource "mongo"
slc loopback:datasource

```

To use it, go to `server/model-config.json` and change the property `Establishment.datasource: "mongo"`

I created a file `server/boot/seed-models.js` that seeds the database with some data.

## 2. Advanced models

### 2.1 Remote methods (custom methods)

They can be created by:

* Running `slc loopback:remote-method`: In this case it will be created within `common/models/establishment.json`, but still must be implemented on the js.
* By creating it on the `.js` file. See https://docs.strongloop.com/display/public/LB/Remote+methods
