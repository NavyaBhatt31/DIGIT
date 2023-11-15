import { Loader} from "@egovernments/digit-ui-react-components";
import React from "react";
import { useRouteMatch } from "react-router-dom";
import { default as EmployeeApp } from "./pages/employee";
import projectCard from "./components/projectCard";
import ViewEstimateComponent from "./components/ViewEstimateComponent";
// import {Search} from "./pages/employee/Search";
import Search from "./pages/employee/Search";
import projInbox from "./pages/employee/projInbox";

export const projectModule = ({ stateCode, userType, tenants }) => {
  const { path, url } = useRouteMatch();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const moduleCode = ["proj", "common","workflow", tenantId];
  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({
    stateCode,
    moduleCode,
    language,
  });

  if (isLoading) {
    return <Loader />;
  }
  return <EmployeeApp path={path} stateCode={stateCode} userType={userType} tenants={tenants} />;
};

const componentsToRegister = {
  projectModule,
  projectCard,
  ProjectModule:projectModule,
  ProjectCard:projectCard,
  Search,
  projInbox,

  ViewEstimatePage: ViewEstimateComponent,
};
//init <modulename >component
export const initprojectComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
