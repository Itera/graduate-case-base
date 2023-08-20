# Graduate case 2023

This repository contains the code for the Itera graduate 2023 case assignment.

## Quick start

Clone the repository with `git clone git@github.com:Itera/graduate-case-2023.git`.

### Projects



### Web

Run the following commands from the root of the repository:

Change directory to one of the projects

```bash
cd restaurant/web 
```

Install dependencies

```bash
npm ci
```

Start the development server

```bash
npm run dev
```

### Server

Run the following commands from the root of the repository:

Change directory to server in selected project

```bash
cd restaurant/api/Explore.Restaurant
```

Run server

```bash
func host start
```

## Repository structure

The repository is structured as a monorepo, with three projects; [restaurant](./restaurant/), [spa](./spa/) and [excursion](./excursion/). 

All projects contains:

1. A web application (React)
2. A serverless API (Azure Functions, .NET)
3. Tests
4. Documentation
5. Infrastructure parameters (Azure, Bicep) 

The `web` and `api` directories of all projects are structured as standalone projects, with their own `package.json` and `dotnet` solution. 

See documentation for the projects for detailed information.

## Infrastructure

The infrastructure for the project is defined in the `infrastructure` directory. The infrastructure is defined using Bicep templates. 

## Deployment

The project is deployed to Azure using GitHub Actions. The deployment is configured in the `.github/workflows` directory. Workflows for building and testing is triggered on every pull request to the `main` branch, and deployment is triggered on every push.

See more information about the workflows and deployment in their [documentation](doc/workflows.md).
