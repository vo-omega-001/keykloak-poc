export interface IConfiguration {
  env: {
    name: String;
    baseUrl: String;
  };
  api: {
    config: {
      path: String,
      getConfigById: String,
      getAllConfigs: String,
      getConfigsByPage: String
    },
    dataset: {
      path: String,
      getDatasetById: String,
      getAllDatasets: String,
      getDatasetsByPage: String
    },
    model: {
      path: String,
      getModelById: String,
      getAllModels: String,
      getModelsByPage: String
    },
    planner: {
      configuration: {
        path: String,
        getResourcePlannerConfiguration: String
      },
      taskRequest: {
        path: String,
        getTaskRequestById: String,
        searchTaskRequests: String,
        searchTaskRequestsByPage: String,
        getAllTaskRequests: String,
        createTaskRequest: String,
        updateTaskRequestById: String,
        deleteTaskRequestsByOwner: String,
        deleteAllTaskRequests: String,
      }
    }
  },
  views: {
    navOrder: Array<String>,
    defaultRoute: IRoute,
    routes: Array<IRoute>,
    disabledRoutes: Array<IRoute>
  }
}

export interface IRoute {
  path: String,
  viewId: String
}
