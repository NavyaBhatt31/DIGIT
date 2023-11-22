import React from 'react';
import { useTranslation } from "react-i18next";
import { Header, InboxSearchComposer } from "@egovernments/digit-ui-react-components";
import { useHistory } from "react-router-dom";
import SearchProductVarConfig from "../../configs/SearchProductVarConfig";


const SearchProductVar = () => {
  
  const { t } = useTranslation();
  const history = useHistory();
      
   
const config= SearchProductVarConfig()
console.log(config)
 
    return (
        <React.Fragment>
        <Header className="search-product-var">{t(config?.label)}</Header>
        <div className="inbox-search-wrapper">
          <InboxSearchComposer configs={config}></InboxSearchComposer>
        </div>
      </React.Fragment>
    );
  };
export default SearchProductVar;

