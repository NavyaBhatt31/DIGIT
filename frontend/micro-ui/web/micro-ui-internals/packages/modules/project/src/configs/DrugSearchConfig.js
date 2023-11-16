
const DrugSearchConfig = () => {
    return {
      label: "SEARCH_DRUG",
      type: "search",
      apiDetails: {
        serviceName: "/product/v1/_search",
        requestParam: {
            limit:10,
            offset:0,
            tenantId:"mz"
        },
        requestBody: {
            Product: 
                {
                    
                },
            
          apiOperation: "SEARCH",
          limit:"",
          offset:"",
          tenantId:""
          
        },
        minParametersForSearchForm: 1,
      masterName: "commonUiConfig",
      moduleName: "SearchProductConfig",
      tableFormJsonPath: "requestParam",
      filterFormJsonPath: "requestBody.Product",
      searchFormJsonPath: "requestBody.Product",
       
      },
      sections: {
        search: {
          uiConfig: {
            headerStyle: null,
            primaryLabel: "ES_COMMON_SEARCH",
            secondaryLabel: "ES_COMMON_CLEAR_SEARCH",
            minReqFields: 1,
            formClassName: "custom-both-clear-search",
            defaultValues:  {
                name: "",
                manufacturer: "",
                type: "",
                ids: [
                    ""
                ]
            },
            fields: [
             
              {
                label: "DRUG_NAME",
                type: "text",
                isMandatory: true,
                disable: false,
                preProcess: {
                  convertStringToRegEx: ["populators.validation.pattern"],
                },
                populators: {
                  name: "name",
                  error: "PROJECT_PATTERN_ERR_MSG",
                  validation: {
                    pattern: '^[^\\$"<>?\\\\~`!@$%^()+={}\\[\\]*:;“”‘’]{1,50}$',
                   
                  },
                },
              },
              {
                label: "DRUG_MANUFACTURER",
                type: "text",
                isMandatory: false,
                disable: false,
                preProcess: {
                  convertStringToRegEx: ["populators.validation.pattern"],
                },
                populators: {
                  name: "manufacturer",
                  error: "COMMON_PATTERN_ERR_MSG_MUSTER_ID",
                  validation: {
                    pattern: '^[^\\$"<>?\\\\~`!@$%^()+={}\\[\\]*:;“”‘’]{1,50}$',
                    
                  },
                },
              },
              {
                label: "DRUG_TYPE",
                type: "text",
                isMandatory: false,
                disable: false,
                preProcess: {
                  convertStringToRegEx: ["populators.validation.pattern"],
                },
                populators: {
                  name: "type",
                  error: "COMMON_PATTERN_ERR_MSG_MUSTER_ID",
                  validation: {
                    pattern: '^[^\\$"<>?\\\\~`!@$%^()+={}\\[\\]*:;“”‘’]{1,50}$',
                    
                  },
                },
              },
              {
                label: "DRUG_IDS",
                type: "text",
                isMandatory: false,
                disable: false,
                preProcess: {
                  convertStringToRegEx: ["populators.validation.pattern"],
                },
                populators: {
                  name: "ids",
                  error: "COMMON_PATTERN_ERR_MSG_MUSTER_ID",
                  validation: {
                    pattern: '^[^\\$"<>?\\\\~`!@$%^()+={}\\[\\]*:;“”‘’]{1,50}$',
                    
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
          name: "",
          manufacturer: "",
          type: "",
          ids: [
              ""
          ],
          uiConfig: {
            columns: [
              {
                label: "DRUG_NAME",
                jsonPath: "name",
                additionalCustomization: true,
              },
              {
                label: "DRUG_MANUFACTURER",
                jsonPath: "manufacturer",
                additionalCustomization: true,
              },
              {
                label: "DRUG_TYPE",
                jsonPath: "type",
                additionalCustomization: true,
              },
              {
                label: "DRUG_IDS",
                jsonPath: "ids",
              },
             
            ],
            enableGlobalSearch: false,
            enableColumnSort: true,
            resultsJsonPath: "Product",
          },
          children: {},
          show: true,
        },
      },
      additionalSections: {},
    };
}

export default DrugSearchConfig;