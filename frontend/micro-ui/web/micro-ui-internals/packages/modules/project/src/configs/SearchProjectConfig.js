const searchConfig = () => {
  return {
    label: "SEARCH_PROJECTS",
    type: "search",
    apiDetails: {
      serviceName: "/project/v1/_search",
      requestParam: {
        offset: 0,
        limit: 5,
        tenantId: "pg.citya"
      },

      requestBody: {
        apiOperation: "SEARCH",
        Projects:[
          {
            projectType: "MP-CWS",
            tenantId: "pg.citya",
            name: "",
            description: "",
            projectNumber: "",
          },
        ],
      },
      minParametersForSearchForm: 0,
      masterName: "commonUiConfig",
      moduleName: "SearchProjectConfig",
      tableFormJsonPath: "requestParam",
      filterFormJsonPath: "requestBody.Projects[0]",
      searchFormJsonPath: "requestBody.Projects[0]",
    },
    sections: {
      search: {
        uiConfig: {
          headerStyle: null,
          formClassName: "custom-both-clear-search",
          primaryLabel: "ES_COMMON_SEARCH",
          secondaryLabel: "ES_COMMON_CLEAR_SEARCH",
          minReqFields: 0,
          defaultValues: [{
            name: "",
            description: "",
            projectNumber: "",
          }],
          fields: [
            {
              key: "PROJECT_NAME",
              label: "PROJECT_NAME",
              type: "text",
              isMandatory: false,
              disable: false,
              preProcess: {
                convertStringToRegEx: ["populators.validation.pattern"],
              },
              populators: {
                name: "name",
                error: "COMMON_PATTERN_ERR_MSG_MUSTER_ID",
                validation: {
                  pattern: '^[^\\$"<>?\\\\~`!@$%^()+={}\\[\\]*:;“”‘’]{1,100}$',
                },
              },
            },
            {
              key: "PROJECT_DESCRIPTION",
              label: "PROJECT_DESCRIPTION",
              type: "text",
              isMandatory: false,
              disable: false,
              preProcess: {
                convertStringToRegEx: ["populators.validation.pattern"],
              },
              populators: {
                name: "description",
                error: "COMMON_PATTERN_ERR_MSG_MUSTER_ID",
                validation: {
                  pattern: '^[^\\$"<>?\\\\~`!@$%^()+={}\\[\\]*:;“”‘’]{1,100}$',
                },
              },
            },
            {
              key: "PROJECT_NUMBER",
              label: "PROJECT_NUMBER",
              type: "text",
              isMandatory: false,
              disable: false,
              preProcess: {
                convertStringToRegEx: ["populators.validation.pattern"],
              },
              populators: {
                name: "projectNumber",
                error: "PROJECT_PATTERN_ERR_MSG",
                validation: {
                  pattern: '^[^\\$"<>?\\\\~`!@$%^()+={}\\[\\]*:;“”‘’]{1,100}$',
                },
              },
            },
          ],
        },
        label: "",
        children: {},
        show: true,
      },
      searchResult: {
        label: "",
        uiConfig: {
          columns: 
          [
              {
                  "label": "PROJECT_NAME",
                  "jsonPath": "name",

              },

              {
                  "label": "PROJECT_DESCRIPTION",
                  "jsonPath": "description"
              },

              {
                  "label": "PROJECT_NUMBER",
                  "jsonPath": "projectNumber"
              },

          ],
          enableGlobalSearch: false,
          enableColumnSort: true,
          resultsJsonPath: "Projects",
        },
        children: {},
        show: true,
      },
    },
    additionalSections: {},
  };
};

export default searchConfig;
