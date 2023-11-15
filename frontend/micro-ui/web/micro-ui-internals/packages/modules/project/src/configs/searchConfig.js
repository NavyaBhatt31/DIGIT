const searchConfig = () => {
  return {
    "label": "SEARCH_PROJECTS",
    "type": "search",
    "apiDetails": {
        "serviceName": "/user/_search",
        "requestParam": {},
        "requestBody": {
            "apiOperation": "SEARCH",
            "Projects": [
                {}
            ]
        },
        "minParametersForSearchForm": 1,
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
            "id": "",
         
            "name": "",
            "projectType": "",
            "createdFrom": "",
            "createdTo": ""
          },
          fields: [
            {
                    "key": "PROJECT_ID",
                    "label": "PROJECT_ID",
                    "type": "text",
                    "isMandatory": false,
                    "disable": false,
                    "populators": {
                        "name": "id",
                        "error": "PROJECT_PATTERN_ERR_MSG",
                        "validation": {
                            "pattern": "/^[a-z0-9\/-]*$/i",
                            "minlength": 2
                                },  
                            }
                        
                        },
                        
                        {
                            "key": "PROJECT_NAME",
                            "label": "PROJECT_NAME",
                            "type": "text",
                            "isMandatory": false,
                            "disable": false,
                            "populators": {
                                "name": "name",
                                "error": "PROJECT_PATTERN_ERR_MSG",
                                "validation": {
                                    "pattern": "/^[a-z0-9\/-@#]*$/i",
                                    "minlength": 2
                                }
                            }
                        },
                        {
                            "label": "WORKS_PROJECT_TYPE",
                            "type": "dropdown",
                            "isMandatory": false,
                            "disable": false,
                            "populators": {
                                "name": "projectType",
                                "optionsKey": "name",
                                "optionsCustomStyle" : {
                                    "top" : "2.3rem"
                                },
                                "mdmsConfig": {
                                    "masterName": "ProjectType",
                                    "moduleName": "works",
                                    "localePrefix": "COMMON_MASTERS"
                                }
                            }
                        },
                        {
                            "label": "CREATED_FROM_DATE",
                            "type": "date",
                            "isMandatory": false,
                            "disable": false,
                            "populators": {
                                "name": "createdFrom"
                            }
                        },
                        {
                            "label": "CREATED_TO_DATE",
                            "type": "date",
                            "isMandatory": false,
                            "disable": false,
                            "populators": {
                                "name": "createdTo",
                                "error": "DATE_VALIDATION_MSG"
                            },
                            "additionalValidation": {
                                "type": "date",
                                "keys": {"start": "createdFrom", "end": "createdTo"}
                            }
                        }
                    ]
                },
                "label": "",
                "children": {},
                "show": true
              },
      searchResult: {
        "label": "",
                "uiConfig": {
                    "defaultValues": {
                        "offset": 0,
                        "limit": 10,
                        "sortOrder": "ASC"
                    },
                    "columns": [
                        {
                            "label": "WORKS_PRJ_SUB_ID",
                            "jsonPath": "id",
                            "additionalCustomization": true
                        },
                        {
                            "label": "WORKS_PROJECT_NAME",
                            "jsonPath": "name",
                            "maxLength": 20,
                            "additionalCustomization":true
                        },
                        
                        {
                            "label": "WORKS_PROJECT_TYPE",
                            "jsonPath": "projectType"
                        },
                        
                        
                       
                    
                    
                        {
                            "label": "ES_COMMON_TOTAL_AMOUNT",
                            "jsonPath": "additionalDetails.estimatedCostInRs"
                        }
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
