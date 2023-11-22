const searchConfig = () => {
  return {
    "label": "SEARCH_PROJECTS",
    "type": "search",
    "apiDetails": {
        "serviceName": "/wms/project/_search",
        "requestParam": {
            includeAncestors:true,
            tenantId: "pg.citya"
        
                        },
        "requestBody": {
            "apiOperation": "SEARCH",
            "Projects": 
                { id: "",
         
                name: "",
                projectType: "",
                createdFrom: "",
                createdTo: ""
                }
            
        },
        "minParametersForSearchForm": 0,
        "masterName": "commonUiConfig",
        "moduleName": "SearchProjectConfig",
        "tableFormJsonPath": "requestParam",
        "filterFormJsonPath": "requestBody.Projects[0]",
        "searchFormJsonPath": "requestBody.Projects[0]"
    },
    sections: {
      search: {
        uiConfig: {
          headerStyle: null,
          formClassName:"custom-both-clear-search",
          primaryLabel: "ES_COMMON_SEARCH",
          secondaryLabel: "ES_COMMON_CLEAR_SEARCH",
          minReqFields: 1,
          defaultValues: {
            id: "",
         
            name: "",
            projectType: "",
            createdFrom: "",
            createdTo: ""
          },
          fields: [
            {
              key:"PROJECT_ID",
              label: "PROJECT_ID",
              type: "text",
              isMandatory: false,
              disable: false,
              preProcess: {
                convertStringToRegEx: ["populators.validation.pattern"],
              },
              populators: {
                name: "id",
                error: "PROJECT_PATTERN_ERR_MSG",
                validation: {
                  pattern: '^[^\\$"<>?\\\\~`!@$%^()+={}\\[\\]*:;“”‘’]{1,100}$',
                 
                },
              },
          },
            {
              key:"PROJECT_NAME",
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
              key:"PROJECT_TYPE",
              label: "PROJECT_TYPE",
              type: "text",
              isMandatory: false,
              disable: false,
              preProcess: {
                convertStringToRegEx: ["populators.validation.pattern"],
              },
              populators: {
                name: "projectType",
                error: "COMMON_PATTERN_ERR_MSG_MUSTER_ID",
                validation: {
                  pattern: '^[^\\$"<>?\\\\~`!@$%^()+={}\\[\\]*:;“”‘’]{1,100}$',
                  
                },
              },
            },
            {
              key:"CREATED_FROM",
              label: "CREATED_FROM",
              type: "date",
              isMandatory: false,
              disable: false,
              populators: {
                name: "createdFrom",
                error: "COMMON_PATTERN_ERR_MSG_MUSTER_ID",
                validation: {
                //   required: true
                },
              },
            },
            {
                key:"CREATED_TO",
                label: "CREATED_TO",
                type: "date",
                isMandatory: false,
                disable: false,
                populators: {
                  name: "createdTo",
                  error: "COMMON_PATTERN_ERR_MSG_MUSTER_ID",
                  validation: {
                    // required: true
                  },
                },
              }, 
            ]
                },
                "label": "",
                "children": {},
                "show": true
              },
      searchResult: {
        "label": "",
                "uiConfig": {
                    
                    "columns": [
                        {
                            "label": "PROJECT_ID",
                            "jsonPath": "id",
                        },
                        {
                            "label": "PROJECT_NAME",
                            "jsonPath": "name",
                           
                        },
                        
                        {
                            "label": "PROJECT_TYPE",
                            "jsonPath": "projectType"
                        },
                        
                        {
                            "label": "CREATED_FROM",
                            "jsonPath": "createdFrom"
                        },
                       
                        {
                            "label": "CREATED_TO",
                            "jsonPath": "createdTo"
                        },
                    
                        
                    ],
                    "enableGlobalSearch": false,
                    "enableColumnSort": true,
                    "resultsJsonPath": "Projects"
                },
                "children": {},
                "show": true
            }
        },
        "additionalSections": {}
    }
};

export default searchConfig;
