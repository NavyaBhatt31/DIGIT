import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Header, InboxSearchComposer, Loader, Button, AddFilled } from "@egovernments/digit-ui-react-components";
// import searchWageSeekerConfig from "../../configs/searchWageSeekerConfig";
import { useHistory, useLocation } from "react-router-dom";

// const projSearch = () => {
//   const { t } = useTranslation();
//   const history = useHistory();
//   const location = useLocation();

  // const wageSeekerSession = Digit.Hooks.useSessionStorage("WAGE_SEEKER_CREATE", {});
  // const [sesionFormData, clearSessionFormData] = wageSeekerSession;

  // const configModuleName = Digit.Utils.getConfigModuleName();
  // const tenant = Digit.ULBService.getStateId();
  // const { isLoading, data } = Digit.Hooks.useCustomMDMS(
  //     tenant,
  //     configModuleName,
  //  [
  //   {
  //     name: "SearchIndividualConfig",
  //   },
  // ]);

  const indConfigs = data?.[configModuleName]?.SearchIndividualConfig?.[0];
  const mutation = Digit.Hooks.useCustomAPIMutationHook(reqCriteriaCreate);
  const history = useHistory();
  const [dept, setDept] = useState("");
  // const requestCriteria = {
  //   url: "/egov-hrms/employees/_search",
  //   body: {},
  //   params: {
  //     // tenantId:tenantId,
  //     tenantId: "pg.citya",
  //     limit: 10,
  //     offset: 0,
  //     sortOrder: "ASC",
  //     // departments: ADM
  //     // roles: SYSTEM,EMPLOYEE
  //   },
  //   config: {
  //     select: (data) => data?.Employees?.map((e) => ({ code: e?.code, name: e?.user?.name })),
  //   },
  // };
  const requestCriteria1 = {
    url:  Urls.searchproj.search ,
    body: {},
    changeQueryName: `custom-${dept}`,
    params: {
      // tenantId:tenantId,
      tenantId: "pg.citya",
      limit: 10,
      offset: 0,
      sortOrder: "ASC",
      departments: dept,
      // roles: SYSTEM,EMPLOYEE
    },
    config: {
      enabled: dept?.length > 0,
      cacheTime: 0,
      select: (data) => data?.Employees?.map((e) => ({ code: e?.code, name: e?.user?.name })),
    },
  };
  const { isLoading, data: empData = [] } = Digit.Hooks.useCustomAPIHook(requestCriteria);
  const { isLoading: isLoadingEmpData, data: filteredEmpData = [], revalidate } = Digit.Hooks.useCustomAPIHook(requestCriteria1);

  console.log(empData, "empData", filteredEmpData);
  const onSubmit = (data) => {
    ///
    console.log(data, "data");
    const onError = (resp) => {
      history.push(`/${window.contextPath}/employee/sample/response?isSuccess=${false}`, { message: "TE_CREATION_FAILED" });
    };

    const onSuccess = (resp) => {
      history.push(`/${window.contextPath}/employee/sample/response?appNo=${resp.contracts[0].supplementNumber}&isSuccess=${true}`, {
        message: isEdit ? "TE_EDIT_SUCCESS" : "TE_CREATION_SUCCESS",
        showID: true,
        label: "REVISED_WO_NUMBER",
      });
    };

    mutation.mutate(
      {
        params: {},
        body: {
          contract: {
            ...data,
          },
          workflow: {
            action: "SEARCH",

            comment: null,
          },
        },
      },
      {
        onError,
        onSuccess,
      }
    );
  };

  let configs = useMemo(
    () => Digit.Utils.preProcessMDMSConfigInboxSearch(t, indConfigs, "sections.search.uiConfig.fields",{
      updateDependent : [
        {
          key : "createdFrom",
          value : [new Date().toISOString().split("T")[0]]
        },
        {
          key : "createdTo",
          value : [new Date().toISOString().split("T")[0]]
        }
      ]
    }
    ),[indConfigs]);



  useEffect(() => {
    if (!window.location.href.includes("modify-wageseeker") && sesionFormData && Object.keys(sesionFormData) !== 0) {
      clearSessionFormData();
    }
  }, [location]);
  
  if (isLoading) return <Loader />;
  return (
    <React.Fragment>
      <div className=""works-search >
        <Header className="Search">Project Search</Header>
        {Digit.Utils.didEmployeeHasRole(configs?.actionRole) && (
          <Button
            label={t(configs?.actionLabel)}
            variation="secondary"
            icon={<AddFilled style={{height : "20px", width : "20px"}}/>}
            onButtonClick={() => {
              history.push(`/${window?.contextPath}/employee/${configs?.actionLink}`);
            }}
            type="button"
          />
        )}
      </div>
      <div className="inbox-search-wrapper">
        <InboxSearchComposer configs={configs}></InboxSearchComposer>
      </div>
    </React.Fragment>
  );


export default projSearch;
