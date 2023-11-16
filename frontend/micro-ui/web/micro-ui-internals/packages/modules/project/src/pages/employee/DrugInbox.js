import React from "react";
import { useTranslation } from "react-i18next";
import { Header, InboxSearchComposer, Loader } from "@egovernments/digit-ui-react-components";
import DrugInboxConfig from "../../configs/DrugInboxConfig";

const DrugInbox = () => {
    const { t } = useTranslation();

    //const configs = inboxConfig();
    // const tenant = mz;
    
   
    const configs = data?.DrugInboxConfig[0];

    if(isLoading) return <Loader />
      return (
           <React.Fragment>
              <Header className="DrugInbox"styles={{ fontSize: "32px" }}>{t(configs?.label)}</Header>
              <div className="inbox-search-wrapper">
                <InboxSearchComposer configs={DrugInboxConfig}></InboxSearchComposer>
              </div>
          </React.Fragment>
      );
}

export default DrugInbox;