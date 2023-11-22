import React from 'react';
import { useTranslation } from "react-i18next";
import { Header, InboxSearchComposer } from "@egovernments/digit-ui-react-components";
import { useHistory } from "react-router-dom";
import searchConfig from '../../configs/SearchProjectConfig';

const Search = () => {
  
  const { t } = useTranslation();
  const history = useHistory();
      
   
const config= searchConfig()
console.log(config)
 
    return (
        <React.Fragment>
        <Header className="search-projects">{t(config?.label)}</Header>
        <div className="inbox-search-wrapper">
          <InboxSearchComposer configs={config}></InboxSearchComposer>
        </div>
      </React.Fragment>
    );
  };
export default Search;

