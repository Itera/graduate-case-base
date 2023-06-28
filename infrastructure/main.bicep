@description('The mane of the app')
param appName string

@description('Environment to deploy to.')
param environment string

@description('Name of the container to create in the storage account.')
param dbCollectionName string

@description('Location for all resources.')
param region string = resourceGroup().location

@description('Instance of the resources.')
param instance string = '001'

@description('Location for the Static Web App.')
param swaRegion string = 'westeurope'

@description('Location for the Cosmos DB.')
param cosmosRegion string = 'swedencentral'

@description('Name of the storage account to create.')
param stAccountName string = 'explore'


var funcAppName = 'func-${appName}-${environment}-${region}-${instance}' 
var swaName = 'stapp-${appName}-${environment}-${region}-${instance}'
var hostingPlanName = 'asp-explore-${environment}-${region}-${instance}'
var applicationInsightsName = 'appi-explore-${environment}-${region}-${instance}'
var cosmosDbName = 'cosmos-explore-${environment}-${cosmosRegion}-${instance}'
var storageAccountName = toLower('st${stAccountName}${instance}')

module storageAccount 'storageAccount.bicep' = {
  name: storageAccountName
  params: {
    name: storageAccountName
    region: region
    containerName: toLower(appName)
  }
}

module cosmosDb 'cosmosDb.bicep' = {
  name: cosmosDbName
  params: {
    name: cosmosDbName
    region: cosmosRegion
    primaryRegion: cosmosRegion
    collectionName: dbCollectionName
  }
}

module hostingPlan 'appServicePlan.bicep' = {
  name: hostingPlanName
  params: {
    name: hostingPlanName
    region: region
  }
}

module applicationInsights 'applicationInsights.bicep' = {
  name: applicationInsightsName
  params: {
    name: applicationInsightsName
    region: region
  }
}

module staticWebApp 'staticWebApp.bicep' = {
  name: swaName
  params: {
    name: swaName
    region: swaRegion
  }
}

module functionApp 'functionApp.bicep' = {
  name: funcAppName
  params: {
    name: funcAppName
    hostingPlanName: hostingPlanName
    region: region
    storageAccountName: storageAccountName
    applicationInsightsName: applicationInsightsName
    cosmosDbName: cosmosDbName
  }
  dependsOn: [
    storageAccount
    hostingPlan
    applicationInsights
    cosmosDb
  ]
}

output functionAppName string = functionApp.outputs.functionAppName
output staticWebAppName string = staticWebApp.outputs.staticWebAppName
