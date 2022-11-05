### PeakActivity Web Frontend

# Installation

- After, fire up your local version of Strapi and navigate to http://localhost:1337/admin.
- If a Strapi admin user is not present in your database, it will prompt you to create an admin user. Do this.
- After you have logged in, navigate to http://localhost:1337/admin/plugins/content-manager/user?source=users-permissions. From here, you can add your studio user

## Run your app

```
git submodule update --init --recursive
npm run build
npm run start:dev
```

# Deploying Your App

### Removing unecessary files:

Ensure that you are only using the pages and components necessary. For example, if you are not using cart and checkout or serving products, you can run the bootstrap-remove.sh file to remove all those elements from your builds.

Accepted Values:

- account
- cart
- pdp
- blog
- content

Example ussage:

```
sh ./bootstrap-remove.sh cart pdp
```

Before you deploy, ensure that your dockerfile and jenkinsfile are updated with the correct values vs boilerplate values

### TTL for Statically Generated Pages

- You can configure you page TTL with the env variable PAGE*TTL (typeof \*\*\_int*\*\*). You can set this in the Jenkins file
  - **Ex.** `PAGE_TTL = process.env.PAGE_TTL || 3600`

### Sentry Implementation

- Update the Jenkinsfile with your SENTRY_DSN url
- Update the Dockerfile with your project and SENTRY_DSN

### Image Proxy Implementation

- Pass in your image proxy url via Jenkins: IMAGE_TRANSFORMATION_PROXY_URL
- Note: this is optional


## Run locally

```bash
npm run build
npm run start:dev
```

# Editing Secrets

Due to the nature of [ISR](https://peakactivity.atlassian.net/wiki/spaces/MDD/pages/1172340737/Incremental+Static+Regeneration+Environment+Variables), we are going to have to bake all environment variables into the Dockerfile vs the Jenkinsfile. This means, we can no longer tap into the Kubernetes secrets.

Moving forward, we are going to put all secrets into a file called secrets.env, and use 'ansible-vault' to encrypt/decrypt this file.

Install Ansible

```
brew install ansible
```

OR

```
python3 -m pip install --user ansible
```

To edit the file run the following command below. This will temporarily decrypt this file and allow you to edit it. When you close it out, it will automatically encrypt it back. Note: it will ask you for a password. That password can be found [here](https://peakactivity.atlassian.net/wiki/spaces/SFCM/pages/1226899460/SFC+Ansible+Vault+Password).

```
ansible-vault edit secrets.env
```

### What Needs to be a Secret?

Not everything needs to be turned into a secret. If you are implementing 3rd party scripts, check with the vendor on best practices, and understand that if the client / browser needs to know the variable, then technically it can't be a secret.

