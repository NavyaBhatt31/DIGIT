import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
// eslint-disable-next-line no-unused-vars
// const index = /* ... */

//create functions here based on module name set in mdms(eg->SearchProjectConfig)
//how to call these -> Digit?.Customizations?.[masterName]?.[moduleName]
// these functions will act as middlewares
var Digit = window.Digit || {};



const businessServiceMap = {
 
  "muster roll": "MR",
  "estimate":"ESTIMATE"
};

const inboxModuleNameMap = {
  "muster-roll-approval": "muster-roll-service",
  
};

export const UICustomizations = {
  businessServiceMap,
  updatePayload: (applicationDetails, data, action, businessService) => {

    if (businessService === businessServiceMap.estimate) {
      const workflow = {
        comment: data.comments,
        documents: data?.documents?.map((document) => {
          return {
            documentType: action?.action + " DOC",
            fileName: document?.[1]?.file?.name,
            fileStoreId: document?.[1]?.fileStoreId?.fileStoreId,
            documentUid: document?.[1]?.fileStoreId?.fileStoreId,
            tenantId: document?.[1]?.fileStoreId?.tenantId,
          };
        }),
        assignees: data?.assignees?.uuid ? [data?.assignees?.uuid] : null,
        action: action.action,
      };

      //filtering out the data
      Object.keys(workflow).forEach((key, index) => {
        if (!workflow[key] || workflow[key]?.length === 0) delete workflow[key];
      });

      return {
        estimate: applicationDetails,
        workflow,
      };
    }
    if (businessService === businessServiceMap.contract) {
      const workflow = {
        comment: data?.comments,
        documents: data?.documents?.map((document) => {
          return {
            documentType: action?.action + " DOC",
            fileName: document?.[1]?.file?.name,
            fileStoreId: document?.[1]?.fileStoreId?.fileStoreId,
            documentUid: document?.[1]?.fileStoreId?.fileStoreId,
            tenantId: document?.[1]?.fileStoreId?.tenantId,
          };
        }),
        assignees: data?.assignees?.uuid ? [data?.assignees?.uuid] : null,
        action: action.action,
      };
      //filtering out the data
      Object.keys(workflow).forEach((key, index) => {
        if (!workflow[key] || workflow[key]?.length === 0) delete workflow[key];
      });

      return {
        contract: applicationDetails,
        workflow,
      };
    }
    if (businessService === businessServiceMap?.["muster roll"]) {
      const workflow = {
        comment: data?.comments,
        documents: data?.documents?.map((document) => {
          return {
            documentType: action?.action + " DOC",
            fileName: document?.[1]?.file?.name,
            fileStoreId: document?.[1]?.fileStoreId?.fileStoreId,
            documentUid: document?.[1]?.fileStoreId?.fileStoreId,
            tenantId: document?.[1]?.fileStoreId?.tenantId,
          };
        }),
        assignees: data?.assignees?.uuid ? [data?.assignees?.uuid] : null,
        action: action.action,
      };
      //filtering out the data
      Object.keys(workflow).forEach((key, index) => {
        if (!workflow[key] || workflow[key]?.length === 0) delete workflow[key];
      });

      return {
        musterRoll: applicationDetails,
        workflow,
      };
    }
    if(businessService === businessServiceMap?.["works.purchase"]){
      const workflow = {
        comment: data.comments,
        documents: data?.documents?.map((document) => {
          return {
            documentType: action?.action + " DOC",
            fileName: document?.[1]?.file?.name,
            fileStoreId: document?.[1]?.fileStoreId?.fileStoreId,
            documentUid: document?.[1]?.fileStoreId?.fileStoreId,
            tenantId: document?.[1]?.fileStoreId?.tenantId,
          };
        }),
        assignees: data?.assignees?.uuid ? [data?.assignees?.uuid] : null,
        action: action.action,
      };
      //filtering out the data
      Object.keys(workflow).forEach((key, index) => {
        if (!workflow[key] || workflow[key]?.length === 0) delete workflow[key];
      });

      const additionalFieldsToSet = {
        projectId:applicationDetails.additionalDetails.projectId,
        invoiceDate:applicationDetails.billDate,
        invoiceNumber:applicationDetails.referenceId.split('_')?.[1],
        contractNumber:applicationDetails.referenceId.split('_')?.[0],
        documents:applicationDetails.additionalDetails.documents
      }
      return {
        bill: {...applicationDetails,...additionalFieldsToSet},
        workflow,
      };
    }
  },
  enableModalSubmit:(businessService,action,setModalSubmit,data)=>{
    if(businessService === businessServiceMap?.["muster roll"] && action.action==="APPROVE"){
      setModalSubmit(data?.acceptTerms)
    }
  },
  enableHrmsSearch: (businessService, action) => {
    if (businessService === businessServiceMap.estimate) {
      return action.action.includes("TECHNICALSANCTION") || action.action.includes("VERIFYANDFORWARD");
    }
    if (businessService === businessServiceMap.contract) {
      return action.action.includes("VERIFY_AND_FORWARD");
    }
     if (businessService === businessServiceMap?.["muster roll"]) {
      return action.action.includes("VERIFY");
    }
    if(businessService === businessServiceMap?.["works.purchase"]){
      return action.action.includes("VERIFY_AND_FORWARD")
    }
    return false;
  },
  getBusinessService: (moduleCode) => {
    if (moduleCode?.includes("estimate")) {
      return businessServiceMap?.estimate;
    } else if (moduleCode?.includes("contract")) {
      return businessServiceMap?.contract;
    } else if (moduleCode?.includes("muster roll")) {
      return businessServiceMap?.["muster roll"];
    }
    else if (moduleCode?.includes("works.purchase")) {
      return businessServiceMap?.["works.purchase"];
    }
    else if (moduleCode?.includes("works.wages")) {
      return businessServiceMap?.["works.wages"];
    }
    else if (moduleCode?.includes("works.supervision")) {
      return businessServiceMap?.["works.supervision"];
    }
    else {
      return businessServiceMap;
    }
  },
  getInboxModuleName: (moduleCode) => {
    if (moduleCode?.includes("estimate")) {
      return inboxModuleNameMap?.estimate;
    } else if (moduleCode?.includes("contract")) {
      return inboxModuleNameMap?.contracts;
    } else if (moduleCode?.includes("attendence")) {
      return inboxModuleNameMap?.attendencemgmt;
    } else {
      return inboxModuleNameMap;
    }
  },

  AttendanceInboxConfig: {
    preProcess: (data) => {
      
      //set tenantId
      data.body.inbox.tenantId = Digit.ULBService.getCurrentTenantId();
      data.body.inbox.processSearchCriteria.tenantId = Digit.ULBService.getCurrentTenantId();

      const musterRollNumber = data?.body?.inbox?.moduleSearchCriteria?.musterRollNumber?.trim();
      if(musterRollNumber) data.body.inbox.moduleSearchCriteria.musterRollNumber = musterRollNumber

      const attendanceRegisterName = data?.body?.inbox?.moduleSearchCriteria?.attendanceRegisterName?.trim();
      if(attendanceRegisterName) data.body.inbox.moduleSearchCriteria.attendanceRegisterName = attendanceRegisterName

      // deleting them for now(assignee-> need clarity from pintu,ward-> static for now,not implemented BE side)
      const assignee = _.clone(data.body.inbox.moduleSearchCriteria.assignee);
      delete data.body.inbox.moduleSearchCriteria.assignee;
      if (assignee?.code === "ASSIGNED_TO_ME") {
        data.body.inbox.moduleSearchCriteria.assignee = Digit.UserService.getUser().info.uuid;
      }

      //cloning locality and workflow states to format them
      // let locality = _.clone(data.body.inbox.moduleSearchCriteria.locality ? data.body.inbox.moduleSearchCriteria.locality : []);
      
      let selectedOrg =  _.clone(data.body.inbox.moduleSearchCriteria.orgId ? data.body.inbox.moduleSearchCriteria.orgId : null);
      delete data.body.inbox.moduleSearchCriteria.orgId;
      if(selectedOrg) {
         data.body.inbox.moduleSearchCriteria.orgId = selectedOrg?.[0]?.applicationNumber;
      }

      // let selectedWard =  _.clone(data.body.inbox.moduleSearchCriteria.ward ? data.body.inbox.moduleSearchCriteria.ward : null);
      // delete data.body.inbox.moduleSearchCriteria.ward;
      // if(selectedWard) {
      //    data.body.inbox.moduleSearchCriteria.ward = selectedWard?.[0]?.code;
      // }

      let states = _.clone(data.body.inbox.moduleSearchCriteria.state ? data.body.inbox.moduleSearchCriteria.state : []);
      let ward = _.clone(data.body.inbox.moduleSearchCriteria.ward ? data.body.inbox.moduleSearchCriteria.ward : []);
      // delete data.body.inbox.moduleSearchCriteria.locality;
      delete data.body.inbox.moduleSearchCriteria.state;
      delete data.body.inbox.moduleSearchCriteria.ward;

      // locality = locality?.map((row) => row?.code);
      states = Object.keys(states)?.filter((key) => states[key]);
      ward = ward?.map((row) => row?.code);
      
      
      // //adding formatted data to these keys
      // if (locality.length > 0) data.body.inbox.moduleSearchCriteria.locality = locality;
      if (states.length > 0) data.body.inbox.moduleSearchCriteria.status = states;  
      if (ward.length > 0) data.body.inbox.moduleSearchCriteria.ward = ward;
      const projectType = _.clone(data.body.inbox.moduleSearchCriteria.projectType ? data.body.inbox.moduleSearchCriteria.projectType : {});
      if (projectType?.code) data.body.inbox.moduleSearchCriteria.projectType = projectType.code;

      //adding tenantId to moduleSearchCriteria
      data.body.inbox.moduleSearchCriteria.tenantId = Digit.ULBService.getCurrentTenantId();

      //setting limit and offset becoz somehow they are not getting set in muster inbox 
      data.body.inbox.limit = data.state.tableForm.limit
      data.body.inbox.offset = data.state.tableForm.offset
      delete data.state
      return data;
    },
    postProcess: (responseArray, uiConfig) => {
      const statusOptions = responseArray?.statusMap
        ?.filter((item) => item.applicationstatus)
        ?.map((item) => ({ code: item.applicationstatus, i18nKey: `COMMON_MASTERS_${item.applicationstatus}` }));
      if (uiConfig?.type === "filter") {
        let fieldConfig = uiConfig?.fields?.filter((item) => item.type === "dropdown" && item.populators.name === "musterRollStatus");
        if (fieldConfig.length) {
          fieldConfig[0].populators.options = statusOptions;
        }
      }
    },
    additionalCustomizations: (row, key, column, value, t, searchResult) => {
      if (key === "ATM_MUSTER_ROLL_ID") {
        return (
          <span className="link">
            <Link
              to={`/${window.contextPath}/employee/attendencemgmt/view-attendance?tenantId=${Digit.ULBService.getCurrentTenantId()}&musterRollNumber=${value}`}
            >
              {String(value ? (column.translate ? t(column.prefix ? `${column.prefix}${value}` : value) : value) : t("ES_COMMON_NA"))}
            </Link>
          </span>
        );
      }
      if (key === "ATM_ATTENDANCE_WEEK") {
        const week = `${Digit.DateUtils.ConvertTimestampToDate(value?.startDate, "dd/MM/yyyy")}-${Digit.DateUtils.ConvertTimestampToDate(
          value?.endDate,
          "dd/MM/yyyy"
        )}`;
        return <div>{week}</div>;
      }
      if (key === "ATM_NO_OF_INDIVIDUALS") {
        return <div>{value?.length}</div>;
      }
      if(key === "ATM_AMOUNT_IN_RS"){
        return <span>{value ? Digit.Utils.dss.formatterWithoutRound(value, "number") : t("ES_COMMON_NA")}</span>;
      }
      if (key === "ATM_SLA") {
        return parseInt(value) > 0 ? (
          <span className="sla-cell-success">{t(value) || ""}</span>
        ) : (
          <span className="sla-cell-error">{t(value) || ""}</span>
        );
      }
      if (key === "COMMON_WORKFLOW_STATES") {
        return <span>{t(`WF_MUSTOR_${value}`)}</span>
      }
      //added this in case we change the key and not updated here , it'll throw that nothing was returned from cell error if that case is not handled here. To prevent that error putting this default
      return <span>{t(`CASE_NOT_HANDLED`)}</span>
    },
    MobileDetailsOnClick: (row, tenantId) => {
      let link;
      Object.keys(row).map((key) => {
        if (key === "ATM_MUSTER_ROLL_ID")
          link = `/${window.contextPath}/employee/attendencemgmt/view-attendance?tenantId=${tenantId}&musterRollNumber=${row[key]}`;
        return key;
        });
      return link;
    },
    populateReqCriteria: () => {
      const tenantId = Digit.ULBService.getCurrentTenantId();
      return {
        url: "/org-services/organisation/v1/_search",
        params: { limit: 50, offset: 0 },
        body: {
          SearchCriteria: {
            tenantId: tenantId,
            functions : {
              type : "CBO"
            }
          },
        },
        config: {
          enabled: true,
          select: (data) => {
            return data?.organisations;
          },
        },
      };
    },
  },
  SearchWageSeekerConfig:  {
    customValidationCheck: (data) => {
      //checking both to and from date are present
      const { createdFrom, createdTo } = data;
      if ((createdFrom === "" && createdTo !== "") || (createdFrom !== "" && createdTo === ""))
        return { warning: true, label: "ES_COMMON_ENTER_DATE_RANGE" };

      return false;
    },
    preProcess: (data) => {
      data.params = { ...data.params, tenantId: Digit.ULBService.getCurrentTenantId() };

      let requestBody = { ...data.body.Individual };
      const pathConfig = {
        name: "name.givenName",
      };
      const dateConfig = {
        createdFrom: "daystart",
        createdTo: "dayend",
      };
      const selectConfig = {
        wardCode: "wardCode[0].code",
        socialCategory: "socialCategory.code",
      };
      const textConfig = ["name", "individualId"]
      let Individual = Object.keys(requestBody)
        .map((key) => {
          if (selectConfig[key]) {
            requestBody[key] = _.get(requestBody, selectConfig[key], null);
          } else if (typeof requestBody[key] == "object") {
            requestBody[key] = requestBody[key]?.code;
          } else if (textConfig?.includes(key)) {
            requestBody[key] = requestBody[key]?.trim()
          }
          return key;
        })
        .filter((key) => requestBody[key])
        .reduce((acc, curr) => {
          if (pathConfig[curr]) {
            _.set(acc, pathConfig[curr], requestBody[curr]);
          } else if (dateConfig[curr] && dateConfig[curr]?.includes("day")) {
            _.set(acc, curr, Digit.Utils.date.convertDateToEpoch(requestBody[curr], dateConfig[curr]));
          } else {
            _.set(acc, curr, requestBody[curr]);
          }
          return acc;
        }, {});

      data.body.Individual = { ...Individual };
      return data;
    },
    additionalCustomizations: (row, key, column, value, t, searchResult) => {
      //here we can add multiple conditions
      //like if a cell is link then we return link
      //first we can identify which column it belongs to then we can return relevant result
      switch (key) {
        case "MASTERS_WAGESEEKER_ID":
          return (
            <span className="link">
              <Link to={`/${window.contextPath}/employee/masters/view-wageseeker?tenantId=${row?.tenantId}&individualId=${value}`}>
                 {String(value ? (column.translate ? t(column.prefix ? `${column.prefix}${value}` : value) : value) : t("ES_COMMON_NA"))}
              </Link>
            </span>
          );

        case "MASTERS_SOCIAL_CATEGORY":
          return value ? <span style={{ whiteSpace: "nowrap" }}>{String(t(`MASTERS_${value}`))}</span> : t("ES_COMMON_NA");

        case "CORE_COMMON_PROFILE_CITY":
          return value ? <span style={{ whiteSpace: "nowrap" }}>{String(t(Digit.Utils.locale.getCityLocale(value)))}</span> : t("ES_COMMON_NA");

        case "MASTERS_WARD":
          return value ? (
            <span style={{ whiteSpace: "nowrap" }}>{String(t(Digit.Utils.locale.getMohallaLocale(value, row?.tenantId)))}</span>
          ) : (
            t("ES_COMMON_NA")
          );

        case "MASTERS_LOCALITY":
          return value ? (
            <span style={{ whiteSpace: "break-spaces" }}>{String(t(Digit.Utils.locale.getMohallaLocale(value, row?.tenantId)))}</span>
          ) : (
            t("ES_COMMON_NA")
          );
        default:
          return t("ES_COMMON_NA");
      }
    },
    MobileDetailsOnClick: (row, tenantId) => {
      let link;
      Object.keys(row).map((key) => {
        if (key === "MASTERS_WAGESEEKER_ID")
          link = `/${window.contextPath}/employee/masters/view-wageseeker?tenantId=${tenantId}&wageseekerId=${row[key]}`;
        return key;
        });
      return link;
    },
    additionalValidations: (type, data, keys) => {
      if (type === "date") {
        return data[keys.start] && data[keys.end] ? () => new Date(data[keys.start]).getTime() <= new Date(data[keys.end]).getTime() : true;
      }
    }
  },
  // SearchProjectConfig: {
  //   customValidationCheck: (data) => {
  //     //checking both to and from date are present
  //     const { createdFrom, createdTo } = data;
  //     if ((createdFrom === "" && createdTo !== "") || (createdFrom !== "" && createdTo === ""))
  //       return { warning: true, label: "ES_COMMON_ENTER_DATE_RANGE" };

  //     return false;
  //   },
  //   preProcess: (data) => {
  
  //     const projectType = data.body.Projects[0]?.projectType?.code;
  //     data.params = { ...data.params, tenantId: Digit.ULBService.getCurrentTenantId(), includeAncestors: true, createdFrom, createdTo };

  //     let name = data.body.Projects[0]?.name;
  //     name = name?.trim();
  //     delete data.body.Projects[0]?.createdFrom;
  //     delete data.body.Projects[0]?.createdTo;
  //     data.body.Projects[0] = { ...data.body.Projects[0], tenantId: Digit.ULBService.getCurrentTenantId(), projectType, name };
     
  //     const dateConfig = {
  //       createdFrom: "daystart",
  //       createdTo: "dayend",
  //     };

  //     const selectConfig = {
  //       wardCode: "wardCode[0].code",
  //       socialCategory: "socialCategory.code",
  //     };
  //     const textConfig = ["name", "individualId"]
  //     let Projects = Object.keys(requestBody)
  //       .map((key) => {
  //         if (selectConfig[key]) {
  //           requestBody[key] = _.get(requestBody, selectConfig[key], null);
  //         } else if (typeof requestBody[key] == "object") {
  //           requestBody[key] = requestBody[key]?.code;
  //         } else if (textConfig?.includes(key)) {
  //           requestBody[key] = requestBody[key]?.trim()
  //         }
  //         return key;
  //       })
  //       .filter((key) => requestBody[key])

  //       .reduce((acc, curr) => {
  //         if (pathConfig[curr]) {
  //           _.set(acc, pathConfig[curr], requestBody[curr]);
  //         } else if (dateConfig[curr] && dateConfig[curr]?.includes("day")) {
  //           _.set(acc, curr, Digit.Utils.date.convertDateToEpoch(requestBody[curr], dateConfig[curr]));
  //         } else {
  //           _.set(acc, curr, requestBody[curr]);
  //         }
  //         return acc;
  //       }, 

  //       )
  //     return data;
  //     },
  //       additionalCustomizations: (_row, _key, _column, _value, _t, ) => {
  //         switch(key){
      
  //       case "PRJ_SUB_ID": {
  //         return (
  //           <span className="link">
  //             <Link to={`/${window.contextPath}/employee/project/project-details?tenantId=${row?.tenantId}&projectNumber=${value}`}>
  //             {String(value ? value : t("ES_COMMON_NA"))}
  //             </Link>
  //           </span>
  //         );
  //       }
  
  //       case "PROJECT_ID": 
  //         return value ? (
  //           <span className="link">
  //             <Link to={`/${window.contextPath}/employee/project/project-details?tenantId=${row.tenantId}&projectNumber=${value}`}>
  //             {String(value ? value : t("ES_COMMON_NA"))}
  //             </Link>
  //           </span>
  //         ) : (
  //           t("ES_COMMON_NA")
  //         );
        
  
  //       case "PROJECT_NAME": {
  //         return (
  //           <div class="tooltip">
  //             <span class="textoverflow" style={{ "--max-width": `${column?.maxlength}ch` }}>
  //               {String(t(value))}
  //             </span>
  //             {/* check condtion - if length greater than 20 */}
  //             <span class="tooltiptext" style={{ whiteSpace: "nowrap" }}>
  //               {String(t(value))}
  //             </span>
  //           </div>
  //         )
  //       }
        
  //         }  
  //     },
      
  //   },
      

ProjectInboxConfig: {
  preProcess: (data) => {
    const createdFrom = Digit.Utils.pt.convertDateToEpoch(data.body.Projects[0]?.createdFrom);
    const createdTo = Digit.Utils.pt.convertDateToEpoch(data.body.Projects[0]?.createdTo);
    const projectType = data.body.Projects[0]?.projectType?.code;
    data.params = { ...data.params, tenantId: Digit.ULBService.getCurrentTenantId(), includeAncestors: true, createdFrom, createdTo };
    let name = data.body.Projects[0]?.name;
    name = name?.trim();
    delete data.body.Projects[0]?.createdFrom;
    delete data.body.Projects[0]?.createdTo;
    delete data.body.Projects[0]?.department;
    delete data.body.Projects[0]?.createdBy;
    delete data.body.Projects[0]?.status;
    data.body.Projects[0] = { ...data.body.Projects[0], tenantId: Digit.ULBService.getCurrentTenantId(), projectType, name };

    return data;
  }
},

// SearchTaskConfig:  
// {
//   preProcess: (data) => {
//     const plannedStartDate = Digit.Utils.pt.convertDateToEpoch(data.body.Task[0]?.plannedStartDate);
//     const plannedEndDate = Digit.Utils.pt.convertDateToEpoch(data.body.Task[0]?.plannedEndDate);
//     const actualStartDate = Digit.Utils.pt.convertDateToEpoch(data.body.Task[0]?.actualStartDate, );
//     const actualEndDate = Digit.Utils.pt.convertDateToEpoch(data.body.Task[0]?.actualEndDate);
//     // const projectType = data.body.Projects[0]?.projectType?.code;
//     // const ward = data.body.Projects[0]?.ward?.[0]?.code;
//     data.params = { ...data.params, plannedStartDate, plannedEndDate, actualStartDate, actualEndDate };


//     // let id = data.body.Task[0]?.id?.trim();
//     // let clientReferenceId = data.body.Task[0]?.clientReferenceId?.trim()
//     // let projectId = data.body.Task[0]?.projectId?.trim();
//     // let projectBeneficiaryId = data.body.Task[0]?.projectBeneficiaryId?.trim();
//     // let localityCode = data.body.Task[0]?.localityCode?.trim();
//     // let status = data.body.Task[0]?.status?.trim();
//     // debugger;

//     // delete data.body.Task[0]?.plannedStartDate;
//     // delete data.body.Task[0]?.plannedEndDate;
//     // delete data.body.Task[0]?.actualStartDate;
//     // delete data.body.Task[0]?.actualEndDate;
   
//     // data.body.Task[0] = { ...data.body.Task[0],id, clientReferenceId, projectId, projectBeneficiaryId, localityCode, status };
//     // debugger;
//     return data;
//   },
//   // postProcess: (responseArray) => {
//   //   const listOfUuids = responseArray?.map((row) => row.auditDetails.createdBy);
//   //   const uniqueUuids = listOfUuids?.filter(function (item, i, ar) {
//   //     return ar.indexOf(item) === i;
//   //   });
//   //   const tenantId = "mz";
//   //   const reqCriteria = {
//   //     url: "/user/_search",
//   //     params: {},
//   //     body: { tenantId, pageSize: 100, uuid: [...uniqueUuids] },
//   //     config: {
//   //       enabled: responseArray?.length > 0 ? true : false,
//   //       select: (data) => {
//   //         const usersResponse = data?.user;
//   //         responseArray?.forEach((row) => {
//   //           const uuid = row?.auditDetails?.createdBy;
//   //           const user = usersResponse?.filter((user) => user.uuid === uuid);
//   //           row.createdBy = user?.[0].id;
//   //           // debugger;
//   //         });
//   //         return responseArray;
//   //       },
//   //     },
//   //   };
//   //   const { isLoading: isPostProcessLoading, data: combinedResponse, isFetching: isPostProcessFetching } = Digit.Hooks.useCustomAPIHook(
//   //     reqCriteria
//   //   );
//   //   return {
//   //     isPostProcessFetching,
//   //     isPostProcessLoading,
//   //     combinedResponse,
//   //   };
//   // },
  // customValidationCheck: (data) => {
  //   const { plannedStartDate, plannedEndDate} = data;
  //   if ((plannedStartDate === "" && plannedEndDate !== "") || (plannedStartDate !== "" && plannedEndDate === ""))
  //   return { warning: true, label: "ES_COMMON_ENTER_DATE_RANGE_PLANNED" };
  
  //   const { actualStartDate, actualEndDate } = data;
  //  if ((actualStartDate === "" && actualEndDate !== "") || (actualStartDate !== "" && actualEndDate === ""))
  //   return { warning: true, label: "ES_COMMON_ENTER_DATE_RANGE_ACTUAL" };

//     return false;
//   },
// },

SearchTaskConfig:  {
  customValidationCheck: (data) => {
    const { plannedStartDate, plannedEndDate} = data;
    if ((plannedStartDate === "" && plannedEndDate !== "") || (plannedStartDate !== "" && plannedEndDate === ""))
    return { warning: true, label: "ES_COMMON_ENTER_DATE_RANGE_PLANNED" };
  
    const { actualStartDate, actualEndDate } = data;
   if ((actualStartDate === "" && actualEndDate !== "") || (actualStartDate !== "" && actualEndDate === ""))
    return { warning: true, label: "ES_COMMON_ENTER_DATE_RANGE_ACTUAL" };

    return false;
  },
  preProcess: (data) => {
    data.params = { ...data.params, tenantId: Digit.ULBService.getCurrentTenantId() };

    let requestBody = { ...data.body.Task };
    const pathConfig = {    };

    const dateConfig = {
                    plannedStartDate: "daystart",
                    plannedEndDate: "dayend",
                    actualStartDate: "dayactualstart",
                    actualEndDate: "dayactualend",
    };
    const selectConfig = {
     
    };
    const textConfig = ["id", "clientReferenceId", "projectId", "projectBeneficiaryId", "localityCode", "status"]
    let Task = Object.keys(requestBody)
      .map((key) => {
        if (selectConfig[key]) {
          requestBody[key] = _.get(requestBody, selectConfig[key], null);
        } else if (typeof requestBody[key] == "object") {
          requestBody[key] = requestBody[key]?.code;
        } else if (textConfig?.includes(key)) {
          requestBody[key] = requestBody[key]?.trim()
        }
        return key;
      })
      .filter((key) => requestBody[key])
      // .reduce((acc, curr) => {
      //   if (pathConfig[curr]) {
      //     _.set(acc, pathConfig[curr], requestBody[curr]);
      //   } else if (dateConfig[curr] && dateConfig[curr]?.includes("day")) {
      //     _.set(acc, curr, Digit.Utils.date.convertDateToEpoch(requestBody[curr], dateConfig[curr]));
      //   } else {
      //     _.set(acc, curr, requestBody[curr]);
      //   }
      //   return acc;
      // }, {});

    data.body.Task = { ...Task };
    return data;
  },
 
  
  
  
},


}

