import React,{useState,useEffect,useMemo} from "react";
import { useTranslation } from "react-i18next";
import { Header, InboxSearchComposer, Loader } from "@egovernments/digit-ui-react-components";
import { inboxConfig } from '../configs/inboxConfig1';

import { useLocation } from 'react-router-dom';

const projInbox = () => {
    const { t } = useTranslation();
    
    
    const tenant = Digit.ULBService.getStateId();
    const { isLoading, data } = Digit.Hooks.useCustomMDMS(
        tenant,
        Digit.Utils.getConfigModuleName(),
        [
            {
                "name": "InboxProjectConfig"
            }
        ]
    );
   
    const configs = data?.[Digit.Utils.getConfigModuleName()]?.InboxProjectConfig?.[0];
   
    
    if (isLoading)  return <Loader />;
    return (
        <React.Fragment>
            <Header styles={{ fontSize: "32px" }}>{t(configs?.label)}{location?.state?.count ? <span className="inbox-count">{location?.state?.count}</span> : null}</Header>
            <div className="inbox-search-wrapper">
                <InboxSearchComposer configs={configs}></InboxSearchComposer>
            </div>
        </React.Fragment>
    );
}

export default projInbox;
