import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Header, InboxSearchComposer, Loader, Button, AddFilled } from "@egovernments/digit-ui-react-components";
import { useHistory, useLocation } from "react-router-dom";
import DrugSearchConfig from "../../configs/DrugSearchConfig";


const DrugSearch = () => {
  
    const { t } = useTranslation();
    const history = useHistory();
    // const tenant = Digit.ULBService.getStateId();
    // const projectSession = Digit.Hooks.useSessionStorage("NEW_PROJECT_CREATE", {});
    // const [sessionFormData, clearSessionFormData] = projectSession;
    // const location = useLocation();
   

const config= DrugSearchConfig()
console.log(config)
    // if (isLoading) return <Loader />;
    return (
        <React.Fragment>
            <div>hello</div>
        <Header className="DrugSearch">{t(config?.label)}</Header>
        <div className="inbox-search-wrapper">
          <InboxSearchComposer configs={config}></InboxSearchComposer>
        </div>
      </React.Fragment>
    );
  };
export default DrugSearch;

