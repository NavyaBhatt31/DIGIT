import { AppContainer, BreadCrumb, PrivateRoute } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Switch } from "react-router-dom";
import Create from "./proj";
// import projInbox from "./projInbox";
import Search from "./Search";
// import AdvancedCreate from "./AdvancedForm";
import Response from "./Response";
import View from "./View";
import DrugSearch from "./DrugSearch";
import SearchProductVar from "./SearchProductVar";
import SearchHousehold from "./SearchHousehold";
import SearchTask from "./SearchTask";
import SearchBeneficiary from "./SearchBeneficiary";
import SearchProjectStaff from "./SearchProjectStaff";

const ProjectBreadCrumb = ({ location }) => {
  const { t } = useTranslation();
  const crumbs = [
    {
      path: `/${window?.contextPath}/employee`,
      content: t("HOME"),
      show: true,
    },
    {
      path: `/${window?.contextPath}/employee`,
      content: t(location.pathname.split("/").pop()),
      show: true,
    },
  ];
  return <BreadCrumb crumbs={crumbs} spanStyle={{ maxWidth: "min-content" }} />;
};

const App = ({ path, stateCode, userType, tenants }) => {
  const commonProps = { stateCode, userType, tenants, path };

  return (
    <Switch>
      <AppContainer className="ground-container">
        <React.Fragment>
          <ProjectBreadCrumb location={location} />
        </React.Fragment>
        <PrivateRoute path={`${path}/create`} component={() => <Create></Create>} />
        {/* <PrivateRoute path={`${path}/advanced`} component={() => <AdvancedCreate></AdvancedCreate>} /> */}
        <PrivateRoute path={`${path}/inbox`} component={() => <projInbox></projInbox>} />
        <PrivateRoute path={`${path}/search`} component={() => <Search></Search>} />
        <PrivateRoute path={`${path}/response`} component={() => <Response></Response>} />
        <PrivateRoute path={`${path}/view`} component={() => <View></View>} />
        <PrivateRoute path={`${path}/drugsearch`} component={() => <DrugSearch></DrugSearch>} />
        <PrivateRoute path={`${path}/searchproductvar`} component={() => <SearchProductVar></SearchProductVar>} />
        <PrivateRoute path={`${path}/searchhousehold`} component={() => <SearchHousehold></SearchHousehold>} />
        <PrivateRoute path={`${path}/searchtask`} component={() => <SearchTask></SearchTask>} />
        <PrivateRoute path={`${path}/searchbeneficiary`} component={() => <SearchBeneficiary></SearchBeneficiary>} />
        <PrivateRoute path={`${path}/searchprojectstaff`} component={() => <SearchProjectStaff></SearchProjectStaff>} />



      </AppContainer>
    </Switch>
  );
};

export default App;
