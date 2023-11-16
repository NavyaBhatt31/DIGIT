import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Header, InboxSearchComposer, Loader} from "@egovernments/digit-ui-react-components";
// import searchConfig from "../../configs/searchConfig";
import { useHistory, useLocation } from "react-router-dom";
import inboxConfig from "../../configs/inboxConfig1";

const Search = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();

  // const wageSeekerSession = Digit.Hooks.useSessionStorage("WAGE_SEEKER_CREATE", {});
  // const [sesionFormData, clearSessionFormData] = wageSeekerSession;

  const configModuleName = Digit.Utils.getConfigModuleName();
  const tenant = Digit.ULBService.getStateId();
  const { isLoading, data } = Digit.Hooks.useCustomMDMS(
    tenant,
    configModuleName,
    [
      {
        name: "SearchProjectConfig",
      },
    ],

    {
      select: (data) => {
        return data?.[Digit.Utils.getConfigModuleName()]?.SearchProjectConfig?.[0];
      },
    }
  );
  // const requestCriteria1 = {
  //   url:  "/user/_search" ,
  //   body: {},
  //   // changeQueryName: `custom-${dept}`,
  //   params: {
  //    roles:[]
  //   },
  //   config: {
  //     // enabled: dept?.length > 0,
  //     cacheTime: 0,
  //     select: (data) => data?.Employees?.map((e) => ({ code: e?.code, name: e?.user?.name })),
  //   },
  // };
  // const {  data: empData = [] } = Digit.Hooks.useCustomAPIHook(requestCriteria1);
  // const { isLoading: isLoadingEmpData, data: filteredEmpData = [], revalidate } = Digit.Hooks.useCustomAPIHook(requestCriteria1);

  // console.log(empData, "empData", filteredEmpData);

  let configs = useMemo(
    () => Digit.Utils.preProcessMDMSConfigInboxSearch(t, data, "sections.search.uiConfig.fields",{
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
    ),[data]);
    // ),[]);

    console.log(configs, "configs");

  // useEffect(() => {
  //   if (!window.location.href.includes("create-project") && sesionFormData && Object.keys(sesionFormData) !== 0) {
  //     clearSessionFormData();
  //   }
  // }, [location]);
  
  if (isLoading) {
    return  <Loader/>;
  }
  // <Loader />;
  return (
    <React.Fragment>
      <div className=""search >
        <Header className="Search">Project Search, {t(inboxConfig?.label)}</Header>
        {/* {Digit.Utils.didEmployeeHasRole(configs?.actionRole)} */}
        
      </div>
      <div className="inbox-search-wrapper">
        <InboxSearchComposer configs={inboxConfig}></InboxSearchComposer>
      </div>
    </React.Fragment>
  );
}     
export default Search;
