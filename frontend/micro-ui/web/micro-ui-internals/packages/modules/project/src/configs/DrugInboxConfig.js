const DrugInboxConfig = () => {
    return {
        label : "ES_COMMON_INBOX",
        type : "inbox", 
        //Added search config, will be updated with inbox api config while integration
        apiDetails: {
            serviceName: "/product/v1/_search",
            requestParam: {
              limit:10,
              offset:0,
              tenantId:"mz"
            },
            requestBody: {
                apiOperation: "SEARCH",
                Product: [
                    {   

                    }
                ],
                tenantId:"mz"
            },
           
        },
        sections : {
            search : {
                uiConfig : {
                    headerStyle : null,
                    primaryLabel: 'ES_COMMON_SEARCH',
                    secondaryLabel: 'ES_COMMON_CLEAR_SEARCH',
                    minReqFields: 1,
                    defaultValues : {
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
                label : "",
                children : {},
                show : true
            },
            links : {
                uiConfig : {
                    links : [
                        {
                            text: "CREATE_PROJECT",
                            url: `/employee/project/create-project`,
                            roles: [],
                        },
                        {
                            text: "SEARCH_PROJECTS",
                            url: `/employee/project/search-project`,
                            roles: [],
                        },
                        {
                            text: "DRUG_SEARCH",
                            url: `/employee/project/drugsearch`,
                            roles: [],
                        },
                    ],
                    label : "DRUG_INBOX",
                    logoIcon : { //Pass the name of the Icon Component as String here and map it in the InboxSearchLinks Component   
                        component : "PropertyHouse",
                        customClass : "inbox-search-icon--projects"         
                    }
                },
                children : {},
                show : true //by default true. 
            },
            filter : {
                uiConfig : {
                    type : 'filter',
                    headerStyle : null,
                    primaryLabel: 'ES_COMMON_APPLY',
                    minReqFields: 0,
                    secondaryLabel: '',
                    defaultValues : {
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
                           
                          },
                        }, 
                       
                       
                      ],
                },
                label : "ES_COMMON_FILTERS",
                show : true
            },
            searchResult: {
                label: "",
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
                show: true 
            }
        },
        additionalSections : {
            
        }
    }
}

export default DrugInboxConfig;