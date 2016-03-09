# node-postgresql-ansible-api-boilerplate
> a simple api boilerplate

This is a basic boilerplate for spinning up a non-hypermedia API with a minimum
of abstractions. It relies heavily on [pg-promise](https://www.npmjs.com/package/pg-promise).

### Required for Development

* **[node.js 5x+](https://nodejs.org/)**
  - [Download](https://nodejs.org/) (All platforms)
  - Install `node` via [homebrew][homebrew]
* **[Ansible](http://docs.ansible.com/) 2.x**
  - Install `ansible` via apt (Ubuntu), yum (Fedora), [homebrew][homebrew] (OS
    X), etc. See the [Ansible installation
    instructions](http://docs.ansible.com/intro_installation.html) for detailed,
    platform-specific information.  If you don't end up with version 2, try `easy_install pip` and `pip install ansible`.
* **[VirtualBox](https://www.virtualbox.org/)**
  - [Download](https://www.virtualbox.org/wiki/Downloads) (All platforms)
  - Install `virtualbox` via [homebrew cask][cask] (OS X)
* **[Vagrant](https://www.vagrantup.com/)**
  - [Download](http://docs.vagrantup.com/v2/installation/) (All platforms)
  - Install `vagrant` via [homebrew cask][cask] (OS X)
* **[vagrant-hostsupdater](https://github.com/cogitatio/vagrant-hostsupdater)**
  - Install with `vagrant plugin install vagrant-hostsupdater` (All platforms)

## Setup Instructions

1. Run `npm install` to install local dependencies.
2. Run `vagrant up` to set up postgresql database.
3. Run `npm run migrate:up` to initialize the database.
4. Run `npm start-dev` to start the api.
5. Browse to <http://localhost:8000/>
6. Edit files in `src/api` (the server will automatically restart on changes).

## Database Migrations

1. Run `npm run migrate` to check the status of migrations.
2. Run `npm run migrate:up` to migrate to the most recent migration.
3. Run `npm run migrate:down` to roll back one migration.
4. Run `npm run migrate:create` to create a new migration file.

### Creating Resources
```
// one
POST /v1/state
Content-Type: application/json
{
  "data": {
    "name": "Minnesota",
    "abbr": "MN"
  }
}

// many
POST /v1/state
Content-Type: application/json
{
  "data": [{
    "name": "Minnesota",
    "abbr": "MN"
  }, {
    "name": "Vermont",
    "abbr": "VT"
  }]
}
```

### Reading Resources
```
// many
GET /v1/state

// one
GET /v1/state/1
```

### Updating Resources
```
PATCH /v1/state/1
Content-Type: application/json
{
  "data": {
    "name": "Minnesota"
  }
}
```

### Destroying Resources
```
DELETE /v1/state/1
```

## To Do

- Docs
- Better error handling
- Testing support
- Test deployment to production/staging
- Database backup & restore scripts
- Etag caching support

[homebrew]: http://brew.sh/
[cask]: http://caskroom.io/
