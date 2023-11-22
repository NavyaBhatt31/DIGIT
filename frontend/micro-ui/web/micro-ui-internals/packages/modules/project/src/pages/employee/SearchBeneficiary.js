import React from "react";
import { useTranslation } from "react-i18next";
import { Header, InboxSearchComposer } from "@egovernments/digit-ui-react-components";
import { useHistory } from "react-router-dom";
import SearchBeneficiaryConfig from "../../configs/SearchBeneficiaryConfig";

const SearchBeneficiary = () => {
  
    const { t } = useTranslation();
    const history = useHistory();
      
    const config= SearchBeneficiaryConfig()
    console.log(config)
    
    return (
        <React.Fragment>
            <div></div>
        <Header className="DrugSearch">{t(config?.label)}</Header>
        <div className="inbox-search-wrapper">
          <InboxSearchComposer configs={config}></InboxSearchComposer>
        </div>
      </React.Fragment>
    );
  };
export default SearchBeneficiary;

